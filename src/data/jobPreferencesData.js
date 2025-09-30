export const jobPreferencesData = {
  "IT/Consulting": {
    "Frontend Developer": ["Pune", "Bengaluru", "Hyderabad", "Gurugram"],
    "Backend Developer": ["Pune", "Bengaluru", "Noida"],
    "Full Stack Developer": ["Bengaluru", "Pune", "Hyderabad"],
    "IT Consultant": ["Mumbai", "Gurugram", "Bengaluru"],
    "Tech Intern": ["Mumbai", "Bengaluru", "Noida", "Pune", "Hyderabad"],
    "Software Intern": ["Bengaluru"],
  },
  "Banking & Finance": {
    "Financial Analyst": ["Mumbai", "Gurugram", "Bengaluru"],
    "Accountant": ["Pune", "Mumbai", "Chennai"],
    "Investment Banker": ["Mumbai"],
    "Auditor": ["Mumbai", "Noida", "Gurugram"],
    "Finance Intern": ["Mumbai", "New Delhi"],
  },
  "Manufacturing": {
    "Mechanical Engineer": ["Pune", "Chennai", "Mumbai"],
    "Electrical Engineer": ["Pune", "Bengaluru"],
    "Production Manager": ["Pune", "Gurugram"],
    "Operations Intern": ["Jamshedpur", "Mumbai", "New Delhi"],
  },
  "Conglomerate": {
    "Business Development": ["Mumbai", "Gurugram"],
    "Strategy Manager": ["Mumbai", "Bengaluru"],
    "Operations Head": ["Pune", "Chennai"],
    "Analyst Intern": ["Mumbai"],
    "Business Intern": ["Mumbai"],
  },
  "Energy": {
    "Project Engineer": ["Mumbai", "Hyderabad", "New Delhi"],
    "Renewables Specialist": ["Bengaluru", "Chennai"],
    "Engineering Intern": ["New Delhi", "Gurugram", "Duliajan", "Mumbai"],
  },
  "Telecom": {
    "Network Engineer": ["Noida", "Gurugram", "Bengaluru"],
    "Telecom Analyst": ["Mumbai", "Pune"],
    "Tech Intern": ["Mumbai"],
  },
  "Energy/Oil & Gas": {
    "Petroleum Engineer": ["Mumbai", "Chennai"],
    "Geologist": ["Hyderabad"],
    "Engineering Intern": ["Dehradun"],
  },
  "Energy/Power": {
    "Power Plant Operator": ["Pune", "Mumbai"],
    "Grid Manager": ["Bengaluru", "Noida"],
  },
  "Mining": {
    "Mining Engineer": ["Hyderabad", "Pune"],
    "Geotechnical Engineer": ["Bengaluru"],
    "Operations Intern": ["Udaipur", "Sambalpur", "Singrauli"],
    "Engineering Intern": ["Hyderabad"],
  },
  "FMCG": {
    "Brand Manager": ["Mumbai", "Gurugram"],
    "Market Research Analyst": ["Bengaluru", "Pune"],
    "Supply Chain Manager": ["Mumbai", "Chennai"],
    "Marketing Intern": ["Kolkata", "Mumbai"],
  },
  "Retail": {
    "Store Manager": ["Pune", "Mumbai", "Bengaluru"],
    "Merchandiser": ["Noida", "Gurugram"],
    "E-commerce Specialist": ["Bengaluru", "Hyderabad"],
    "Retail Intern": ["Mumbai"],

  },
};

// --- HELPER FUNCTIONS ---
// These functions read the data object above and format it for the dropdowns.

export const getSectorOptions = () =>
  Object.keys(jobPreferencesData).map(sector => ({ value: sector, label: sector }));

export const getRoleOptions = (sector) => {
  if (!sector || !jobPreferencesData[sector]) return [];
  return Object.keys(jobPreferencesData[sector]).map(role => ({ value: role, label: role }));
};

export const getLocationOptions = (sector, role) => {
  if (!sector || !role || !jobPreferencesData[sector]?.[role]) return [];
  return jobPreferencesData[sector][role].map(location => ({ value: location, label: location }));
};