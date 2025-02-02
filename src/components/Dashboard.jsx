import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Importa el archivo CSS

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await api.get('/patients');
        setPatients(res.data);
      } catch (err) {
        console.error('Error al obtener pacientes', err);
      }
    };
    fetchPatients();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-wrapper" style={{ background: 'linear-gradient(135deg, #1e1e2e, #3a3a62)', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="dashboard-container">
        <h2>Panel de Administración</h2>
        <div className="dashboard-actions">
          <Link className="register-link" to="/add-patient">Registrar Nuevo Paciente</Link>
          <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.nombre}</td>
                <td>{patient.apellido}</td>
                <td className="action-links">
                  <Link to={`/patient/${patient.id}`}>Ver Perfil</Link>
                  {' | '}
                  <Link to={`/edit-patient/${patient.id}`}>Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
