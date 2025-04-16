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
                    <li className={isActive('/dashboard-s') ? 'active' : ''}><a href="/dashboard-s">Dashboard</a></li>
                    <li className={isActive('/dashboard/planner') ? 'active' : ''}><a href="/dashboard/planner">Course Planner</a></li>
                    <li className="dropdown">
                        <a href="/reco">Recommendations</a>
                        <ul className="dropdown-menu">
                            <li className={isActive('/dashboard/advisor-recommends') ? 'active' : ''}><a href="/dashboard/advisor-recommends">Advisor Recommendations</a></li>
                            <li className={isActive('#') ? 'active' : ''}><a href="#">Preset Recommendations</a></li>
                        </ul>
                    </li>
                    <li className={isActive('/chat-student') ? 'active' : ''}><a href="/chat-student">Chat</a></li>

                    {/* Account Dropdown */}
                    <li className="dropdown">
                        <a href="#">Account</a>
                        <ul className="dropdown-menu">
                            <li className={isActive('/account/profile-student') ? 'active' : ''}><a href="/account/profile-student">Profile</a></li>
                            <li className={isActive('/feedback-hub') ? 'active' : ''}><a href="/feedback-hub">Feedback Hub</a></li>
                            <li><a href="#" onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
