// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PatientForm from './components/PatientForm';
import PatientProfile from './components/PatientProfile';
import Register from './components/Register';
import EditPatient from './components/EditPatient'; // Componente para editar pacientes
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/add-patient"
        element={
          <PrivateRoute>
            <PatientForm />
          </PrivateRoute>
        }
      />

      <Route path="/patient/:id" element={<PatientProfile />} />

      {/* Ruta para editar paciente, protegida mediante PrivateRoute */}
      <Route
        path="/edit-patient/:id"
        element={
          <PrivateRoute>
            <EditPatient />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
