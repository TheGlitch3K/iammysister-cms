import { useState, useEffect } from 'react';
import { staticClientData } from '../data/staticClients';

export function useSistersData() {
  const [sisters, setSisters] = useState([]);
  const [filteredSisters, setFilteredSisters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filters, setFilters] = useState({
    status: '',
    program: '',
    creditRange: '',
    incomeRange: '',
    priority: ''
  });

  useEffect(() => {
    loadSisters();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [sisters, searchTerm, filters, sortBy, sortOrder]);

  const loadSisters = async () => {
    try {
      setLoading(true);
      
      // Always use static data for GitHub Pages
      const mappedData = staticClientData.map(client => ({
        ...client,
        mentalScore: client.mentalHealthScore || client.mentalScore,
        createdAt: client.timestamp
      }));
      setSisters(mappedData);
    } catch (error) {
      console.error('Error loading sisters:', error);
      setSisters(staticClientData);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...sisters];

    // Apply filters
    if (searchTerm) {
      filtered = filtered.filter(sister => 
        `${sister.firstName || ''} ${sister.lastName || ''}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sister.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sister.phone || '').includes(searchTerm)
      );
    }

    if (filters.status) {
      filtered = filtered.filter(sister => sister.status === filters.status);
    }

    if (filters.program) {
      filtered = filtered.filter(sister => sister.program === filters.program);
    }

    if (filters.creditRange) {
      const [min, max] = filters.creditRange.split('-').map(Number);
      filtered = filtered.filter(sister => {
        const score = sister.creditScore || 0;
        return max ? (score >= min && score <= max) : score >= min;
      });
    }

    if (filters.incomeRange) {
      const [min, max] = filters.incomeRange.split('-').map(Number);
      filtered = filtered.filter(sister => {
        const income = sister.monthlyIncome || 0;
        return max ? (income >= min && income <= max) : income >= min;
      });
    }

    if (filters.priority) {
      filtered = filtered.filter(sister => {
        const hasUrgentNeeds = sister.itemsNeeded && 
          sister.itemsNeeded !== 'None' && 
          sister.itemsNeeded !== 'No';
        const lowMentalHealth = (sister.mentalScore || 0) <= 3;
        
        switch(filters.priority) {
          case 'urgent':
            return hasUrgentNeeds || lowMentalHealth;
          case 'high':
            return (sister.mentalScore || 0) <= 5;
          case 'normal':
            return (sister.mentalScore || 0) > 5;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch(sortBy) {
        case 'newest':
          aValue = new Date(a.timestamp || a.createdAt || 0);
          bValue = new Date(b.timestamp || b.createdAt || 0);
          break;
        case 'oldest':
          aValue = new Date(a.timestamp || a.createdAt || 0);
          bValue = new Date(b.timestamp || b.createdAt || 0);
          break;
        case 'name':
          aValue = `${a.firstName || ''} ${a.lastName || ''}`.toLowerCase();
          bValue = `${b.firstName || ''} ${b.lastName || ''}`.toLowerCase();
          break;
        case 'creditScore':
          aValue = a.creditScore || 0;
          bValue = b.creditScore || 0;
          break;
        case 'income':
          aValue = a.monthlyIncome || 0;
          bValue = b.monthlyIncome || 0;
          break;
        case 'mentalHealth':
          aValue = a.mentalScore || 0;
          bValue = b.mentalScore || 0;
          break;
        case 'priority':
          const getPriorityScore = (sister) => {
            const hasUrgentNeeds = sister.itemsNeeded && 
              sister.itemsNeeded !== 'None' && 
              sister.itemsNeeded !== 'No';
            const lowMentalHealth = (sister.mentalScore || 0) <= 3;
            const mediumMentalHealth = (sister.mentalScore || 0) <= 5;
            
            if (hasUrgentNeeds || lowMentalHealth) return 3;
            if (mediumMentalHealth) return 2;
            return 1;
          };
          aValue = getPriorityScore(a);
          bValue = getPriorityScore(b);
          break;
        default:
          aValue = 0;
          bValue = 0;
      }

      if (sortBy === 'oldest') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      } else if (sortBy === 'newest') {
        return sortOrder === 'asc' ? bValue - aValue : aValue - bValue;
      } else {
        if (typeof aValue === 'string') {
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
      }
    });

    setFilteredSisters(filtered);
  };

  // Calculate statistics
  const stats = {
    total: sisters.length,
    active: sisters.filter(s => s.status === 'active').length,
    highPriority: sisters.filter(s => {
      const hasUrgentNeeds = s.itemsNeeded && 
        s.itemsNeeded !== 'None' && 
        s.itemsNeeded !== 'No';
      const lowMentalHealth = (s.mentalScore || 0) <= 3;
      return hasUrgentNeeds || lowMentalHealth || s.status === 'high-priority';
    }).length,
    housingReady: sisters.filter(s => 
      (s.creditScore || 0) >= 620 && 
      (s.monthlyIncome || 0) >= 3000
    ).length
  };

  // Utility functions
  const formatLastContact = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getCreditScoreColor = (score) => {
    if (score >= 700) return '#10B981';
    if (score >= 600) return '#F59E0B';
    return '#EF4444';
  };

  // Action handlers
  const sendMessage = (sister) => {
    console.log('Send message to:', sister.email);
  };

  const scheduleFollowUp = (sister) => {
    console.log('Schedule follow-up for:', sister.firstName, sister.lastName);
  };

  return {
    // State
    sisters,
    filteredSisters,
    loading,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filters,
    setFilters,
    stats,
    
    // Functions
    loadSisters,
    formatLastContact,
    getCreditScoreColor,
    sendMessage,
    scheduleFollowUp
  };
}
