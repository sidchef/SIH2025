import React, { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

// ===================================================================================
// --- 1. ALL MOCK DATA (Consolidated and Corrected) ---
// ===================================================================================

const jobPreferencesData = {
  "IT/Consulting": { "Tech Intern": ["Mumbai", "Pune"], "Software Intern": ["Bengaluru"], "Frontend Developer": ["Pune"], "Backend Developer": ["Bengaluru"], "Full Stack Developer": ["Pune"], "IT Consultant": ["Mumbai"], "QA Engineer": ["Pune"], "Data Scientist": ["Bengaluru"] },
  "Banking & Finance": { "Finance Intern": ["Mumbai"], "Financial Analyst": ["Mumbai"], "Accountant": ["Pune"], "Investment Banker": ["Mumbai"], "Auditor": ["Mumbai"] },
  "Manufacturing": { "Operations Intern": ["Jamshedpur"], "Mechanical Engineer": ["Pune"], "Production Manager": ["Pune"], "Supply Chain Manager": ["Mumbai"] },
  "Conglomerate": { "Analyst Intern": ["Mumbai"], "Business Intern": ["Mumbai"], "Business Development": ["Mumbai"] },
  "Energy": { "Engineering Intern": ["New Delhi"], "Project Engineer": ["Mumbai"] },
  "Telecom": { "Tech Intern": ["Mumbai"], "Network Engineer": ["Noida"] },
  "Energy/Oil & Gas": { "Engineering Intern": ["Dehradun"], "Petroleum Engineer": ["Mumbai"] },
  "Energy/Power": { "Grid Manager": ["Bengaluru"] },
  "Mining": { "Operations Intern": ["Udaipur"], "Mining Engineer": ["Hyderabad"] },
  "FMCG": { "Marketing Intern": ["Kolkata"], "Brand Manager": ["Mumbai"] },
  "Retail": { "Retail Intern": ["Mumbai"], "Store Manager": ["Pune"], "E-commerce Specialist": ["Bengaluru"] },
};
const getSectorOptions = () => Object.keys(jobPreferencesData).map(s => ({ value: s, label: s }));
const getRoleOptions = (sector) => sector && jobPreferencesData[sector] ? Object.keys(jobPreferencesData[sector]).map(r => ({ value: r, label: r })) : [];

// ✅ UPDATED: The full list of skill options is now here.
const skillOptions = [
  { value: 'analytical_thinking', label: 'Analytical thinking' },
  { value: 'data_analysis', label: 'Data analysis' },
  { value: 'communication_skills', label: 'Communication skills' },
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python' },
  { value: 'sql', label: 'SQL' },
  { value: 'problem_solving', label: 'Problem-solving' },
  { value: 'teamwork', label: 'Teamwork' },
  { value: 'excel', label: 'Excel' },
  { value: 'financial_modeling', label: 'Financial modeling' },
  { value: 'attention_to_detail', label: 'Attention to detail' },
  { value: 'technical_skills', label: 'Technical skills' },
  { value: 'autocad', label: 'AutoCAD' },
  { value: 'gis', label: 'GIS' },
  { value: 'c_plus_plus', label: 'C++' },
  { value: 'web_development', label: 'Web development (HTML, CSS, JS)' },
  { value: 'operational_management', label: 'Operational management' },
  { value: 'mechanical_engineering', label: 'Mechanical engineering' },
  { value: 'marketing_strategy', label: 'Marketing strategy' },
  { value: 'creativity', label: 'Creativity' },
  { value: 'digital_marketing', label: 'Digital marketing' },
  { value: 'business_strategy', label: 'Business strategy' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'retail_management', label: 'Retail management' },
  { value: 'customer_service', label: 'Customer service' },
];

const educationOptions = [{ value: 'UG', label: 'Undergraduate (UG)' }, { value: 'Diploma', label: 'Diploma' }];

const allAvailableStudents = [
  { id: 'STU-002', name: 'Priya Sharma', email: 'priya.sharma@example.com', appliedFor: { role: 'Tech Intern', sector: 'IT/Consulting' }, status: 'Pending' },
  { id: 'STU-004', name: 'Sneha Patil', email: 'sneha.patil@example.com', appliedFor: { role: 'Operations Intern', sector: 'Manufacturing' }, status: 'Rejected' },
  { id: 'STU-005', name: 'Arjun Reddy', email: 'arjun.reddy@example.com', appliedFor: { role: 'Software Intern', sector: 'IT/Consulting' }, status: 'Pending' },
];


// ===================================================================================
// --- 2. REUSABLE JOB FORM COMPONENT ---
// ===================================================================================

const JobPostingForm = ({ index, initialData, onFormUpdate }) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    onFormUpdate(index, formData);
  }, [formData, index, onFormUpdate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, selectedOption) => {
    const newFormData = { ...formData, [name]: selectedOption };
    if (name === 'sector') {
      newFormData.roles = null;
    }
    setFormData(newFormData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Opening #{index + 1}</h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Sector</label>
            <Select options={getSectorOptions()} value={formData.sector} onChange={(opt) => handleSelectChange('sector', opt)} className="mt-1" />
          </div>
          <div>
            <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-700">Job Location</label>
            <input type="text" name="location" id={`location-${index}`} value={formData.location || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Role Offered</label>
          <Select options={getRoleOptions(formData.sector?.value)} value={formData.roles} onChange={(opt) => handleSelectChange('roles', opt)} className="mt-1" isDisabled={!formData.sector} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor={`stipend-${index}`} className="block text-sm font-medium text-gray-700">Stipend</label>
            <input type="text" name="stipend" id={`stipend-${index}`} value={formData.stipend || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor={`vacancies-${index}`} className="block text-sm font-medium text-gray-700">Vacancies</label>
            <input type="number" name="vacancies" id={`vacancies-${index}`} min="1" value={formData.vacancies || 1} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Required Education</label>
          <Select options={educationOptions} value={formData.requiredEducation} onChange={(opt) => handleSelectChange('requiredEducation', opt)} className="mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Required Skills</label>
          <CreatableSelect isMulti options={skillOptions} value={formData.requiredSkills} onChange={(opt) => handleSelectChange('requiredSkills', opt)} className="mt-1" />
        </div>
        <div>
          <label htmlFor={`thresholdScore-${index}`} className="block text-sm font-medium text-gray-700">Score Threshold (out of 100)</label>
          <input type="number" name="thresholdScore" id={`thresholdScore-${index}`} min="0" max="100" value={formData.thresholdScore || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
      </div>
    </div>
  );
};


// ===================================================================================
// --- 3. FINAL DASHBOARD COMPONENT ---
// ===================================================================================

const PostedJobsDashboard = ({ postedJobs, onPostNewJob, onCancel }) => {
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);

  useEffect(() => {
    const findMatches = () => {
      const matches = [];
      postedJobs.forEach(job => {
        allAvailableStudents.forEach(student => {
          const jobRole = job.roles?.label?.trim();
          const studentRole = student.appliedFor?.role?.trim();
          const jobSector = job.sector?.label?.trim();
          const studentSector = student.appliedFor?.sector?.trim();
          if (jobRole === studentRole && jobSector === studentSector) {
            matches.push({
              role: job.roles?.label,
              sector: job.sector?.label,
              stipend: job.stipend,
              studentName: student.name,
              email: student.email,
              status: student.status,
            });
          }
        });
      });
      setShortlistedCandidates(matches);
    };
    if (postedJobs && postedJobs.length > 0) findMatches();
  }, [postedJobs]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Posted Openings & Candidates</h1>
          <div className="space-x-4">
             <button onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Back to Welcome</button>
             <button onClick={onPostNewJob} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700">Post New Openings</button>
          </div>
        </header>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Live Postings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postedJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-indigo-500">
                <h3 className="font-bold text-lg text-indigo-800">{job.roles?.label || 'N/A'}</h3>
                <p className="text-sm text-gray-600">{job.sector?.label || 'N/A'}</p>
                <p className="text-sm text-gray-500 mt-2">{job.location || 'N/A'}</p>
                <div className="mt-4 border-t pt-4 text-sm space-y-1">
                    <p><strong>Stipend:</strong> {job.stipend || 'N/A'}</p>
                    <p><strong>Vacancies:</strong> {job.vacancies || 'N/A'}</p>
                    <p><strong>Education:</strong> {job.requiredEducation?.label || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Shortlisted Candidates</h2>
           <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
            <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stipend</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {shortlistedCandidates.map(candidate => (
                        <tr key={candidate.email}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{candidate.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.sector}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.stipend}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{candidate.studentName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(candidate.status)}`}>
                                    {candidate.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
           </div>
           {shortlistedCandidates.length === 0 && <p className="text-center text-gray-500 mt-4">No matching candidates found for your posted jobs.</p>}
        </div>
      </div>
    </div>
  );
};


// ===================================================================================
// --- 4. MAIN CONTROLLER COMPONENT ---
// ===================================================================================

const CompanyDashboard = () => {
  const { logout } = useAuth();
  const [view, setView] = useState('welcome');
  const [jobCount, setJobCount] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [jobsData, setJobsData] = useState([]);
  const [postedJobs, setPostedJobs] = useState([]);

  const handleProceedToForms = () => {
    setJobsData(Array.from({ length: jobCount }, () => ({})));
    setView('form');
  };

  const handleFormUpdate = useCallback((index, data) => {
    setJobsData(currentJobsData => {
      const updatedJobsData = [...currentJobsData];
      updatedJobsData[index] = data;
      return updatedJobsData;
    });
  }, []);

  const handleCancel = () => {
      setJobsData([]);
      setJobCount(1);
      setCompanyName('');
      setView('welcome');
  }

  const handleSubmitAll = () => {
    const jobsWithIds = jobsData.map((job, index) => ({
      ...job,
      id: `OPP-${Date.now()}-${index}`
    }));
    alert(`Successfully submitted ${jobsData.length} job openings!`);
    setPostedJobs(jobsWithIds);
    setView('dashboard');
  };

  switch(view) {
    case 'welcome':
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">Welcome to our Platform</h1>
                <button onClick={() => setView('setCount')} className="mt-8 px-8 py-3 bg-indigo-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-indigo-700">Get Started</button>
                <button onClick={logout} className="block mx-auto mt-4 text-sm text-gray-500 hover:underline">Logout</button>
            </div>
        </div>
      );
    case 'setCount':
       return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Job Postings</h2>
                <div>
                    <label htmlFor="jobCount" className="block text-sm font-medium text-gray-700">How many distinct job openings do you want to post?</label>
                    <input type="number" id="jobCount" value={jobCount} onChange={(e) => setJobCount(Math.max(1, parseInt(e.target.value, 10)))} min="1" className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                    <button onClick={() => setView('welcome')} className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300">Back</button>
                    <button onClick={handleProceedToForms} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700">Proceed</button>
                </div>
            </div>
       </div>
       );
    case 'form':
      return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Company Information</h2>
                    <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
                        <input type="text" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                </div>
                <div className="space-y-8">
                    {jobsData.map((jobData, index) => (
                        <JobPostingForm key={index} index={index} initialData={jobData} onFormUpdate={handleFormUpdate} />
                    ))}
                </div>
                <div className="flex justify-end space-x-4 mt-8">
                    <button onClick={handleCancel} className="px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Cancel</button>
                    <button onClick={handleSubmitAll} className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700">Submit All Openings</button>
                </div>
            </div>
        </div>
      );
    case 'dashboard':
        return <PostedJobsDashboard postedJobs={postedJobs} onPostNewJob={() => setView('setCount')} onCancel={handleCancel} />;
    default:
        return null;
  }
};

export default CompanyDashboard;