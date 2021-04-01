import React from 'react';
import '../../styles/HeaderComponent.css';
import { NavLink } from 'react-router-dom';

function SignedOut (props) {
    return(
        <ul className="right">
            <li><NavLink to="/">SignUp</NavLink></li>
            <li><NavLink to="/">LogIn</NavLink></li>
        </ul>             
    )

}

export default SignedOut;

import React from 'react';
import '../../styles/HeaderComponent.css';
import { NavLink } from 'react-router-dom';

function SignedIn (props) {
    return(
        <ul className="right">
            <li><NavLink to="/">View Entities</NavLink></li>
            <li><NavLink to="/">Register</NavLink></li>
            <li><NavLink to="/">About Us</NavLink></li>
            <li><NavLink to="/">Contact Us</NavLink></li>
        </ul>             
    )

}

export default SignedIn;