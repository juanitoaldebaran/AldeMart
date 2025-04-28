import "../Navbar/Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="navbar-container">
            <div className="navbar-left">
                <h1 className="navbar-logo">AldeMart</h1>
            </div>
            <div className="navbar-center">
                <div className="link-navbar-container">
                    <Link to={"/home"} className="navbar-link">Home</Link>
                    <Link to={"/aboutus"} className="navbar-link">About Us</Link>
                    <Link to={"/product"} className="navbar-link">Product</Link>
                    <Link to={"/contact"} className="navbar-link">Contact</Link>
                </div>
            </div>
            <div className="navbar-right">
                <div className="navbar-button-container">
                    <Link to={"/login"} className="navbar-link">Sign In</Link>
                    <Link to={"/setting"} className="navbar-link">Setting</Link>
                </div>
            </div>
        </div>
    )
}
