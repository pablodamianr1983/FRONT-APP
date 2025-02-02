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
          patientData.fecha_nacimiento = new Date(patientData.fecha_nacimiento).toISOString().split('T')[0];
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
    <div className="edit-patient-wrapper" style={{ background: 'black', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="edit-patient-container" style={{ width: '50%', minWidth: '600px', background: 'linear-gradient(135deg, #141423, #3a3a62)', padding: '2rem', borderRadius: '12px', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)', textAlign: 'center' }}>
        <h2 style={{ color: 'white' }}>Editar Paciente</h2>
        {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" name="nombre" placeholder="Nombre" value={patient.nombre} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} required />
          <input type="text" name="apellido" placeholder="Apellido" value={patient.apellido} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} required />
          <input type="date" name="fecha_nacimiento" value={patient.fecha_nacimiento} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} />
          <input type="text" name="tipo_sangre" placeholder="Tipo de Sangre" value={patient.tipo_sangre} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} />
          <textarea name="diagnosticos" placeholder="Diagnósticos" value={patient.diagnosticos} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', height: '100px' }}></textarea>
          <textarea name="formas_tratamiento" placeholder="Formas de Tratamiento" value={patient.formas_tratamiento} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', height: '100px' }}></textarea>
          <input type="text" name="telefono_contacto" placeholder="Teléfono de Contacto" value={patient.telefono_contacto} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} />
          <input type="text" name="telefono_emergencia" placeholder="Teléfono de Emergencia" value={patient.telefono_emergencia} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} />
          <input type="text" name="foto_perfil" placeholder="Foto de Perfil (URL)" value={patient.foto_perfil} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} />
          <div className="buttons" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <button type="submit" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', color: 'white', backgroundColor: '#4a90e2', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Guardar Cambios</button>
            <button type="button" onClick={() => navigate('/dashboard')} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', color: 'white', backgroundColor: '#e74c3c', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatient;