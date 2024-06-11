import React from 'react';

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-800">
      <div className="spinner animate-spin rounded-full h-32 w-32 border-b-2 border-white" />
    </div>
  );
}

export default Loading;