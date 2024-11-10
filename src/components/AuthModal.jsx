import { useState } from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';
import { handleAuth } from '../utils/authHelpers';

const AuthModal = ({ isOpen, onClose }) => {
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      await handleAuth(auth, provider);
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl mb-4">Sign In</h2>
        <button 
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full p-2 border rounded"
        >
          Sign in with Google
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default AuthModal; 