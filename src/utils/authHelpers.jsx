import { signInWithPopup, signInWithRedirect } from 'firebase/auth';

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const handleAuth = async (auth, provider) => {
  try {
    if (window.innerWidth < 768 || isMobile()) {
      // Use redirect for mobile
      return await signInWithRedirect(auth, provider);
    } else {
      // Keep popup for desktop
      return await signInWithPopup(auth, provider);
    }
  } catch (error) {
    console.error('Auth error:', error);
    throw error;
  }
}; 