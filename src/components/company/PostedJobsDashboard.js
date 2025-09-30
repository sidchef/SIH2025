import React, { useState, useEffect } from 'react';
import { allAvailableStudents } from '../../data/mockStudents';

const PostedJobsDashboard = ({ postedJobs, onPostNewJob, onCancel }) => {
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);

  // This hook finds students that match the posted jobs.
  useEffect(() => {
    const findMatches = () => {
      // Log the initial data to the console for inspection
      console.log('--- RUNNING MATCHING LOGIC ---');
      console.log('Posted Jobs Data:', postedJobs);
      console.log('Available Students Data:', allAvailableStudents);

      const matches = [];
      
      postedJobs.forEach(job => {
        allAvailableStudents.forEach(student => {
          // Use optional chaining and trim to make the comparison robust
          const jobRole = job.roles?.label?.trim();
          const studentRole = student.appliedFor?.role?.trim();

          const jobSector = job.sector?.label?.trim();
          const studentSector = student.appliedFor?.sector?.trim();

          // Log every comparison
          console.log(`Comparing JOB (${jobRole} in ${jobSector}) with STUDENT (${studentRole} in ${studentSector})`);

          const roleMatch = jobRole === studentRole;
          const sectorMatch = jobSector === studentSector;

          if (roleMatch && sectorMatch) {
            console.log(`%c✅ MATCH FOUND: ${student.name} for ${jobRole}`, 'color: green; font-weight: bold;');
            matches.push({
              role: job.roles?.label,
              sector: job.sector?.label,
              stipend: job.stipend,
              studentId: student.id,
              studentName: student.name,
              email: student.email,
              status: student.status,
            });
          }
        });
      });

      console.log('--- MATCHING COMPLETE ---');
      console.log('Final Shortlisted Candidates Found:', matches);
      setShortlistedCandidates(matches);
    };

    if (postedJobs && postedJobs.length > 0) {
      findMatches();
    } else {
      setShortlistedCandidates([]); // Clear list if there are no posted jobs
    }
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

        {/* Section for Posted Job Openings */}
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

        {/* Section for Shortlisted Candidates */}
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
                        <tr key={candidate.studentId}>
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

export default PostedJobsDashboard;