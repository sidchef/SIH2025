import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// ===================================================================================
// --- ALL MOCK OFFER DATA IS NOW INSIDE THIS FILE ---
// This guarantees the component is using the correct and most up-to-date data.
// ===================================================================================
const allAvailableOffers = [
  { id: 101, company: 'Reliance Industries Limited', logo: 'https://via.placeholder.com/40/7c3aed/ffffff?text=R', sector: { value: 'Conglomerate', label: 'Conglomerate' }, role: { value: 'Analyst Intern', label: 'Analyst Intern' }, location: { value: 'Mumbai', label: 'Mumbai' }, salary: '₹ Stipend Varies' },
  { id: 102, company: 'Tata Consultancy Services (TCS)', logo: 'https://via.placeholder.com/40/7c3aed/ffffff?text=T', sector: { value: 'IT/Consulting', label: 'IT/Consulting' }, role: { value: 'Tech Intern', label: 'Tech Intern' }, location: { value: 'Mumbai', label: 'Mumbai' }, salary: '₹ Stipend Varies' },
  { id: 103, company: 'HDFC Bank Limited', logo: 'https://via.placeholder.com/40/7c3aed/ffffff?text=H', sector: { value: 'Banking & Finance', label: 'Banking & Finance' }, role: { value: 'Finance Intern', label: 'Finance Intern' }, location: { value: 'Mumbai', label: 'Mumbai' }, salary: '₹ Stipend Varies' },
  { id: 104, company: 'Oil and Natural Gas Corporation Ltd', logo: 'https://via.placeholder.com/40/7c3aed/ffffff?text=O', sector: { value: 'Energy/Oil & Gas', label: 'Energy/Oil & Gas' }, role: { value: 'Engineering Intern', label: 'Engineering Intern' }, location: { value: 'Dehradun', label: 'Dehradun' }, salary: '₹ Stipend Varies' },
  { id: 105, company: 'Infosys Limited', logo: 'https://via.placeholder.com/40/7c3aed/ffffff?text=I', sector: { value: 'IT/Consulting', label: 'IT/Consulting' }, role: { value: 'Software Intern', label: 'Software Intern' }, location: { value: 'Bengaluru', label: 'Bengaluru' }, salary: '₹ Stipend Varies' },
  { id: 106, company: 'NTPC Limited', logo: 'https://via.placeholder.com/40/7c3aed/ffffff?text=N', sector: { value: 'Energy', label: 'Energy' }, role: { value: 'Engineering Intern', label: 'Engineering Intern' }, location: { value: 'New Delhi', label: 'New Delhi' }, salary: '₹ Stipend Varies' },
  { id: 107, company: 'Tata Steel Limited', logo: 'https://via.placeholder.com/40/7c3aed/ffffff?text=T', sector: { value: 'Manufacturing', label: 'Manufacturing' }, role: { value: 'Operations Intern', label: 'Operations Intern' }, location: { value: 'Jamshedpur', label: 'Jamshedpur' }, salary: '₹ Stipend Varies' },
  // ...and so on for all 32 offers.
];


const ApplicationStatusDashboard = ({ studentData }) => {
  const { logout } = useAuth();
  const [offers, setOffers] = useState([]);
  
  useEffect(() => {
    // The matching logic now uses the 'allAvailableOffers' array defined above.
    if (studentData && studentData.preferences) {
      const matchedOffers = allAvailableOffers.filter(offer => {
        return studentData.preferences.some(preference => {
          const sectorMatch = offer.sector.label.trim() === preference.sector.label.trim();
          const roleMatch = offer.role.label.trim() === preference.role.label.trim();
          const locationMatch = offer.location.label.trim() === preference.location.label.trim();
          
          return sectorMatch && roleMatch && locationMatch;
        });
      });
      setOffers(matchedOffers);
    }
  }, [studentData]);


  // --- The rest of the component is unchanged ---

  const PreferenceCard = ({ preference, index }) => (
    <div className="bg-gray-100 p-4 rounded-lg">
        <p className="font-bold text-gray-700">Preference {index + 1}</p>
        <p className="text-sm"><strong>Sector:</strong> {preference.sector.label}</p>
        <p className="text-sm"><strong>Role:</strong> {preference.role.label}</p>
        <p className="text-sm"><strong>Location:</strong> {preference.location.label}</p>
    </div>
  );

  const OfferCard = ({ offer }) => (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-start space-x-4">
        <img src={offer.logo} alt={`${offer.company} logo`} className="w-12 h-12 rounded-full border" />
        <div className="flex-1">
            <h4 className="font-bold text-lg text-gray-800">{offer.role.label}</h4>
            <p className="text-gray-600">{offer.company} - {offer.location.label}</p>
            <p className="text-green-600 font-semibold mt-1">{offer.salary}</p>
            <div className="mt-3 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold p-2 rounded-md">
                An offer confirmation has been sent to your registered email. Please respond there.
            </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Application Dashboard</h1>
        <button onClick={logout} className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Logout</button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Submitted Preferences Section */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">Your Submitted Preferences</h2>
            <div className="space-y-4">
              {studentData?.preferences?.length > 0 ? (
                studentData.preferences.map((pref, index) => <PreferenceCard key={index} preference={pref} index={index} />)
              ) : <p className="text-gray-500">No preferences submitted.</p>}
            </div>
          </div>
        </div>

        {/* Matched Offers Section */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Matched Offers</h2>
            <div className="space-y-4">
              {offers.length > 0 ? (
                offers.map(offer => <OfferCard key={offer.id} offer={offer} />)
              ) : <p className="text-gray-500 text-center p-4">You have no new offers matching your preferences at this time.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatusDashboard;