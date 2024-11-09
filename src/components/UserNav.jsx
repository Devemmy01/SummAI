import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SavedSummaries from './SavedSummaries';

const UserNav = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleAuthClick = async () => {
    if (user) {
      try {
        await logout();
        navigate('/');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    } else {
      navigate('/login');
    }
  };

  const Modal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center mt-[30%]">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto m-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Summaries</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <SavedSummaries />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex items-center gap-4">
      {user && (
        <button
          onClick={() => setShowModal(true)}
          className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
          title="Saved Summaries"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      )}
      <button
        onClick={handleAuthClick}
        className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
      >
        {user ? 'Logout' : 'Login'}
      </button>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default UserNav; 