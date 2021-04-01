import React from 'react';
import {Form, FormGroup, Input, Label,Col, Button, Row} from 'reactstrap';


function DonorForm(props) {
        return(
            <div className="container">
                <div className="form-header">
                     <h3><strong> Donor Form </strong></h3>
                </div>  
                <div className="form-body">
                    <Form>
                        <Row form>
                            <Col md={6}>
                             <FormGroup>
                                <Label htmlFor="donorfname">First Name</Label>
                                <Input type="text" name="donorfname" id="donorfname" placeholder="First Name" />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="donorlname">Last Name</Label>
                                <Input type="text" name="donorlname" id="donorlname" placeholder="Last Name" />
                            </FormGroup>
                         </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="donornum" >Phone Number</Label>
                                <Input type="text" name="donornum" id="donornum" placeholder="Phone Number" />
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="donoremail">Email</Label>
                                <Input type="text" name="donoremail" id="donoremail" placeholder="Email" />                              
                            </FormGroup>
                            </Col>
                        </Row> 

                        <FormGroup>
                            <Label htmlFor="donoraddress">Address</Label>
                            <Input type="text" name="donoraddress" id="donoraddress" placeholder="Address"/>
                        </FormGroup>

                        <Row form>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="donorcity">City</Label>
                                <Input type="text" name="donorcity" id="donorcity" placeholder="City" />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="donorzip">Zipcode</Label>
                                <Input type="text" name="donorzip" id="donorzip" placeholder="Zipcode" />    
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="donorstate">State </Label>
                                <Input type="text" name="donorstate" id="donorstate" placeholder="State" />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="donorcountry">Country</Label>
                                <Input type="text" name="donorcountry" id="donorcountry" placeholder="Country" />    
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label htmlFor="donorBG">Blood Group</Label>
                                <Input type="select" name="donorBG">
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
                                <Label htmlFor="donorage">Age</Label>
                                <Input type="text" name="donorage" id="donorage" placeholder="Age" />                                
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label htmlFor="donorweight">Weight</Label>
                                <Input type="text" name="donorweight" id="donorweight" placeholder="Weight" />
                            </FormGroup>
                        </Col>
                    </Row> 

                    <FormGroup row>
                        <Label htmlFor="donorgender" md={2}>Gender</Label> 
                        <Col md={2}>
                                <Label check>
                                    <Input type="radio" name="donorgender" id="male" value="male" />{' '} 
                                   <span style={{margin: '30px'}}>  Male </span>
                                </Label>
                        </Col>   
                        <Col md={2}>
                                <Label check>
                                    <Input type="radio" name="donorgender" id="female" value="female" /> {' '}
                                   <span style={{margin: '30px'}}> Female </span>
                                </Label>
                        </Col>
                        <Col md={2}>
                                <Label check>
                                    <Input type="radio" name="donorgender" id="other" value="other"/> {' '}
                                    <span style={{margin: '30px'}}>Other</span>
                                </Label>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="donorMH">Medical History</Label>
                        <Input type="select" name="donorMH" aria-multiselectable className="inputscroll">
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
                        <Label htmlFor="donorMH">Other</Label>
                        <Input type="text" name="donorMH" id="donorMH" placeholder="If you selected other option mention the disease here" />
                    </FormGroup>

                    <FormGroup row>
                        <Label htmlFor="donordonated" md={5}>Have you ever donated blood/plasma?</Label> 
                        <Col md={2}>
                                <Label check>
                                    <Input type="radio" name="donordonated" id="yes" value="yes" />{' '} 
                                   <span style={{margin: '30px'}}>  Yes </span>
                                </Label>
                        </Col>   
                        <Col md={2}>
                                <Label check>
                                    <Input type="radio" name="donordonated" id="no" value="no" /> {' '}
                                   <span style={{margin: '30px'}}> No </span>
                                </Label>
                        </Col>
                    </FormGroup>  

                    <FormGroup>
                     <Label htmlFor="donorDonatedOn">If Yes then mention the date</Label>
                       <Input
                         type="date"
                         name="donorDonatedOn"
                         id="donorDonatedOn"
                         placeholder="Date"
                        />
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

export default DonorForm;