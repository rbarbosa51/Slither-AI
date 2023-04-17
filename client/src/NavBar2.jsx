import React from "react";
import './sass/NavBar.scss';
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Hamburger from "./Hamburger";
import { useState } from "react";
import Auth from "./utils/auth";


export default function NavBar() {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
        var tgt = document.getElementById("dropdown");
        if (tgt.classList.contains('drop')) {
            tgt.classList.add('hide');
            tgt.classList.remove('drop');
          } else {
            tgt.classList.remove('hide');
            tgt.classList.add('drop');
        
          }
    }

    return (
        <header>
            <h1>
                <Link className="homeBtn" to="/">
                        SlitherAI
                </Link>
            </h1>
            {/* <img src={testImage} alt="" /> */}
            {/*Add React Router links, Context etc */}
            <nav> 
                <div id="dropdown">
                    <div> 
                        <Link className="linkBtn" to="/Instructions">
                        Instructions
                        </Link> 
                    </div>
                    <div>
                        <Link className="linkBtn" to="/Game">
                        Main Game
                        </Link>
                    </div>
                    <div>
                        <Link className="linkBtn" to="/Comments">
                        Comments
                        </Link>
                    </div>
                    <div>
                        <Link className="linkBtn" to="/About">
                        About Us
                        </Link>
                    </div>
                    <div>
                        {Auth.loggedIn() ? (
                            <>
                                <button className="linkBtn" onClick={logout}> 
                                    Logout
                                </button>
                                
                            </>
                        ) : (
                            <>
                                <Link className="linkBtn" to="/Login">
                                    Login/SignUp
                                </Link>
                            </>
                        )
                    }
                    </div>
                    
                </div>
                <div className="borgir" onClick={toggleHamburger}>
                    <Hamburger />
                </div>
            </nav>
        </header>
    )
}