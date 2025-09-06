
function EMRDemo() {
  const [fhirOutput, setFhirOutput] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);



  const handleAddToProblemList = async (diagnosis) => {
    setIsGenerating(true);
    setFhirOutput(null);
    console.log("Generating FHIR record for:", diagnosis);

    //cod for mock api call
    // const token = localStorage.getItem('authToken');
    // const response = await fetch('/api/fhir/generate', {
    //   method: 'POST',
    //   headers: { 
    //      'Content-Type': 'application/json',
    //      'Authorization': `Bearer ${token}` 
    //   },
    //   body: JSON.stringify(diagnosis),
    // });
    // const fhirBundle = await response.json();

    setTimeout(() => {
      const mockFhirBundle = {
        resourceType: "Bundle",
        id: "bundle-transaction",
        type: "transaction",
        entry: [{
          fullUrl: "urn:uuid:1234-5678-9012",
          resource: {
            resourceType: "Condition",
            clinicalStatus: {
              coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-clinical", code: "active" }]
            },
            verificationStatus: {
              coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-ver-status", code: "confirmed" }]
            },
            category: [{
              coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-category", code: "problem-list-item" }]
            }],
            code: {
              coding: [
                { system: "urn:namaste-dt:v1", code: diagnosis.namaste, display: diagnosis.description },
                { system: "http://id.who.int/icd/release/11/mms", code: diagnosis.icd11, display: diagnosis.description }
              ],
              text: diagnosis.description
            },
            subject: { reference: "Patient/example" } // actuall patient-id
          },
          request: { method: "POST", url: "Condition" }
        }]
      };

      setFhirOutput(mockFhirBundle);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">

      <div className="mt-4 border-t border-gray-200">
        {results.length > 0 && (
          <ul className="divide-y divide-gray-200">
            {results.map((result) => (
              <li key={result.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                <div>
                  {/*(description and codes)*/}
                </div>
                <button
                  onClick={() => handleAddToProblemList(result)}
                  className="bg-green-600 text-white px-4 py-2 text-sm font-semibold rounded-md hover:bg-green-700 transition-colors"
                >
                  Add to Problem List
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* FHIR Output */}
      {(isGenerating || fhirOutput) && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">FHIR JSON Output</h2>
          <div className="bg-gray-900 text-white p-4 rounded-lg shadow-inner">
            {isGenerating ? (
              <p>Generating FHIR</p>
            ) : (
              <pre className="overflow-x-auto text-sm">
                <code>{JSON.stringify(fhirOutput, null, 2)}</code>
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EMRDemo;