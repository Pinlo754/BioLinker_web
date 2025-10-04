import React from 'react';

type LoadingProps = {
  visible: boolean;
  message?: string;
};

export const LoadingOverlay: React.FC<LoadingProps> = ({ visible, message }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-[9999] bg-black/25 backdrop-blur-[1px] flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 shadow-xl flex flex-col items-center gap-3">
        <svg className="animate-spin h-[30%] w-[40%] text-blue-600" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#16C875" />
              <stop offset="100%" stopColor="#6CDFAB" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
          <path fill="url(#spinnerGradient)" className="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        <div className="text-base text-gray-600">{message ?? 'loading...'}</div>
      </div>
    </div>
  );
};
