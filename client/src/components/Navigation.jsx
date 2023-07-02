import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
    render() {
        return (
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/files">File List</Link></li>
                    <li><Link to="/folders">Folder List</Link></li>
                    <li><Link to="/upload">Upload</Link></li>
                </ul>
            </nav>
        );
    }
}

export default Navigation;

