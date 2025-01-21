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
                    <li><a href="/dashboard-s">Dashboard</a></li>
                    <li><a href="/dashboard/planner">Course Planner</a></li>
                    <li className="dropdown">
                        <a href="/reco">Recommendations</a>
                        <ul className="dropdown-menu">
                            <li><a href="/dashboard/advisor-recommends">Advisor Recommendations</a></li>
                            <li><a href="/reco/preset_recommendations">Preset Recommendations</a></li>
                        </ul>
                    </li>
                    <li><a href="/chat-student">Chat</a></li>

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
