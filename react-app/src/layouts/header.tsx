import React from 'react';
import { NavLink } from "react-router";
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const location = useLocation();
    const shouldHideMenu = /^\/[0-9a-fA-F-]{36}$/.test(location.pathname);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">Team Generator</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {!shouldHideMenu &&
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink
                                to="/players"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                Players
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/teams"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                Teams
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/team-generator"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                Generate Teams
                            </NavLink>
                        </li>
                    </ul>
                </div>
                }
            </div>
        </nav>
    );
};

export default Header;
