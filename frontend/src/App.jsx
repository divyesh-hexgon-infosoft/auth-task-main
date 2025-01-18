import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import Register from './components/Register';
import AdminLogin from './components/AdminLogin';
import VerifyEmail from './components/VerifyEmail';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
