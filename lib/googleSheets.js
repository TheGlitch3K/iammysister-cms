// Client data management functions

export async function fetchClients() {
  try {
    const response = await fetch('/api/clients');
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      console.error('Failed to fetch clients:', result.error);
      return [];
    }
  } catch (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
}

export async function saveClient(clientData) {
  try {
    const response = await fetch('/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ client: clientData }),
    });
    
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error || 'Failed to save client');
    }
  } catch (error) {
    console.error('Error saving client:', error);
    throw error;
  }
}

export async function updateClient(clientId, updates) {
  try {
    const response = await fetch('/api/clients', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: clientId, updates }),
    });
    
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error || 'Failed to update client');
    }
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
}

export function calculateStats(clients) {
  if (!clients || clients.length === 0) {
    return {
      total: 0,
      newClients: 0,
      avgCreditScore: 0,
      housingReady: 0,
      avgMentalHealth: 0,
      totalSavings: 0,
      needSupport: 0,
      programStats: {
        homeownership: 0,
        financial: 0,
        entrepreneurship: 0
      }
    };
  }

  const total = clients.length;
  const newClients = clients.filter(c => c.status === 'new').length;
  const avgCreditScore = Math.round(clients.reduce((sum, c) => sum + (c.creditScore || 0), 0) / total);
  const housingReady = clients.filter(c => (c.creditScore || 0) >= 620 && (c.monthlyIncome || 0) >= 3000).length;
  const avgMentalHealth = (clients.reduce((sum, c) => sum + (c.mentalScore || 0), 0) / total).toFixed(1);
  const totalSavings = clients.reduce((sum, c) => sum + (c.savingsAmount || 0), 0);
  const needSupport = clients.filter(c => c.itemsNeeded && c.itemsNeeded !== 'None').length;

  // Program breakdown
  const programStats = {
    homeownership: clients.filter(c => c.program === 'Homeownership').length,
    financial: clients.filter(c => c.program === 'Financial Empowerment').length,
    entrepreneurship: clients.filter(c => c.program === 'Entrepreneurship').length
  };

  return {
    total,
    newClients,
    avgCreditScore,
    housingReady,
    avgMentalHealth,
    totalSavings,
    needSupport,
    programStats
  };
}

export function exportToCSV(clients) {
  if (!clients || clients.length === 0) {
    alert('No data to export');
    return;
  }

  const headers = [
    'Name', 'Email', 'Phone', 'Program', 'Credit Score', 'Monthly Income',
    'Mental Health Score', 'Status', 'Submitted Date', 'Support Needed'
  ];

  const csvData = clients.map(client => [
    `${client.firstName} ${client.lastName}`,
    client.email,
    client.phone,
    client.program,
    client.creditScore,
    client.monthlyIncome,
    client.mentalScore,
    client.status,
    new Date(client.timestamp).toLocaleDateString(),
    client.supportNeeded
  ]);

  const csvContent = [headers, ...csvData]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sisters_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
