import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText, CardDeck, Button, Spinner, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import { removeSeeker } from '../../redux/actions/seekerAction';
import SeekerProfile from '../pools/SeekerProfileComponent';
import instance from '../../contracts/instance';
import web3 from '../../contracts/web3';
import PrintErrorMsg from '../layout/PrintErrorMsgComponent';
import '../../styles/ListEntities.css';

function SeekerPool({seekers, removeSeeker}) {
    return(
        <div className="container">
            <div className="row">
                <br />
                <br />
                {seekers? 
                seekers.map(seeker => 
                    <div key={seeker.id} className="col-12 col-md-12 offset-md-1 m-3">
                    <CardDeck>
                        <RenderSeeker seeker={seeker} removeSeeker={removeSeeker}/>
                    </CardDeck>                    
                     </div>)
                : null} 
        </div>
    </div>     
    )
}

class RenderSeeker extends Component {    

    state = {
        loading: false,
        validateLoading: false,
        errorMessage : '',
        seekerinBlockchain : undefined,
        isSeekerEligible: false
    }

    componentDidMount = async() => {
        const accounts = await web3.eth.getAccounts();
        
        this.setState({
            seekerinBlockchain : await instance.methods.seekers(this.props.seeker.ethSeeker).call()
        });
        
        this.setState({
            isSeekerEligible : this.state.seekerinBlockchain.isSeekerEligible
        });
    }
    
    handleViewProfile = (seeker) => {
        return(
            <div>
                <SeekerProfile />
            </div>
        )
    }

    handleValidateSeeker = async(ethSeeker) => {
        // prevent.default(); 
        this.setState({validateLoading: true, errorMessage: ''});
        try{
            const accounts = await web3.eth.getAccounts();
            
            await instance.methods.validateSeeker(ethSeeker)
            .send({from : accounts[0], gas: '1000000'});
        }catch(err){
            this.setState({ errorMessage: err.message });
        }
           
        this.setState({validateLoading: false});  
    }
    
    handleRemoveSeeker = async(seeker) => {
        this.setState({loading: true, errorMessage: ''});
        try{
            const accounts = await web3.eth.getAccounts();
            await instance.methods.removeSeeker(seeker.ethSeeker)
            .send({from: accounts[0], gas: '1000000'});
            this.props.removeSeeker(seeker.id);
            }catch (err) {
                this.setState({ errorMessage: err.message });
            }
        this.setState({loading: false});    
     } 

    render(){
        const {seeker} = this.props;
        return(
            <>
                <Card>
                    <CardBody>       
                        <CardTitle tag="h5">
                           <img src="assets/images/search.png" alt="" width="20px" height="20px"/> {' '}
                             &nbsp;&nbsp;
                            {seeker.seekerFname+ " " + seeker.seekerLname}
                            <small className="text-muted" style={{float: 'right'}}>
                                    {
                                        this.state.isSeekerEligible?
                                        <i>Verfied by Hospital</i>: 
                                        <i>Not yet verified by the Hospital</i>
                                    }
                            </small>
                        </CardTitle>
                        <CardText>
                               
                        </CardText>                        
                        <hr /> 
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                        <img src="assets/images/Ethereum.png" alt="" width="20px" height="20px"/> {' '}
                         &nbsp;&nbsp;
                        {seeker.ethSeeker}
                        </CardSubtitle>
                        <CardText>{seeker.seekerDescription}</CardText> 
                          <div className="text-right">
                            <Button className="btn-click"
                                onClick={()=>{this.handleRemoveSeeker(seeker)}}>
                                {this.state.loading? <Spinner color="light" size="sm"/> : <span>Remove</span>  } 
                            </Button>
                            &nbsp;&nbsp;&nbsp; 
                          { this.state.isSeekerEligible ? null
                             :<span><Button className="btn-click"
                                onClick={()=>{this.handleValidateSeeker(seeker.ethSeeker)}}>
                                {this.state.validateLoading? <Spinner color="light" size="sm"/> : 
                                <span>Validate</span>  } 
                             </Button>&nbsp;&nbsp;&nbsp;</span>}
                            
                             <Link to={`/seekers/${seeker.id}`}>
                            <Button className="btn-click" 
                            onClick={({seeker})=>{this.handleViewProfile({seeker})}}>
                                View Profile
                            </Button>
                            </Link>  
                            </div> 
                            <CardText>
                                <br />
                                <PrintErrorMsg isError={!!this.state.errorMessage} errorMsg={this.state.errorMessage}/>
                            </CardText> 
                        </CardBody>      
                </Card>
                </>
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