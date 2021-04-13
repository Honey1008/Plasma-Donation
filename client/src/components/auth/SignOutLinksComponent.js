import React from 'react';
import '../../styles/HeaderComponent.css';
import { Nav, NavItem, UncontrolledDropdown, DropdownItem,DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';

function SignOutLinks (props) {
    return(      
            <Nav navbar className="ml-auto"> 
            <UncontrolledDropdown inNavbar setActiveFromChild>
                            <DropdownToggle nav caret >  
                                   <strong>Get Started</strong> 
                            </DropdownToggle>
                            
                            <DropdownMenu style={{backgroundColor: "#171E45"}}>
                                <DropdownItem style={{backgroundColor: "#171E45"}} tag="a" href="/seekerform" active>
                                <strong>Join as Seeker</strong>
                                </DropdownItem>
                                <DropdownItem divider/>
                                <DropdownItem style={{backgroundColor: "#171E45"}} tag="a" href="/donorform" active>
                                <strong>Join as Donor</strong>
                                </DropdownItem>
                            </DropdownMenu>

            </UncontrolledDropdown>
            <NavItem>
                    <NavLink className="nav-link" to="/login">
                       <strong> LogIn </strong>
                    </NavLink>
            </NavItem>    
            </Nav>
    )
}

export default SignOutLinks;