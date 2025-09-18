import React from 'react';

export default function LoadingSpinner({ size = 4 }) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-b-2 border-primary`}
      />
    </div>
  );
}
