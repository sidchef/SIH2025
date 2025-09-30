// This is the source data you provided.
const companyJobs = [
  { companyName: "Reliance Industries Limited", sector: "Conglomerate", location: "Mumbai, Maharashtra", roleType: "Analyst Intern", education: "UG/Diploma", skills: ["Analytical thinking", "data analysis", "communication skills"] },
  { companyName: "Tata Consultancy Services (TCS)", sector: "IT/Consulting", location: "Mumbai, Maharashtra", roleType: "Tech Intern", education: "UG/PG", skills: ["Java", "Python", "SQL", "problem-solving", "teamwork", "communication"] },
  { companyName: "HDFC Bank Limited", sector: "Banking & Finance", location: "Mumbai, Maharashtra", roleType: "Finance Intern", education: "UG/PG", skills: ["Excel", "financial modeling", "communication", "attention to detail"] },
  { companyName: "Oil and Natural Gas Corporation Ltd", sector: "Energy/Oil & Gas", location: "Dehradun, Uttarakhand", roleType: "Engineering Intern", education: "UG/Diploma", skills: ["Technical skills", "problem-solving", "teamwork", "AutoCAD", "GIS"] },
  { companyName: "Infosys Limited", sector: "IT/Consulting", location: "Bengaluru, Karnataka", roleType: "Software Intern", education: "UG/PG", skills: ["Java", "Python", "C++", "web development (HTML, CSS, JS)", "communication"] },
  { companyName: "NTPC Limited", sector: "Energy", location: "New Delhi, Delhi", roleType: "Engineering Intern", education: "UG/Diploma", skills: ["Technical skills", "problem-solving", "teamwork", "operational management"] },
  { companyName: "Tata Steel Limited", sector: "Manufacturing", location: "Jamshedpur, Jharkhand", roleType: "Operations Intern", education: "UG/Diploma", skills: ["Operational management", "problem-solving", "communication", "mechanical engineering"] },
  { companyName: "ITC Limited", sector: "FMCG", location: "Kolkata, West Bengal", roleType: "Marketing Intern", education: "UG/PG", skills: ["Marketing strategy", "communication", "creativity", "digital marketing"] },
  { companyName: "Indian Oil Corporation Limited", sector: "Energy", location: "New Delhi, Delhi", roleType: "Engineering Intern", education: "UG/Diploma", skills: ["Technical skills", "problem-solving", "teamwork", "operational management"] },
  { companyName: "ICICI Bank Limited", sector: "Banking & Finance", location: "Mumbai, Maharashtra", roleType: "Finance Intern", education: "UG/PG", skills: ["Excel", "financial modeling", "communication", "attention to detail"] },
  { companyName: "Power Grid Corporation of India Ltd", sector: "Energy", location: "Gurugram, Haryana", roleType: "Engineering Intern", education: "UG/Diploma", skills: ["Technical skills", "problem-solving", "teamwork", "operational management"] },
  { companyName: "Tata Sons Private Limited", sector: "Conglomerate", location: "Mumbai, Maharashtra", roleType: "Business Intern", education: "UG/PG", skills: ["Business strategy", "communication", "analytical thinking", "leadership"] },
  { companyName: "Wipro Limited", sector: "IT/Consulting", location: "Bengaluru, Karnataka", roleType: "Tech Intern", education: "UG/PG", skills: ["Java", "Python", "SQL", "problem-solving", "teamwork", "communication"] },
  { companyName: "HCL Technologies Limited", sector: "IT/Consulting", location: "Noida, Uttar Pradesh", roleType: "Tech Intern", education: "UG/PG", skills: ["Java", "Python", "C++", "web development (HTML, CSS, JS)", "communication"] },
  { companyName: "Hindustan Zinc Limited", sector: "Mining", location: "Udaipur, Rajasthan", roleType: "Operations Intern", education: "UG/Diploma", skills: ["Operational management", "problem-solving", "communication", "mechanical engineering"] },
  { companyName: "Reliance Jio Infocomm Limited", sector: "Telecom", location: "Mumbai, Maharashtra", roleType: "Tech Intern", education: "UG/PG", skills: ["Java", "Python", "C++", "web development (HTML, CSS, JS)", "communication"] },
  { companyName: "Mahanadi Coalfields Limited", sector: "Mining", location: "Sambalpur, Odisha", roleType: "Operations Intern", education: "UG/Diploma", skills: ["Operational management", "problem-solving", "communication", "mechanical engineering"] },
  { companyName: "NMDC Limited", sector: "Mining", location: "Hyderabad, Telangana", roleType: "Engineering Intern", education: "UG/Diploma", skills: ["Technical skills", "problem-solving", "teamwork", "operational management"] },
  { companyName: "Hindustan Unilever Limited", sector: "FMCG", location: "Mumbai, Maharashtra", roleType: "Marketing Intern", education: "UG/PG", skills: ["Marketing strategy", "communication", "creativity", "digital marketing"] },
  { companyName: "REC Limited", sector: "Finance", location: "New Delhi, Delhi", roleType: "Finance Intern", education: "UG/PG", skills: ["Excel", "financial modeling", "communication", "attention to detail"] },
  { companyName: "JSW Steel Limited", sector: "Manufacturing", location: "Mumbai, Maharashtra", roleType: "Operations Intern", education: "UG/Diploma", skills: ["Operational management", "problem-solving", "communication", "mechanical engineering"] },
  { companyName: "GAIL (India) Limited", sector: "Energy", location: "New Delhi, Delhi", roleType: "Engineering Intern", education: "UG/Diploma", skills: ["Technical skills", "problem-solving", "teamwork", "operational management"] },
  { companyName: "Cognizant Technology Solutions India", sector: "IT/Consulting", location: "Hyderabad, Telangana", roleType: "Tech Intern", education: "UG/PG", skills: ["Java", "Python", "SQL", "problem-solving", "teamwork", "communication"] },
  { companyName: "Larsen & Toubro Limited", sector: "Engineering/Construction", location: "Mumbai, Maharashtra", roleType: "Engineering Intern", education: "UG/Diploma", skills: ["Technical skills", "problem-solving", "teamwork", "operational management"] },
  { companyName: "Axis Bank Limited", sector: "Banking & Finance", location: "Mumbai, Maharashtra", roleType: "Finance Intern", education: "UG/PG", skills: ["Excel", "financial modeling", "communication", "attention to detail"] },
  { companyName: "Northern Coalfields Limited", sector: "Mining", location: "Singrauli, Madhya Pradesh", roleType: "Operations Intern", education: "UG/Diploma", skills: ["Operational management", "problem-solving", "communication", "mechanical engineering"] },
  { companyName: "Oil India Limited", sector: "Energy", location: "Duliajan, Assam", roleType: "Engineering Intern", education: "UG/Diploma", skills: ["Technical skills", "problem-solving", "teamwork", "operational management"] },
  { companyName: "Hindustan Petroleum Corporation Ltd", sector: "Energy", location: "Mumbai, Maharashtra", roleType: "Engineering Intern", education: "UG/Diploma", skills: ["Technical skills", "problem-solving", "teamwork", "operational management"] },
  { companyName: "Jindal Steel & Power Limited", sector: "Manufacturing", location: "New Delhi, Delhi", roleType: "Operations Intern", education: "UG/Diploma", skills: ["Operational management", "problem-solving", "communication", "mechanical engineering"] },
  { companyName: "Reliance Retail Limited", sector: "Retail", location: "Mumbai, Maharashtra", roleType: "Retail Intern", education: "UG/PG", skills: ["Retail management", "customer service", "communication", "digital marketing"] },
  { companyName: "Nuclear Power Corporation of India Ltd", sector: "Energy", location: "Mumbai, Maharashtra", roleType: "Engineering Intern", education: "UG/Diploma", skills: ["Technical skills", "problem-solving", "teamwork", "operational management"] },
  { companyName: "Tech Mahindra Limited", sector: "IT/Consulting", location: "Pune, Maharashtra", roleType: "Tech Intern", education: "UG/PG", skills: ["Java", "Python", "SQL", "problem-solving", "teamwork", "communication"] },
  { companyName: "Power Finance Corporation Limited", sector: "Finance", location: "New Delhi, Delhi", roleType: "Finance Intern", education: "UG/PG", skills: ["Excel", "financial modeling", "communication", "attention to detail"] },
];


// This function transforms the list above into the format your application needs.
const transformedOffers = companyJobs.map((job, index) => {
    const firstLetter = job.companyName.charAt(0).toUpperCase() || 'C';
    return {
        id: 101 + index,
        company: job.companyName,
        logo: `https://via.placeholder.com/40/7c3aed/ffffff?text=${firstLetter}`,
        sector: { value: job.sector, label: job.sector },
        role: { value: job.roleType, label: job.roleType },
        location: { value: job.location, label: job.location },
        salary: '₹ Stipend Varies', // Placeholder salary
    };
});

// The final, transformed list is exported for the rest of the app to use.
export const allAvailableOffers = transformedOffers;