import React, { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import './PatientForm.css'; // Importa el archivo CSS

const PatientForm = () => {
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
    foto_perfil: '',
  });

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        try {
          const res = await api.get(`/patients/${id}`);
          setPatient(res.data);
          console.log("✅ Datos del paciente cargados correctamente:", res.data);
        } catch (err) {
          console.error("❌ Error al obtener el paciente", err);
        }
      };
      fetchPatient();
    }
  }, [id]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/patients/${id}`, patient);
        console.log("✅ Paciente actualizado correctamente.");
      } else {
        await api.post('/patients', patient);
        console.log("✅ Paciente creado correctamente.");
      }
      navigate('/dashboard'); // ✅ Redirigir al dashboard después de crear o actualizar
    } catch (err) {
      console.error("❌ Error al guardar el paciente", err);
    }
  };

  return (
    <div className="patient-form">
      <h2>{id ? 'Editar Paciente' : 'Crear Paciente'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={patient.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={patient.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            name="fecha_nacimiento"
            value={patient.fecha_nacimiento}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Tipo de Sangre:</label>
          <input
            type="text"
            name="tipo_sangre"
            value={patient.tipo_sangre}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Diagnósticos:</label>
          <textarea
            name="diagnosticos"
            value={patient.diagnosticos}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Formas de Tratamiento:</label>
          <textarea
            name="formas_tratamiento"
            value={patient.formas_tratamiento}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Teléfono de Contacto:</label>
          <input
            type="text"
            name="telefono_contacto"
            value={patient.telefono_contacto}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Teléfono de Emergencia:</label>
          <input
            type="text"
            name="telefono_emergencia"
            value={patient.telefono_emergencia}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Foto de Perfil (URL):</label>
          <input
            type="text"
            name="foto_perfil"
            value={patient.foto_perfil}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
      </form>
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        Volver
      </button>
    </div>
  );
};

export default PatientForm;
