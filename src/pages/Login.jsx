import { useState } from "react";
import { useLogin } from "../Hooks/useLogin";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/");
    }
    setPassword("");
  };

  return (
    <div className="formContainer">
      <form className="signup" onSubmit={handleSubmit}>
        <p>Wellcome to back</p>
        <label htmlFor="email">email: </label>
        <input
          type="email"
          name="email"
          id="email"
          className="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label htmlFor="password">password:</label>
        <input
          type="password"
          name="password"
          id="password"
          className="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button disabled={loading}>Login</button>
        {error && <h4 className="error">{error}</h4>}
        {loading && <div className="error loading">logging you in...</div>}
        <i>
          don't have an account? <a href="/signup">sign up!</a>
        </i>
      </form>
    </div>
  );
};

export default Login;
