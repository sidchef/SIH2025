import React from 'react';
import { onboardedStudents } from '../../data/mockOnboardedStudents';
import { companyJobs } from '../../data/mockCompanyJobs'; // 👈 1. Import the new company job data

const AdminMainView = ({ setView }) => {
  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Master Data View</h1>
        <button onClick={() => setView('analytics')} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
          View Analytics
        </button>
      </header>

      {/* Student Data Table (Unchanged) */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Registered Students</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Contact</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Top Preference</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {onboardedStudents.map(student => (
                <tr key={student.id}>
                  <td className="px-4 py-3 text-sm text-gray-800">{student.fullName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{student.studentMobile}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{student.preferences[0]?.sector.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 👇 2. UPDATED Company Job Openings Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Company Job Openings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Company Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Role</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Sector</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Location</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Skills</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {companyJobs.map((job, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{job.companyName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{job.roleType}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{job.sector}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{job.location}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{job.skills.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminMainView;