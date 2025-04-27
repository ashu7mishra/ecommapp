import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
            <nav className="bg-white shadow-md p-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    EcommApp
                </Link>
                <div className="space-x-4">
                    <Link to="/login" className="text-blue-600 hover:text-blue-800">
                    Login
                    </Link>
                    <Link to="/signup" className="text-blue-600 hover:text-blue-800">
                    Sign Up
                    </Link>
                </div>
        </nav>
    );
}

export default Navbar;