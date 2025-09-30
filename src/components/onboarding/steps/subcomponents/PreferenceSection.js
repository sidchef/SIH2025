import React from 'react';
import Select from 'react-select';
import { getSectorOptions, getRoleOptions, getLocationOptions } from '../../../../data/jobPreferencesData';

// We now accept 'usedLocations' as a prop
const PreferenceSection = ({ preference, onPreferenceChange, index, usedLocations }) => {
  
  const sectorOptions = getSectorOptions();
  const roleOptions = getRoleOptions(preference.sector?.value);
  const locationOptions = getLocationOptions(preference.sector?.value, preference.role?.value);

  return (
    <div className="border p-4 rounded-lg space-y-4 bg-gray-50">
      <h3 className="font-semibold text-lg text-gray-800">Preference {index + 1}</h3>
      
      {/* Sector and Role Dropdowns are unchanged */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
        <Select
          options={sectorOptions}
          value={preference.sector}
          onChange={(selectedOption) => onPreferenceChange(index, 'sector', selectedOption)}
          placeholder="Select a sector..."
          isClearable
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Role (select one)</label>
        <Select
          options={roleOptions}
          value={preference.role}
          onChange={(selectedOption) => onPreferenceChange(index, 'role', selectedOption)}
          isDisabled={!preference.sector}
          placeholder={preference.sector ? "Select a role..." : "Select a sector first"}
          isClearable
        />
      </div>

      {/* Location Dropdown (Updated with isOptionDisabled) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Location (select one)</label>
        <Select
          options={locationOptions}
          value={preference.location}
          onChange={(selectedOption) => onPreferenceChange(index, 'location', selectedOption)}
          isDisabled={!preference.role}
          placeholder={preference.role ? "Select one location..." : "Select a role first"}
          isClearable
          // ✅ This function checks each option. If its value is in the usedLocations
          // array, it returns true, which disables the option.
          isOptionDisabled={(option) => usedLocations.includes(option.value)}
        />
      </div>
    </div>
  );
};

export default PreferenceSection;