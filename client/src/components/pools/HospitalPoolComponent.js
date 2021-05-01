import React, {Component} from 'react';
import { Button, Media } from 'reactstrap';
import { connect } from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import { compose } from 'redux';
import { sha256 } from 'js-sha256';
import '../../styles/HospitalPool.css';
import instance from '../../contracts/instance';
import web3 from '../../contracts/web3';

function HospitalPool({hospitals}) {
    return (
        <div>
             { hospitals ? hospitals.map(hospital => 
                 <div key={hospital.id}>
                 <RenderHospital hospital={hospital} />
                 </div>
             ) : null}
        </div>
    );
    
}

class RenderHospital extends Component {

    state = {
        errorMsg : "",
        hospitalinBlockchain : undefined,
        isHospitalDataSame : null,
        showImage : 'none'
    }

    verifyHospital= async(hospital) => {

        const dataString = hospital.hospitalName+ hospital.hospitalEmail
                        +hospital.hospitalContact+hospital.hospitalAddress
                        +hospital.hospitalCity+hospital.hospitalState
                        +hospital.hospitalCountry;

        dataString.replace(/\s+/g, '');
        const hashOfHospitalData = sha256(dataString);

        const accounts = await web3.eth.getAccounts();

        this.setState({
            hospitalinBlockchain : await instance.methods.hospitals(hospital.ethHospital).call()
        });

        const hashfromBlockchain = this.state.hospitalinBlockchain.hashOfHospitalsData;
       
        this.setState({
            isHospitalDataSame : hashOfHospitalData === hashfromBlockchain
        });

        if(this.state.isHospitalDataSame === true){
            this.setState({
                showImage : 'check'
            })
        } else if(this.state.isHospitalDataSame === false){
            this.setState({
                showImage : 'cross'
            })
        }
        
    }

     render(){
         const {hospital} = this.props;
           
        return(
            <div>
                <Media list>
                 <div key={hospital.id} >
                    <Media tag="li"  className="media-list">
                        <Media left middle>
                            <Media object height="200px" width="200px" src= "assets/images/hospital.png" alt={hospital.name} />
                             <br />
                             <br />
                             {this.state.showImage === 'check' || this.state.showImage === 'cross' 
                             ? null : 
                             <Button className="btn-click" style={{padding: '10px 30px'}}
                             onClick={() => this.verifyHospital(hospital)}>
                             Verify Hospital Data
                             </Button>}
                                </Media>
                            
                            <Media body className=" offset-1 body-content">
                                <Media heading>
                                   <span><i>{hospital.hospitalName}</i></span> 
                                {this.state.showImage === 'check'? 
                                 <img src="assets/images/verified.jpg" alt="" 
                                 width="50px" height="45px"/>
                                : this.state.showImage === 'cross' ? <span> {' '}
                                <img src="assets/images/cross.jpg" alt="" 
                                width="35px" height="35px"/> </span>: null}
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