import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';

class Contact extends Component {
    constructor(props){
        super(props);

        this.state = {
            firstname : '',
            lastname : '',
            phonenum : '',
            email : '',
            agree : false,
            contactType : 'Phone Number',
            message : '',
            touched : {
                firstname: false,
                lastname: false,
                phonenum: false,
                email: false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;   
        
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        console.log("Current state is :" + JSON.stringify(this.state));
        alert("Current state is :" + JSON.stringify(this.state));
        event.preventDefault();
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: {...this.state.touched,[field]: true}
        });
    }

    validate(firstname, lastname, phonenum, email) {
        const errors= {
            firstname : '',
            lastname : '',
            phonenum : '',
            email : ''
        };
        
        if(this.state.touched.firstname && firstname.length < 3)
            errors.firstname = 'First Name should be greater than or equal to 3 character.';
        else if(this.state.touched.firstname && firstname.length > 10)
            errors.firstname = 'First Name should be less than or equal to 10 character.';

        if(this.state.touched.lastname && lastname.length < 3)
            errors.lastname = 'First Name should be greater than or equal to 3 character.';
        else if(this.state.touched.lastname && lastname.length > 10)
            errors.lastname = 'First Name should be less than or equal to 10 character.';    

        const reg = /^\d+$/;
        if(this.state.touched.phonenum && !reg.test(phonenum))
            errors.phonenum = 'Phone number should contain only numbers.';
        
        const regemail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        if(this.state.touched.email && !regemail.test(email))
            errors.email = 'Email format is incorrect please recheck your email id';

        return errors;
    }

    render(){
        const errors = this.validate(this.state.firstname, this.state.lastname,this.state.phonenum,this.state.email);
        return(
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            50-Tulsi Tenament,<br />
                            Near ITI, Jafarabad, Godhra<br />
                            Gujarat, India <br />
                            </address>
                            <i className="fa fa-phone fa-lg"></i> (+91) 9106595511 <br />
                            <i className="fa fa-envelope fa-lg"></i> <a href="mailto:genesis@plasma.com">genesis@plasma.com</a>
                    </div>
                    <div className="col-12 col-sm-6">
                        <h5>Map of our Location</h5>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3> We would appreciate to recieve a Feedback :) </h3> <br />
                    </div>
                        <div className="col-12 col-md-9">
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label htmlFor="firstname" md={2}>First Name</Label>
                                    <Col md={10}>
                                        <Input type="text" id="firstname" name="firstname"
                                            placeholder="First Name"
                                            value={this.state.firstname} 
                                            valid = {errors.firstname === ''}
                                            invalid = {errors.firstname !== ''}
                                            onBlur = {this.handleBlur('firstname')}
                                            onChange={this.handleInputChange}/>
                                            <FormFeedback>
                                                {errors.firstname}
                                            </FormFeedback>
                                    </Col> 
                                </FormGroup>
                                
                                <FormGroup row>
                                    <Label htmlFor="lastname" md={2}>Last Name</Label>
                                    <Col md={10}>
                                        <Input type="text" id="lastname" name="lastname"
                                            placeholder="Last Name"
                                            value={this.state.lastname} 
                                            valid={errors.lastname === ''}
                                            invalid = {errors.lastname !== ''}
                                            onBlur = {this.handleBlur('lastname')}
                                            onChange={this.handleInputChange}/>
                                        <FormFeedback>
                                            {errors.lastname}
                                        </FormFeedback>
                                    </Col> 
                                </FormGroup>
                                
                                <FormGroup row>
                                    <Label htmlFor="phonenum" md={2}>Phone No.</Label>
                                    <Col md={10}>
                                        <Input type="tel" id="phonenum" name="phonenum"
                                            placeholder="Phone Number"
                                            value={this.state.phonenum} 
                                            valid={errors.phonenum === ''}
                                            invalid = {errors.phonenum !== ''}
                                            onBlur = {this.handleBlur('phonenum')}
                                            onChange={this.handleInputChange}/>
                                        <FormFeedback>
                                                {errors.phonenum}
                                        </FormFeedback>
                                    </Col> 
                                </FormGroup>
                                
                                <FormGroup row>
                                    <Label htmlFor="email" md={2}>Email</Label>
                                    <Col md={10}>
                                        <Input type="email" id="email" name="email"
                                            placeholder="abc@gmail.com"
                                            value={this.state.email} 
                                            valid={errors.email === ''}
                                            invalid = {errors.email !== ''}
                                            onBlur = {this.handleBlur('email')}
                                            onChange={this.handleInputChange}/>
                                        <FormFeedback>
                                            {errors.email}
                                        </FormFeedback>
                                    </Col> 
                                </FormGroup>

                                <FormGroup row>
                                    <Col md={{size: 6, offset: 2}}>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox" name="agree"
                                                    checked = { this.state.agree } 
                                                    onChange={this.handleInputChange}/> {' '}
                                                    <strong>Would you like to recieve any updates from us?</strong>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md={{size: 3, offset: 1}}>
                                        <Input type="select" name="contactType"
                                            value= {this.state.contactType}
                                            onChange={this.handleInputChange}>
                                                <option>Phone Number</option>
                                                <option>Email</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="message" md={2}>Your Feedback</Label>
                                    <Col md={10}>
                                        <Input type="textarea" id="message" name="message"
                                               rows="12" value={this.state.message} 
                                               onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{size: 10,offset:2}}>
                                        <Button type="submit" style={{backgroundColor: "#171E45"}}>
                                            Send Feedback
                                         </Button>
                                    </Col>   
                                </FormGroup>
                            </Form> 
                         </div>
                        </div>
                    <div>
                </div>
            </div>
        );
    }
    
}

export default Contact;