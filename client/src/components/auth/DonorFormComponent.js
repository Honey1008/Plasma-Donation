import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addDonor} from '../../redux/actions/donorAction';
import {Form, FormGroup, Input, Label,Col, Button, Row, Spinner} from 'reactstrap';
import '../../styles/FormComponent.css';
import instance from '../../contracts/instance';
import web3 from '../../contracts/web3';
import { sha256 } from 'js-sha256';
import PrintErrorMsg from '../layout/PrintErrorMsgComponent';

class DonorForm extends Component{

    state = {
        ethDonor : '',
        donorFname : '',
        donorLname : '',
        donorNum : '',
        donorEmail : '',
        donorAddress : '',
        donorCity : '',
        donorZipcode : '',
        donorState : '',
        donorCountry : '',
        donorBG : 'A+',
        donorGender : 'Male',
        donorAge : 0, 
        donorWeight : 0,
        donorMH : 'None',
        donorDonated : 'No',
        donorDonatedOn : '',
        errorMessage : '',
        loading : false
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        }) 
    }

    handleDonorRegister = async(event) => {
        event.preventDefault();  
        this.setState({loading: true, errorMessage: ''});
        const accounts = await web3.eth.getAccounts();
        const currentUser =  accounts[0];
        this.setState({
            ethDonor : currentUser
        });
        const dataString = this.state.ethDonor+this.state.donorFname+this.state.donorLname+this.state.donorNum+ this.state.donorEmail+ this.state.donorAddress
                            +this.state.donorCity+this.state.donorZipcode+this.state.donorState+this.state.donorCountry+this.state.donorBG
                            +this.state.donorAge+this.state.donorWeight+ this.state.donorGender+this.state.donorMH + this.state.donordescription;
        dataString.replace(/\s+/g, '');
        const hashOfDonorData = sha256(dataString);
        try{
            await instance.methods.addDonor(hashOfDonorData).send({from: accounts[0]});     
                
                this.props.addDonor({
                    ethDonor : this.state.ethDonor,
                    donorFname : this.state.donorFname,
                    donorLname : this.state.donorLname,
                    donorNum : this.state.donorNum,
                    donorEmail : this.state.donorEmail,
                    donorAddress : this.state.donorAddress,
                    donorCity : this.state.donorCity,
                    donorZipcode : this.state.donorZipcode,
                    donorState : this.state.donorState,
                    donorCountry : this.state.donorCountry,
                    donorBG : this.state.donorBG,
                    donorGender : this.state.donorGender,
                    donorAge : this.state.donorAge, 
                    donorWeight : this.state.donorWeight,
                    donorMH : this.state.donorMH,
                    donorDonated : this.state.donorDonated,
                    donorDonatedOn : this.state.donorDonatedOn
                });
            this.props.history.push('/home');
        }catch(err){
            this.setState({ errorMessage: err.message });
        }
        this.setState({loading: false}); 
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
                                <Label htmlFor="donorFname">First Name</Label>
                                <Input type="text" name="donorFname" id="donorFname" placeholder="First Name" onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="donorLname">Last Name</Label>
                                <Input type="text" name="donorLname" id="donorLname" placeholder="Last Name" onChange={this.handleChange}/>
                            </FormGroup>
                         </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="donorNum" >Phone Number</Label>
                                <Input type="text" name="donorNum" id="donorNum" placeholder="Phone Number" onChange={this.handleChange}/>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="donorEmail">Email</Label>
                                <Input type="text" name="donorEmail" id="donorEmail" placeholder="Email" onChange={this.handleChange}/>                              
                            </FormGroup>
                            </Col>
                        </Row> 

                        <FormGroup>
                            <Label htmlFor="donorAddress">Address</Label>
                            <Input type="text" name="donorAddress" id="donorAddress" placeholder="Address" onChange={this.handleChange}/>
                        </FormGroup>

                        <Row form>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="donorCity">City</Label>
                                <Input type="text" name="donorCity" id="donorCity" placeholder="City" onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="donorZipcode">Zipcode</Label>
                                <Input type="text" name="donorZipcode" id="donorZipcode" placeholder="Zipcode" onChange={this.handleChange}/>    
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="donorState">State </Label>
                                <Input type="text" name="donorState" id="donorState" placeholder="State" onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="donorCountry">Country</Label>
                                <Input type="text" name="donorCountry" id="donorCountry" placeholder="Country" onChange={this.handleChange}/>    
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label htmlFor="donorBG">Blood Group</Label>
                                <Input type="select" name="donorBG" id="donorBG" onChange={this.handleChange}>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value= "B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label htmlFor="donorAge">Age</Label>
                                <Input type="text" name="donorAge" id="donorAge" placeholder="Age" onChange={this.handleChange}/>                                
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label htmlFor="donorWeight">Weight</Label>
                                <Input type="text" name="donorWeight" id="donorWeight" placeholder="Weight" onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                    </Row> 

                    <FormGroup row onChange={this.handleChange}>
                            <Label htmlFor="donorGender" md={2}>Gender</Label> 
                            <Col md={2}>
                                    <Label check>
                                        <Input type="radio" name="donorGender" id="donorGender" value="Male" />{' '} 
                                       <span style={{margin: '30px'}}>  Male </span>
                                    </Label>
                            </Col>   
                            <Col md={2}>
                                    <Label check>
                                        <Input type="radio" name="donorGender" id="donorGender" value="Female" /> {' '}
                                       <span style={{margin: '30px'}}> Female </span>
                                    </Label>
                            </Col>
                            <Col md={4}>
                                    <Label check>
                                        <Input type="radio" name="donorGender" id="donorGender" value="Other"/> {' '}
                                        <span style={{margin: '30px'}}>Prefer Not to say</span>
                                    </Label>
                            </Col>
                        </FormGroup>

                    <FormGroup>
                        <Label htmlFor="donorMH">Medical History</Label>
                        <Input type="select" name="donorMH" id="donorMH" className="inputscroll" onChange={this.handleChange}>
                            <option value="None">None</option>
                            <option value="Anaemia, including haematinic (iron, B12 and folate) deficiency">Anaemia, including haematinic (iron, B12 and folate) deficiency</option>
                            <option value="Blood Pressure">Blood Pressure</option>
                            <option value="Coagulation disorders, including haemophilia A and B">Coagulation disorders, including haemophilia A and B</option>
                            <option value="Cardiovascular disease">Cardiovascular disease</option>
                            <option value="Diabetes">Diabetes</option>
                            <option value="Gastrointestinal Disease">Gastrointestinal Disease</option>
                            <option value="Hypertension">Hypertension</option>
                            <option value="Hepatitis B virus (HBV)">Hepatitis B virus (HBV)</option>
                            <option value="Hepatitis C virus (HCV)">Hepatitis C virus (HCV)</option>
                            <option value="Human Immunodeficiency virus Types 1 and 2 (HIV)">Human Immunodeficiency virus Types 1 and 2 (HIV)</option>
                            <option value="Human T-Lymphotropic Virus Types I and II (HTLV)">Human T-Lymphotropic Virus Types I and II (HTLV)</option>
                            <option value="Immunological Disease">Immunological Disease</option>
                            <option value="Central Nervous System Disease">Central Nervous System Disease</option>
                            <option value="Respiratory diseases, including asthama">Respiratory diseases, including asthama</option>
                            <option value="Thyroid">Thyroid</option>
                            <option value="Treponema pallidum (syphilis)">Treponema pallidum (syphilis)</option>
                            <option value="West Nile virus (WNV)">West Nile virus (WNV)</option>
                            <option value="Zika Virus (ZIKV)">Zika Virus (ZIKV)</option>
                            <option>Other</option>
                        </Input>

                    </FormGroup>

                    <FormGroup>                       
                        <Label htmlFor="donorMH">Other</Label>
                        <Input type="text" name="donorMH" id="donorMH" 
                        placeholder="If you selected other option mention the disease here" onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup row>
                        <Label htmlFor="donorDonated" md={5}>Have you ever donated blood/plasma?</Label> 
                        <Col md={2}>
                                <Label check>
                                    <Input type="radio" name="donorDonated" id="donorDonated" value="yes" />{' '} 
                                   <span style={{margin: '30px'}}>  Yes </span>
                                </Label>
                        </Col>   
                        <Col md={2}>
                                <Label check>
                                    <Input type="radio" name="donorDonated" id="donorDonated" value="no" /> {' '}
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
                    <FormGroup row style={{justifyContent:"center"}}>
                        <Button type="submit" className="submit-form">
                        {this.state.loading? <Spinner color="light"/> : <strong>Register</strong> }   
                        </Button>
                    </FormGroup>
                    </Form>
                </div>
                <br />
                 <PrintErrorMsg isError={!!this.state.errorMessage} errorMsg={this.state.errorMessage}/>
                <br />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addDonor : (donor) => dispatch(addDonor(donor))
    }
}

export default connect(null,mapDispatchToProps)(DonorForm);