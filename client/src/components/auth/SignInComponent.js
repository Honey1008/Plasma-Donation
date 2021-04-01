import React, { Component } from 'react';
import { Form, FormGroup,Label,Col,Input,Button } from "reactstrap";

export class SignedIn extends Component {
    state = {

    }

    render() {
        return (
            <div className="container">
                
                <div className="form-header"> 
                    <h3><strong> Login </strong></h3>
                </div>
                <div className="form-body">
                <Form onSubmit={this.handleLogin}>
                        <FormGroup row>
                            <Label htmlFor="username" md={{size: 2, offset: 1}}>Username</Label>
                            <Col md={8}>
                                <Input type="text" id="username" name="username" 
                                innerRef={(input) => this.username = input } style={{boxSizing:'border-box', padding:'0 0 0 50px'}} />
                                <i class="fa fa-user fa-lg" style={{position: 'absolute',left: '25px', top: '10px', color: 'gray'}}></i>
                            </Col>   
                        </FormGroup>
                        <FormGroup row style={{position: 'relative'}}>
                            <Label htmlFor="password" md={{size: 2, offset: 1}}>Password</Label>
                            <Col md={8}>
                            <Input type="password" id="password" name="password" 
                            innerRef={(input) => this.password = input} style={{boxSizing:'border-box', padding:'0 0 0 50px'}}/>
                            <i class="fa fa-key fa-lg" style={{position: 'absolute',left: '25px', top: '10px', color: 'gray'}}></i>
                            </Col>    
                        </FormGroup>
                        <FormGroup check row>
                            <Label check md={{size: 4, offset: 3}}>
                            <Input type="checkbox" name="remember" 
                            innerRef={(input) => this.remember = input}/>
                            Remember me
                            </Label>
                        </FormGroup>
                        <br />

                        <FormGroup row style={{justifyContent:"center"}}>
                            <Button type="submit" className="submit-form">Login</Button>
                        </FormGroup>
                        
                    </Form>   
                </div>  
            </div>
        )
    }
}

export default SignedIn;
