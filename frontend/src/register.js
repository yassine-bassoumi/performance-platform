import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const register = async () => {
    const res = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('✅ Account created!');
      setTimeout(() => navigate('/'), 1500);
    } else {
      setMessage(data.error || '❌ Registration failed.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="form-control mb-2" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="form-control mb-2" />
      <button onClick={register} className="btn btn-primary">Register</button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}

export default Register;
