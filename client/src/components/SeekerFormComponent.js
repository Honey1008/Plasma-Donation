import React from 'react';
import {Form, FormGroup, Input, Label,Col, Button, Row} from 'reactstrap';
import '../styles/FormComponent.css';

function SeekerForm(props){

    return(
        <div className="container">
            <div className="form-header">
                <h3><strong> Seeker Form </strong></h3>
            </div>  
            <div className="form-body">
                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                            <Label htmlFor="seekerfname">First Name</Label>
                            <Input type="text" name="seekerfname" id="seekerfname" placeholder="First Name" />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="seekerlname">Last Name</Label>
                            <Input type="text" name="seekerlname" id="seekerlname" placeholder="Last Name" />
                        </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="seekernum" >Phone Number</Label>
                                <Input type="text" name="seekernum" id="seekernum" placeholder="Phone Number" />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="seekeremail">Email</Label>
                                <Input type="text" name="seekeremail" id="seekeremail" placeholder="Email" />                              
                            </FormGroup>
                        </Col>
                    </Row>  

                    <FormGroup>
                        <Label htmlFor="seekeraddress">Address</Label>
                        <Input type="text" name="seekeraddress" id="seekeraddress" placeholder="Address"/>
                    </FormGroup>

                    <Row form>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="seekercity">City</Label>
                                <Input type="text" name="seekercity" id="seekercity" placeholder="City" />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="seekerzip">Zipcode</Label>
                                <Input type="text" name="seekerzip" id="seekerzip" placeholder="Zipcode" />    
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="seekerstate">State </Label>
                                <Input type="text" name="seekerstate" id="seekerstate" placeholder="State" />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="seekercountry">Country</Label>
                                <Input type="text" name="seekercountry" id="seekercountry" placeholder="Country" />    
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label htmlFor="seekerBG">Blood Group</Label>
                                <Input type="select" name="seekerBG">
                                    <option>A+</option>
                                    <option>A-</option>
                                    <option>B+</option>
                                    <option>B-</option>
                                    <option>AB+</option>
                                    <option>AB-</option>
                                    <option>O+</option>
                                    <option>O-</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label htmlFor="seekerage">Age</Label>
                                <Input type="text" name="seekerage" id="seekerage" placeholder="Age" />                                
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label htmlFor="seekerweight">Weight</Label>
                                <Input type="text" name="seekerweight" id="seekerweight" placeholder="Weight" />
                            </FormGroup>
                        </Col>
                    </Row> 

                    <FormGroup row>
                        <Label htmlFor="seekergender" md={2}>Gender</Label> 
                        <Col md={2}>
                                <Label check>
                                    <Input type="radio" name="seekergender" id="male" value="male" />{' '} 
                                   <span style={{margin: '30px'}}>  Male </span>
                                </Label>
                        </Col>   
                        <Col md={2}>
                                <Label check>
                                    <Input type="radio" name="seekergender" id="female" value="female" /> {' '}
                                   <span style={{margin: '30px'}}> Female </span>
                                </Label>
                        </Col>
                        <Col md={2}>
                                <Label check>
                                    <Input type="radio" name="seekergender" id="other" value="other"/> {' '}
                                    <span style={{margin: '30px'}}>Other</span>
                                </Label>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="seekerMH">Medical History</Label>
                        <Input type="select" name="seekerMH" aria-multiselectable className="inputscroll">
                            <option>None</option>
                            <option>Anaemia, including haematinic (iron, B12 and folate) deficiency</option>
                            <option>Blood Pressure</option>
                            <option>Coagulation disorders, including haemophilia A and B</option>
                            <option>Cardiovascular disease</option>
                            <option>Diabetes</option>
                            <option>Gastrointestinal Disease</option>
                            <option>Hypertension</option>
                            <option>Hepatitis B virus (HBV)</option>
                            <option>Hepatitis C virus (HCV)</option>
                            <option>Human Immunodeficiency virus Types 1 and 2 (HIV)</option>
                            <option>Human T-Lymphotropic Virus Types I and II (HTLV)</option>
                            <option>Immunological Disease</option>
                            <option>Central Nervous System Disease</option>
                            <option>Respiratory diseases, including asthama</option>
                            <option>Thyroid</option>
                            <option>Treponema pallidum (syphilis)</option>
                            <option>West Nile virus (WNV)</option>
                            <option>Zika Virus (ZIKV)</option>
                            <option>Other</option>
                        </Input>

                    </FormGroup>

                    <FormGroup>                       
                        <Label htmlFor="seekerMH">Other</Label>
                        <Input type="text" name="seekerMH" id="seekerMH" placeholder="If you selected other option mention the disease here" />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="seekerdescription">Description</Label>
                        <Input type="text" name="seekerdescription" 
                        placeholder="Mention why you need blood/plasma"/>
                    </FormGroup> 
                   
                    <FormGroup row>
                        <Label htmlFor="seekerdonated" md={5}>Have you ever donated blood/plasma?</Label> 
                        <Col md={2}>
                                <Label check>
                                    <Input type="radio" name="seekerdonated" id="yes" value="yes" />{' '} 
                                   <span style={{margin: '30px'}}>  Yes </span>
                                </Label>
                        </Col>   
                        <Col md={2}>
                                <Label check>
                                    <Input type="radio" name="seekerdonated" id="no" value="no" /> {' '}
                                   <span style={{margin: '30px'}}> No </span>
                                </Label>
                        </Col>
                    </FormGroup>  
                    <FormGroup>
                     <Label htmlFor="seekerDonatedOn">If Yes then mention the date</Label>
                       <Input
                         type="date"
                         name="seekerDonatedOn"
                         id="seekerDonatedOn"
                         placeholder="Date"
                        />
                     </FormGroup>                  
                <br />
                    <FormGroup row style={{justifyContent:"center"}}>
                        <Button type="submit" className="addsubmit">
                            <strong>Register</strong> 
                        </Button>
                    </FormGroup>


                </Form>
            </div> 
        </div>
        );
    }


export default SeekerForm;