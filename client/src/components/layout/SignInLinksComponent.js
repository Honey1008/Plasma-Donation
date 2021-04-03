

import React from 'react';
import '../../styles/HeaderComponent.css';
import { Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';

function SignInLinks(props){
        return(        
            <Nav navbar className="ml-auto">
                <NavItem>
                    <NavLink className="nav-link" to="/aboutus">
                       <strong>About Us</strong>
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink className="nav-link" to="/contactus">
                       <strong>Contact Us</strong>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="nav-link" to="/myprofile">
                    <i className="fa fa-user-circle"></i>
                       <strong> My Profile</strong>
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink className="nav-link" to="/home">
                       <strong> LogOut </strong>
                    </NavLink>
                </NavItem>
            </Nav>      
    );
  
}

export default SignInLinks;