import React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav>
            <Link to="/" className="title">Home</Link>
            <ul>
                <li>
                    <Link to="/create">+ Add</Link>
                </li>
            </ul>
        </nav>
    )
}