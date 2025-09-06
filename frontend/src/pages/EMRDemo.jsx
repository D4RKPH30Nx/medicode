import React, { useState, useEffect, useCallback } from 'react';
import SearchResults from '../components/SearchResults';
import AuditLogModal from '../components/AuditLogModal';

// You can move these to separate files (e.g., /hooks/useDebounce.js)
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

// And /data/mockData.js
const mockDiagnosisData = [
  { id: 1, namaste: 'N-CVD-101', icd11: 'BA00.0', description: 'Hypertensive heart disease without heart failure' },
  { id: 2, namaste: 'N-DIA-202', icd11: '5A10', description: 'Type 1 diabetes mellitus' },
  { id: 3, namaste: 'N-DIA-203', icd11: '5A11', description: 'Type 2 diabetes mellitus' },
  { id: 4, namaste: 'N-RES-305', icd11: 'CA20', description: 'Asthma' },
  { id: 5, namaste: 'N-GEN-001', icd11: 'MG30', description: 'Fever of unknown origin' },
];

function EMRDemo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fhirOutput, setFhirOutput] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAuditLogVisible, setIsAuditLogVisible] = useState(false);
  const [addedItems, setAddedItems] = useState(new Set()); // Tracks added items

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const searchDiagnoses = useCallback(async (query) => {
    if (!query) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const filteredData = mockDiagnosisData.filter(item =>
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredData);
      setIsLoading(false);
    }, 300);
  }, []);

  const handleAddToProblemList = useCallback((diagnosis) => {
    setIsGenerating(true);
    setFhirOutput(null);
    setAddedItems(prev => new Set(prev).add(diagnosis.id));

    setTimeout(() => {
      const mockFhirBundle = { /* fhir Json*/ };
      console.log('Setting FHIR output:', mockFhirBundle);
      setFhirOutput(mockFhirBundle);
      setIsGenerating(false);
    }, 800);
  }, []);

  useEffect(() => {
    searchDiagnoses(debouncedSearchTerm);
  }, [debouncedSearchTerm, searchDiagnoses]);

  const mockAuditLog = {
    eventId: "evt-a4b1c2d3-e4f5",
    timestamp: new Date().toISOString(),
    userId: "clinician_dr_smith",
    details: { diagnosisCode: fhirOutput?.entry?.[0]?.resource?.code?.text || "N/A" }
  };

  return (
    <main className="bg-pink-200 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">EMR Dashboard</h1>
            <p className="text-gray-500">Record a new diagnosis for the patient.</p>
          </div>
          <button
            onClick={() => setIsAuditLogVisible(true)}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 font-semibold"
          >
            View Audit Log
          </button>
        </header>

        <div className='flex w-[100%] justify-center'>
          <div className="bg-pink-100 w-[70vw] p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Diagnosis Lookup</h2>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a diagnosis (e.g., 'diabetes')"
                className="w-full p-3 text-black pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <div className="mt-4 border-t border-gray-200">
              <SearchResults
                isLoading={isLoading}
                results={results}
                searchTerm={debouncedSearchTerm}
                onAddItem={handleAddToProblemList}
                addedItems={addedItems}
              />
            </div>
          </div>
        </div>

        {(isGenerating || fhirOutput) && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">FHIR Output</h2>
            <div className="bg-gray-800 text-white p-4 rounded-lg shadow-inner">
              {isGenerating ? <p>Generating FHIR...</p> : (
                <pre className="overflow-x-auto text-sm"><code>{JSON.stringify(fhirOutput, null, 2)}</code></pre>
              )}
            </div>
          </div>
        )}
      </div>

      <AuditLogModal
        isOpen={isAuditLogVisible}
        onClose={() => setIsAuditLogVisible(false)}
        logData={mockAuditLog}
      />
    </main>
  );
}

export default EMRDemo;