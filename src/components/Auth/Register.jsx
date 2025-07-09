import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // ✅ Import SweetAlert

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8f9fa'
  };

  const cardStyle = {
    boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
    borderRadius: '10px',
    padding: '2rem',
    background: '#fff',
    width: '100%',
    maxWidth: '400px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '1.5rem',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    fontSize: '1rem'
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer'
  };

  const linkStyle = {
    color: '#007bff',
    textDecoration: 'none'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users', { email, password });
      dispatch(setUser(response.data));
      
      // ✅ Sweet success alert
      Swal.fire({
        title: 'Registration Successful!',
        text: 'Your account has been created.',
        icon: 'success',
        confirmButtonColor: '#007bff',
      }).then(() => navigate('/'));
      
    } catch (error) {
      // ❌ Sweet error alert
      Swal.fire({
        title: 'Error!',
        text: 'Registration failed. Please try again.',
        icon: 'error',
        confirmButtonColor: '#dc3545',
      });
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="formEmail" style={{ display: 'block', marginBottom: '0.5rem' }}>Email address</label>
            <input
              id="formEmail"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="formPassword" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input
              id="formPassword"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <small>
            Already have an account? <a href="/" style={linkStyle}>Login</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
