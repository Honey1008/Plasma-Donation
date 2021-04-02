import React from 'react';
import '../../styles/HeaderComponent.css';
import { Nav, NavItem, UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';

function SignOut(props){
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
                
                <UncontrolledDropdown inNavbar setActiveFromChild>
                            <DropdownToggle nav caret >  
                                   <strong>Get Started</strong> 
                            </DropdownToggle>
                            
                            <DropdownMenu style={{backgroundColor: "#171E45"}}>
                                <DropdownItem  style={{backgroundColor: "#171E45"}} tag="a" href="/hospitalform" active>
                                <strong>Join as Hospital</strong>
                                </DropdownItem>
                                <DropdownItem divider/>
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
                    <NavLink className="nav-link" to="/home">
                       <strong> LogOut </strong>
                    </NavLink>
                </NavItem>
            </Nav>      
    );
  
}

export default SignOut;