import React, { Component } from 'react';
import '../styles/FormComponent.css';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

class HospitalForm extends Component {
    constructor(props){
        super(props);

        this.state={
           
        }; 
        this.handleHospitalRegister = this.handleHospitalRegister.bind(this);      
        this.input = React.createRef();
    }

    

    handleHospitalRegister(event) {
        event.preventDeafult();  
           
        alert("Name : " + this.hospitalname.value +
        " Email : " + this.hospitalemail.value +
        " Phone number : " + this.hospitalnum.value +
        " Address : " + this.hospitaladdress.value +
        " City :" + this.hospitalcity.value+
        " State : " + this.hospitalstate.value+
        " Country : " + this.hospitalcountry.value);   
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
                        <Label htmlFor="hospitalname" md={1}>Name </Label>
                        <Col md={11}>
                            <Input type="text" name="hospitalname" id="hospitalname" 
                            placeholder="Hospital Name"
                            innerRef={(input) => this.hospitalname = input}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="hospitalemail" md={1}>Email</Label>
                        <Col md={5}>
                            <Input type="text" name="hospitalemail" id="hospitalemail" 
                            placeholder="Email"
                            innerRef={(input) => this.hospitalemail = input}/>
                        </Col>
                        <Label htmlFor="hospitalnum" md={2}>Contact Number</Label>
                        <Col md={4}>
                            <Input type="text" name="hospitalnum" id="hospitalnum"
                            placeholder="Contact Number" 
                            innerRef={(input) => this.hospitalnum = input}/>   
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="hospitaladdress" md={1}>Address</Label>
                       <Col md={11}>
                           <Input type="text" name="hospitaladdress" id="hospitaladdress" 
                           placeholder="Address" 
                           innerRef={(input) => this.hospitaladdress = input}/>                           
                       </Col>   
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="hospitalcity" md={1}>City</Label>
                        <Col md={3}>
                            <Input type="text" name="hospitalcity" id="hospitalcity"
                             placeholder="City" 
                             innerRef={(input) => this.hospitalcity = input}
                             />
                        </Col>
                        <Label htmlFor="hospitalstate" md={1}>State </Label>
                        <Col md={3}>
                            <Input type="text" name="hospitalstate" id="hospitalstate"
                             placeholder="State" 
                             innerRef={(input) => this.hospitalstate = input}
                            />
                        </Col>
                        <Label htmlFor="hospitalcountry" md={1}>Country</Label>
                        <Col md={3}>
                            <Input type="text" name="hospitalcountry" id="hospitalcountry"
                             placeholder="Country"
                             innerRef={(input) => this.hospitalcountry = input} />
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

export default HospitalForm;