import React, { useState } from "react";
import { useSignup } from "../Hooks/useSignup";
import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await signup(email, password);
    if (success) {
      navigate("/account");
    }
    setPassword("");
  };

  return (
    <div className="formContainer">
      <form className="signup" onSubmit={handleSubmit}>
        <p>Wellcome to Tech Gear Shop</p>
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
        <button disabled={loading}>sign up</button>
        {error && <h4 className="error">{error}</h4>}
        {loading && <div className="error loading">signing you up...</div>}
        <i>
          already have an account? <a href="/login">login in!</a>
        </i>
      </form>
    </div>
  );
};

export default SignUp;
