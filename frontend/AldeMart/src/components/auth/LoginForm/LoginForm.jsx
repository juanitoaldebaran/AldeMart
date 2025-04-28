import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "../LoginForm/LoginForm.css";
import authApi from "../../../api/authApi";

export default function LoginForm() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        general: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e) => {    
        const { name, value } = e.target;
        setLoginData((prevLoginData) =>({
            ...prevLoginData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            email: "",
            password: "",
            general: "",
        }

        if (!loginData.email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
            newErrors.email = "Email is invalid";
            isValid = false;
        }

        if (!loginData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setErrors((prev) => ({...prev, general: ""}));
        try {
            const data = await authApi.signIn(loginData.email, loginData.password);
            if (data && data.token) {
                localStorage.setItem("token", data.token);

                if (rememberMe) {
                    localStorage.setItem("userEmail", loginData.email);
                } else {
                    localStorage.removeItem("userEmail");
                }

                navigate("/");
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
           setErrors((prevError) => ({...prevError, general: error.message || "Login failed, please check your credentials"}));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="login-form-container">
            <div className="login-form-wrapper">
                <div className="login-header-container"> 
                    <h2 className="sign-in-header">Sign In</h2>
                </div>

                {errors.general && <div className="error-content">{errors.general}</div>}

                <form onSubmit={handleSubmit} className="form-login-container">
                    <div className="input-group">
                        <FontAwesomeIcon icon={faEnvelope} className="icon"/>
                        <input id="email" name="email" className={`email-input ${errors.email ? "input-error" : ""}`} type="text" value={loginData.email} placeholder="Email" onChange={handleChange}/>
                    </div>
                    {errors.email && <div className="error-text">{errors.email}</div>}
                    <div className="input-group">
                        <FontAwesomeIcon icon={faLock} className="icon"/>
                        <input id="password" name="password" className={`password-input ${errors.password ? "input-error" : ""}`} type="password" value={loginData.password} placeholder="Password" onChange={handleChange}/>
                    </div>
                    {errors.password && <div className="error-text">{errors.password}</div>}
                    <div className="remember-me-container">
                        <input type="checkbox" id="remember"/>
                        <label htmlFor="remember" className="remember-me-text" onChange={(e) => setRememberMe(e.target.checked)}>Remember me?</label>
                    </div>
                    <button type="submit" className="signin-btn">
                        {isLoading ? "Signing In...": "Sign In"}
                    </button>
                    <p className="create-an-account">Create an account? <Link to={'/signup'}>Sign Up</Link></p>
                </form>
            </div>
        </div>
    )
}