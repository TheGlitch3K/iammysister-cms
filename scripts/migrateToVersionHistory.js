const fs = require('fs');
const path = require('path');

// Migration Script: Transform flat client records to versioned client records
console.log('🔄 Starting migration to version history system...\n');

const dataPath = path.join(__dirname, '..', 'data', 'clients.json');
const backupPath = path.join(__dirname, '..', 'data', 'clients_pre_version_backup.json');

// Read current data
const currentClients = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Create backup
fs.writeFileSync(backupPath, JSON.stringify(currentClients, null, 2));
console.log('📦 Created backup at:', backupPath);

// Helper function to create client identifier (email + name)
function getClientKey(client) {
  const email = (client.email || '').toLowerCase().trim();
  const name = `${client.firstName} ${client.lastName}`.toLowerCase().trim();
  return email || name; // Use email as primary, fallback to name
}

// Group clients by email/name to identify multiple submissions
const clientGroups = {};

currentClients.forEach(client => {
  const key = getClientKey(client);
  if (!clientGroups[key]) {
    clientGroups[key] = [];
  }
  clientGroups[key].push(client);
});

console.log(`📊 Found ${Object.keys(clientGroups).length} unique clients`);

// Transform to versioned structure
const versionedClients = [];
let clientIdCounter = 1;

Object.entries(clientGroups).forEach(([clientKey, submissions]) => {
  // Sort submissions by timestamp (oldest first)
  submissions.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  
  // Generate unique client ID
  const clientId = `IAMS-${clientIdCounter.toString().padStart(4, '0')}`;
  clientIdCounter++;
  
  // Create versions array from all submissions
  const versions = submissions.map((submission, index) => {
    const isLatest = index === submissions.length - 1;
    
    return {
      versionId: index + 1,
      timestamp: submission.timestamp,
      status: isLatest ? 'active' : 'inactive',
      isLatest: isLatest,
      submissionSource: 'google_form',
      data: {
        // Remove the old id and add version-specific data
        ...submission,
        originalId: submission.id // Keep reference to original ID
      }
    };
  });
  
  // Create the versioned client record
  const versionedClient = {
    clientId: clientId,
    primaryEmail: submissions[0].email || '',
    primaryName: `${submissions[0].firstName} ${submissions[0].lastName}`,
    firstName: submissions[submissions.length - 1].firstName, // Latest
    lastName: submissions[submissions.length - 1].lastName,   // Latest
    createdAt: submissions[0].timestamp,
    lastUpdated: submissions[submissions.length - 1].timestamp,
    totalVersions: versions.length,
    currentVersion: versions.length,
    
    // Current/Latest data for quick access (flattened from latest version)
    currentData: {
      ...submissions[submissions.length - 1],
      version: versions.length
    },
    
    // All historical versions
    versions: versions,
    
    // Admin metadata
    adminNotes: [],
    tags: [],
    followUpDate: null,
    assignedTo: null
  };
  
  versionedClients.push(versionedClient);
  
  if (submissions.length > 1) {
    console.log(`👥 ${versionedClient.primaryName}: ${submissions.length} submissions found`);
  }
});

// Statistics
const totalVersions = versionedClients.reduce((sum, client) => sum + client.totalVersions, 0);
const clientsWithMultipleVersions = versionedClients.filter(c => c.totalVersions > 1).length;

console.log(`\n📈 Migration Results:`);
console.log(`   - Unique clients: ${versionedClients.length}`);
console.log(`   - Total submissions: ${totalVersions}`);
console.log(`   - Clients with multiple submissions: ${clientsWithMultipleVersions}`);
console.log(`   - Average submissions per client: ${(totalVersions / versionedClients.length).toFixed(1)}`);

// Save the new versioned structure
fs.writeFileSync(dataPath, JSON.stringify(versionedClients, null, 2));

console.log('\n✅ Migration completed successfully!');
console.log('📁 New versioned data structure saved to clients.json');
console.log('📁 Original data backed up to clients_pre_version_backup.json');

// Display sample structure
console.log('\n📋 Sample versioned client structure:');
const sampleClient = versionedClients.find(c => c.totalVersions > 1) || versionedClients[0];
console.log(JSON.stringify({
  clientId: sampleClient.clientId,
  primaryName: sampleClient.primaryName,
  totalVersions: sampleClient.totalVersions,
  currentVersion: sampleClient.currentVersion,
  versions: sampleClient.versions.map(v => ({
    versionId: v.versionId,
    timestamp: v.timestamp,
    status: v.status,
    isLatest: v.isLatest,
    firstName: v.data.firstName,
    creditScore: v.data.creditScore
  }))
}, null, 2));

console.log('\n🎉 Version history system is now ready!');
