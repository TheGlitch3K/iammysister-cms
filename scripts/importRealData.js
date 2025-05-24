const fs = require('fs');
const path = require('path');

// Real client data from CSV
const csvData = `Timestamp,First Name,Last Name,Phone ,Email,On a scale of 1-10 How are you doing mentally and emotionally?,What is your current credit score?,Have you reviewed your credit report in the past 12 months?,How often do you incur overdraft fees on your bank account?,Have you been charged late fees on bills or loans in the past 12 months?,Do you currently have a savings account?,"If yes, how much do you have in savings?",What is your current monthly income?,How long have you been employed at your current job?,Have you been continuously employed for the past two years?,"If no, please share the reason (e.g., career change, unemployment, health issues, caregiving responsibilities, etc.).","Do you have multiple sources of income (e.g., side business, part-time job)?","If yes:
What is the approximate amount of additional income you receive from these sources each month?",How often do you receive this additional income?,What assets do you currently own? (Select all that apply),What percentage of your monthly income do you save?,How often do you create a monthly budget and stick to it?,"Have you made any large purchases (over $1,000) in the past 12 months?",Do you currently have a checking account?,"Are you currently using any alternative financial services (e.g., payday loans, check-cashing services)?","If no, what are the primary reasons for not being banked? (Select all that apply)",Other (please specify).,How many people are in your household (including yourself)?,Are you the primary income earner for your household?,"Do you currently receive any financial assistance (e.g., child support, government benefits)?",In what areas could you use more support at the moment?,"Are there items you need for yourself or for your children?(Food, children's clothing, period products, diapers, etc.?",Is there anything else you would like us to know?,Please select one of the following.,"If you are currently pre-approved, under contract or closed please provide your realtor's contact information, lender's information, and property address if applicable.",Realtor Contact Information ,Lender Information,Property Address ,Closing Date,Please Specify,Column 35,Column 1
12/9/2024 12:15:04,Montrice,Miller,3144431367,Montrice314@gmail.com,3,600–699,Yes,1–2 times per month,No,Yes,"$1,000–$5,000","$2,000–$3,999",1–2 years,Yes,,Yes,"$500–$1,000",Monthly,"Car, Investments (stocks, bonds, retirement accounts)",Less than 10%,Never,No,Yes,Yes,Fees are too high.,,2,Yes,Yes,I feel lost and discouraged. Like everything I'm doing is pointless and I'm confused as to what to do next.,I live with my sister and she recently had the kitchen sink removed (it's an old house and being renovated) so there's no way to cook and I've been having to buy take out daily and going to the laundromat. Its draining me financially and I'm frustrated.,"No, thank you for your time. ",,,,,,,,,
1/12/2025 14:45:31,Munirah,May,3143577674,flynini27@gmail.com,7,500–599,Yes,More than 5 times per month,Yes,Yes,Less than $500,"$2,000–$3,999",More than 2 years,Yes,,No,,,"Investments (stocks, bonds, retirement accounts)",Less than 10%,Rarely,No,Yes,Only banks,Don't trust banks.,The options are confusing I use banks but the form is making me fill out why I don't bank. ,3–4,Yes,No,"Career development, mental health, physical health, socializing ",Not currently ,I don't think I've been receiving all communication from IAMS. I was also sent an email stating I haven't completed the program although I received a certificate and there is no reason I wouldn't have completed the program. ,,,,,,,,,
1/12/2025 14:49:53,Jessica,Lee,3149103522,jessicalee314@icloud.com,4,500–599,Yes,1–2 times per month,No,Yes,Less than $500,"$2,000–$3,999",6–12 months,Yes,,No,,,None,Less than 10%,Sometimes,No,Yes,No,Don't meet account minimum requirements.,,3–4,Yes,Yes,Finding resources for housing and transportation ,,"I need assists completing the first time
Home
Buyers I have one class to take ",,,,,,,,,
1/12/2025 15:45:59,India,Davis,6362061386,iaj143@gmail.com,7,500–599,Yes,Never,Yes,Yes,Less than $500,"$2,000–$3,999",Less than 6 months,Yes,Career Change-SSM,Yes,"$500–$1,000","Irregularly (e.g., varies by project or season)",None,Less than 10%,Sometimes,No,Yes,No,Prefer using cash.,,3–4,Yes,Yes,Money Management ,Yes,No,,,,,,,,,
1/12/2025 19:23:53,Dana,Luster,3149346366,Danaluster80@gmail.com,5,700+,Yes,1–2 times per month,No,Yes,Less than $500,"$2,000–$3,999",1–2 years,Yes,,Yes,"$500–$1,000",Bi-weekly,Car,Less than 10%,Sometimes,No,Yes,No,Prefer using cash.,,2,Yes,No,Mental capacity. Coping with personal trauma.,No,"I've enrolled in Harris Stowe College, and I am looking for a new location to start up my child care business. ",,,,,,,,,
1/12/2025 20:49:13,Valerie,Crane,3145024923,danita062@yahoo.com,9,500–599,Yes,1–2 times per month,Yes,Yes,Less than $500,"$2,000–$3,999",6–12 months,Yes,,Yes,Less than $500,Weekly,"Car, Investments (stocks, bonds, retirement accounts)",Less than 10%,Sometimes,No,Yes,No,Prefer using cash.,"Previous question, does not apply.If no, what are the primary reasons for not being banked? (Select all that apply)
*N/A ",3–4,Yes,Yes,"1) Improving credit score: I have reviewed my credit report; however, I have yet to reach out to creditors for reconciliation. 2) General chat about homeownership: Recently discussed financial options with my family, and a few members were willing to ""gift"" the money to reach my goal of homeownership. In this case, how would this usually work? Is this a feasible plan when applying for home loans? ",Childrens clothing: Boy --2 years old (Size 2T-3T) ,"As stated above, I would love to chat with someone regarding inheritance money and/or ""gift"" from family; what are the next steps? ",,,,,,,,,
1/12/2025 22:15:18,Shannon,Johnson,3144796339,Shannonlj18@yahoo.com,2,600–699,Yes,1–2 times per month,No,Yes,Less than $500,"$2,000–$3,999",More than 2 years,Yes,,No,,,None,Less than 10%,Sometimes,No,Yes,No,Fees are too high.,,3–4,Yes,No,At the moment grieving… it's been a journey,No ,I'm not really okay. I've been telling people I'm okay since my sister passed. But the passed three days grief has been kicking my but. I'm at the point where I don't want to be around people or be bothered. I find myself being in complete isolation.,,,,,,,,,
1/13/2025 11:18:46,LaToya,Nelson,3146001190,latoyamnelson@gmail.com,8,600–699,Yes,Never,Yes,Yes,"$1,000–$5,000","$4,000–$5,999",More than 2 years,Yes,,Yes,"$500–$1,000","Irregularly (e.g., varies by project or season)",Car,10%–20%,Always,Yes,Yes,Yes,Prefer using cash.,,3–4,Yes,Yes,My car needed repairs and had to pull from my savings account,"Food, Bedding, and more informs ",I really want to move I need a bigger space my children have outgrown their rooms ,,,,,,,,,
1/16/2025 8:04:49,Michaela,Suarez,3148142260,Michaela.Suarez94@gmail.com,10,600–699,Yes,Never,No,Yes,Less than $500,"$2,000–$3,999",More than 2 years,Yes,,No,Less than $500,Monthly,Car,Less than 10%,Sometimes,No,Yes,No,Prefer using cash.,,3–4,Yes,Yes,None,"Food, Clothing ",No,4 = Planning to Purchase My Home Soon,,,,,,Loooking for a house,,
1/18/2025 17:24:21,Deneice,White,6188230390,Deneice150@gmail.com,6,600–699,Yes,Never,No,Yes,"$1,000–$5,000","$2,000–$3,999",1–2 years,Yes,,No,,,Car,10%–20%,Rarely,Yes,Yes,No,Prefer using cash.,,3–4,Yes,Yes,Budgeting and getting a more secure job.,,Not at this time.,5 = Other (please specify in a text box),,,,,,Working on credit ,,"1/28/25 (Sent BJC Career Connections info)No, I am not in a lease. Outside of fixing my credit I am currently looking for a new job. I am currently working under a grant and it's coming to an end soon. I was looking to purchase a house in the next year or two."
1/27/2025 17:21:34,Valeria,Williams,3145377306,valeria_williams26@hotmail.com,7,500–599,Yes,Never,Yes,Yes,Less than $500,"$2,000–$3,999",More than 2 years,Yes,,Yes,Less than $500,Monthly,None,Less than 10%,Sometimes,No,Yes,No,Don't meet account minimum requirements.,,3–4,Yes,Yes,Credit Building ,,No,5 = Other (please specify in a text box),,,,,,Starting with credit building etc ,,
1/30/2025 9:27:51,Cassandra ,Randolph ,314-986-5821,crandolph314@gmail.com,6,600–699,Yes,Never,Yes,Yes,"$500–$1,000","$4,000–$5,999",More than 2 years,Yes,,No,,,Car,Less than 10%,Sometimes,No,Yes,No,Prefer using cash.,,3–4,Yes,Yes,"Finding a lender and finding a home, closing within the next 45-60 days ",,NO,5 = Other (please specify in a text box),,None ,,,,Researching lenders for pre-approval  ,,`;

// Helper function to parse credit score range
function parseCreditScore(scoreRange) {
  if (!scoreRange || scoreRange === "I don't know my credit score.") return 500;
  if (scoreRange === "Below 500") return 450;
  if (scoreRange === "700+") return 750;
  
  // Extract middle of range (e.g., "600-699" -> 650)
  const match = scoreRange.match(/(\d+)–(\d+)/);
  if (match) {
    const low = parseInt(match[1]);
    const high = parseInt(match[2]);
    return Math.round((low + high) / 2);
  }
  return 500;
}

// Helper function to parse income range
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

// Helper function to parse savings amount
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

// Helper function to parse household size
function parseHouseholdSize(sizeRange) {
  if (!sizeRange) return 1;
  if (sizeRange === "5 or more") return 5;
  
  const match = sizeRange.match(/(\d+)/);
  if (match) {
    return parseInt(match[1]);
  }
  return 1;
}

// Helper function to determine program based on responses
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

// Helper function to determine status
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
  
  // Recent submissions
  const submissionDate = new Date(timestamp);
  const daysSinceSubmission = (new Date() - submissionDate) / (1000 * 60 * 60 * 24);
  
  if (daysSinceSubmission <= 7) {
    return "new";
  }
  
  return "active";
}

// Parse CSV data
function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  const clients = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    
    if (values.length < 10) continue; // Skip incomplete rows
    
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
      id: Date.now() + i, // Simple ID generation
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
  }
  
  return clients;
}

// Convert and save the data
const realClients = parseCSV(csvData);

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Save to clients.json
const clientsPath = path.join(dataDir, 'clients.json');
fs.writeFileSync(clientsPath, JSON.stringify(realClients, null, 2));

console.log(`✅ Successfully imported ${realClients.length} real IAMS alumni!`);
console.log('📄 Data saved to:', clientsPath);

// Display summary
const programCounts = realClients.reduce((acc, client) => {
  acc[client.program] = (acc[client.program] || 0) + 1;
  return acc;
}, {});

const statusCounts = realClients.reduce((acc, client) => {
  acc[client.status] = (acc[client.status] || 0) + 1;
  return acc;
}, {});

console.log('\n📊 Summary:');
console.log('Programs:', programCounts);
console.log('Status:', statusCounts);
console.log('\n🎉 Real IAMS data is now loaded in the platform!');
