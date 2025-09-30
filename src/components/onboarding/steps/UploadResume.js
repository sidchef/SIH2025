import React, { useState } from 'react';
import EducationSection from './subcomponents/EducationSection';

// Mock data updated to include a 'skills' array
const mockParsedData = {
  fullName: 'Priya Sharma',
  skills: ['Java', 'JavaScript', 'Node.js', 'SQL', 'Teamwork', 'Communication','Python'],
  education: {
    degree: { college_name: 'Pune Institute of Computer Technology', branch: 'Computer Engineering', cgpa: '8.75', passing_year: '2025' },
    twelfth: { college_name: 'Modern College of Arts, Science and Commerce', branch: 'Science', cgpa: '88.50%', passing_year: '2021' },
    tenth: { college_name: 'St. Helena\'s School', cgpa: '92.40%', passing_year: '2019' },
  },
};

const UploadResume = ({ data, updateFormData, nextStep, prevStep }) => {
  const [isParsing, setIsParsing] = useState(false);
  const [localData, setLocalData] = useState(data.resumeDetails || {
    resumeFile: null,
    fullName: '',
    parsedSkills: [],
    education: { tenth: {}, twelfth: {}, degree: {} }
  });

  const isFormComplete = 
    localData.resumeFile &&
    localData.education.tenth?.address &&
    localData.education.tenth?.degree &&
    localData.education.tenth?.marksheet;

  const simulateResumeParse = (file) => {
    setIsParsing(true);
    setTimeout(() => {
      setLocalData(prev => ({
        ...prev,
        fullName: mockParsedData.fullName,
        parsedSkills: mockParsedData.skills, // Set parsed skills
        education: {
          tenth: { ...prev.education.tenth, ...mockParsedData.education.tenth },
          twelfth: { ...prev.education.twelfth, ...mockParsedData.education.twelfth },
          degree: { ...prev.education.degree, ...mockParsedData.education.degree },
        }
      }));
      setIsParsing(false);
    }, 2000);
  };

  const handleResumeFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLocalData(prev => ({ ...prev, resumeFile: file }));
      simulateResumeParse(file);
    }
  };

  const handleInputChange = (section, e) => {
    const { name, value } = e.target;
    setLocalData(prev => ({
      ...prev,
      education: { ...prev.education, [section]: { ...prev.education[section], [name]: value } }
    }));
  };

  // New handler for the qualification dropdown
  const handleQualificationChange = (section, selectedOption) => {
    setLocalData(prev => ({
      ...prev,
      education: { ...prev.education, [section]: { ...prev.education[section], qualification: selectedOption } }
    }));
  };

  const handleEducationFileChange = (section, e) => {
    const file = e.target.files[0];
    if (file) {
        setLocalData(prev => ({
            ...prev,
            education: { ...prev.education, [section]: { ...prev.education[section], marksheet: file } }
        }));
    }
  };

  const handleNext = () => {
    updateFormData('resumeDetails', localData);
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Resume and Education</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Resume</label>
        <label htmlFor="resume" className="mt-1 cursor-pointer flex items-center justify-center w-full px-3 py-4 border border-gray-400 border-dashed rounded-md bg-gray-50 hover:bg-gray-100">
          <span className="text-indigo-600 font-medium">
            {localData.resumeFile ? `Selected: ${localData.resumeFile.name}` : 'Click to upload resume (this will trigger auto-fill)'}
          </span>
          <input id="resume" name="resume" type="file" onChange={handleResumeFileChange} className="sr-only" />
        </label>
        {isParsing && <p className="text-center text-blue-600 mt-2">Parsing your resume, please wait...</p>}
      </div>

      {localData.fullName && !isParsing && (
        <div className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-500">Full Name (from resume)</label>
            <input type="text" value={localData.fullName} readOnly className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md cursor-not-allowed" />
          </div>

          {/* --- NEW Parsed Skills Section --- */}
          <div>
            <label className="block text-sm font-medium text-gray-500">Skills (from resume)</label>
            <div className="mt-2 flex flex-wrap gap-2 p-2 border bg-gray-100 rounded-md">
                {localData.parsedSkills.length > 0 ? localData.parsedSkills.map(skill => (
                    <span key={skill} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full">
                        {skill}
                    </span>
                )) : <p className="text-sm text-gray-400">No skills parsed.</p>}
            </div>
          </div>
          
          <EducationSection title="Degree" sectionKey="degree" data={localData.education.degree} handleInputChange={handleInputChange} handleFileChange={handleEducationFileChange} handleQualificationChange={handleQualificationChange} />
          <EducationSection title="12th / Diploma" sectionKey="twelfth" data={localData.education.twelfth} handleInputChange={handleInputChange} handleFileChange={handleEducationFileChange} handleQualificationChange={handleQualificationChange} />
          <EducationSection title="10th Grade" sectionKey="tenth" data={localData.education.tenth} handleInputChange={handleInputChange} handleFileChange={handleEducationFileChange} handleQualificationChange={handleQualificationChange} />
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button onClick={prevStep} className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300">Back</button>
        <button onClick={handleNext} disabled={!isFormComplete} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
          Next
        </button>
      </div>
    </div>
  );
};

export default UploadResume;