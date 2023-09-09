import React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className='navBar'>
            <Link to="/" className="title">Home</Link>
            <ul>
                <li>
                    <Link to="/create">Add User</Link>
                </li>
            </ul>
        </nav>
    )
}