import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './EditPatient.css';

const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    tipo_sangre: '',
    diagnosticos: '',
    formas_tratamiento: '',
    telefono_contacto: '',
    telefono_emergencia: '',
    foto_perfil: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await api.get(`/patients/${id}`);
        const patientData = res.data;
        if (patientData.fecha_nacimiento) {
          patientData.fecha_nacimiento = new Date(patientData.fecha_nacimiento)
            .toISOString()
            .split('T')[0];
        }
        setPatient(patientData);
      } catch (err) {
        console.error('Error al obtener los datos del paciente', err);
        setError('Error al cargar los datos del paciente');
      }
    };
    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/patients/${id}`, patient);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error al actualizar el paciente', err);
      setError('Error al actualizar el paciente');
    }
  };

  return (
    <div className="edit-patient-wrapper">
      <div className="edit-patient-container">
        <h2>Editar Paciente</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={patient.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={patient.apellido}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="fecha_nacimiento"
            value={patient.fecha_nacimiento}
            onChange={handleChange}
          />
          <input
            type="text"
            name="tipo_sangre"
            placeholder="Tipo de Sangre"
            value={patient.tipo_sangre}
            onChange={handleChange}
          />
          <textarea
            name="diagnosticos"
            placeholder="Diagnósticos"
            value={patient.diagnosticos}
            onChange={handleChange}
          ></textarea>
          <textarea
            name="formas_tratamiento"
            placeholder="Formas de Tratamiento"
            value={patient.formas_tratamiento}
            onChange={handleChange}
          ></textarea>
          <input
            type="text"
            name="telefono_contacto"
            placeholder="Teléfono de Contacto"
            value={patient.telefono_contacto}
            onChange={handleChange}
          />
          <input
            type="text"
            name="telefono_emergencia"
            placeholder="Teléfono de Emergencia"
            value={patient.telefono_emergencia}
            onChange={handleChange}
          />
          <input
            type="text"
            name="foto_perfil"
            placeholder="Foto de Perfil (URL)"
            value={patient.foto_perfil}
            onChange={handleChange}
          />
          <div className="buttons">
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={() => navigate('/dashboard')}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatient;
