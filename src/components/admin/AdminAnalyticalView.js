import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { onboardedStudents } from '../../data/mockOnboardedStudents';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// --- Data Processing Logic ---
const processChartData = () => {
  const sectorCounts = {};
  const locationCounts = {};

  onboardedStudents.forEach(student => {
    student.preferences.forEach(pref => {
      // Count sectors
      const sector = pref.sector.label;
      sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
      // Count locations
      const location = pref.location.label;
      locationCounts[location] = (locationCounts[location] || 0) + 1;
    });
  });

  const sectorData = {
    labels: Object.keys(sectorCounts),
    datasets: [{
      label: '# of Students',
      data: Object.values(sectorCounts),
      backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'],
    }],
  };
  
  const locationData = {
    labels: Object.keys(locationCounts),
    datasets: [{
      label: 'Number of Times Preferred',
      data: Object.values(locationCounts),
      backgroundColor: '#3B82F6',
    }],
  };

  return { sectorData, locationData };
};


const AdminAnalyticsView = ({ setView }) => {
  const { sectorData, locationData } = processChartData();
  
  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Student Analytics</h1>
        <button onClick={() => setView('main')} className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700">
          Back to Main Dashboard
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sector Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Most Preferred Sectors</h2>
          <Doughnut data={sectorData} />
        </div>
        {/* Location Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Most Preferred Locations</h2>
          <Bar data={locationData} options={{ indexAxis: 'y' }} />
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsView;