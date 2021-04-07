import React from 'react';
import '../../styles/HeaderComponent.css';
import { Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../redux/actions/authAction';

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
                    <NavLink className="nav-link" to="/aboutus" onClick={props.signOut}>
                       <strong> LogOut </strong>
                    </NavLink>
                </NavItem>
            </Nav>      
    );
  
}

const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () => dispatch(signOut())
    }
}

export default connect(null,mapDispatchToProps)(SignInLinks);