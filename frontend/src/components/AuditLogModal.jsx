import React from 'react';

function AuditLogModal({ isOpen, onClose, logData }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-[rgb(0_0_0_/_53%)] bg-opacity-25 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl transform transition-all duration-300 scale-95"
        onClick={(e) => e.stopPropagation()}
        style={{ transform: isOpen ? 'scale(1)' : 'scale(0.95)', opacity: isOpen ? 1 : 0 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Audit Log Entry</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 text-3xl font-light">&times;</button>
        </div>
        <div className="bg-slate-100 p-4 rounded-lg">
          <pre className="overflow-x-auto text-sm text-gray-700">
            <code>{JSON.stringify(logData, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default AuditLogModal;