import React from "react";
import '../styles/SignUp.css';

const SignUpForm = () => {
  return (
    <form>
      <h2>Create your account</h2>
      <div>
        <label>Name:</label>
        <input type="text" required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" required />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
