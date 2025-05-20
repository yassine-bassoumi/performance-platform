import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg('✅ Account created successfully');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMsg(`❌ ${data.error}`);
      }
    } catch (err) {
      setMsg('❌ Network error');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input className="form-control my-2" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input className="form-control my-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-primary" onClick={handleSignup}>Sign Up</button>
      <div className="mt-3 text-danger">{msg}</div>
    </div>
  );
}

export default Signup;
