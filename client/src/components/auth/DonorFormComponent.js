import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, FormGroup, Input, Label,Col, Button, Row} from 'reactstrap';
import instance from '../../contracts/instance';
import web3 from '../../contracts/web3';

class DonorForm extends Component{

    state = {
        donorfname : '',
        donorlname : '',
        donornum : '',
        donoremail : '',
        donoraddress : '',
        donorcity : '',
        donorzipcode : '',
        donorstate : '',
        donorcountry : '',
        donorBG : 'A+',
        donorgender : 'Male',
        donorage : '', 
        donorweight : 0,
        donorMH : 'None',
        donorDonatedOn : '',
        donorhospital : ''
    }

    calculateHash(str, algo = "SHA-256") {
        let strBuf = new TextEncoder('utf-8').encode(str);
        return crypto.subtle.digest(algo, strBuf)
          .then(hash => {
            window.hash = hash;
            // here hash is an arrayBuffer, 
            // so we'll connvert it to its hex version
            let result = '';
            const view = new DataView(hash);
            for (let i = 0; i < hash.byteLength; i += 4) {
              result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
            }
            return result;
          });
    }  
    
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleDonorRegister(event){
        event.preventDefault();  
        let hashOfDonorData;
        const dataString = this.state.donorfname+this.state.donorlname+this.state.donornum+ this.state.donoremail+ this.state.donoraddress
                            +this.state.donorcity+this.state.donorzipcode+this.state.donorstate+this.state.donorcountry+this.state.donorBG
                            +this.state.donorage+this.state.donorweight+ this.state.donorgender+this.state.donorMH + this.state.donordescription;
        dataString.replace(/\s+/g, '');
        this.calculateHash(dataString)
            .then(
                hash => {
                 hashOfDonorData = hash;
                }
            );

    }

    render(){

        return(
            <div className="container">
                <div className="form-header">
                     <h3><strong> Donor Form </strong></h3>
                </div>  
                <div className="form-body">
                    <Form onSubmit={this.handleDonorRegister}>
                        <Row form>
                            <Col md={6}>
                             <FormGroup>
                                <Label htmlFor="donorfname">First Name</Label>
                                <Input type="text" name="donorfname" id="donorfname" placeholder="First Name" onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="donorlname">Last Name</Label>
                                <Input type="text" name="donorlname" id="donorlname" placeholder="Last Name" onChange={this.handleChange}/>
                            </FormGroup>
                         </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="donornum" >Phone Number</Label>
                                <Input type="text" name="donornum" id="donornum" placeholder="Phone Number" onChange={this.handleChange}/>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="donoremail">Email</Label>
                                <Input type="text" name="donoremail" id="donoremail" placeholder="Email" onChange={this.handleChange}/>                              
                            </FormGroup>
                            </Col>
                        </Row> 

                        <FormGroup>
                            <Label htmlFor="donoraddress">Address</Label>
                            <Input type="text" name="donoraddress" id="donoraddress" placeholder="Address" onChange={this.handleChange}/>
                        </FormGroup>

                        <Row form>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="donorcity">City</Label>
                                <Input type="text" name="donorcity" id="donorcity" placeholder="City" onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="donorzipcode">Zipcode</Label>
                                <Input type="text" name="donorzipcode" id="donorzipcode" placeholder="Zipcode" onChange={this.handleChange}/>    
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="donorstate">State </Label>
                                <Input type="text" name="donorstate" id="donorstate" placeholder="State" onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="donorcountry">Country</Label>
                                <Input type="text" name="donorcountry" id="donorcountry" placeholder="Country" onChange={this.handleChange}/>    
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label htmlFor="donorBG">Blood Group</Label>
                                <Input type="select" name="donorBG" onChange={this.handleChange}>
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
                                <Input type="text" name="donorage" id="donorage" placeholder="Age" onChange={this.handleChange}/>                                
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label htmlFor="donorweight">Weight</Label>
                                <Input type="text" name="donorweight" id="donorweight" placeholder="Weight" onChange={this.handleChange}/>
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
                                    <Input type="radio" name="donorgender" id="female" value="female" onChange={this.handleChange}/> {' '}
                                   <span style={{margin: '30px'}}> Female </span>
                                </Label>
                        </Col>
                        <Col md={2}>
                                <Label check>
                                    <Input type="radio" name="donorgender" id="other" value="other" onChange={this.handleChange}/> {' '}
                                    <span style={{margin: '30px'}}>Other</span>
                                </Label>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="donorMH">Medical History</Label>
                        <Input type="select" name="donorMH" aria-multiselectable className="inputscroll" onChange={this.handleChange}>
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
                        <Input type="text" name="donorMH" id="donorMH" 
                        placeholder="If you selected other option mention the disease here" onChange={this.handleChange}/>
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
                         onChange={this.handleChange}
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
}

export default DonorForm;