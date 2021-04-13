import React, {Component} from 'react';
import {connect} from 'react-redux';
import { addSeeker } from '../../redux/actions/seekerAction';
import {Form, FormGroup, Input, Label,Col, Button, Row, Spinner} from 'reactstrap';
import '../../styles/FormComponent.css';
import PrintErrorMsg from '../layout/PrintErrorMsgComponent';
import instance from '../../contracts/instance';
import web3 from '../../contracts/web3';
import { sha256 } from 'js-sha256';

class SeekerForm extends Component{

    state = {
        ethSeeker : '',
        seekerFname : '',
        seekerLname : '',
        seekerNum : '',
        seekerEmail : '',
        seekerAddress : '',
        seekerCity : '',
        seekerZipcode : '',
        seekerState : '',
        seekerCountry : '',
        seekerBG : 'A+',
        seekerGender : 'Male',
        seekerAge : 0, 
        seekerWeight : 0,
        seekerDescription : '',
        seekerHospital : '',
        errorMessage : '',
        loading : false
    }

    handleSeekerRegister = async(event) => {
        event.preventDefault();  

        this.setState({loading: true, errorMessage: ''});

        const accounts = await web3.eth.getAccounts();
        const currentUser =  accounts[0];
        this.setState({
            ethSeeker : currentUser
        });

        const dataString = this.state.ethSeeker+this.state.seekerFname+this.state.seekerLname+this.state.seekerNum+ this.state.seekerEmail+ this.state.seekerAddress
                            +this.state.seekerCity+this.state.seekerZipcode+this.state.seekerState+this.state.seekerCountry+this.state.seekerBG
                            +this.state.seekerAge+this.state.seekerWeight+ this.state.seekerGender+
                            this.state.seekerHospital;
        dataString.replace(/\s+/g, '');
        const hashOfSeekerData = sha256(dataString);

        try{
            await instance.methods
            .addSeeker(hashOfSeekerData, this.state.seekerHospital)
            .send({from: accounts[0]});     
            this.props.addSeeker({
                ethSeeker : this.state.ethSeeker,
                seekerFname : this.state.seekerFname,
                seekerLname : this.state.seekerLname,
                seekerNum : this.state.seekerNum,
                seekerEmail : this.state.seekerEmail,
                seekerAddress : this.state.seekerAddress,
                seekerCity : this.state.seekerCity,
                seekerZipcode : this.state.seekerZipcode,
                seekerState : this.state.seekerState,
                seekerCountry : this.state.seekerCountry,
                seekerBG : this.state.seekerBG,
                seekerGender : this.state.seekerGender,
                seekerAge : this.state.seekerAge, 
                seekerWeight : this.state.seekerWeight,
                seekerDescription : this.state.seekerDescription,
                seekerHospital : this.state.seekerHospital
            });

         this.props.history.push('/home');
         
        } catch(err){
            this.setState({ errorMessage: err.message });
        }

        this.setState({loading: false});       
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
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
                                <Label htmlFor="seekerFname">First Name</Label>
                                <Input type="text" name="seekerFname" id="seekerFname" placeholder="First Name" onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="seekerLname">Last Name</Label>
                                <Input type="text" name="seekerLname" id="seekerLname" placeholder="Last Name" onChange={this.handleChange}/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label htmlFor="seekerNum" >Phone Number</Label>
                                    <Input type="text" name="seekerNum" id="seekerNum" placeholder="Phone Number" onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label htmlFor="seekerEmail">Email</Label>
                                    <Input type="text" name="seekerEmail" id="seekerEmail" placeholder="Email" onChange={this.handleChange}/>                              
                                </FormGroup>
                            </Col>
                        </Row>  
    
                        <FormGroup>
                            <Label htmlFor="seekerAddress">Address</Label>
                            <Input type="text" name="seekerAddress" id="seekerAddress" placeholder="Address" onChange={this.handleChange}/>
                        </FormGroup>
    
                        <Row form>
                            <Col md={3}>
                                <FormGroup>
                                    <Label htmlFor="seekerCity">City</Label>
                                    <Input type="text" name="seekerCity" id="seekerCity" placeholder="City" onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label htmlFor="seekerZipcode">Zipcode</Label>
                                    <Input type="text" name="seekerZipcode" id="seekerZipcode" placeholder="Zipcode" onChange={this.handleChange}/>    
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label htmlFor="seekerState">State </Label>
                                    <Input type="text" name="seekerState" id="seekerState" placeholder="State" onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label htmlFor="seekerCountry">Country</Label>
                                    <Input type="text" name="seekerCountry" id="seekerCountry" placeholder="Country" onChange={this.handleChange}/>    
                                </FormGroup>
                            </Col>
                        </Row>
    
                        <Row form>
                            <Col md={4}>
                                <FormGroup>
                                    <Label htmlFor="seekerBG">Blood Group</Label>
                                    <Input type="select" name="seekerBG" id="seekerBG" onChange={this.handleChange}>
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
                                    <Label htmlFor="seekerAge">Age</Label>
                                    <Input type="text" name="seekerAge" id="seekerAge" placeholder="Age" onChange={this.handleChange}/>                                
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label htmlFor="seekerWeight">Weight</Label>
                                    <Input type="text" name="seekerWeight" id="seekerWeight" placeholder="Weight" onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>
                        </Row> 
    
                        <FormGroup row onChange={this.handleChange}>
                            <Label htmlFor="seekerGender" md={2}>Gender</Label> 
                            <Col md={2}>
                                    <Label check>
                                        <Input type="radio" name="seekerGender" id="seekerGender" value="Male" />{' '} 
                                       <span style={{margin: '30px'}}>  Male </span>
                                    </Label>
                            </Col>   
                            <Col md={2}>
                                    <Label check>
                                        <Input type="radio" name="seekerGender" id="seekerGender" value="Female" /> {' '}
                                       <span style={{margin: '30px'}}> Female </span>
                                    </Label>
                            </Col>
                            <Col md={4}>
                                    <Label check>
                                        <Input type="radio" name="seekerGender" id="seekerGender" value="Prefer not to say"/> {' '}
                                        <span style={{margin: '30px'}}>Prefer not to say</span>
                                    </Label>
                            </Col>
                        </FormGroup>
    
                        <FormGroup>
                            <Label htmlFor="seekerDescription">Description</Label>
                            <Input type="text" name="seekerDescription" id="seekerDescription"
                            placeholder="Mention why you need blood/plasma" onChange={this.handleChange}/>
                        </FormGroup>
    
                        <FormGroup>
                            <Label htmlFor="seekerHospital">Address</Label>
                            <Input type="text" name="seekerHospital" id="seekerHospital" 
                            placeholder="Enter the ethereum address of the hospital that you are currently being treated."
                            onChange={this.handleChange}/>
                        </FormGroup>
                       
                        <FormGroup row style={{justifyContent:"center"}}>
                            <Button type="submit" className="submit-form">
                            {this.state.loading ? <Spinner color="light"/> : <strong>Register</strong>} 
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
        addSeeker : (seeker) => dispatch(addSeeker(seeker))
    }
}

export default connect(null,mapDispatchToProps)(SeekerForm);