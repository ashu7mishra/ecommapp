import React from 'react';

function Spinner() {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Spinner;
