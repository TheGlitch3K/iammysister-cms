const fs = require('fs');
const path = require('path');

// Comprehensive IAMS Data Cleanup Script
console.log('🧹 Starting comprehensive IAMS data cleanup...\n');

// Create backup first
const dataPath = path.join(__dirname, '..', 'data', 'clients.json');
const backupPath = path.join(__dirname, '..', 'data', 'clients_backup.json');

const originalData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
fs.writeFileSync(backupPath, JSON.stringify(originalData, null, 2));
console.log('📦 Created backup at:', backupPath);

// Helper functions
function standardizePhone(phone) {
  if (!phone) return '';
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  // Format as (XXX) XXX-XXXX
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone; // Return original if can't format
}

function standardizeEmail(email) {
  if (!email) return '';
  return email.toLowerCase().trim();
}

function standardizeName(name) {
  if (!name) return '';
  return name.trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function calculateProgram(client) {
  const creditScore = client.creditScore || 0;
  const monthlyIncome = client.monthlyIncome || 0;
  const supportNeeded = (client.supportNeeded || '').toLowerCase();
  const housingStatus = client.housingStatus || '';
  
  // Check if already closed/graduated
  if (housingStatus.includes('Closed') || housingStatus.includes('3 =')) {
    return 'Homeownership';
  }
  
  // Check for explicit homeownership indicators
  if (housingStatus.includes('Pre-Approved') || 
      housingStatus.includes('Planning to Purchase') ||
      housingStatus.includes('Under contract') ||
      housingStatus.includes('1 =') || 
      housingStatus.includes('4 =')) {
    return 'Homeownership';
  }
  
  // Check for entrepreneurship indicators
  if (supportNeeded.includes('business') || 
      supportNeeded.includes('entrepreneur') ||
      supportNeeded.includes('mentorship')) {
    return 'Entrepreneurship';
  }
  
  // Check financial readiness for homeownership
  if (creditScore >= 620 && monthlyIncome >= 3000) {
    return 'Homeownership';
  }
  
  // Default to Financial Empowerment
  return 'Financial Empowerment';
}

function calculateStatus(client) {
  const housingStatus = client.housingStatus || '';
  const mentalScore = client.mentalScore || 5;
  const timestamp = new Date(client.timestamp);
  const now = new Date();
  const daysSinceSubmission = (now - timestamp) / (1000 * 60 * 60 * 24);
  
  // Graduated (closed on home)
  if (housingStatus.includes('Closed') || housingStatus.includes('3 =')) {
    return 'graduated';
  }
  
  // Qualified (pre-approved or under contract)
  if (housingStatus.includes('Pre-Approved') || 
      housingStatus.includes('Under contract') ||
      housingStatus.includes('1 =')) {
    return 'qualified';
  }
  
  // High priority (mental health concerns or urgent needs)
  if (mentalScore <= 3 || 
      (client.itemsNeeded && client.itemsNeeded !== 'None' && client.itemsNeeded !== 'No')) {
    return 'high-priority';
  }
  
  // New submissions (within 30 days)
  if (daysSinceSubmission <= 30) {
    return 'new';
  }
  
  // Default to active
  return 'active';
}

function isCorruptedEntry(client) {
  // Check if firstName contains question text (the main issue)
  const firstName = client.firstName || '';
  return firstName.includes('months?') || 
         firstName.includes('checking account') ||
         firstName.length > 50; // Names shouldn't be this long
}

function isDuplicate(client, allClients, index) {
  const email = client.email.toLowerCase();
  const name = `${client.firstName} ${client.lastName}`.toLowerCase();
  
  // Find other entries with same email or same name
  for (let i = 0; i < allClients.length; i++) {
    if (i === index) continue;
    
    const otherClient = allClients[i];
    const otherEmail = (otherClient.email || '').toLowerCase();
    const otherName = `${otherClient.firstName} ${otherClient.lastName}`.toLowerCase();
    
    if ((email && email === otherEmail) || name === otherName) {
      // Keep the one with more recent timestamp
      const thisTime = new Date(client.timestamp);
      const otherTime = new Date(otherClient.timestamp);
      
      if (thisTime < otherTime) {
        return true; // This one is older, mark as duplicate
      }
    }
  }
  return false;
}

// Start cleanup process
let cleanedClients = [];
let removedCount = 0;
let duplicatesRemoved = 0;

console.log(`📊 Original dataset: ${originalData.length} entries`);

// Phase 1: Remove corrupted entries and duplicates
originalData.forEach((client, index) => {
  if (isCorruptedEntry(client)) {
    console.log(`❌ Removed corrupted entry: ${client.firstName?.substring(0, 50)}...`);
    removedCount++;
    return;
  }
  
  if (isDuplicate(client, originalData, index)) {
    console.log(`🔄 Removed duplicate: ${client.firstName} ${client.lastName}`);
    duplicatesRemoved++;
    return;
  }
  
  cleanedClients.push(client);
});

console.log(`\n🧹 Phase 1 Complete:`);
console.log(`   - Removed ${removedCount} corrupted entries`);
console.log(`   - Removed ${duplicatesRemoved} duplicates`);
console.log(`   - Remaining: ${cleanedClients.length} unique clients\n`);

// Phase 2: Data standardization and enhancement
console.log('🔧 Phase 2: Standardizing data...');

cleanedClients = cleanedClients.map((client, index) => {
  const cleaned = {
    ...client,
    // Standardize basic info
    firstName: standardizeName(client.firstName),
    lastName: standardizeName(client.lastName),
    phone: standardizePhone(client.phone),
    email: standardizeEmail(client.email),
    
    // Ensure numeric fields
    id: client.id || (Date.now() + index),
    mentalScore: parseInt(client.mentalScore) || 5,
    creditScore: parseInt(client.creditScore) || 500,
    monthlyIncome: parseInt(client.monthlyIncome) || 2000,
    savingsAmount: parseInt(client.savingsAmount) || 0,
    householdSize: parseInt(client.householdSize) || 1,
    
    // Fix timestamp
    timestamp: client.timestamp ? new Date(client.timestamp) : new Date(),
    
    // Standardize Yes/No fields
    creditReviewed: client.creditReviewed || 'Yes',
    continuousEmployment: client.continuousEmployment || 'Yes',
    hasSavings: client.hasSavings || 'Yes',
    hasChecking: client.hasChecking || 'Yes',
    primaryEarner: client.primaryEarner || 'Yes',
    
    // Clean text fields
    supportNeeded: client.supportNeeded || '',
    itemsNeeded: client.itemsNeeded || 'None',
    additionalNotes: client.additionalNotes || '',
    
    // Default values for missing fields
    overdraftFreq: client.overdraftFreq || 'Never',
    lateFees: client.lateFees || 'No',
    employmentLength: client.employmentLength || 'More than 2 years',
    multipleIncome: client.multipleIncome || 'No',
    assets: client.assets || 'None',
    savingsPercentage: client.savingsPercentage || 'Less than 10%',
    budgetFrequency: client.budgetFrequency || 'Sometimes',
    largePurchases: client.largePurchases || 'No',
    altFinancial: client.altFinancial || 'No',
    financialAssist: client.financialAssist || 'No',
    housingStatus: client.housingStatus || '',
    realtorInfo: client.realtorInfo || '',
    lenderInfo: client.lenderInfo || '',
    propertyAddress: client.propertyAddress || '',
    closingDate: client.closingDate || ''
  };
  
  // Recalculate program and status
  cleaned.program = calculateProgram(cleaned);
  cleaned.status = calculateStatus(cleaned);
  
  return cleaned;
});

// Phase 3: Final validation and summary
console.log('✅ Phase 3: Final validation...');

const finalStats = {
  total: cleanedClients.length,
  programs: {},
  statuses: {}
};

cleanedClients.forEach(client => {
  finalStats.programs[client.program] = (finalStats.programs[client.program] || 0) + 1;
  finalStats.statuses[client.status] = (finalStats.statuses[client.status] || 0) + 1;
});

// Save cleaned data
fs.writeFileSync(dataPath, JSON.stringify(cleanedClients, null, 2));

console.log('\n🎉 CLEANUP COMPLETE!');
console.log(`📊 Final dataset: ${finalStats.total} clean entries`);
console.log(`📈 Reduction: ${originalData.length - finalStats.total} entries removed`);
console.log('\n📋 Program Distribution:');
Object.entries(finalStats.programs).forEach(([program, count]) => {
  console.log(`   - ${program}: ${count}`);
});
console.log('\n🎯 Status Distribution:');
Object.entries(finalStats.statuses).forEach(([status, count]) => {
  console.log(`   - ${status}: ${count}`);
});

console.log('\n✨ Sample cleaned entries:');
cleanedClients.slice(0, 5).forEach(client => {
  console.log(`   👤 ${client.firstName} ${client.lastName} (${client.program}) - ${client.status}`);
});

console.log('\n🔄 Data has been cleaned and saved!');
console.log('📁 Original data backed up to: clients_backup.json');
