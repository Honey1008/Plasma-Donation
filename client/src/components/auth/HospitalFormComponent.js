import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../../styles/FormComponent.css';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { addHospital } from '../../redux/actions/hospitalAction';

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
        hospitalHashData: ''
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

    handleHospitalRegister = (event) => {
        event.preventDefault();  
        this.props.addHospital(this.state);
        const dataString = this.state.hospitalName+this.state.hospitalEmail+this.state.hospitalContact+
        this.state.hospitalAddress+this.state.hospitalCity+this.state.hospitalState+this.state.hospitalCountry;
        dataString.replace(/\s+/g, '') 
        this.calculateHash(dataString)
            .then(
                hash => {
                    console.log(hash);
                }
            );
        // console.log(this.state); 
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