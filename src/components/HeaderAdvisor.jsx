import React from "react";
import { useLocation } from "react-router-dom";
import Logo from '../assets/headerlogo/plnnr-logo.png';
import '../stylings/header.css';

function Header({ handleLogout, userRole }) {
    const location = useLocation(); // Get current path
    const isActive = (path) => location.pathname === path;

    return (
        <header className="header">
            <img src={Logo} alt="Plnnr Logo" className="logo" />
            <nav>
                <ul>
                    {/* Common Navigation Items */}
                    <li className={isActive('/dashboard-a') ? 'active' : ''}><a href="/dashboard-a">Dashboard</a></li>
                    <li className={isActive('/dashboard/advisor-planner') ? 'active' : ''}><a href="/dashboard/advisor-planner">Course Planner</a></li>
                    <li className={isActive('#') ? 'active' : ''}><a href="#">Preset Recommendations</a></li>
                    <li className={isActive('/chat-advisor') ? 'active' : ''}><a href="/chat-advisor">Chat</a></li>
                    <li className={isActive('/manage-students') ? 'active' : ''}><a href="/manage-students">Manage Students</a></li>

                    {/* Account Dropdown */}
                    <li className="dropdown">
                        <a href="#">Account</a>
                        <ul className="dropdown-menu">
                            <li className={isActive('/account/profile-advisor') ? 'active' : ''}><a href="/account/profile-advisor">Profile</a></li>
                            <li className={isActive('/feedback-hub-a') ? 'active' : ''}><a href="/feedback-hub-a">Feedback Hub</a></li>
                            <li><a href="#" onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
