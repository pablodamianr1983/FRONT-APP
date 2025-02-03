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
    <div className="patient-wrapper">
      <div className="patient-container">
        <div className="patient-left">
          <h2>{id ? 'Editar Paciente' : 'Crear Paciente'}</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" placeholder="Nombre" value={patient.nombre} onChange={handleChange} required />
            <input type="text" name="apellido" placeholder="Apellido" value={patient.apellido} onChange={handleChange} required />
            <input type="date" name="fecha_nacimiento" value={patient.fecha_nacimiento} onChange={handleChange} />
            <input type="text" name="tipo_sangre" placeholder="Tipo de Sangre" value={patient.tipo_sangre} onChange={handleChange} />
            <textarea name="diagnosticos" placeholder="Diagnósticos" value={patient.diagnosticos} onChange={handleChange}></textarea>
            <textarea name="formas_tratamiento" placeholder="Formas de Tratamiento" value={patient.formas_tratamiento} onChange={handleChange}></textarea>
            <input type="text" name="telefono_contacto" placeholder="Teléfono de Contacto" value={patient.telefono_contacto} onChange={handleChange} />
            <input type="text" name="telefono_emergencia" placeholder="Teléfono de Emergencia" value={patient.telefono_emergencia} onChange={handleChange} />
            <input type="text" name="foto_perfil" placeholder="URL de Foto de Perfil" value={patient.foto_perfil} onChange={handleChange} />
            <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
          </form>
        </div>
        <div className="patient-right">
          <div className="patient-bg">
            <h1 className="app-title">DiagnosTO</h1>
          </div>
        </div>
      </div>
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        Volver
      </button>
    </div>
  );
};

export default PatientForm;
