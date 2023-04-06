import React from "react";
import './sass/NavBar.scss';
import testImage from './assets/testImage.png';

export default function NavBar() {
    return (
        <>
            <h1>Placeholder Title & image</h1>
            <img src={testImage} alt="" />
            {/*Add React Router links, Context etc */}
            <p>Inside the Navbar</p>
        </>
    )
}