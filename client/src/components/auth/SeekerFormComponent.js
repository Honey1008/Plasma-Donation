import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, FormGroup, Input, Label,Col, Button, Row} from 'reactstrap';
import '../../styles/FormComponent.css';
import instance from '../../contracts/instance';
import web3 from '../../contracts/web3';

class SeekerForm extends Component{

    state = {
        seekerfname : '',
        seekerlname : '',
        seekernum : '',
        seekeremail : '',
        seekeraddress : '',
        seekercity : '',
        seekerzipcode : '',
        seekerstate : '',
        seekercountry : '',
        seekerBG : 'A+',
        seekergender : 'Male',
        seekerage : '', 
        seekerweight : 0,
        seekerMH : 'None',
        seekerdescription : '',
        seekerhospital : ''
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

    handleSeekerRegister(event){
        event.preventDefault();  
        let hashOfSeekerData;
        const dataString = this.state.seekerfname+this.state.seekerlname+this.state.seekernum+ this.state.seekeremail+ this.state.seekeraddress
                            +this.state.seekercity+this.state.seekerzipcode+this.state.seekerstate+this.state.seekercountry+this.state.seekerBG
                            +this.state.seekerage+this.state.seekerweight+ this.state.seekergender+this.state.seekerMH + this.state.seekerdescription;
        dataString.replace(/\s+/g, '');
        this.calculateHash(dataString)
            .then(
                hash => {
                 hashOfSeekerData = hash;
                }
            );

    }

    render(){
        return(
            <div className="container">
                <div className="form-header">
                    <h3><strong> Seeker Form </strong></h3>
                </div>  
                <div className="form-body">
                    <Form onSubmit={this.handleSeekerRegister}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                <Label htmlFor="seekerfname">First Name</Label>
                                <Input type="text" name="seekerfname" id="seekerfname" placeholder="First Name" onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="seekerlname">Last Name</Label>
                                <Input type="text" name="seekerlname" id="seekerlname" placeholder="Last Name" onChange={this.handleChange}/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label htmlFor="seekernum" >Phone Number</Label>
                                    <Input type="text" name="seekernum" id="seekernum" placeholder="Phone Number" onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label htmlFor="seekeremail">Email</Label>
                                    <Input type="text" name="seekeremail" id="seekeremail" placeholder="Email" onChange={this.handleChange}/>                              
                                </FormGroup>
                            </Col>
                        </Row>  
    
                        <FormGroup>
                            <Label htmlFor="seekeraddress">Address</Label>
                            <Input type="text" name="seekeraddress" id="seekeraddress" placeholder="Address" onChange={this.handleChange}/>
                        </FormGroup>
    
                        <Row form>
                            <Col md={3}>
                                <FormGroup>
                                    <Label htmlFor="seekercity">City</Label>
                                    <Input type="text" name="seekercity" id="seekercity" placeholder="City" onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label htmlFor="seekerzipcode">Zipcode</Label>
                                    <Input type="text" name="seekerzipcode" id="seekerzipcode" placeholder="Zipcode" onChange={this.handleChange}/>    
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label htmlFor="seekerstate">State </Label>
                                    <Input type="text" name="seekerstate" id="seekerstate" placeholder="State" onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label htmlFor="seekercountry">Country</Label>
                                    <Input type="text" name="seekercountry" id="seekercountry" placeholder="Country" onChange={this.handleChange}/>    
                                </FormGroup>
                            </Col>
                        </Row>
    
                        <Row form>
                            <Col md={4}>
                                <FormGroup>
                                    <Label htmlFor="seekerBG">Blood Group</Label>
                                    <Input type="select" name="seekerBG" onChange={this.handleChange}>
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
                                    <Input type="text" name="seekerage" id="seekerage" placeholder="Age" onChange={this.handleChange}/>                                
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label htmlFor="seekerweight">Weight</Label>
                                    <Input type="text" name="seekerweight" id="seekerweight" placeholder="Weight" onChange={this.handleChange}/>
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
                            <Input type="select" name="seekerMH" aria-multiselectable className="inputscroll" onChange={this.handleChange}>
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
                            <Input type="text" name="seekerMH" id="seekerMH" 
                            placeholder="If you selected other option mention the disease here" onChange={this.handleChange}/>
                        </FormGroup>
    
                        <FormGroup>
                            <Label htmlFor="seekerdescription">Description</Label>
                            <Input type="text" name="seekerdescription" 
                            placeholder="Mention why you need blood/plasma" onChange={this.handleChange}/>
                        </FormGroup>
    
                        <FormGroup>
                            <Label htmlFor="seekerHospital">Address</Label>
                            <Input type="text" name="seekerHospital" id="seekerHospital" 
                            placeholder="Enter the ethereum address of the hospital that you are currently being treated."
                            onChange={this.handleChange}/>
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


export default SeekerForm;