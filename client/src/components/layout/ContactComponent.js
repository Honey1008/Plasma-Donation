import React, { Component } from 'react';
import {Button, Label, Col, Row} from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import MapComponent from './MapComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val)); 
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log("Current state is :" + JSON.stringify(values));
        // alert("Current state is :" + JSON.stringify(values));
        alert("Feedback recieved thank you for providing your valuable time....!!! See you around ;)");
        this.props.resetFeedbackForm();
    }
    
    render(){
        return(
            <div className="container">
                <div className="row" >
                    <div className="col-12 col-md-5" style={{marginTop: '30px'}}>
                            <h5>
                                <img src="/assets/images/location.png" alt="" width="30px" height="30px"/>
                                &nbsp; &nbsp; Our Address
                            </h5>
                            <hr />
                                <address style={{fontSize: '15px'}}>
                                        Government Engineering College,<br />
                                        Sector 28, Gadhinagar - 382028, <br />
                                        Gujarat, India <br />
                                 </address>
                                <i className="fa fa-phone fa-lg"></i> (+91) 9106595511 <br />
                                <i className="fa fa-envelope fa-lg"></i> <a href="mailto:genesis@plasma.com">genesis@plasma.com</a>
                           
                            <br />
                            <br />
                                <h5>
                                    Find Us At
                                </h5>
                            <hr />
                                <a className="btn btn-social-icon" href="http://www.instagram.com/profile.php?id="><i className="fa fa-instagram"> </i></a>
                                <a className="btn btn-social-icon" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook" > </i></a>
                                <a className="btn btn-social-icon" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin" > </i></a>
                                <a className="btn btn-social-icon" href="http://twitter.com/"><i className="fa fa-twitter" > </i></a>
                                <a className="btn btn-social-icon" href="http://youtube.com/"><i className="fa fa-youtube" > </i></a>
                       </div>
                    <div className="col-12 col-md-6 offset-1" style={{marginTop: '30px'}}>
                        <h5>Map of our Location</h5>
                        <hr />
                        <div style={{marginLeft:'70px'}}>
                            <MapComponent />
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <div className="row" style={{margin: '0px 100px 0px 100px',
                padding: '50px 0px 20px 0px',
                border: '1px solid #f1f1f1',borderRadius: '10px'}}>
                    <div className="col-12" style={{marginLeft: '80px'}}>
                        <h2 style={{fontFamily: 'serif'}}> We would appreciate to recieve a Feedback :) </h2> <br />
                    </div>
                        <div className="col-12 col-md-10 offset-1">
                            <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="firstname" md={2}>First Name</Label>
                                    <Col md={10}>
                                        <Control.text model =".firstname" id="firstname" name="firstname"
                                            placeholder="First Name"
                                            className="form-control"
                                            validators={{
                                                required,minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                            />
                                        <Errors 
                                            className="text-danger"
                                            model=".firstname"
                                            show="touched"
                                            messages = {{
                                                required: 'Required',
                                                minLength : ' Must be greater than 2 characters',
                                                maxLength : ' Must be 15 characters or less'
                                         }}/>
                                    </Col> 
                                </Row>
                                
                                <Row className="form-group">
                                    <Label htmlFor="lastname" md={2}>Last Name</Label>
                                    <Col md={10}>
                                        <Control.text model=".lastname" id="lastname" name="lastname"
                                            placeholder="Last Name"
                                            className = "form-control"
                                            validators={{
                                                required,minLength: minLength(3), maxLength: maxLength(15)
                                            }}/>
                                                <Errors 
                                                        className="text-danger"
                                                        model=".lastname"
                                                        show="touched"
                                                        messages = {{
                                                        required: 'Required',
                                                        minLength : ' Must be greater than 2 characters',
                                                        maxLength : ' Must be 15 characters or less'
                                                }}/>
                                    </Col> 
                                </Row>
                                
                                <Row className="form-group">
                                    <Label htmlFor="phonenum" md={2}>Phone No.</Label>
                                    <Col md={10}>
                                        <Control.text model=".phonenum" id="phonenum" name="phonenum"
                                            placeholder="Phone Number"
                                            className="form-control"
                                            validators={{
                                                required,minLength: minLength(3), maxLength: maxLength(15), isNumber
                                            }}/>
                                             <Errors 
                                                    className="text-danger"
                                                    model=".phonenum"
                                                    show="touched"
                                                    messages = {{
                                                    required: 'Required',
                                                    minLength : ' Must be greater than 2 numberss',
                                                    maxLength : ' Must be 15 numbers or less',
                                                    isNumber : ' Must be a number'
                                                }}/>
                                    </Col> 
                                </Row>
                                
                                <Row className="form-group">
                                    <Label htmlFor="email" md={2}>Email</Label>
                                    <Col md={10}>
                                        <Control.text model=".email" id="email" name="email"
                                            placeholder="abc@gmail.com"
                                            className="form-control"
                                            validators={{
                                                required, validEmail
                                            }}/>
                                            <Errors 
                                                    className="text-danger"
                                                    model=".email"
                                                    show="touched"
                                                    messages = {{
                                                    required: 'Required',
                                                    validEmail : ' Invalid Email Address'
                                                }}/>
                                    </Col> 
                                </Row>

                                <Row className="form-group">
                                    <Col md={{size: 7, offset: 2}}>
                                        <div className="form-check">
                                            <Label check>
                                                <Control.checkbox model=".agree" name="agree"
                                                    className="form-check-input"
                                                    /> {' '}
                                                    <strong>Would you like to recieve any updates from us?</strong>
                                            </Label>
                                        </div>
                                    </Col>
                                    <Col md={{size: 3}}>
                                        <Control.select model=".contactType" name="contactType"
                                            className="form-control">
                                                <option>Phone Number</option>
                                                <option>Email</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="message" md={2}>Feedback</Label>
                                    <Col md={10}>
                                        <Control.textarea model=".message" id="message" name="message"
                                            rows="12" className="form-control"/>
                                    </Col>
                                </Row>
                                <br />
                                <Row className="form-group">
                                    <Col md={{size: 10,offset:2}}>
                                        <Button type="submit" style={{backgroundColor: "#171e45", color:'white',
                                        padding:'10px 20px',fontSize: '16px'}}>
                                          Send Feedback
                                         </Button>
                                    </Col>   
                                </Row>
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