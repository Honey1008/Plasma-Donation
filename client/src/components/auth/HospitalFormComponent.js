import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../../styles/FormComponent.css';
import { Button, Form, FormGroup, Label, Input, Col, Spinner} from 'reactstrap';
import { addHospital } from '../../redux/actions/hospitalAction';
import instance from '../../contracts/instance';
import web3 from '../../contracts/web3';
import { sha256 } from 'js-sha256';
import PrintErrorMsg from '../layout/PrintErrorMsgComponent';

class HospitalForm extends Component {
   
    state = {          
        ethHospital: '',
        hospitalName: '',
        hospitalEmail: '',
        hospitalContact: '',
        hospitalAddress: '',
        hospitalCity: '',
        hospitalState: '',
        hospitalCountry: '',   
        errorMessage : ''
    }
 
    handleChange = (event) => {
        this.setState({
            [event.target.id] : event.target.value
        })
    } 
   
    handleHospitalRegister = async (event) => {
        event.preventDefault();  
        const dataString = this.state.hospitalName+this.state.hospitalEmail
        +this.state.hospitalContact+this.state.hospitalAddress
        +this.state.hospitalCity+this.state.hospitalState
        +this.state.hospitalCountry;
        dataString.replace(/\s+/g, '');
        var hashOfHospitalData = sha256(dataString);
       
        try{
                const accounts = await web3.eth.getAccounts();
                await instance.methods
                .addHospital(this.state.ethHospital,this.state.hospitalName,
                hashOfHospitalData)
                .send({
                    from: accounts[0]
                });

                this.props.addHospital({
                    ethHospital: this.state.ethHospital,
                    hospitalName: this.state.hospitalName,
                    hospitalEmail: this.state.hospitalEmail,
                    hospitalContact: this.state.hospitalContact,
                    hospitalAddress: this.state.hospitalAddress,
                    hospitalCity: this.state.hospitalCity,
                    hospitalState: this.state.hospitalState,
                    hospitalCountry: this.state.hospitalCountry
                });
                this.setState({
                    errorMessage : ''
                })

        } catch (err) {
                this.setState({ errorMessage: err.message });
        }
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
                        <Label htmlFor="hospitalName" md={1}>Name </Label>
                        <Col md={11}>
                            <Input type="text" name="hospitalName" id="hospitalName" 
                            placeholder="Hospital Name"
                            onChange={this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="hospitalEmail" md={1}>Email</Label>
                        <Col md={5}>
                            <Input type="text" name="hospitalEmail" id="hospitalEmail" 
                            placeholder="Email"
                            onChange={this.handleChange}/>
                        </Col>
                        <Label htmlFor="hospitalContact" md={2}>Contact Number</Label>
                        <Col md={4}>
                            <Input type="text" name="hospitalContact" id="hospitalContact"
                            placeholder="Contact Number" 
                            onChange={this.handleChange}/>   
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="hospitalAddress" md={1}>Address</Label>
                       <Col md={11}>
                           <Input type="text" name="hospitalAddress" id="hospitalAddress" 
                           placeholder="Address" onChange={this.handleChange}/>                           
                       </Col>   
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="hospitalCity" md={1}>City</Label>
                        <Col md={3}>
                            <Input type="text" name="hospitalCity" id="hospitalCity"
                             placeholder="City" onChange = {this.handleChange}/>
                        </Col>
                        <Label htmlFor="hospitalState" md={1}>State </Label>
                        <Col md={3}>
                            <Input type="text" name="hospitalState" id="hospitalState"
                             placeholder="State" onChange = {this.handleChange}/>
                        </Col>
                        <Label htmlFor="hospitalCountry" md={1}>Country</Label>
                        <Col md={3}>
                            <Input type="text" name="hospitalCountry" id="hospitalCountry"
                             placeholder="Country"  onChange ={this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="ethHospital" md={3}>Ethereum Account Address</Label>
                        <Col md={9}>
                            <Input type="text" name="ethHospital" id="ethHospital" 
                            placeholder="Enter Ethereum account address of Hospital"
                            onChange={this.handleChange}/>
                        </Col>
                    </FormGroup>
                    <br />
                    <FormGroup row style={{justifyContent:"center"}}>
                        <Button type="submit" className="submit-form">
                            <strong>Register</strong> 
                        </Button>
                    </FormGroup>
                    <PrintErrorMsg isError={!!this.state.errorMessage} errorMsg={this.state.errorMessage}/>
                </Form>
            </div>
        </div>
        );  
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addHospital: (hospital) => dispatch(addHospital(hospital))
    }
}

export default connect(null,mapDispatchToProps)(HospitalForm);