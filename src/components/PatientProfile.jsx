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

  if (!patient) return <p className="loading">Cargando...</p>;

  return (
    <div className="patient-profile-wrapper">
      <div className="patient-profile-container">
        <div className="patient-profile-left">
          <h2>Perfil del Paciente</h2>
          <img
            src={patient.foto_perfil}
            alt={`${patient.nombre} ${patient.apellido}`}
            className="patient-profile-image"
          />
          <p><strong>Nombre:</strong> {patient.nombre} {patient.apellido}</p>
          <p>
            <strong>Fecha de Nacimiento:</strong>{' '}
            {new Date(patient.fecha_nacimiento).toLocaleDateString()}
          </p>
          <p><strong>Tipo de Sangre:</strong> {patient.tipo_sangre}</p>
          <p><strong>Diagnósticos:</strong> {patient.diagnosticos}</p>
          <p><strong>Formas de Tratamiento:</strong> {patient.formas_tratamiento}</p>
          <p><strong>Teléfono de Contacto:</strong> {patient.telefono_contacto}</p>
          <p><strong>Teléfono de Emergencia:</strong> {patient.telefono_emergencia}</p>
        </div>
        <div className="patient-profile-right">
          <div className="qr-container">
            <h3>Código QR</h3>
            <QRCodeCanvas value={`${window.location.origin}/patient/${patient.id}`} size={150} />
          </div>
        </div>
      </div>
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        Volver
      </button>
    </div>
  );
};

export default PatientProfile;
