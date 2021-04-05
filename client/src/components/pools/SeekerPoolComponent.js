import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardDeck, CardFooter, Button} from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderSeeker({seeker}){
    return(
        <Card>
             <CardBody>
                    <CardImg width="100%" src={seeker.img} alt={seeker.name}/>
                    <CardTitle tag="h5">{seeker.name}</CardTitle>
                    <CardSubtitle tag="h6">{seeker.ethseeker}</CardSubtitle>
                </CardBody>  
            <Link to={`/seekers/${seeker.id}`}>
                <CardFooter body className="text-right"><Button>View Profile</Button></CardFooter>  
            </Link>     
         </Card>

    );

}

const SeekerPool = (props) => {

    const seekerlist = props.seekers.map(seeker => {
        return(
            <div key={seeker.id} className="col-12 col-md-auto offset-md-1 m-4">
                <CardDeck>
                    <RenderSeeker seeker = {seeker}/> 
                </CardDeck>
            </div>
        );
    });

    return(
        <div className="container">
            <div className="row">
                {seekerlist}
            </div>
        </div>
    );

}


export default SeekerPool;