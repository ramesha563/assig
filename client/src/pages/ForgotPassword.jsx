import { useState } from 'react';
import axios from 'axios';
import { FaEnvelope } from 'react-icons/fa';
import './Login.css'; // ✅ Reusing login CSS for consistency
import { backendURL } from '../App';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // await axios.post('http://localhost:5050/api/auth/forgot-password', { email });
  //     await axios.post(`${backendURL}api/auth/forgot-password`, { email });

  //     setMessage('Check your email for the reset link.');
  //     setEmail(''); // ✅ Clear input
  //   } catch (err) {
  //     setMessage('Something went wrong!');
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${backendURL}/api/auth/forgot-password`, { email });

    setMessage(res.data.message || 'Check your email for the reset link.');
    setEmail('');
  } catch (err) {
    console.error(err.response?.data || err.message);
    setMessage(err.response?.data?.message || 'Something went wrong!');
  }
};


  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="login-form">
        <img src="/email.gif" alt="Forgot Password" className="login-gif" />

        <h2 style={{ textAlign: 'center' }}>Forgot Password</h2>

        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit">Send Reset Link</button>

        {message && <p style={{ textAlign: 'center', color: '#0a1a2d', marginTop: '10px' }}>{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
