import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { getSectorOptions, getRoleOptions } from '../../data/jobPreferencesData';
import { skillOptions } from '../../data/skillsData';

const educationOptions = [
  { value: 'PG', label: 'Postgraduate (PG)' },
  { value: 'UG', label: 'Undergraduate (UG)' },
  { value: 'Diploma', label: 'Diploma' },
];

const JobPostingForm = ({ index, initialData, onFormUpdate }) => {
  const [formData, setFormData] = useState(initialData || {});

  // This effect tells the parent component (CompanyDashboard) about any changes made to this form
  useEffect(() => {
    onFormUpdate(index, formData);
  }, [formData, index, onFormUpdate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData(prev => ({ ...prev, [name]: selectedOption }));
  };

  const sectorOptions = getSectorOptions();
  const roleOptions = getRoleOptions(formData.sector?.value);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Opening #{index + 1}</h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sector */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Sector</label>
            <Select 
              options={sectorOptions} 
              value={formData.sector} 
              onChange={(opt) => handleSelectChange('sector', opt)} 
              className="mt-1" 
            />
          </div>
          {/* Job Location (Text Input) */}
          <div>
            <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-700">Job Location</label>
            <input 
              type="text" 
              name="location" 
              id={`location-${index}`} 
              value={formData.location || ''} 
              onChange={handleInputChange} 
              placeholder="e.g., Pune, Maharashtra" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" 
            />
          </div>
        </div>
        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Role Offered (select one)</label>
          <Select 
            options={roleOptions} 
            value={formData.roles} 
            onChange={(opt) => handleSelectChange('roles', opt)} 
            className="mt-1" 
            isDisabled={!formData.sector} 
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor={`stipend-${index}`} className="block text-sm font-medium text-gray-700">Stipend (per month)</label>
            <input 
              type="text" 
              name="stipend" 
              id={`stipend-${index}`} 
              value={formData.stipend || ''} 
              onChange={handleInputChange} 
              placeholder="e.g., ₹25,000" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" 
            />
          </div>
          <div>
            <label htmlFor={`vacancies-${index}`} className="block text-sm font-medium text-gray-700">Vacancies for this Role</label>
            <input 
              type="number" 
              name="vacancies" 
              id={`vacancies-${index}`} 
              min="1" 
              value={formData.vacancies || 1} 
              onChange={handleInputChange} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" 
            />
          </div>
        </div>
        {/* Required Education */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Required Education</label>
          <Select 
            options={educationOptions} 
            value={formData.requiredEducation} 
            onChange={(opt) => handleSelectChange('requiredEducation', opt)} 
            className="mt-1" 
            placeholder="Select education level..."
          />
        </div>
        {/* Required Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Required Skills</label>
          <CreatableSelect 
            isMulti 
            options={skillOptions} 
            value={formData.requiredSkills} 
            onChange={(opt) => handleSelectChange('requiredSkills', opt)} 
            className="mt-1"
            placeholder="Select skills or type to add new..."
          />
        </div>
        {/* Threshold Score */}
        <div>
          <label htmlFor={`thresholdScore-${index}`} className="block text-sm font-medium text-gray-700">Eligibility Score Threshold (out of 100)</label>
          <input 
            type="number" 
            name="thresholdScore" 
            id={`thresholdScore-${index}`} 
            min="0" 
            max="100" 
            value={formData.thresholdScore || ''} 
            onChange={handleInputChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" 
          />
        </div>
      </div>
    </div>
  );
};

export default JobPostingForm;