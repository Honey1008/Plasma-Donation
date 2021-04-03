import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
import {ListGroup, ListGroupItem} from 'reactstrap'; 


    function RenderSeeker({seeker}) {
        if(seeker != null){
            return(
                <div className="row">
                <div className="col-12 col-md-3 m-1"> 
                <Card>
                    <CardImg width="100%"  src={seeker.img} alt={seeker.name}/>
                    <CardBody>
                        <CardTitle>{seeker.ethseeker}</CardTitle>
                        <CardText>Name : {seeker.name}</CardText>
                    </CardBody>
                </Card>
                </div>
                    <RenderInformation seeker = {seeker} />
                </div>
            );
        }
        else
            return(<div></div>);  
    } 

    function RenderInformation ({seeker}) {
        if(seeker!=null)
        return(
        <div row col-12 col-md-5 m-1>
            <ListGroup>
                <ListGroupItem className="border-0">Blood Group : {seeker.seekerBG}</ListGroupItem>
                <ListGroupItem className="border-0">Contact : {seeker.contact}</ListGroupItem>
                <ListGroupItem className="border-0">Age : {seeker.age}</ListGroupItem>
                <ListGroupItem className="border-0">Weight : {seeker.weight}</ListGroupItem>
                <ListGroupItem className="border-0">Address : {seeker.address}</ListGroupItem>
            </ListGroup>
        </div>);
        else
            return(<div></div>)
    }

    const SeekerProfile = (props) => {
        return(
            <div className="container" style={{marginTop: '30px'}}>
                <RenderSeeker seeker = {props.seeker} />
           </div>
        );

    }
        
export default SeekerProfile;