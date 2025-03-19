import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/index';
import Login from './pages/login';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth } from './config/firebase';
import { Analytics } from "@vercel/analytics/react"

function App() {
  useEffect(() => {
    // Handle redirect result
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // User is signed in
          console.log('Signed in user:', result.user);
        }
      })
      .catch((error) => {
        console.error('Auth redirect error:', error);
      });
  }, []);

  return (
    <AuthProvider>
      <Analytics />
      <Toaster 
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: 'dark',
              },
            }}
          />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
