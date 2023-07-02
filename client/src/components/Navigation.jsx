import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navigation() {
    const navigate = useNavigate();
    
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link onClick={() => navigate('/files')}>File List</Link></li>
                <li><Link onClick={() => navigate('/folders')}>Folder List</Link></li>
                <li><Link onClick={() => navigate('/upload')}>Upload</Link></li>
            </ul>
        </nav>
    );
}

export default Navigation;
