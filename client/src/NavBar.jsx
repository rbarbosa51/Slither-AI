import React from "react";
import './sass/NavBar.scss';
import testImage from './assets/testImage.png';
import { Link, useMatch, useResolvedPath } from "react-router-dom";


export default function NavBar() {
    return (
        <header>
            <h1>SlitherAI</h1>
            {/* <img src={testImage} alt="" /> */}
            {/*Add React Router links, Context etc */}
            <nav>
            <Link className="linkBtn" to="/Instructions">
                Instructions
            </Link>
            <Link className="linkBtn" to="/Game">
                Main Game
            </Link>
            <Link className="linkBtn" to="/Comments">
                Comments
            </Link>
            <Link className="linkBtn" to="/About">
                About Us
            </Link>
            </nav>
        </header>
    )
}