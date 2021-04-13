import React from 'react';
import { Card, CardImg, CardFooter} from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap'; 
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const SeekerProfile = (props) => {  
    const {seeker} = props;     
    if(seeker){
        return(
            <div className="container" style={{marginTop: '30px'}}>
                <div className="row">
                    <div className="col-12 col-md-3 m-1"> 
                        <Card>
                        <CardImg top width="100%" src='/assets/images/profile.jpg' alt={seeker.seekerFname}/>
                            <CardFooter  tag='h5' className="mb-2 text-center">
                                {seeker.seekerFname + " " + seeker.seekerLname}
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="col-12 col-md-7 m-1 offset-2">
                            <img src="/assets/images/Ethereum.png" alt="" width="20px" height="20px"/> {' '}
                                &nbsp;&nbsp;{seeker.ethSeeker}
                                <hr />
                        <ListGroup>
                            <ListGroupItem className="border-0">
                                    <b>Blood Group : </b>
                                {/* <img src="/assets/images/blood.png" alt="" width="15px" height="15px"/> {' '} */}
                                    {seeker.seekerBG} &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    <b>Phone : </b>
                                    {/* <img src="/assets/images/call.png" alt="" width="15px" height="15px"/> */}
                                    {seeker.seekerNum} 
                            </ListGroupItem>
                            <ListGroupItem className="border-0">
                                <b>Email : </b>
                                {/* <img src="/assets/images/letter.png" alt="" width="15px" height="15px"/> {' '} */}
                                {seeker.seekerEmail}
                            </ListGroupItem> 
                            <ListGroupItem className="border-0"> 
                              <b>Gender : </b>
                                {seeker.seekerGender} &nbsp;
                                {seeker.seekerGender === 'Male'? <img src="/assets/images/male.png" alt="" width="15px" height="15px"/>:
                                seeker.seekerGender === 'Female'? <img src="/assets/images/female.png" alt="" width="15px" height="15px"/>:
                                null} {' '} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <b>Age : </b>
                                {/* <img src="/assets/images/age.jpg" alt="" width="30px" height="30px"/> {' '} */}
                                    {seeker.seekerAge} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <b>Weight : </b>
                                  {/* <img src="/assets/images/weight.png" alt="" width="15px" height="15px"/> {' '} */}
                                {seeker.seekerWeight} 
                            </ListGroupItem>
                            <ListGroupItem className="border-0"> 
                                <b>Address : </b>
                                {/* <img src="/assets/images/location.png" alt="" width="15px" height="15px"/> {' '} */}
                                {seeker.seekerAddress}, {seeker.seekerCity}, {seeker.seekerState}, {seeker.seekerCountry}.
                            </ListGroupItem> 
                            <ListGroupItem className="border-0">
                                <b>Being Treated in Hospital : </b>
                                {/* <img src="/assets/images/hospitalicon.png" alt="" width="20px" height="20px"/> */}
                                &nbsp; {seeker.seekerHospital}
                            </ListGroupItem> 
                        </ListGroup>
                    </div>
               </div>
            </div>
        );
    }
    else
        return(<div class="container">Please wait, fetching data...</div>);  
}
    
const mapStateToProps = (state, ownProps) => {  
    const id = ownProps.match.params.id;
    const seekers = state.firestore.data.seekers;
    const seeker = seekers ? seekers[id] : null
    return {
        seeker: seeker
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection : 'seekers'}
    ])
)(SeekerProfile);