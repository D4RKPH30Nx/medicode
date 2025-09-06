import React from 'react';

function SearchResults({ isLoading, results, searchTerm, onAddItem, addedItems }) {
  // suggestion message
  if (!searchTerm) {
    return (
    null
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>Searching...</p>
      </div>
    );
  }
  
  if (results.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>No results found for "{searchTerm}".</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {results.map((result) => {
        const isAdded = addedItems.has(result.id);
        return (
          <li key={result.id} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
            <div>
              <p className="font-semibold text-gray-900">{result.description}</p>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-green-700">NAMASTE:</span> {result.namaste} | 
                <span className="font-bold text-purple-700 ml-2">ICD-11:</span> {result.icd11}
              </p>
            </div>
            <button
              onClick={() => onAddItem(result)}
              disabled={isAdded}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                isAdded
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isAdded ? 'Added ✔' : 'Add to Problem List'}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default SearchResults;