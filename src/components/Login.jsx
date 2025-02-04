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
    <div className="login-wrapper">
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
          <div className="login-bg">
            <h1 className="app-title main-title">DiagnosTO</h1>
            <h1 className="app-title overlay-title-1">DiagnosTO</h1>
            <h1 className="app-title overlay-title-2">DiagnosTO</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
