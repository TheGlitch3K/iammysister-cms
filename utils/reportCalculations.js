import { format, subMonths, subYears, parseISO, isAfter, isBefore } from 'date-fns';
import _ from 'lodash';

export class ReportCalculations {
  constructor(data) {
    this.clients = data.clients || [];
    this.volunteers = data.volunteers || [];
    this.donors = data.donors || [];
    this.financials = data.financials || [];
    this.grants = data.grants || [];
  }

  // Demographic Analysis
  getDemographicBreakdown() {
    const ageGroups = {
      '18-24': 0,
      '25-34': 0,
      '35-44': 0,
      '45-54': 0,
      '55-64': 0,
      '65+': 0,
      'Unknown': 0
    };

    const genderBreakdown = {
      'Female': 0,
      'Male': 0,
      'Non-binary': 0,
      'Prefer not to say': 0,
      'Unknown': 0
    };

    const ethnicityBreakdown = {
      'African American/Black': 0,
      'Hispanic/Latino': 0,
      'White/Caucasian': 0,
      'Asian': 0,
      'Native American': 0,
      'Mixed/Multiracial': 0,
      'Other': 0,
      'Unknown': 0
    };

    this.clients.forEach(client => {
      // Age grouping
      const age = client.age || this.calculateAge(client.birthDate);
      if (age >= 18 && age <= 24) ageGroups['18-24']++;
      else if (age >= 25 && age <= 34) ageGroups['25-34']++;
      else if (age >= 35 && age <= 44) ageGroups['35-44']++;
      else if (age >= 45 && age <= 54) ageGroups['45-54']++;
      else if (age >= 55 && age <= 64) ageGroups['55-64']++;
      else if (age >= 65) ageGroups['65+']++;
      else ageGroups['Unknown']++;

      // Gender
      const gender = client.gender || 'Unknown';
      if (genderBreakdown[gender] !== undefined) {
        genderBreakdown[gender]++;
      } else {
        genderBreakdown['Unknown']++;
      }

      // Ethnicity
      const ethnicity = client.ethnicity || 'Unknown';
      if (ethnicityBreakdown[ethnicity] !== undefined) {
        ethnicityBreakdown[ethnicity]++;
      } else {
        ethnicityBreakdown['Unknown']++;
      }
    });

    return {
      ageGroups,
      genderBreakdown,
      ethnicityBreakdown,
      totalClients: this.clients.length
    };
  }

  // Geographic Analysis
  getGeographicDistribution() {
    const zipCodes = {};
    const counties = {};
    const cities = {};

    this.clients.forEach(client => {
      if (client.zipCode) {
        zipCodes[client.zipCode] = (zipCodes[client.zipCode] || 0) + 1;
      }
      if (client.county) {
        counties[client.county] = (counties[client.county] || 0) + 1;
      }
      if (client.city) {
        cities[client.city] = (cities[client.city] || 0) + 1;
      }
    });

    return {
      zipCodes: Object.entries(zipCodes)
        .map(([zip, count]) => ({ zip, count }))
        .sort((a, b) => b.count - a.count),
      counties: Object.entries(counties)
        .map(([county, count]) => ({ county, count }))
        .sort((a, b) => b.count - a.count),
      cities: Object.entries(cities)
        .map(([city, count]) => ({ city, count }))
        .sort((a, b) => b.count - a.count)
    };
  }

  // Service Volume Analysis
  getServiceVolumeOverTime(dateRange = 12) {
    const months = [];
    const now = new Date();
    
    for (let i = dateRange - 1; i >= 0; i--) {
      const monthDate = subMonths(now, i);
      months.push({
        month: format(monthDate, 'MMM yyyy'),
        date: monthDate,
        intakes: 0,
        followUps: 0,
        sessions: 0,
        resources: 0
      });
    }

    this.clients.forEach(client => {
      const clientDate = parseISO(client.timestamp || client.createdAt);
      const monthIndex = months.findIndex(m => 
        format(clientDate, 'MMM yyyy') === m.month
      );
      
      if (monthIndex !== -1) {
        months[monthIndex].intakes++;
        months[monthIndex].followUps += client.followUps || 0;
        months[monthIndex].sessions += client.programSessions || 0;
        months[monthIndex].resources += client.resourcesProvided || 0;
      }
    });

    return months;
  }

  // Referral Source Analysis
  getReferralSourceAnalysis() {
    const sources = {
      'Self-referral': 0,
      'Partner Agency': 0,
      'Outreach Event': 0,
      'Social Media': 0,
      'Word of Mouth': 0,
      'Healthcare Provider': 0,
      'School/Education': 0,
      'Government Agency': 0,
      'Other': 0,
      'Unknown': 0
    };

    this.clients.forEach(client => {
      const source = client.referralSource || 'Unknown';
      if (sources[source] !== undefined) {
        sources[source]++;
      } else {
        sources['Other']++;
      }
    });

    return Object.entries(sources)
      .map(([source, count]) => ({ source, count, percentage: (count / this.clients.length * 100).toFixed(1) }))
      .sort((a, b) => b.count - a.count);
  }

  // Needs Assessment Summary
  getNeedsAssessmentSummary() {
    const needs = {
      'Housing': 0,
      'Employment': 0,
      'Financial Literacy': 0,
      'Mental Health': 0,
      'Healthcare': 0,
      'Childcare': 0,
      'Transportation': 0,
      'Legal Services': 0,
      'Education': 0,
      'Food Security': 0,
      'Other': 0
    };

    this.clients.forEach(client => {
      const clientNeeds = client.supportNeeded || '';
      const needsArray = clientNeeds.split(',').map(n => n.trim());
      
      needsArray.forEach(need => {
        if (need) {
          const normalizedNeed = this.normalizeNeedCategory(need);
          if (needs[normalizedNeed] !== undefined) {
            needs[normalizedNeed]++;
          } else {
            needs['Other']++;
          }
        }
      });
    });

    return Object.entries(needs)
      .map(([need, count]) => ({ 
        need, 
        count, 
        percentage: (count / this.clients.length * 100).toFixed(1) 
      }))
      .sort((a, b) => b.count - a.count);
  }

  // Outcome Achievement Analysis
  getOutcomeAchievement() {
    const outcomes = {
      '3Month': {
        total: 0,
        jobPlacement: 0,
        stableHousing: 0,
        increasedIncome: 0,
        improvedCredit: 0,
        completedProgram: 0
      },
      '6Month': {
        total: 0,
        jobPlacement: 0,
        stableHousing: 0,
        increasedIncome: 0,
        improvedCredit: 0,
        completedProgram: 0
      },
      '12Month': {
        total: 0,
        jobPlacement: 0,
        stableHousing: 0,
        increasedIncome: 0,
        improvedCredit: 0,
        completedProgram: 0
      }
    };

    this.clients.forEach(client => {
      const clientDate = parseISO(client.timestamp || client.createdAt);
      const threeMonthsAgo = subMonths(new Date(), 3);
      const sixMonthsAgo = subMonths(new Date(), 6);
      const twelveMonthsAgo = subMonths(new Date(), 12);

      if (isBefore(clientDate, threeMonthsAgo)) {
        outcomes['3Month'].total++;
        this.checkOutcomes(client, outcomes['3Month']);
      }
      if (isBefore(clientDate, sixMonthsAgo)) {
        outcomes['6Month'].total++;
        this.checkOutcomes(client, outcomes['6Month']);
      }
      if (isBefore(clientDate, twelveMonthsAgo)) {
        outcomes['12Month'].total++;
        this.checkOutcomes(client, outcomes['12Month']);
      }
    });

    return outcomes;
  }

  // Financial Analysis
  getFinancialAnalysis() {
    const totalBudget = this.financials.reduce((sum, item) => sum + (item.budgetAmount || 0), 0);
    const totalSpent = this.financials.reduce((sum, item) => sum + (item.actualAmount || 0), 0);
    const variance = totalBudget - totalSpent;
    const utilizationRate = totalBudget > 0 ? (totalSpent / totalBudget * 100).toFixed(1) : 0;

    const programExpenses = this.getProgramExpenseBreakdown();
    const costPerClient = this.clients.length > 0 ? (totalSpent / this.clients.length).toFixed(2) : 0;

    return {
      totalBudget,
      totalSpent,
      variance,
      utilizationRate,
      programExpenses,
      costPerClient
    };
  }

  // ROI Analysis
  getROIAnalysis() {
    const totalProgramCost = this.financials.reduce((sum, item) => sum + (item.actualAmount || 0), 0);
    
    // Calculate estimated value created
    const successfulClients = this.clients.filter(c => c.status === 'graduated' || c.status === 'completed');
    const averageIncomeIncrease = this.calculateAverageIncomeIncrease();
    const estimatedAnnualValue = successfulClients.length * averageIncomeIncrease * 12;
    
    const roi = totalProgramCost > 0 ? ((estimatedAnnualValue - totalProgramCost) / totalProgramCost * 100).toFixed(1) : 0;

    return {
      totalInvestment: totalProgramCost,
      estimatedValue: estimatedAnnualValue,
      roi: parseFloat(roi),
      successfulClients: successfulClients.length,
      averageIncomeIncrease
    };
  }

  // Volunteer Engagement Analysis
  getVolunteerEngagement() {
    const totalHours = this.volunteers.reduce((sum, v) => sum + (v.totalHours || 0), 0);
    const averageHoursPerVolunteer = this.volunteers.length > 0 ? (totalHours / this.volunteers.length).toFixed(1) : 0;
    
    const activities = {};
    this.volunteers.forEach(volunteer => {
      const activity = volunteer.primaryActivity || 'General Support';
      activities[activity] = (activities[activity] || 0) + (volunteer.totalHours || 0);
    });

    const demographics = this.getVolunteerDemographics();

    return {
      totalVolunteers: this.volunteers.length,
      totalHours,
      averageHoursPerVolunteer,
      activities: Object.entries(activities).map(([activity, hours]) => ({ activity, hours })),
      demographics,
      estimatedValue: totalHours * 25 // Estimated at $25/hour value
    };
  }

  // Helper Methods
  calculateAge(birthDate) {
    if (!birthDate) return null;
    const birth = parseISO(birthDate);
    const now = new Date();
    return now.getFullYear() - birth.getFullYear();
  }

  normalizeNeedCategory(need) {
    const needLower = need.toLowerCase();
    if (needLower.includes('housing') || needLower.includes('home')) return 'Housing';
    if (needLower.includes('job') || needLower.includes('employment') || needLower.includes('work')) return 'Employment';
    if (needLower.includes('financial') || needLower.includes('money') || needLower.includes('budget')) return 'Financial Literacy';
    if (needLower.includes('mental') || needLower.includes('counseling') || needLower.includes('therapy')) return 'Mental Health';
    if (needLower.includes('health') || needLower.includes('medical')) return 'Healthcare';
    if (needLower.includes('child') || needLower.includes('daycare')) return 'Childcare';
    if (needLower.includes('transport') || needLower.includes('car')) return 'Transportation';
    if (needLower.includes('legal') || needLower.includes('law')) return 'Legal Services';
    if (needLower.includes('education') || needLower.includes('school') || needLower.includes('training')) return 'Education';
    if (needLower.includes('food') || needLower.includes('nutrition')) return 'Food Security';
    return 'Other';
  }

  checkOutcomes(client, outcomeData) {
    if (client.hasJob || client.employmentStatus === 'employed') outcomeData.jobPlacement++;
    if (client.housingStatus === 'stable' || client.hasStableHousing) outcomeData.stableHousing++;
    if (client.incomeIncrease > 0) outcomeData.increasedIncome++;
    if ((client.currentCreditScore || 0) > (client.initialCreditScore || client.creditScore || 0)) outcomeData.improvedCredit++;
    if (client.status === 'graduated' || client.completedProgram) outcomeData.completedProgram++;
  }

  calculateAverageIncomeIncrease() {
    const clientsWithIncrease = this.clients.filter(c => c.incomeIncrease > 0);
    if (clientsWithIncrease.length === 0) return 500; // Default estimate
    return clientsWithIncrease.reduce((sum, c) => sum + c.incomeIncrease, 0) / clientsWithIncrease.length;
  }

  getProgramExpenseBreakdown() {
    const breakdown = {};
    this.financials.forEach(item => {
      const program = item.program || 'General Operations';
      breakdown[program] = (breakdown[program] || 0) + (item.actualAmount || 0);
    });
    return Object.entries(breakdown).map(([program, amount]) => ({ program, amount }));
  }

  getVolunteerDemographics() {
    const ageGroups = { '18-30': 0, '31-50': 0, '51-65': 0, '65+': 0 };
    const skills = {};
    
    this.volunteers.forEach(volunteer => {
      const age = volunteer.age || 0;
      if (age >= 18 && age <= 30) ageGroups['18-30']++;
      else if (age >= 31 && age <= 50) ageGroups['31-50']++;
      else if (age >= 51 && age <= 65) ageGroups['51-65']++;
      else if (age > 65) ageGroups['65+']++;

      if (volunteer.skills) {
        volunteer.skills.forEach(skill => {
          skills[skill] = (skills[skill] || 0) + 1;
        });
      }
    });

    return { ageGroups, skills };
  }

  // Date range filtering
  filterByDateRange(startDate, endDate) {
    const filteredClients = this.clients.filter(client => {
      const clientDate = parseISO(client.timestamp || client.createdAt);
      return isAfter(clientDate, parseISO(startDate)) && isBefore(clientDate, parseISO(endDate));
    });

    return new ReportCalculations({
      clients: filteredClients,
      volunteers: this.volunteers,
      donors: this.donors,
      financials: this.financials,
      grants: this.grants
    });
  }
}

export default ReportCalculations;
