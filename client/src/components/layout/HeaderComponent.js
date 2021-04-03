import React, { Component } from 'react';
import '../../styles/HeaderComponent.css';
import { Navbar, NavbarBrand, NavbarToggler, Collapse} from 'reactstrap';
import SignInLinks from './SignInLinksComponent';
import SignOutLinks from './SignOutLinksComponent';


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
            <Navbar dark expand="md">
                    <NavbarBrand href="/" style={{float: 'left', marginLeft: '2%'}}> 
                            <img alt="Plasma Genesis" width="45px" height="45px" src="../../../assets/images/logo.png" /> 
                            <strong>Plasma Genesis</strong>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNav}/>
                    <Collapse isOpen={this.state.isNavOpen} navbar  style={{float: 'left', marginLeft: '40px'}}>
                            {/* <SignInLinks /> */}
                            <SignOutLinks />
                     </Collapse>
            </Navbar>
        );
    }
}

export default Header;