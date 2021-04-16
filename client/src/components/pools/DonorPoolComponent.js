import React,{ Component} from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardDeck, Button, CardText, Spinner} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import {removeDonor} from '../../redux/actions/donorAction';
import DonorProfile from '../pools/DonorProfileComponent';
import instance from '../../contracts/instance';
import web3 from '../../contracts/web3';
import PrintErrorMsg from '../layout/PrintErrorMsgComponent';
import '../../styles/ListEntities.css';

function DonorPool({donors,removeDonor}) {
    return(
        <div className="container">
            <div className="row"> 
                <br />
                <br />
                {donors? 
                donors.map(donor => 
                    <div key={donor.id} className="col-12 col-md-12 offset-md-1 m-3">
                        <CardDeck>
                            <RenderDonor donor={donor} removeDonor={removeDonor}/>
                        </CardDeck>                    
                    </div>)
                : null} 
        </div>
    </div>
        
    )
}

class RenderDonor extends Component {

    state = {
        loading: false,
        errorMessage : ''
    }

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
        this.setState({loading: true, errorMessage: ''});
        try{
            const accounts = await web3.eth.getAccounts();
            await instance.methods.removeDonor(donor.ethDonor)
            .send({from : accounts[0], gas: '1000000'});
            this.props.removeDonor(donor.id); 
        }catch (err) {
                this.setState({ errorMessage: err.message });
        }
        this.setState({loading: false});   
    }

    render() {
        const {donor} = this.props;
        return(
                <Card className="card">
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
                       <Button className="btn-click"
                           onClick={()=>{this.handleRemoveDonor(donor)}}>
                            {this.state.loading? <Spinner color="light"/> : <span>Remove</span>  }
                        </Button>
                          &nbsp;&nbsp;&nbsp; 
                       <Button className="btn-click"
                      onClick={()=>{this.handleValidateDonor(donor.ethDonor)}}>
                            Validate
                       </Button>
                       &nbsp;&nbsp;&nbsp; 
                     <Link to={`/donors/${donor.id}`}>
                    <Button className="btn-click" 
                    onClick={this.handleViewProfile}>
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
        );   
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