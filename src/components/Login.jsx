import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllData } from '../helpers/get';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const users = await getAllData();
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        alert('Login successful');
        navigate('/home');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  return (
    <div className="login-container">
      <div><img src="./logo.svg" alt="Logo" className="login-logo" /></div>
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email address'
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            />
          </div>
          <button type="submit" className="login-button">Login to your account</button>
        </form>
        <p className="signup-link">Don&#96;t have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
