import React, { Component } from 'react';
import { Form, FormGroup,Label,Col,Input,Button} from "reactstrap";
import { connect } from 'react-redux';
import { signIn } from '../../redux/actions/authAction';

class LoginPage extends Component {
    state = {
        email : '',
        password : ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    render() {
        const { authError } = this.props;
        return (
            <div className="container">                
                <div className="form-header"> 
                    <h3><strong> Login </strong></h3>
                </div>
                <div className="form-body">
                <Form onSubmit={this.handleLogin}>
                        <FormGroup row>
                            <Label htmlFor="email" md={{size: 2, offset: 1}}>Email</Label>
                            <Col md={8}>
                                <Input type="text" id="email" name="email" 
                                 onChange ={this.handleChange} 
                                style={{boxSizing:'border-box', padding:'0 0 0 50px'}} />
                                <i className="fa fa-user fa-lg" style={{position: 'absolute',left: '25px', top: '10px', color: 'gray'}}></i>
                            </Col>   
                        </FormGroup>
                        <FormGroup row style={{position: 'relative'}}>
                            <Label htmlFor="password" md={{size: 2, offset: 1}}>Password</Label>
                            <Col md={8}>
                            <Input type="password" id="password" name="password" 
                            onChange={this.handleChange}
                            style={{boxSizing:'border-box', padding:'0 0 0 50px'}}/>
                            <i className="fa fa-key fa-lg" style={{position: 'absolute',left: '25px', top: '10px', color: 'gray'}}></i>
                            </Col>    
                        </FormGroup>
                        <FormGroup check row>
                            <Label check md={{size: 4, offset: 3}}>
                            <Input type="checkbox" name="remember" />
                            Remember me
                            </Label>
                        </FormGroup>
                        <br />

                        <FormGroup row style={{justifyContent:"center"}}>
                            <Button type="submit" className="submit-form">Login</Button>
                        </FormGroup>

                        <div style={{color: 'red', textAlign: 'center' }}>
                          { authError ? <p>{authError}</p>: null}
                        </div>
                       
                    </Form>   
                </div>  
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        authError : state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signIn : (creds) => dispatch(signIn(creds))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);
