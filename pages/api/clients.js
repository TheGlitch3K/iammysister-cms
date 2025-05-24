import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'clients.json');

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Load versioned clients from file
function loadVersionedClientsFromFile() {
  ensureDataDirectory();
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading clients from file:', error);
  }
  return [];
}

// Save versioned clients to file
function saveVersionedClientsToFile(clients) {
  ensureDataDirectory();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(clients, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving clients to file:', error);
    return false;
  }
}

// Transform versioned clients to flat structure for API compatibility
function transformToFlatStructure(versionedClients) {
  return versionedClients.map(client => ({
    ...client.currentData,
    clientId: client.clientId,
    totalVersions: client.totalVersions,
    hasVersionHistory: client.totalVersions > 1,
    lastUpdated: client.lastUpdated,
    adminNotes: client.adminNotes,
    tags: client.tags,
    versions: client.versions // Include full version history for admin
  }));
}

// Check if a client already exists by email
function findExistingClient(versionedClients, email, firstName, lastName) {
  const normalizedEmail = (email || '').toLowerCase().trim();
  const normalizedName = `${firstName} ${lastName}`.toLowerCase().trim();
  
  return versionedClients.find(client => {
    const clientEmail = (client.primaryEmail || '').toLowerCase().trim();
    const clientName = client.primaryName.toLowerCase().trim();
    
    return (normalizedEmail && clientEmail === normalizedEmail) || 
           (clientName === normalizedName);
  });
}

// Add new version to existing client
function addVersionToClient(client, newData) {
  const newVersionId = client.totalVersions + 1;
  
  // Mark all existing versions as inactive
  client.versions.forEach(version => {
    version.status = 'inactive';
    version.isLatest = false;
  });
  
  // Create new version
  const newVersion = {
    versionId: newVersionId,
    timestamp: new Date().toISOString(),
    status: 'active',
    isLatest: true,
    submissionSource: 'questionnaire',
    data: {
      ...newData,
      id: Date.now(), // Generate new ID for this version
      version: newVersionId
    }
  };
  
  // Add new version
  client.versions.push(newVersion);
  
  // Update client metadata
  client.totalVersions = newVersionId;
  client.currentVersion = newVersionId;
  client.lastUpdated = newVersion.timestamp;
  client.firstName = newData.firstName;
  client.lastName = newData.lastName;
  client.primaryName = `${newData.firstName} ${newData.lastName}`;
  client.currentData = {
    ...newData,
    version: newVersionId
  };
  
  return client;
}

// Create new versioned client
function createNewVersionedClient(clientData) {
  const clientId = `IAMS-${Date.now()}`;
  
  const versionedClient = {
    clientId: clientId,
    primaryEmail: clientData.email || '',
    primaryName: `${clientData.firstName} ${clientData.lastName}`,
    firstName: clientData.firstName,
    lastName: clientData.lastName,
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    totalVersions: 1,
    currentVersion: 1,
    
    // Current/Latest data for quick access
    currentData: {
      ...clientData,
      version: 1
    },
    
    // All historical versions
    versions: [{
      versionId: 1,
      timestamp: new Date().toISOString(),
      status: 'active',
      isLatest: true,
      submissionSource: 'questionnaire',
      data: {
        ...clientData,
        id: Date.now(),
        version: 1
      }
    }],
    
    // Admin metadata
    adminNotes: [],
    tags: [],
    followUpDate: null,
    assignedTo: null
  };
  
  return versionedClient;
}

// Auto-assign program based on client data
function assignProgram(clientInfo) {
  const supportNeeded = (clientInfo.supportNeeded || '').toLowerCase();

  // Parse credit score from range strings
  let numericCreditScore = 0;
  if (typeof clientInfo.creditScore === 'string') {
    if (clientInfo.creditScore.includes('700+')) numericCreditScore = 720;
    else if (clientInfo.creditScore.includes('600-699')) numericCreditScore = 650;
    else if (clientInfo.creditScore.includes('500-599')) numericCreditScore = 550;
    else if (clientInfo.creditScore.includes('Below 500')) numericCreditScore = 450;
    else numericCreditScore = parseInt(clientInfo.creditScore) || 0;
  } else {
    numericCreditScore = parseFloat(clientInfo.creditScore) || 0;
  }

  // Parse income from range strings
  let numericIncome = 0;
  if (typeof clientInfo.monthlyIncome === 'string') {
    if (clientInfo.monthlyIncome.includes('$6,000+')) numericIncome = 6500;
    else if (clientInfo.monthlyIncome.includes('$4,000-$5,999')) numericIncome = 5000;
    else if (clientInfo.monthlyIncome.includes('$2,000-$3,999')) numericIncome = 3000;
    else if (clientInfo.monthlyIncome.includes('Less than $2,000')) numericIncome = 1500;
    else numericIncome = parseInt(clientInfo.monthlyIncome.replace(/[^0-9]/g, '')) || 0;
  } else {
    numericIncome = parseFloat(clientInfo.monthlyIncome) || 0;
  }

  // Store numeric values for dashboard
  clientInfo.creditScore = numericCreditScore;
  clientInfo.monthlyIncome = numericIncome;

  // Determine status based on data
  let status = 'new';
  if (clientInfo.mentalScore <= 3 || clientInfo.itemsNeeded !== 'None') {
    status = 'high-priority';
  } else if (numericCreditScore >= 620 && numericIncome >= 3000) {
    if (clientInfo.housingStatus && clientInfo.housingStatus.includes('Pre-Approved')) {
      status = 'qualified';
    } else if (clientInfo.housingStatus && clientInfo.housingStatus.includes('Closed')) {
      status = 'graduated';
    } else {
      status = 'active';
    }
  }
  
  clientInfo.status = status;

  // Homeownership criteria
  if (numericCreditScore >= 620 && numericIncome >= 3000) {
    return 'Homeownership';
  }
  
  // Entrepreneurship criteria
  if (supportNeeded.includes('business') || supportNeeded.includes('entrepreneur')) {
    return 'Entrepreneurship';
  }
  
  // Default to Financial Empowerment
  return 'Financial Empowerment';
}

// API route handler
export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const versionedClients = loadVersionedClientsFromFile();
        
        // Transform to flat structure for frontend compatibility
        const flatClients = transformToFlatStructure(versionedClients);
        
        res.status(200).json({
          success: true,
          data: flatClients,
          message: 'Clients loaded successfully'
        });
        break;

      case 'POST':
        const { client: submittedData } = req.body;
        
        if (!submittedData) {
          return res.status(400).json({
            success: false,
            error: 'Client data is required'
          });
        }

        // Load existing versioned clients
        const existingVersionedClients = loadVersionedClientsFromFile();
        
        // Create new client with auto-assigned program and status
        const newClientData = {
          ...submittedData,
          timestamp: new Date().toISOString(),
          program: assignProgram(submittedData),
          // Ensure required fields have defaults
          savingsAmount: submittedData.savingsAmount || 0,
          assets: submittedData.assets || 'None',
          itemsNeeded: submittedData.itemsNeeded || 'None',
          additionalNotes: submittedData.additionalNotes || '',
          housingStatus: submittedData.housingStatus || 'Looking',
          realtorInfo: submittedData.realtorInfo || '',
          lenderInfo: submittedData.lenderInfo || '',
          propertyAddress: submittedData.propertyAddress || '',
          closingDate: submittedData.closingDate || ''
        };

        // Check if client already exists
        const existingClient = findExistingClient(
          existingVersionedClients, 
          submittedData.email, 
          submittedData.firstName, 
          submittedData.lastName
        );

        let updatedClients;
        let responseClient;

        if (existingClient) {
          // Add new version to existing client
          const updatedClient = addVersionToClient(existingClient, newClientData);
          updatedClients = existingVersionedClients.map(c => 
            c.clientId === existingClient.clientId ? updatedClient : c
          );
          responseClient = updatedClient.currentData;
        } else {
          // Create new versioned client
          const newVersionedClient = createNewVersionedClient(newClientData);
          updatedClients = [...existingVersionedClients, newVersionedClient];
          responseClient = newVersionedClient.currentData;
        }
        
        // Save to file
        const saved = saveVersionedClientsToFile(updatedClients);
        
        if (!saved) {
          return res.status(500).json({
            success: false,
            error: 'Failed to save client data'
          });
        }

        res.status(201).json({
          success: true,
          data: responseClient,
          message: existingClient ? 
            'Sister information updated with new submission!' : 
            'Sister added successfully!'
        });
        break;

      case 'PUT':
        const { clientId, updates } = req.body;
        
        if (!clientId || !updates) {
          return res.status(400).json({
            success: false,
            error: 'Client ID and updates are required'
          });
        }

        const allVersionedClients = loadVersionedClientsFromFile();
        const clientIndex = allVersionedClients.findIndex(c => c.clientId === clientId);
        
        if (clientIndex === -1) {
          return res.status(404).json({
            success: false,
            error: 'Client not found'
          });
        }

        // Update client metadata (admin updates)
        const targetClient = allVersionedClients[clientIndex];
        if (updates.adminNotes !== undefined) targetClient.adminNotes = updates.adminNotes;
        if (updates.tags !== undefined) targetClient.tags = updates.tags;
        if (updates.followUpDate !== undefined) targetClient.followUpDate = updates.followUpDate;
        if (updates.assignedTo !== undefined) targetClient.assignedTo = updates.assignedTo;
        
        // Update current data if provided
        if (updates.currentData) {
          targetClient.currentData = { ...targetClient.currentData, ...updates.currentData };
          targetClient.lastUpdated = new Date().toISOString();
          
          // Also update the latest version
          const latestVersion = targetClient.versions.find(v => v.isLatest);
          if (latestVersion) {
            latestVersion.data = { ...latestVersion.data, ...updates.currentData };
          }
        }

        const updateSaved = saveVersionedClientsToFile(allVersionedClients);
        
        if (!updateSaved) {
          return res.status(500).json({
            success: false,
            error: 'Failed to update client data'
          });
        }

        res.status(200).json({
          success: true,
          data: targetClient.currentData,
          message: 'Client updated successfully'
        });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
}
