import React, {Component} from 'react';
import { Button, Media } from 'reactstrap';
import { connect } from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import { compose } from 'redux';
import '../../styles/HospitalPool.css';

class HospitalPool extends Component {

    state = {
        errorMsg : ""
    }

    verifyHospital(hospital){
        console.log("Called Sucessfully!");
    }

     render(){
        const { hospitals } = this.props;    
        return(
            <div>
                { hospitals ? hospitals.map(hospital => {
                return(
                    <Media list>
                    <div key={hospital.id} >
                         <Media tag="li"  className="media-list">
                                <Media left middle>
                                    <Media object height="200px" width="200px" src= "assets/images/hospital.png" alt={hospital.name} />
                                    <br />
                                    <br />
                                    <Button style={{backgroundColor:'white',color:'black',border:'none'}}
                                        onClick={() => this.verifyHospital(hospital)}>
                                    <a>Verify Hospital Credentials </a> 
                                    </Button>
                                    
                                </Media>
                            
                            <Media body className=" offset-1 body-content">
                                <Media heading>
                                <span><i>{hospital.hospitalName}</i></span> 
                                </Media>
                                <hr />
                                <p><img src="assets/images/Ethereum.png" alt="" width="25px" height="25px"/>  {hospital.ethHospital}</p> 
                                <p><img src="assets/images/letter.png" alt="" width="25px" height="25px"/>  {hospital.hospitalEmail}</p>
                                <p><img src="assets/images/call.png" alt="" width="25px" height="25px"/>  {hospital.hospitalContact}</p>
                                <p><img src="assets/images/location.png" alt="" width="25px" height="25px"/>  {hospital.hospitalAddress}, {hospital.hospitalCity}, {hospital.hospitalState}, {hospital.hospitalCountry}. </p>
                                <br />
                            </Media>
                          </Media>  
                    </div>
                    </Media>             
                )}):
                null
            }                            
            </div>
        );
    }
}
        
const mapStateToProps = (state) => {
    return{
        hospitals: state.firestore.ordered.hospitals
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'hospitals' }
    ])
)(HospitalPool);