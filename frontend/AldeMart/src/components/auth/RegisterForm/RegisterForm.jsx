import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { data, Link, useNavigate } from "react-router-dom";
import "../RegisterForm/RegisterForm.css";
import authApi from "../../../api/authApi";

export default function RegisterForm() {
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
    });
    const [confirmData, setConfirmData] = useState({
        confirmEmail: "",
        confirmPassword: "",
    })
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmEmail: "",
        confirmPassword: "",
        general: "",
    });

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prevRegisterData) => ({
            ...prevRegisterData,
            [name]: value,
        }));
    };

    const handleConfirmChange = (e) => {
        const { name, value } = e.target;
        setConfirmData((prevConfirmData) => ({
            ...prevConfirmData,
            [name]: value,
        }));
    }

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            email: "",
            password: "",
            confirmEmail: "",
            confirmPassword: "",
            general: "",
        }

        if (!registerData.email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
            newErrors.email = "Email is invalid";
            isValid = false;
        }

        if (!registerData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (registerData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
            isValid = false;
        }

        if (registerData.email != confirmData.confirmEmail) {
            newErrors.confirmEmail = "Email and confirmation email not match";
            isValid = false;
        } else if (registerData.password != confirmData.confirmPassword) {
            newErrors.confirmPassword = "Password and confirmation password not match";
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
        setErrors((prev) => ({
            ...prev,
            general: "",
        }));

        try {
            await authApi.signIn(registerData.email, registerData.password);
            if (data && data.token) {
                localStorage.setItem("token", data.token);
                navigate("/signin");
            }
        } catch (error) {
            setErrors();
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="register-form-container">
            <div className="register-form-wrapper">
                <div className="signup-header-container">
                    <h3 className="signup-header">Sign Up</h3>
                </div>

                {errors.general && <div className="error-message">{errors.general}</div>}
                <form onSubmit={handleSubmit} className="form-signup-container">
                    <div className="icon-group">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={`email-input ${errors.email ? "input-error" : ""}`}
                            value={registerData.email}
                            placeholder="Email"
                            onChange={handleRegisterChange}
                        />
                    </div>
                    {errors.email && <div className="error-text">{errors.email}</div>}

                    <div className="icon-group">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <input
                            id="confirmEmail"
                            name="confirmEmail"
                            type="email"
                            className={`confirm-email-input ${errors.confirmEmail ? "input-error" : ""}`}
                            value={confirmData.confirmEmail}
                            placeholder="Confirm Email"
                            onChange={handleConfirmChange}
                        />
                    </div>
                    {errors.confirmEmail && <div className="error-text">{errors.confirmEmail}</div>}

                    <div className="icon-group">
                        <FontAwesomeIcon icon={faLock} className="icon" />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className={`password-input ${errors.password ? "input-error" : ""}`}
                            value={registerData.password}
                            placeholder="Password"
                            onChange={handleRegisterChange}
                        />
                    </div>
                    {errors.password && <div className="error-text">{errors.password}</div>}

                    <div className="icon-group">
                        <FontAwesomeIcon icon={faLock} className="icon" />
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            className={`confirm-password-input ${errors.confirmPassword ? "input-error" : ""}`}
                            value={confirmData.confirmPassword}
                            placeholder="Confirm Password"
                            onChange={handleConfirmChange}
                        />
                    </div>
                    {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}

                    <div className="remember-me-container">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember" className="remember-me-text">Remember me?</label>
                    </div>

                    <button type="submit" className="signup-btn" disabled={isLoading}>
                        {isLoading ? "Signing Up..." : "Sign Up"}
                    </button>

                    <p className="already-have-account">
                        Already have an account? <Link to="/login">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}