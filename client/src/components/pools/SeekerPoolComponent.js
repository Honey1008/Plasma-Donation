import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardDeck, Button, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import { removeSeeker } from '../../redux/actions/seekerAction';
import SeekerProfile from '../pools/SeekerProfileComponent';
import instance from '../../contracts/instance';
import web3 from '../../contracts/web3';

class SeekerPool extends Component {    
    
    handleViewProfile = (seeker) => {
        return(
            <div>
                <SeekerProfile />
            </div>
        )
    }

    handleValidateSeeker = async(ethSeeker) => {
        // prevent.default(); 
        const accounts = await web3.eth.getAccounts();
        
        await instance.methods.validateSeeker(ethSeeker)
        .send({from : accounts[0], gas: '1000000'});
    }
    
    handleRemoveSeeker = async(seeker) => {
        const accounts = await web3.eth.getAccounts();
        await instance.methods.removeSeeker(seeker.ethSeeker)
        .send({from: accounts[0], gas: '1000000'});
        this.props.removeSeeker(seeker.id);
    } 

    render(){
        const {seekers, removeSeeker} = this.props;
        return(
        <div className="container">
            <div className="row">
                <br />
                <br />
            {seekers? 
                seekers.map(seeker => {
                return(
                    <div key={seeker.id} className="col-12 col-md-12 offset-md-1 m-3">
                     <CardDeck>
                        <Card>
                            <CardBody>       
                            <CardTitle tag="h5">
                                <img src="assets/images/search.png" alt="" width="20px" height="20px"/> {' '}
                             &nbsp;&nbsp;
                              {seeker.seekerFname+ " " + seeker.seekerLname}
                            </CardTitle>
                            <hr />
                                <CardSubtitle tag="h6" className="mb-2 text-muted">
                                    <img src="assets/images/Ethereum.png" alt="" width="20px" height="20px"/> {' '}
                                    &nbsp;&nbsp;
                                    {seeker.ethSeeker}
                                </CardSubtitle>
                                <CardText>{seeker.seekerDescription}</CardText> 
                                <div className="text-right">
                                    <Button style={{backgroundColor: '#171E45',padding: '10px'}}
                                     onClick={()=>{this.handleRemoveSeeker(seeker)}}>
                                        Remove
                                    </Button>
                                    &nbsp;&nbsp;&nbsp; 
                                    <Button style={{backgroundColor: '#171E45',padding: '10px'}}
                                     onClick={()=>{this.handleValidateSeeker(seeker.ethSeeker)}}>
                                        Validate
                                    </Button>
                                    &nbsp;&nbsp;&nbsp; 
                                <Link to={`/seekers/${seeker.id}`}>
                                    <Button style={{backgroundColor: '#171E45',padding: '10px'}} onClick={({seeker})=>{this.handleViewProfile({seeker})}}>
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
        );
    } 
}

const mapStateToProps = (state) => {
    return {
        seekers : state.firestore.ordered.seekers
    } 
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeSeeker : (seekerId) => dispatch(removeSeeker(seekerId))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection: 'seekers'}
    ])
)(SeekerPool);