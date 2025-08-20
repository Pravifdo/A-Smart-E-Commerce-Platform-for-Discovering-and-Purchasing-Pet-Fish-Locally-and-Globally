//Login form coponent
import React from "react";

const LoginForm = () => {
  return (
    <form>
        <div className="topic-name">
            
        </div>
      <div>

        <label>Email:</label>
        <input type="email" name="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
