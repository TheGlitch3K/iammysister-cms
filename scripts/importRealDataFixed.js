const fs = require('fs');
const path = require('path');

// Read the actual CSV file
const csvPath = path.join(__dirname, '..', 'Copy of Copy of IAMS Alumni Check-In (Responses).xlsx - Form Responses 1.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');

// Better CSV parser that handles quoted fields
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

// Helper functions for data conversion
function parseCreditScore(scoreRange) {
  if (!scoreRange || scoreRange === "I don't know my credit score.") return 500;
  if (scoreRange === "Below 500") return 450;
  if (scoreRange === "700+") return 750;
  
  const match = scoreRange.match(/(\d+)–(\d+)/);
  if (match) {
    const low = parseInt(match[1]);
    const high = parseInt(match[2]);
    return Math.round((low + high) / 2);
  }
  return 500;
}

function parseIncome(incomeRange) {
  if (!incomeRange) return 2000;
  if (incomeRange === "Less than $2,000") return 1500;
  
  const match = incomeRange.match(/\$(\d+,?\d*?)–\$(\d+,?\d*)/);
  if (match) {
    const low = parseInt(match[1].replace(',', ''));
    const high = parseInt(match[2].replace(',', ''));
    return Math.round((low + high) / 2);
  }
  return 2000;
}

function parseSavings(savingsRange) {
  if (!savingsRange || savingsRange === "Less than $500") return 250;
  
  const match = savingsRange.match(/\$(\d+,?\d*?)–\$(\d+,?\d*)/);
  if (match) {
    const low = parseInt(match[1].replace(',', ''));
    const high = parseInt(match[2].replace(',', ''));
    return Math.round((low + high) / 2);
  }
  return 0;
}

function parseHouseholdSize(sizeRange) {
  if (!sizeRange) return 1;
  if (sizeRange === "5 or more") return 5;
  
  const match = sizeRange.match(/(\d+)/);
  if (match) {
    return parseInt(match[1]);
  }
  return 1;
}

function determineProgram(housingStatus, supportNeeded, creditScore, income) {
  if (housingStatus && (
    housingStatus.includes("Pre-Approved") || 
    housingStatus.includes("Planning to Purchase") ||
    housingStatus.includes("Closed")
  )) {
    return "Homeownership";
  }
  
  if (supportNeeded && supportNeeded.toLowerCase().includes("business")) {
    return "Entrepreneurship";
  }
  
  if (creditScore >= 620 && income >= 3000) {
    return "Homeownership";
  }
  
  return "Financial Empowerment";
}

function determineStatus(housingStatus, mentalScore, timestamp) {
  if (housingStatus && housingStatus.includes("Closed")) {
    return "graduated";
  }
  
  if (housingStatus && (housingStatus.includes("Pre-Approved") || housingStatus.includes("Under contract"))) {
    return "qualified";
  }
  
  if (mentalScore <= 3) {
    return "high-priority";
  }
  
  const submissionDate = new Date(timestamp);
  const daysSinceSubmission = (new Date() - submissionDate) / (1000 * 60 * 60 * 24);
  
  if (daysSinceSubmission <= 30) {
    return "new";
  }
  
  return "active";
}

// Parse the CSV content
const lines = csvContent.trim().split('\n');
const headers = parseCSVLine(lines[0]);
const clients = [];

console.log('Headers found:', headers.length);
console.log('First few headers:', headers.slice(0, 10));

for (let i = 1; i < lines.length; i++) {
  const values = parseCSVLine(lines[i]);
  
  if (values.length < 10 || !values[1] || !values[2]) continue; // Skip incomplete rows
  
  try {
    const timestamp = new Date(values[0]);
    const firstName = values[1];
    const lastName = values[2];
    const phone = values[3];
    const email = values[4];
    const mentalScore = parseInt(values[5]) || 5;
    const creditScoreRange = values[6];
    const creditScore = parseCreditScore(creditScoreRange);
    const incomeRange = values[12];
    const monthlyIncome = parseIncome(incomeRange);
    const savingsRange = values[11];
    const savingsAmount = parseSavings(savingsRange);
    const householdSizeRange = values[27];
    const householdSize = parseHouseholdSize(householdSizeRange);
    const supportNeeded = values[30] || '';
    const itemsNeeded = values[31] || 'None';
    const additionalNotes = values[32] || '';
    const housingStatus = values[33] || '';
    const realtorInfo = values[35] || '';
    const lenderInfo = values[36] || '';
    const propertyAddress = values[37] || '';
    const closingDate = values[38] || '';
    
    const program = determineProgram(housingStatus, supportNeeded, creditScore, monthlyIncome);
    const status = determineStatus(housingStatus, mentalScore, timestamp);
    
    const client = {
      id: Date.now() + i,
      timestamp: timestamp,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      mentalScore: mentalScore,
      creditScore: creditScore,
      creditReviewed: values[7] || 'Yes',
      overdraftFreq: values[8] || 'Never',
      lateFees: values[9] || 'No',
      hasSavings: values[10] || 'Yes',
      savingsAmount: savingsAmount,
      monthlyIncome: monthlyIncome,
      employmentLength: values[13] || 'More than 2 years',
      continuousEmployment: values[14] || 'Yes',
      multipleIncome: values[16] || 'No',
      assets: values[19] || 'None',
      savingsPercentage: values[20] || 'Less than 10%',
      budgetFrequency: values[21] || 'Sometimes',
      largePurchases: values[22] || 'No',
      hasChecking: values[23] || 'Yes',
      altFinancial: values[24] || 'No',
      householdSize: householdSize,
      primaryEarner: values[28] || 'Yes',
      financialAssist: values[29] || 'No',
      supportNeeded: supportNeeded,
      itemsNeeded: itemsNeeded,
      additionalNotes: additionalNotes,
      housingStatus: housingStatus,
      realtorInfo: realtorInfo,
      lenderInfo: lenderInfo,
      propertyAddress: propertyAddress,
      closingDate: closingDate,
      program: program,
      status: status
    };
    
    clients.push(client);
    console.log(`✅ Processed: ${firstName} ${lastName} - ${program}`);
    
  } catch (error) {
    console.log(`❌ Error processing row ${i}:`, error.message);
  }
}

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Save to clients.json
const clientsPath = path.join(dataDir, 'clients.json');
fs.writeFileSync(clientsPath, JSON.stringify(clients, null, 2));

console.log(`\n🎉 Successfully imported ${clients.length} real IAMS alumni!`);
console.log('📄 Data saved to:', clientsPath);

// Display summary
const programCounts = clients.reduce((acc, client) => {
  acc[client.program] = (acc[client.program] || 0) + 1;
  return acc;
}, {});

const statusCounts = clients.reduce((acc, client) => {
  acc[client.status] = (acc[client.status] || 0) + 1;
  return acc;
}, {});

console.log('\n📊 Summary:');
console.log('Programs:', programCounts);
console.log('Status:', statusCounts);

// Show some sample names
console.log('\n👥 Sample Alumni:');
clients.slice(0, 5).forEach(client => {
  console.log(`- ${client.firstName} ${client.lastName} (${client.program})`);
});

console.log('\n🎉 Real IAMS data is now loaded in the platform!');
