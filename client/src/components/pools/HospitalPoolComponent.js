import React, {Component} from 'react';
import { Button, Media } from 'reactstrap';
import { connect } from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import { compose } from 'redux';
import '../../styles/HospitalPool.css';

class HospitalPool extends Component {

    verifyHospital(hospital){
        console.log("Called Sucessfully!");
    }

     render(){
        const { hospitals } = this.props;    
        return(
            <>
                <Media list>
                { hospitals ? hospitals.map(hospital => {
                return(
                    <div key={hospital.id} >
                         <Media tag="li"  className="media-list">
                            <Media left middle>
                                <Media object height="200px" width="200px" src= "assets/images/hospital.png" alt={hospital.name} />
                                <br />
                                <br />
                                <Button style={{backgroundColor:'white',color:'black',border:'none'}}
                                    onClick={(hospital) => this.verifyHospital(hospital)}>
                                    <a>Verify Hospital Credentials</a>
                                </Button>
                            </Media>
                            <Media body className="ml-5 body-content">
                                <Media heading>
                                <span><i>{hospital.hospitalName}</i></span> 
                                </Media>
                                <hr />
                                <p><img src="assets/images/Ethereum.png" alt="" width="25px" heigth="25px"/>  {hospital.ethHospital}</p> 
                                <p><img src="assets/images/letter.png" alt="" width="25px" heigth="25px"/>  {hospital.hospitalEmail}</p>
                                <p><img src="assets/images/call.png" alt="" width="25px" heigth="25px"/>  {hospital.hospitalContact}</p>
                                <p><img src="assets/images/location.png" alt="" width="25px" heigth="25px"/>  {hospital.hospitalAddress}, {hospital.hospitalCity}, {hospital.hospitalState}, {hospital.hospitalCountry}. </p>
                            </Media>
                          </Media>               
                    </div>
                )}): null}                        
                </Media>     
            </>
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