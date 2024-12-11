import { useState } from 'react';
import { Link } from 'react-router';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form submitted', { email, password, repeatPassword });
  };

  return (
    <>

      <div className="signup-container">
      <div><img src="./logo.svg" alt="Logo" className="login-logo" /></div>
        <form onSubmit={handleSubmit} className="signup-box">
          <h2>Sign Up</h2>
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
          <div className="input-group">
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              placeholder='Repeat password'
              required
            />
          </div>
          <button type="submit" className="signup-button">Create an account</button>
          <div className="login-link">
            <span>Already have an account? </span>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
