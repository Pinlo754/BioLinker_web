import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    navigate(-1);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    } catch {}
    navigate('/');
  };

  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-[9999] bg-black/25 backdrop-blur-[1px] flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl w-[90%] max-w-md">
        <div className="flex items-start gap-3">
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-red-600" aria-hidden>
            <circle cx="12" cy="12" r="10" className="opacity-20" fill="currentColor" />
            <path d="M12 7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="17" r="1.25" fill="currentColor" />
          </svg>
          <div className="flex-1">
            <div className="text-base md:text-lg font-semibold text-gray-800">Are you sure you want to log out?</div>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#16C875] to-[#6CDFAB] cursor-pointer"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOut;