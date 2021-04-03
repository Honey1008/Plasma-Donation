import React, { Component } from 'react';
import '../../styles/FormComponent.css';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

class HospitalForm extends Component {
   
    state = {
        hospitalname: '',
        hospitalemail: '',
        hospitalnum: '',
        hospitaladdress: '',
        hospitalcity: '',
        hospitalstate: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleHospitalRegister = (event) => {
        event.preventDefault();  
        console.log(this.state); 
    }


    render(){
        return(
            <div className="container">
                
                <div className="form-header"> 
                <h3><strong> Hospital Form </strong></h3>
                </div>
    
                <div className="form-body">
                <Form onSubmit={this.handleHospitalRegister}>
                    <FormGroup row>
                        <Label htmlFor="hospitalname" md={1}>Name </Label>
                        <Col md={11}>
                            <Input type="text" name="hospitalname" id="hospitalname" 
                            placeholder="Hospital Name"
                            onChange={this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="hospitalemail" md={1}>Email</Label>
                        <Col md={5}>
                            <Input type="text" name="hospitalemail" id="hospitalemail" 
                            placeholder="Email"
                            onChange={this.handleChange}/>
                        </Col>
                        <Label htmlFor="hospitalnum" md={2}>Contact Number</Label>
                        <Col md={4}>
                            <Input type="text" name="hospitalnum" id="hospitalnum"
                            placeholder="Contact Number" 
                            onChange={this.handleChange}/>   
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="hospitaladdress" md={1}>Address</Label>
                       <Col md={11}>
                           <Input type="text" name="hospitaladdress" id="hospitaladdress" 
                           placeholder="Address" onChange={this.handleChange}/>                           
                       </Col>   
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="hospitalcity" md={1}>City</Label>
                        <Col md={3}>
                            <Input type="text" name="hospitalcity" id="hospitalcity"
                             placeholder="City" onChange = {this.handleChange}/>
                        </Col>
                        <Label htmlFor="hospitalstate" md={1}>State </Label>
                        <Col md={3}>
                            <Input type="text" name="hospitalstate" id="hospitalstate"
                             placeholder="State" onChange = {this.handleChange}/>
                        </Col>
                        <Label htmlFor="hospitalcountry" md={1}>Country</Label>
                        <Col md={3}>
                            <Input type="text" name="hospitalcountry" id="hospitalcountry"
                             placeholder="Country"  onChange ={this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <br />
                    <FormGroup row style={{justifyContent:"center"}}>
                        <Button type="submit" className="submit-form">
                            <strong>Register</strong> 
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        </div>
        );  
    }
}

export default HospitalForm;