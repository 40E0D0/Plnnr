import React from "react";
import Logo from '../assets/headerlogo/plnnr-logo.png';
import '../stylings/header.css';

function Header({ handleLogout, userRole }) {
    return (
        <header className="header">
            <img src={Logo} alt="Plnnr Logo" className="logo" />
            <nav>
                <ul>
                    {/* Common Navigation Items */}
                    <li><a href="/dashboard-a">Dashboard</a></li>
                    <li><a href="/dashboard/advisor-planner">Course Planner</a></li>
                    <li><a href="/reco/preset-recommendations">Preset Recommendations</a></li>
                    <li><a href="/chat-advisor">Chat</a></li>
                    <li><a href="/advisor/manage-students">Manage Students</a></li>

                    {/* Account Dropdown */}
                    <li className="dropdown">
                        <a href="/account">Account</a>
                        <ul className="dropdown-menu">
                            <li><a href="/account/profile">Profile</a></li>
                            <li><a href="#" onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
