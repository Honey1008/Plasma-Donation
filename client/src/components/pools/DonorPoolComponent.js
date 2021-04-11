import React,{ Component} from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardDeck, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import {removeDonor} from '../../redux/actions/donorAction';
import DonorProfile from '../pools/DonorProfileComponent';
import instance from '../../contracts/instance';
import web3 from '../../contracts/web3';

class DonorPool extends Component {
    handleViewProfile = () => {
        return(
            <div>
                <DonorProfile/>
            </div>
        )
    }

    handleValidateDonor = async(ethDonor) => {
        const accounts = await web3.eth.getAccounts();
        await instance.methods.validateDonor(ethDonor)
        .send({from : accounts[0], gas: '1000000'});
    }

    handleRemoveDonor = async(donor) => {
        const accounts = await web3.eth.getAccounts();
        await instance.methods.removeDonor(donor.ethDonor)
        .send({from : accounts[0], gas: '1000000'});
        this.props.removeDonor(donor.id);
    }

    render() {
        const {donors, removeDonor} = this.props;
        return(
            <div className="container">
            <div className="row">
                <br />
                <br />
            {donors? 
            donors.map(donor => {
                return(
                    <div key={donor.id} className="col-12 col-md-12 offset-md-1 m-3">
                     <CardDeck>
                        <Card>
                            <CardBody>
                                  
                            <CardTitle tag="h5">
                                <img src="assets/images/donors.png" alt="" width="25px" height="25px"/> {' '}
                             &nbsp;&nbsp;
                              {donor.donorFname+ " " + donor.donorLname}</CardTitle>
                            <hr />
                                <CardSubtitle tag="h6" className="mb-2 text-muted">
                                    <img src="assets/images/Ethereum.png" alt="" width="20px" height="20px"/> {' '}
                                    &nbsp;&nbsp;
                                    {donor.ethDonor}
                                </CardSubtitle>
                                <div className="text-right">
                                     <Button style={{backgroundColor: '#171E45',padding: '10px'}}
                                        onClick={()=>{this.handleRemoveDonor(donor)}}>
                                            Remove
                                    </Button>
                                    &nbsp;&nbsp;&nbsp; 
                                <Button style={{backgroundColor: '#171E45',padding: '10px'}}
                                     onClick={()=>{this.handleValidateDonor(donor.ethDonor)}}>
                                        Validate
                                </Button>
                                &nbsp;&nbsp;&nbsp; 
                                <Link to={`/donors/${donor.id}`}>
                                    <Button style={{backgroundColor: '#171E45',padding: '10px'}} 
                                    onClick={this.handleViewProfile}>
                                        View Profile
                                    </Button>
                                </Link>  
                                </div>  
                            </CardBody>  
                        </Card>
                    </CardDeck>                    
                </div>
                );  
            })
            : <p>Please wait, fetching data...</p>} 
        </div>
        </div>
        )   
    }
}

const mapStateToProps = (state) => {
    return {
        donors : state.firestore.ordered.donors
    } 
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeDonor : (donorId) => dispatch(removeDonor(donorId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'donors'}
    ])
)(DonorPool);