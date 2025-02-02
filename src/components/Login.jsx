import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importa el archivo CSS

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="login-wrapper" style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
      <div className="login-container">
        <div className="login-left">
          <h2>Iniciar Sesión</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={onChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              required
            />
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button type="submit">Log In</button>
          </form>
        </div>
        <div className="login-right">
          <div className="login-bg" style={{ position: 'relative', width: '100%', height: '100%' }}>
            <h1 className="app-title" style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '3rem', fontWeight: 'bold', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)' }}>DiagnosTO</h1>
            <h1 className="app-title" style={{ position: 'absolute', top: '50%', left: '85%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '8rem', fontWeight: 'bold', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)', opacity: '0.2', whiteSpace: 'nowrap' }}>DiagnosTO</h1>
            <h1 className="app-title" style={{ position: 'absolute', top: '-10%', left: '10%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '8rem', fontWeight: 'bold', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)', opacity: '0.2', whiteSpace: 'nowrap' }}>DiagnosTO</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
