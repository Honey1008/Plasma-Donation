import React, { Component } from 'react';
import '../styles/HeaderComponent.css';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,
UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem,Button, 
Modal, ModalHeader, ModalBody,Form, FormGroup, Input, Label} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component{

    constructor(props){
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            isViewActive : false
        };
        this.toggleNav = this.toggleNav.bind(this);
        // this.handleViewActive = this.handleViewActive.bind(this);
        // this.toggleModal = this.toggleModal.bind(this);
        // this.handleLogin = this.handleLogin.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen            
        });
    }

    // handleViewActive() {
    //     if(window.location.pathname === '/seekers' || window.location.pathname === '/hospital')
    //         this.setState({
    //             isViewActive: true 
    //         });
    //     else 
    //         this.setState({
    //             isViewActive: false
    //         });
    // }

    // toggleModal() {
    //     this.setState({
    //         isModalOpen: !this.state.isModalOpen
    //     })
    // }

    // handleLogin(event) {
    //     this.toggleModal();
    //     alert("Username: "+ this.username.value + " Password: " + this.password.value 
    //     +" Remember: " + this.remember.checked);
    //     event.preventDefault();
    // }


    render(){
        return(
            <>
            <Navbar dark expand="md">
                    <NavbarBrand href="/" style={{float: 'left', marginLeft: '40px'}}> 
                            <img alt="Plasma Genesis" width="45px" height="45px" src="assets/images/logo.png" /> 
                            <strong>Plasma Genesis</strong>
                    </NavbarBrand>                   
                    <div>
                    <NavbarToggler onClick={this.toggleNav} style={{float: 'left',marginLeft:'40px'}}/>
                    <Collapse isOpen={this.state.isNavOpen} navbar style={{float: 'left',marginLeft:'40px'}}>
                    <Nav navbar style={{float: 'right', marginLeft: '550px'}}>
                        <NavItem>
                            <NavLink className="nav-link" to="/home">
                               <strong> Home </strong>
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown inNavbar setActiveFromChild>
                                    <DropdownToggle nav caret>  
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
                               <strong>About</strong>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/contactus">
                               <strong>Contact</strong>
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown inNavbar setActiveFromChild >
                                    <DropdownToggle nav caret >  
                                           <strong>Get Started</strong> 
                                    </DropdownToggle>
                                    
                                    <DropdownMenu style={{backgroundColor: "#171E45"}}>
                                        <DropdownItem  style={{backgroundColor: "#171E45"}} tag="a" href="/hospitalform" active>
                                        Join as Hospital
                                        </DropdownItem>
                                        <DropdownItem divider/>
                                        <DropdownItem style={{backgroundColor: "#171E45"}} tag="a" href="/seekerform" active>
                                        Join as Seeker
                                        </DropdownItem>
                                        <DropdownItem divider/>
                                        <DropdownItem style={{backgroundColor: "#171E45"}} tag="a" href="/donorform" active>
                                        Join as Donor
                                        </DropdownItem>
                                    </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    {/* <Nav navbar className="ml-auto">
                        <NavItem>
                            <Button outline  onClick={this.toggleModal}>
                                <strong style={{color: 'white'}}>Login/SignUp</strong>
                            </Button>
                        </NavItem>
                    </Nav> */}
                    </Collapse>
                </div>
                
            </Navbar>
            {/* <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader isOpen={this.state.isModalOpen} toggle={this.toggleModal}
                className="modal-header">Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleLogin}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username" 
                            innerRef={(input) => this.username = input} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password" 
                            innerRef={(input) => this.password = input}/>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input type="checkbox" name="remember" 
                            innerRef={(input) => this.remember = input}/>
                            Remember me
                            </Label>
                        </FormGroup>
                        <Button type="submit" value="submit" className="login-button">Login</Button>
                    </Form>
                </ModalBody>
            </Modal>  */}
         </>
        );
    }
}

export default Header;