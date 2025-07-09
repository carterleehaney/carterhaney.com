import React from 'react';
import { Link } from 'react-router-dom';
import './TopNav.css';

function TopNav() {
    return (
        <nav className="topnav">
            <ul>
                <li><Link to="/blogs">Blogs</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    )
}

export default TopNav;