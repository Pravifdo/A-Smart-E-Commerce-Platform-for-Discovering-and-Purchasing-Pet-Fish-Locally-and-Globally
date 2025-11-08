import React,{useState} from "react";
import { data } from "react-router-dom";

const Login =({setShowRegister,setIsLoggedIn,setBusinessData})=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [message,setMessage] = useState("");
    const [error,setError] = useState("");

    const handlengeLogin = async(e)=>{
        e.preventDefault();
        setError("");
        setMessage("");

        try{
            const response = await fetch("http://localhost:3000/api/shops/login",{
                method: "POST",
                headers: {"Constent-Type": "application/json"},
                body: JSON.stringify({email,password}),
            });

            if(response.ok){
                setIsLoggedIn(true);
                setBusinessData(data.shop);
                localStorage.setItem("businessData",JSON.stringify(data.shop));
                setMessage("Login successful! Redirecting...");
            }else{
                const errorData = await response.json();
                setError(errorData.message || "Login failed. Please try again.");
            }
        } catch (error) {
            setError("An unexpected error occurred. Please try again.");
        }
    };

}
return (
    <div className="auth-form-container">
        <h2>Business Login</h2>
        <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter you business email"
                />
            </div>

            <div className="form-group">
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your business password"
                />
            </div>

            <div className="form-group">
                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm your business password"
                />
            </div>

            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}

            <button type="submit" className="auth-btn">Login</button>

            <p className="toggle-link">
                Don't have an account?{" "}
                <span onClick={() => setShowRegister(true)} className="toggle-link">
                    Register
                </span>
            </p>
        </form>
    </div>
);


export default Login;