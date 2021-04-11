import React,{ Component} from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardDeck, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import { removeHospital } from '../../redux/actions/hospitalAction';
import instance from '../../contracts/instance';
import web3 from '../../contracts/web3';
import Notification from './Notifications';

class Dashboard extends Component{

    handleRemoveHospital = async(hospital) => {
        const accounts = await web3.eth.getAccounts();
        await instance.methods.removeHospital(hospital.ethHospital)
        .send({from: accounts[0], gas: '1000000'});
        this.props.removeHospital(hospital.id);
    }

    render(){
        const { hospitals, removeHospital } = this.props;    
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col-12">
                        <br />
                        <h5 style={{textAlign: 'center',textDecoration:'underline'}}>
                                Plasma Manager Dashboard
                        </h5> 
                   </div>
                </div>
                <div className="row">
                    <div className="col sm-12 col-md-7">
                    <br />
                    <br />
                        {hospitals? 
                            hospitals.map(hospital => {
                            return(
                                <div className="m-3" key={hospital.id}>
                                <CardDeck>
                                    <br />
                                    <Card>
                                        <CardBody>       
                                        <CardTitle tag="h5">
                                            <img src="assets/images/hospitalicon.png" alt="" width="30px" height="30px"/> {' '}
                                        &nbsp;&nbsp;
                                        {hospital.hospitalName}
                                        </CardTitle>
                                        <hr />
                                            <CardSubtitle tag="h6" className="mb-2 text-muted">
                                                <img src="assets/images/Ethereum.png" alt="" width="20px" height="20px"/> {' '}
                                                &nbsp;&nbsp;
                                                {hospital.ethHospital}
                                            </CardSubtitle>
                                            <div className="text-right">
                                                <Button style={{backgroundColor: '#171E45',padding: '5px 15px'}}
                                                onClick={()=>{this.handleRemoveHospital(hospital)}}>
                                                  Remove
                                                </Button>
                                                &nbsp;&nbsp;&nbsp; 
                                            </div>  
                                        </CardBody>  
                                    </Card>
                                </CardDeck>                    
                            </div>
                            );  
                        })
                        : <p>Please wait, fetching data...</p>} 
                    </div>
                    <div className="row">
                    <br />
                    <br />
                        <div style={{border:"1px solid #f1f1f1", margin:'50px 30px 0px 30px'}}>
                        </div>
                    </div>
                    <div className="col sm-12 col-md-4">
                    <br />
                    <br />
                        <Notification />
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        hospitals: state.firestore.ordered.hospitals
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeHospital : (hospitalId) => dispatch(removeHospital(hospitalId))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        { collection: 'hospitals' }
    ])
)(Dashboard);