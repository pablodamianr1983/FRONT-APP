import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import api from '../services/api';
import './PatientProfile.css';

const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await api.get(`/patients/${id}`);
        setPatient(res.data);
      } catch (err) {
        console.error('Error al obtener el paciente', err);
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient) return <p>Cargando...</p>;

  return (
    <div className="patient-profile-wrapper" style={{ background: 'black', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <div className="patient-profile-container" style={{ display: 'flex', width: '70%', minWidth: '900px', background: 'linear-gradient(135deg, #141423, #3a3a62)', padding: '2rem', borderRadius: '12px', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)' }}>
        <div style={{ width: '50%', padding: '1rem', color: 'white' }}>
          <h2>Perfil del Paciente</h2>
          <img
            src={patient.foto_perfil}
            alt={`${patient.nombre} ${patient.apellido}`}
            style={{ borderRadius: '50%', border: '3px solid #4a90e2', width: '120px', height: '120px', marginBottom: '1rem' }}
          />
          <p><strong>Nombre:</strong> {patient.nombre} {patient.apellido}</p>
          <p><strong>Fecha de Nacimiento:</strong> {new Date(patient.fecha_nacimiento).toLocaleDateString()}</p>
          <p><strong>Tipo de Sangre:</strong> {patient.tipo_sangre}</p>
          <p><strong>Diagnósticos:</strong> {patient.diagnosticos}</p>
          <p><strong>Formas de Tratamiento:</strong> {patient.formas_tratamiento}</p>
          <p><strong>Teléfono de Contacto:</strong> {patient.telefono_contacto}</p>
          <p><strong>Teléfono de Emergencia:</strong> {patient.telefono_emergencia}</p>
        </div>
        <div style={{ width: '50%', background: 'linear-gradient(135deg, #4b0082, #8a2be2)', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '12px' }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'white' }}>Código QR</h3>
            <QRCodeCanvas value={`${window.location.origin}/patient/${patient.id}`} size={150} />
          </div>
        </div>
      </div>
      <button className="back-button" onClick={() => navigate('/dashboard')} style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', fontSize: '1rem', color: 'white', backgroundColor: '#4a90e2', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
        Volver
      </button>
    </div>
  );
};

export default PatientProfile;
