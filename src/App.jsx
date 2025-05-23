import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/pages/home';
import Label from './components/pages/Label';
import Signup from './components/pages/signup';
import Login from './components/pages/login';
import Layout from './components/layout';
import AboutUs from './components/about';
import ContactUs from './components/contact';
import { AuthProvider } from './components/contexts/AuthContext';
import { DarkModeProvider } from "./components/contexts/DarkMode";
import Quizzes from './components/quizs';
import Result from './components/pages/result';
import CategoryProgress from './components/pages/ctgProgress';
import PrivateRoute from './components/privateRoute'; 
import Help from './components/pages/help';
import Ranking from './components/pages/Ranking';
import UserCategoryProgress from './components/pages/userProgress';
import PrivacyPolicy from './components/privacy';
import Terms from './components/terms';

const withLayout = (Component) => {
  return <Layout><Component /></Layout>;
};

function Loader() {
  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const handleLoad = () => setIsLoading(false);
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);
  
  return (
    <>
      {isLoading && <Loader />}
      <Router>
        <AuthProvider>
          <DarkModeProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={withLayout(Home)} />
              <Route path="/about" element={withLayout(AboutUs)} />
              <Route path="/contact" element={withLayout(ContactUs)} />
              <Route path="/help" element={withLayout(Help)} />
              <Route path="/privacy" element={withLayout(PrivacyPolicy)} />
              <Route path="/terms" element={withLayout(Terms)} />

              {/* Auth pages (no layout) */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              {/* Protected pages */}
              <Route
                path="/labels/:category"
                element={
                  <PrivateRoute>
                    <Label />
                  </PrivateRoute>
                }
              />
              <Route
                path="/quiz/:category/:label"
                element={
                  <PrivateRoute>
                    <Quizzes />
                  </PrivateRoute>
                }
              />
              <Route
                path="/result"
                element={
                  <PrivateRoute>
                    <Result />
                  </PrivateRoute>
                }
              />
              <Route
                path="/category-progress"
                element={
                  <PrivateRoute>
                    <CategoryProgress />
                  </PrivateRoute>
                }
              />
              <Route
                path="/ranking"
                element={
                  <PrivateRoute>
                    <Ranking />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user-category-progress/:uid"
                element={
                  <PrivateRoute>
                    <UserCategoryProgress />
                  </PrivateRoute>
                }
              />
            </Routes>
          </DarkModeProvider>
        </AuthProvider>
      </Router>
      <style>{`
        .loader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 8px solid transparent;
          border-top-color: #ff758c;
          border-right-color: #ff7eb3;
          border-bottom-color: #a8e063;
          border-left-color: #56ab2f;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

export default App;
