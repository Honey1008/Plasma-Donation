import React from 'react';
import {Jumbotron} from 'reactstrap';
import '../styles/HomeComponent.css';
import Circle from './CircleComponent';

function Home(props) {
    return(
            <>
             <Jumbotron>
                <div className="conatiner">
                    <div className="row row-header">
                        <div className="col-12 col-md-7 col-sm-3">
                           <h1 tag="display-3">Plasma Genesis</h1> 
                           <hr className="my-2" />
                           <p tag="lead">The next generation plasma donation system, leveraging the power of Blockchain Technology. Contributing to the Era of Trust.</p>    
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <h1>Home</h1>
            <Circle 
                bgColor='#0F152E' 
                seekers = {props.totalSeekers}
                donors = {props.totalDonors}
                hospitals = {props.totalHospitals}/>
            <p>The Manager of the contract is {props.plasmaManager}.</p>
           </>  
    );
}
export default Home; 