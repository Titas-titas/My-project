import { Link } from "react-router";


const Login = () => {
  return (
  <>
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="input-group">
            <input type="email" placeholder="Email address" required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" required />
          </div>
          <input type="submit" value="Login to your account" className="login-button"/>
        </form>
        <p className="signup-link">Don&#96;t have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
    </>
  );
};

export default Login;
