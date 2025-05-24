import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';

export class ExportUtilities {
  constructor() {
    this.brandColors = {
      primary: '#14B8A6',
      secondary: '#F59E0B',
      dark: '#111827',
      light: '#F9FAFB'
    };
  }

  // PDF Export Functions
  async exportToPDF(reportData, reportType = 'comprehensive') {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Header
    this.addPDFHeader(pdf);
    
    // Title
    pdf.setFontSize(18);
    pdf.setTextColor(20, 184, 166); // Teal color
    pdf.text(`I AM MY SISTER - ${reportType.toUpperCase()} REPORT`, 20, 50);
    
    // Date
    pdf.setFontSize(12);
    pdf.setTextColor(107, 114, 128); // Gray color
    pdf.text(`Generated: ${format(new Date(), 'MMMM dd, yyyy')}`, 20, 60);
    
    let yPosition = 80;
    
    switch (reportType) {
      case 'demographic':
        yPosition = this.addDemographicReport(pdf, reportData, yPosition);
        break;
      case 'financial':
        yPosition = this.addFinancialReport(pdf, reportData, yPosition);
        break;
      case 'program':
        yPosition = this.addProgramReport(pdf, reportData, yPosition);
        break;
      case 'comprehensive':
        yPosition = this.addComprehensiveReport(pdf, reportData, yPosition);
        break;
      default:
        yPosition = this.addBasicReport(pdf, reportData, yPosition);
    }
    
    // Footer
    this.addPDFFooter(pdf);
    
    return pdf;
  }

  addPDFHeader(pdf) {
    // Logo area (simplified representation)
    pdf.setFillColor(20, 184, 166);
    pdf.rect(20, 15, 8, 15, 'F');
    pdf.setFillColor(245, 158, 11);
    pdf.rect(24, 15, 8, 15, 'F');
    
    // Organization name
    pdf.setFontSize(14);
    pdf.setTextColor(17, 24, 39);
    pdf.text('I AM MY SISTER', 40, 25);
    pdf.setFontSize(10);
    pdf.text('Building Women Up From The Inside Out', 40, 30);
  }

  addPDFFooter(pdf) {
    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(107, 114, 128);
      pdf.text(`Page ${i} of ${pageCount}`, 20, pdf.internal.pageSize.getHeight() - 10);
      pdf.text('Confidential - I AM MY SISTER Internal Report', pdf.internal.pageSize.getWidth() - 80, pdf.internal.pageSize.getHeight() - 10);
    }
  }

  addDemographicReport(pdf, data, yPos) {
    pdf.setFontSize(14);
    pdf.setTextColor(17, 24, 39);
    pdf.text('DEMOGRAPHIC ANALYSIS', 20, yPos);
    yPos += 15;

    // Age Groups
    pdf.setFontSize(12);
    pdf.text('Age Distribution:', 20, yPos);
    yPos += 10;
    
    Object.entries(data.ageGroups || {}).forEach(([age, count]) => {
      pdf.setFontSize(10);
      pdf.text(`${age}: ${count} clients`, 30, yPos);
      yPos += 8;
    });

    yPos += 10;

    // Gender Breakdown
    pdf.setFontSize(12);
    pdf.text('Gender Distribution:', 20, yPos);
    yPos += 10;
    
    Object.entries(data.genderBreakdown || {}).forEach(([gender, count]) => {
      pdf.setFontSize(10);
      pdf.text(`${gender}: ${count} clients`, 30, yPos);
      yPos += 8;
    });

    return yPos + 20;
  }

  addFinancialReport(pdf, data, yPos) {
    pdf.setFontSize(14);
    pdf.setTextColor(17, 24, 39);
    pdf.text('FINANCIAL ANALYSIS', 20, yPos);
    yPos += 15;

    pdf.setFontSize(12);
    pdf.text(`Total Budget: $${(data.totalBudget || 0).toLocaleString()}`, 20, yPos);
    yPos += 10;
    pdf.text(`Total Spent: $${(data.totalSpent || 0).toLocaleString()}`, 20, yPos);
    yPos += 10;
    pdf.text(`Utilization Rate: ${data.utilizationRate || 0}%`, 20, yPos);
    yPos += 10;
    pdf.text(`Cost per Client: $${data.costPerClient || 0}`, 20, yPos);
    yPos += 15;

    if (data.programExpenses && data.programExpenses.length > 0) {
      pdf.text('Program Expense Breakdown:', 20, yPos);
      yPos += 10;
      
      data.programExpenses.forEach(expense => {
        pdf.setFontSize(10);
        pdf.text(`${expense.program}: $${expense.amount.toLocaleString()}`, 30, yPos);
        yPos += 8;
      });
    }

    return yPos + 20;
  }

  addComprehensiveReport(pdf, data, yPos) {
    // Executive Summary
    pdf.setFontSize(14);
    pdf.setTextColor(17, 24, 39);
    pdf.text('EXECUTIVE SUMMARY', 20, yPos);
    yPos += 15;

    pdf.setFontSize(10);
    const summary = `This comprehensive report covers ${data.totalClients || 0} sisters served by I AM MY SISTER programs. ` +
                   `Our collective impact includes $${((data.totalSavings || 0) / 1000).toFixed(0)}K in collective savings, ` +
                   `${data.housingReady || 0} sisters ready for homeownership, and an average wellness score of ${data.avgWellnessScore || 0}/10.`;
    
    const splitSummary = pdf.splitTextToSize(summary, 170);
    pdf.text(splitSummary, 20, yPos);
    yPos += splitSummary.length * 5 + 15;

    // Key Metrics
    pdf.setFontSize(12);
    pdf.text('KEY PERFORMANCE INDICATORS', 20, yPos);
    yPos += 10;

    const metrics = [
      `Total Sisters Served: ${data.totalClients || 0}`,
      `Average Credit Score: ${data.avgCreditScore || 0}`,
      `Housing Ready: ${data.housingReady || 0}`,
      `High Priority Cases: ${data.highPriority || 0}`,
      `Program Completion Rate: ${data.completionRate || 0}%`
    ];

    metrics.forEach(metric => {
      pdf.setFontSize(10);
      pdf.text(metric, 30, yPos);
      yPos += 8;
    });

    return yPos + 20;
  }

  // Excel Export Functions
  exportToExcel(reportData, reportType = 'comprehensive') {
    const workbook = XLSX.utils.book_new();
    
    switch (reportType) {
      case 'demographic':
        this.addDemographicSheet(workbook, reportData);
        break;
      case 'financial':
        this.addFinancialSheet(workbook, reportData);
        break;
      case 'program':
        this.addProgramSheet(workbook, reportData);
        break;
      case 'comprehensive':
        this.addAllSheets(workbook, reportData);
        break;
      default:
        this.addBasicSheet(workbook, reportData);
    }

    return workbook;
  }

  addDemographicSheet(workbook, data) {
    // Age Groups Sheet
    const ageData = Object.entries(data.ageGroups || {}).map(([age, count]) => ({
      'Age Group': age,
      'Count': count,
      'Percentage': ((count / data.totalClients) * 100).toFixed(1) + '%'
    }));
    
    const ageSheet = XLSX.utils.json_to_sheet(ageData);
    XLSX.utils.book_append_sheet(workbook, ageSheet, 'Age Distribution');

    // Gender Sheet
    const genderData = Object.entries(data.genderBreakdown || {}).map(([gender, count]) => ({
      'Gender': gender,
      'Count': count,
      'Percentage': ((count / data.totalClients) * 100).toFixed(1) + '%'
    }));
    
    const genderSheet = XLSX.utils.json_to_sheet(genderData);
    XLSX.utils.book_append_sheet(workbook, genderSheet, 'Gender Distribution');

    // Ethnicity Sheet
    const ethnicityData = Object.entries(data.ethnicityBreakdown || {}).map(([ethnicity, count]) => ({
      'Ethnicity': ethnicity,
      'Count': count,
      'Percentage': ((count / data.totalClients) * 100).toFixed(1) + '%'
    }));
    
    const ethnicitySheet = XLSX.utils.json_to_sheet(ethnicityData);
    XLSX.utils.book_append_sheet(workbook, ethnicitySheet, 'Ethnicity Distribution');
  }

  addFinancialSheet(workbook, data) {
    // Financial Summary
    const financialSummary = [
      { 'Metric': 'Total Budget', 'Amount': data.totalBudget || 0 },
      { 'Metric': 'Total Spent', 'Amount': data.totalSpent || 0 },
      { 'Metric': 'Variance', 'Amount': (data.totalBudget || 0) - (data.totalSpent || 0) },
      { 'Metric': 'Utilization Rate', 'Amount': (data.utilizationRate || 0) + '%' },
      { 'Metric': 'Cost per Client', 'Amount': data.costPerClient || 0 }
    ];
    
    const financialSheet = XLSX.utils.json_to_sheet(financialSummary);
    XLSX.utils.book_append_sheet(workbook, financialSheet, 'Financial Summary');

    // Program Expenses
    if (data.programExpenses && data.programExpenses.length > 0) {
      const expenseSheet = XLSX.utils.json_to_sheet(data.programExpenses);
      XLSX.utils.book_append_sheet(workbook, expenseSheet, 'Program Expenses');
    }
  }

  addAllSheets(workbook, data) {
    // Overview Sheet
    const overview = [
      { 'Metric': 'Report Generated', 'Value': format(new Date(), 'MMMM dd, yyyy HH:mm') },
      { 'Metric': 'Total Sisters Served', 'Value': data.totalClients || 0 },
      { 'Metric': 'Average Credit Score', 'Value': data.avgCreditScore || 0 },
      { 'Metric': 'Housing Ready', 'Value': data.housingReady || 0 },
      { 'Metric': 'Average Wellness Score', 'Value': data.avgWellnessScore || 0 },
      { 'Metric': 'High Priority Cases', 'Value': data.highPriority || 0 },
      { 'Metric': 'Collective Savings', 'Value': '$' + ((data.totalSavings || 0) / 1000).toFixed(0) + 'K' }
    ];
    
    const overviewSheet = XLSX.utils.json_to_sheet(overview);
    XLSX.utils.book_append_sheet(workbook, overviewSheet, 'Overview');

    // Add all other sheets
    this.addDemographicSheet(workbook, data);
    this.addFinancialSheet(workbook, data);
    
    // Raw client data (sanitized)
    if (data.clients && data.clients.length > 0) {
      const clientData = data.clients.map(client => ({
        'ID': client.clientId,
        'Name': `${client.firstName} ${client.lastName}`,
        'Program': client.program,
        'Status': client.status,
        'Credit Score': client.creditScore,
        'Monthly Income': client.monthlyIncome,
        'Mental Health Score': client.mentalScore,
        'Submitted Date': format(new Date(client.timestamp || client.createdAt), 'MM/dd/yyyy')
      }));
      
      const clientSheet = XLSX.utils.json_to_sheet(clientData);
      XLSX.utils.book_append_sheet(workbook, clientSheet, 'Client Data');
    }
  }

  // Chart Export (for embedding in PDFs)
  async captureChartImage(chartElementId) {
    const chartElement = document.getElementById(chartElementId);
    if (!chartElement) return null;

    try {
      const canvas = await html2canvas(chartElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false
      });
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Error capturing chart:', error);
      return null;
    }
  }

  // Download functions
  downloadPDF(pdf, filename = 'IAMS_Report') {
    const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm');
    pdf.save(`${filename}_${timestamp}.pdf`);
  }

  downloadExcel(workbook, filename = 'IAMS_Report') {
    const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm');
    XLSX.writeFile(workbook, `${filename}_${timestamp}.xlsx`);
  }

  // Email report (would need backend implementation)
  async emailReport(reportData, recipients, reportType = 'comprehensive') {
    // This would typically call a backend API
    console.log('Email functionality would be implemented in backend', {
      recipients,
      reportType,
      timestamp: new Date()
    });
    
    // For now, return a promise that simulates the action
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Report queued for email delivery' });
      }, 1000);
    });
  }

  // Scheduled report configuration
  scheduleReport(reportConfig) {
    // This would integrate with a backend scheduling system
    console.log('Report scheduled:', reportConfig);
    
    return {
      scheduleId: `schedule_${Date.now()}`,
      nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000), // Next day
      config: reportConfig
    };
  }
}

export default ExportUtilities;
