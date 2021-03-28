import React, { Component } from 'react';
import '../styles/HeaderComponent.css';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component{

    constructor(props){
        super(props);

        this.state = {
            isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }


    render(){
        return(
            <>
            <Navbar dark expand="md">
                    <NavbarBrand href="/" style={{float: 'left', marginLeft: '40px'}}> 
                            <img alt="Plasma Genesis" width="8%" height="8%" src="assets/images/logo.png"
                            alt="Plasma Genesis" /> 
                            <strong>Plasma Genesis</strong>
                    </NavbarBrand>                   
                    <div style={{float: 'right',paddingLeft: '100px'}}>
                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-link" to="/home">
                               <strong> Home </strong>
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown inNavbar setActiveFromChild >
                                    <DropdownToggle nav caret >  
                                           <strong> View Entities </strong> 
                                    </DropdownToggle>
                                    
                                    <DropdownMenu style={{backgroundColor: "#171E45"}}>
                                        <DropdownItem  style={{backgroundColor: "#171E45"}} tag="a" href="/hospitals" active>
                                         Plasma Manager 
                                        </DropdownItem>
                                        <DropdownItem divider/>
                                        <DropdownItem style={{backgroundColor: "#171E45"}} tag="a" href="/hospitals" active>
                                         Hospitals
                                        </DropdownItem>
                                        <DropdownItem divider/>
                                        <DropdownItem style={{backgroundColor: "#171E45"}} tag="a" href="/seekers" active>
                                         Seekers 
                                        </DropdownItem>
                                        <DropdownItem divider/>
                                        <DropdownItem style={{backgroundColor: "#171E45"}} tag="a" href="/seekers" active>
                                         Donors 
                                        </DropdownItem>
                                    </DropdownMenu>
                        </UncontrolledDropdown>
                         
                        <NavItem>
                            <NavLink className="nav-link" to="/aboutus">
                               <strong>  About Us </strong>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/contactus">
                               <strong> Contact Us </strong>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/getstarted">
                               <strong> Get Started </strong>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    </Collapse>
                </div>
                
            </Navbar>
         </>
        );
    }
}

export default Header;