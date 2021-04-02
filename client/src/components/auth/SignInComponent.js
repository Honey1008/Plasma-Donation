import React from 'react';
import '../../styles/HeaderComponent.css';
import { Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';

function SignIn (props) {
    return(      
            <Nav navbar className="ml-auto"> 
                <NavItem>
                    <NavLink className="nav-link" to="/signup">
                       <strong> SignUp </strong>
                    </NavLink>
                </NavItem>
            <NavItem>
                    <NavLink className="nav-link" to="/login">
                       <strong> LogIn </strong>
                    </NavLink>
            </NavItem>    
            </Nav>
    )
}

export default SignIn;