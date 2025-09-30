// This is the detailed source data you provided.
const allAvailableStudents = [
  { id: 'STU-001', name: 'Rohan Verma', email: 'rohan.verma@example.com', appliedFor: { role: 'Frontend Developer', sector: 'IT/Consulting' }, skills: ['React.js', 'JavaScript', 'HTML/CSS'], status: 'Accepted' },
  { id: 'STU-002', name: 'Priya Sharma', email: 'priya.sharma@example.com', appliedFor: { role: 'Backend Developer', sector: 'IT/Consulting' }, skills: ['Node.js', 'MongoDB', 'SQL', 'AWS'], status: 'Pending' },
  { id: 'STU-003', name: 'Amit Kumar', email: 'amit.kumar@example.com', appliedFor: { role: 'Financial Analyst', sector: 'Banking & Finance' }, skills: ['Excel', 'Financial Modeling', 'SQL'], status: 'Pending' },
  { id: 'STU-004', name: 'Sneha Patil', email: 'sneha.patil@example.com', appliedFor: { role: 'Mechanical Engineer', sector: 'Manufacturing' }, skills: ['AutoCAD', 'SolidWorks', 'Project Management'], status: 'Rejected' },
  { id: 'STU-005', name: 'Arjun Reddy', email: 'arjun.reddy@example.com', appliedFor: { role: 'Full Stack Developer', sector: 'IT/Consulting' }, skills: ['React.js', 'Node.js', 'MongoDB'], status: 'Pending' },
  { id: 'STU-006', name: 'Ananya Singh', email: 'ananya.singh@example.com', appliedFor: { role: 'Accountant', sector: 'Banking & Finance' }, skills: ['Excel', 'Tally', 'Communication skills'], status: 'Pending' },
  { id: 'STU-007', name: 'Vikram Rathore', email: 'vikram.rathore@example.com', appliedFor: { role: 'Production Manager', sector: 'Manufacturing' }, skills: ['Operational management', 'Six Sigma', 'Teamwork'], status: 'Accepted' },
  { id: 'STU-008', name: 'Meera Desai', email: 'meera.desai@example.com', appliedFor: { role: 'Business Development', sector: 'Conglomerate' }, skills: ['Business strategy', 'Leadership', 'Negotiation'], status: 'Pending' },
  { id: 'STU-009', name: 'Siddharth Iyer', email: 'siddharth.iyer@example.com', appliedFor: { role: 'Project Engineer', sector: 'Energy' }, skills: ['Project Management', 'AutoCAD', 'Technical skills'], status: 'Rejected' },
  { id: 'STU-010', name: 'Kavya Nair', email: 'kavya.nair@example.com', appliedFor: { role: 'Network Engineer', sector: 'Telecom' }, skills: ['Cisco', 'Routing', 'Switching'], status: 'Pending' },
  { id: 'STU-011', name: 'Rohan Gupta', email: 'rohan.gupta@example.com', appliedFor: { role: 'Petroleum Engineer', sector: 'Energy/Oil & Gas' }, skills: ['Petrel', 'GIS', 'Geology'], status: 'Accepted' },
  { id: 'STU-012', name: 'Diya Mehta', email: 'diya.mehta@example.com', appliedFor: { role: 'Grid Manager', sector: 'Energy/Power' }, skills: ['Power Systems', 'SCADA', 'Analytical thinking'], status: 'Pending' },
  { id: 'STU-013', name: 'Aditya Joshi', email: 'aditya.joshi@example.com', appliedFor: { role: 'Mining Engineer', sector: 'Mining' }, skills: ['Mine Planning', 'Ventilation', 'Safety Management'], status: 'Pending' },
  { id: 'STU-014', name: 'Zara Khan', email: 'zara.khan@example.com', appliedFor: { role: 'Brand Manager', sector: 'FMCG' }, skills: ['Marketing strategy', 'Digital marketing', 'Creativity'], status: 'Accepted' },
  { id: 'STU-015', name: 'Kabir Malhotra', email: 'kabir.malhotra@example.com', appliedFor: { role: 'Store Manager', sector: 'Retail' }, skills: ['Retail management', 'Customer service', 'Inventory Control'], status: 'Pending' },
  { id: 'STU-016', name: 'Aisha Begum', email: 'aisha.begum@example.com', appliedFor: { role: 'QA Engineer', sector: 'IT/Consulting' }, skills: ['Selenium', 'JIRA', 'SQL', 'Attention to detail'], status: 'Rejected' },
  { id: 'STU-017', name: 'Ishaan Patel', email: 'ishaan.patel@example.com', appliedFor: { role: 'Investment Banker', sector: 'Banking & Finance' }, skills: ['Valuation', 'Financial modeling', 'M&A'], status: 'Pending' },
  { id: 'STU-018', name: 'Neha Reddy', email: 'neha.reddy@example.com', appliedFor: { role: 'Supply Chain Manager', sector: 'Manufacturing' }, skills: ['Logistics', 'Procurement', 'SAP'], status: 'Pending' },
  { id: 'STU-019', name: 'Aryan Das', email: 'aryan.das@example.com', appliedFor: { role: 'Data Scientist', sector: 'IT/Consulting' }, skills: ['Python', 'Machine Learning', 'Tableau', 'SQL'], status: 'Accepted' },
  { id: 'STU-020', name: 'Fatima Ali', email: 'fatima.ali@example.com', appliedFor: { role: 'Market Research Analyst', sector: 'FMCG' }, skills: ['Data analysis', 'Statistics', 'Surveys'], status: 'Pending' },
  { id: 'STU-021', name: 'Raj Kumar', email: 'raj.kumar@example.com', appliedFor: { role: 'Telecom Analyst', sector: 'Telecom' }, skills: ['5G', 'Market Analysis', 'Communication skills'], status: 'Pending' },
  { id: 'STU-022', name: 'Pooja Singh', email: 'pooja.singh@example.com', appliedFor: { role: 'Geotechnical Engineer', sector: 'Mining' }, skills: ['Soil Mechanics', 'AutoCAD', 'Technical skills'], status: 'Rejected' },
  { id: 'STU-023', name: 'Samir Jain', email: 'samir.jain@example.com', appliedFor: { role: 'E-commerce Specialist', sector: 'Retail' }, skills: ['SEO', 'Digital marketing', 'Shopify'], status: 'Pending' },
  { id: 'STU-024', name: 'Riya Chatterjee', email: 'riya.chatterjee@example.com', appliedFor: { role: 'IT Consultant', sector: 'IT/Consulting' }, skills: ['Business Analysis', 'Cloud Computing', 'Leadership'], status: 'Accepted' },
];

// This function transforms the list above into the format needed for the Admin Dashboard.
const transformedStudents = allAvailableStudents.map((student, index) => {
  // Create a primary preference from the student's 'appliedFor' data
  const primaryPreference = {
    sector: { label: student.appliedFor.sector },
    role: { label: student.appliedFor.role },
    location: { label: 'Pune' } // Add a placeholder location
  };
  
  // Create a diverse second preference for some students to make analytics more interesting
  let secondaryPreference = null;
  if (index % 3 === 0 && student.appliedFor.sector !== 'Banking & Finance') {
    secondaryPreference = {
        sector: { label: 'Banking & Finance' },
        role: { label: 'Financial Analyst' },
        location: { label: 'Mumbai' }
    };
  }

  return {
    id: index + 1,
    fullName: student.name,
    studentMobile: `98765432${10 + index}`, // Generate a unique placeholder mobile number
    preferences: [primaryPreference, secondaryPreference].filter(Boolean) // Add primary and secondary (if it exists)
  };
});

// The final, transformed list is exported for the Admin Dashboard to use.
export const onboardedStudents = transformedStudents;