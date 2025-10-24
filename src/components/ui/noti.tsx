import React, { useState } from 'react';

type NotificationOverlayProps = {
  visible: boolean;
  message?: string;
  closeText?: string;
  onClose?: () => void;               
};

const ErrorIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8 text-red-600" aria-hidden>
    <circle cx="12" cy="12" r="10" className="opacity-20" fill="currentColor" />
    <path d="M12 7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1.25" fill="currentColor" />
  </svg>
);
const NotificationOverlay: React.FC<NotificationOverlayProps> = ({
  visible,
  message = '',
  closeText = 'Đóng',
  onClose,
}) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-[9999] bg-black/25 backdrop-blur-[1px] flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl w-[90%] max-w-md">
        <div className="flex items-start gap-3">
          <ErrorIcon />
          <div className="flex-1">
            <div className="text-base md:text-lg font-semibold text-gray-800">{message}</div>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-end gap-2">
          {(
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#16C875] to-[#6CDFAB] opacity-70 cursor-pointer"
            >
              {closeText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationOverlay;

