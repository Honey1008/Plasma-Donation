import React,{ Component} from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardDeck, Button, Spinner, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import { removeHospital } from '../../redux/actions/hospitalAction';
import instance from '../../contracts/instance';
import web3 from '../../contracts/web3';
import Notification from './Notifications';
import { useHistory } from 'react-router-dom';
import PrintErrorMsg from '../layout/PrintErrorMsgComponent';
import '../../styles/ListEntities.css';

function PlasmaManagerDashboard({hospitals, removeHospital}) {
    let history = useHistory();

    const handleAddHospital = (event) => {
        event.preventDefault();
        history.push('/hospitalform');
    }

    return(
        <div className="dashboard container">
        <div className="row">
            <div className="col-8">
                <br />
                <h5 style={{textAlign: 'right',textDecoration:'underline'}}>
                        Plasma Manager Dashboard
                </h5> 
           </div>
           <div className ="col-4" >
           &nbsp;&nbsp;&nbsp; 
                <Button className="btn-click"
                 style={{ marginTop:"25px", float:'right'}}
                 onClick={handleAddHospital}>
                        Add Hospital
                </Button>
           </div>
        </div>
            <div className="row">
                    <div className="col sm-12 col-md-7">
                    <br />
                        {hospitals? 
                            hospitals.map(hospital => {
                            return(
                                <div className="m-3" key={hospital.id}>
                                <CardDeck>
                                    <RenderHospital hospital={hospital} removeHospital={removeHospital}/>
                                </CardDeck>                
                            </div>
                            );  
                        })
                        : <p>Please wait, fetching data...</p>
                    } 
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

class RenderHospital extends Component{

    state = {
        loading: false,
        errorMessage : ''
    }

    handleRemoveHospital = async(hospital) => {
        this.setState({loading: true, errorMessage: ''});
        try{
            const accounts = await web3.eth.getAccounts();
            await instance.methods.removeHospital(hospital.ethHospital)
            .send({from: accounts[0], gas: '1000000'});
            this.props.removeHospital(hospital.id);
        }catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({loading: false});   
    }

   
    render(){
        const { hospital } = this.props;    
        return(
               <>
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
                                <Button className="btn-click"
                                 onClick={()=>{this.handleRemoveHospital(hospital)}}>
                                    {this.state.loading? <Spinner color="light"/> : <span>Remove</span>}
                                </Button>
                              &nbsp;&nbsp;&nbsp; 
                              </div>  
                              <CardText>
                                    <br />
                                    <PrintErrorMsg 
                                    isError={!!this.state.errorMessage} 
                                    errorMsg={this.state.errorMessage}/>    
                               </CardText>
                         </CardBody>  
                    </Card>     
                    
              </>           
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
)(PlasmaManagerDashboard);