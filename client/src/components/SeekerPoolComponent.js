import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardDeck, CardFooter, Button, ButtonToggle} from 'reactstrap';

function RenderSeeker({seeker, onClick}){
    return(
        <Card onClick={() => onClick(seeker.id)}>
            {/* <CardHeader></CardHeader> */}
            <CardBody>
                <CardImg width="100%" src={seeker.img} alt={seeker.name}/>
                <CardTitle tag="h5">{seeker.name}</CardTitle>
                <CardSubtitle tag="h6">{seeker.ethseeker}</CardSubtitle>
                {/* <CardText></CardText>      */}
            </CardBody>  
            <CardFooter body className="text-right"><Button>View Profile</Button></CardFooter>       
         </Card>

    );

}

const SeekerPool = (props) => {

    const seekerlist = props.seekers.map(seeker => {
        return(
            <div key={seeker.id} className="col-12 col-md-auto offset-md-1 m-3">
                <CardDeck>
                    <RenderSeeker seeker = {seeker} onClick={props.onClick} /> 
                </CardDeck>
               </div>
        );
    });

    return(
        <div className="container">
            <h1></h1>
            <div className="row col-12 col-md-auto m-3">
                <ButtonToggle color="primary" size="lg" > + ADD </ButtonToggle>
            </div>
            <div className="row">
                {seekerlist}
            </div>
        </div>
    );

}


export default SeekerPool;