import React, { useState , Component} from 'react';
import {Carousel, CarouselItem,CarouselControl,CarouselIndicators,CarouselCaption, CardDeck} from 'reactstrap';
import {Card, CardBody, CardTitle, CardSubtitle, CardText} from 'reactstrap';
import ReactPlayer from 'react-player';

const items = [
  {
    src: '/assets/images/blooddonation.jpg',
    id: 1,
    caption: 'Blood is collected from donor'
  },
  {
    src: '/assets/images/plasma step 3.jpg',
    id: 2,
    caption: 'Blood and its constituent particles'
  },
  {
    src: '/assets/images/Blood and Plasma.jpg',
    id: 3,
    caption: 'Blood and Plasma'
},
  {
    src: '/assets/images/Plasma1.jpg',
    id: 4,
    caption: 'Plasma Transfusion'
  }
];

const Example = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        className="custom-tag"
        tag="div"
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} height='350px' width="400px" 
        style={{paddingBottom: '60px',paddingLeft: '50px'}}/>
        <CarouselCaption className="captions" captionText={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <div>
      <style>
        {
          `.custom-tag {
              max-width: 100%;
              height: 400px;
              width : 400px;
             
            }`
        }
        {
            `.captions {
                color: white;
                font-size: 18px;
                font-weight: 300px;
                text-align: center;
                justify-content: center;
                padding-top : 10px;
                padding-left: 20px;
                padding-bottom : 10px;
              }`
        }
        {
             `.carousel {
                color: black;
                background-color: #171e45;
                margin-top: 30px;
                padding-top: 50px;
              }`
            
        }
      </style>
      <Carousel className="carousel"
        activeIndex={activeIndex}
        next={next}
        previous={previous}>
        <CarouselIndicators className="indicators" items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </div>
  );
}

class AboutUs extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12" style={{marginTop: '60px'}}>
                         <h5>Who are we ?</h5>
                         <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <p>
                        A group of fourth year students, working on our final year project 
                        under the guidance of <b><i>Prof. J. S. Dhobi</i></b>. 
                        Inspiration for this project was the convalescent plasma therapy
                        that was used in early 2020's for treatment of COVID-19.                     
                        </p>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-12" style={{marginTop: '60px'}}>
                         <h5>What is Plasma Genesis?</h5>
                         <hr />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <p>
                       <i>Plasma Genesis</i>  (Plasma Donation using Blockchain) is a DApp – Decentralized 
                       Application that works for ease of availability and ensures the origin of Plasma.
                       The entities can be trusted and rewarded for their good work and can be penalized if 
                       proved to be malicious.
                       <br />
                       <br />
                        This platform could guarantee the visibility, security, and reliability of 
                        records from donation to transfusion and prevents repudiation and falsification.
                        Whereas, blockchain based solutions cannot prevent contaminated blood/plasma being donated, 
                        they can be used to verify the origin of the plasma and ensure that it comes from a trusted 
                        source. Initially, Plasma therapy was used and considered as the only means of survival 
                        until the vaccine came. It is not new it is used by patients with various genetic disorders to survive. 
                        Pandemics/Epidemics are inevitable! And often occur when a virus jumps from animals to humans. 
                        In the current context, with all this hype around due to COVID-19(SARS COV-2) 
                        for it is rapidly spreading across the globe, 
                        the discovery of a vaccine is the only escape from the pandemic. 
                        Hopefully, today the vaccine is available and many people have been vaccinated.
                        But still the second variant of this virus is creating a havoc.  
                        </p>    
                    </div>
                </div>

                <div className="row">
                    <div className="col-12" style={{marginTop: '60px'}}>
                         <h5>What is Plasma?</h5>
                         <hr />
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-6">
                        <p style={{paddingTop: '30px'}}>
                           Plasma is the clear, straw-colored liquid portion of blood that remains after red blood cells, white blood cells, platelets and other cellular components are removed. 
                        </p> 
                        <p>
                            It is the single largest component of human blood, comprising about 55 percent, and contains water, salts, enzymes, antibodies and other proteins.
                        </p>
                        <p>
                        Plasma carries out a variety of functions in the body, including clotting blood, fighting diseases and other critical functions.    
                        </p>
                        <p>
                        Source plasma and recovered plasma are used to produce therapies that treat people with rare, chronic diseases and disorders such as primary immunodeficiency, hemophilia and a genetic lung disease, as well as in the treatment of trauma, burns and shock. 
                        Whole blood donations most often are used locally in hospitals for transfusions required during surgery or other medical treatment.
                        </p>
                        <p>
                         It is transfused to replace clotting factors in trauma patients and other large volume transfusions,
                         liver disease and burn victims.
                        </p>
                    </div>
                    <div className="col-5 offset-1">
                         <Example />
                    </div>
                </div>  

                <div className="row">
                    <div className="col-12" style={{marginTop: '60px'}}>
                         <h5>How can someone donate Plasma?</h5>
                         <hr />
                    </div>
                </div> 

                <div className="row">
                    <div className="col-12">
                        <p>
                        Plasma may be collected as a part of the whole blood donation process 
                        or by plasmapheresis where cellular constituents of blood are returned to the donor. 
                        </p>
                        <ol>
                            <li style={{textDecoration: 'underline', fontWeight:'bold'}}> Whole Blood Donation</li>
                             <p> Whole blood is the most flexible type of donation. 
                                The donation is called “whole blood” because the blood is taken in its entirety, 
                                for separation into its component parts later in the lab.
                                It can be transfused in its original form, or used to help multiple people when 
                                separated into its specific components of red cells, plasma and platelets. 
                                This donation process takes about one hour from the time the donor comes in,
                                 to the time the donor is ready to leave. The donation itself takes only 10 to 15 minutes.
                                Whole blood donations can be usually performed every 56 days.
                            </p>
                            <li style={{textDecoration: 'underline', fontWeight:'bold'}}>Plasmapheresis</li>
                            <p> Plasmapheresis is a sterile, self-contained, automated process that separates 
                                plasma from red blood cells and other cellular components which are then returned to the donor.
                                Automated donation allows collection of a 
                                larger amount of plasma from one donor at one sitting than whole blood donation.  
                                This is particularly good for donors of <b>type AB</b>, which is the universal donor for plasma. 
                                Plasma can be donated every 4 weeks or more.
                           </p>
                        </ol>
                    </div>
                </div>    


                 <div className="row">
                    <div className="col-12">
                    <ReactPlayer style ={{float: 'center',margin: '50px 0px 50px 250px', width: '500px', height: '500px'}}
                            controls url='https://www.youtube.com/watch?v=08Pb-UZPLiU' /> 
                    </div>
                </div>    




                <div className="row">
                    <div className="col-12" style={{marginTop: '60px'}}>
                         <h5>How does this platform work?</h5>
                         <hr />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <p>
                        In this Dapp we have tried to deploy an amalgamation of centralized and decentralized system
                        to avail the benefits of both while eliminating their disadvantages.
                        In this the smart contract carries all the validation section while, firebase stores the data.
                        This platform comprises of various entities and functions of each entity are listed below.             
                        </p>
                    </div>
                </div>

                <div className="row" id="plasmamanager">
                    <div className="col-12">
                        <CardDeck>
                            <Card style={{marginTop: '20px'}} className="card">
                                <CardBody>
                                <CardTitle tag="h5">
                                <img src="assets/images/manager.png" alt="" width="25px" height="25px"/> {' '}
                                     &nbsp;&nbsp;
                                    Plasma Manager
                                </CardTitle>
                                <hr />
                                <CardSubtitle tag="h6" className="mb-2 text-muted">
                                    Deployer of the smart contract
                                </CardSubtitle>
                                <CardText>
                                    Plasma Manager here is just a single entity that deploys the contract.
                                    Any hospital that wants to be a part of this consortium blockchain is added by the Plasma Manager onto the network after verifying 
                                    whether it is legitimate or not. Its data would be added to firebase while the hash of the data would be entered into Blockchain.
                                    Plasma Manager also has the authority to remove any hospital from the network.
                                </CardText>
                                </CardBody>
                            </Card>
                        </CardDeck>
                    </div>
                </div>
                <div className="row" id="hospital">
                    <div className="col-12">
                        <CardDeck>
                            <Card style={{marginTop: '20px'}} className="card">
                                <CardBody>
                                <CardTitle tag="h5">
                                <img src="assets/images/hospitalicon.png" alt="" width="30px" height="30px"/> {' '}
                                     &nbsp;&nbsp;
                                    Hospitals
                                </CardTitle>
                                <hr />
                                <CardSubtitle tag="h6" className="mb-2 text-muted">
                                    Verifies other entities entering in the network and maintains the records of transfusions
                                </CardSubtitle>
                                <CardText>
                                    Hospital is the main entity in this network. It validates various other entities like seeker and donor.
                                    After the users create their profile incase of seeker the hospital validates its data and checks whether s/he 
                                    is really in the need of plasma or not. While, incase of the donor the identity and donating eligibility is verified 
                                    by the hospital and logged into blockchain. Apart from that various stages of transfusions are also maintained by the hospital.
                                    It can remove any seeker or donor from the network.
                                </CardText>
                                </CardBody>
                            </Card>
                        </CardDeck>
                    </div>
                </div>
                <div className="row" id="seeker">
                    <div className="col-12">
                        <CardDeck>
                            <Card style={{marginTop: '20px'}} className="card">
                                <CardBody>
                                <CardTitle tag="h5">
                                <img src="assets/images/search.png" alt="" width="25px" height="25px"/> {' '}
                                     &nbsp;&nbsp;
                                    Seekers
                                </CardTitle>
                                <hr />
                                <CardSubtitle tag="h6" className="mb-2 text-muted">
                                    Patient who needs blood/plasma
                                </CardSubtitle>
                                <CardText>
                                 Patient who is in need of  blood/plasma would create a profile on the platform
                                 and specify their need for blood/plasma and would be added to the seekers pool. 
                                 The seeker would then be verified by the hospital in which he/she is treated in.
                                 If the seeker turns out to be malicious it can be removed by any of the hospitals 
                                 in the system.
                                </CardText>
                                </CardBody>
                            </Card>
                        </CardDeck>
                    </div>
                </div>
                <div className="row" id="donor">
                    <div className="col-12">
                        <CardDeck>
                            <Card style={{marginTop: '20px'}} className="card">
                                <CardBody>
                                    <CardTitle tag="h5">
                                    <img src="assets/images/donors.png" alt="" width="30px" height="35px"/> {' '}
                                        &nbsp;&nbsp;
                                        Donors
                                    </CardTitle>
                                    <hr />
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                                        Donor is an entity who is wiling to donate blood/plasma   
                                    </CardSubtitle>
                                    <CardText>
                                    A donor who wants to donate blood/plasma or is willing to be contacted in the future
                                    would create a profile and their eligibility check would be conducted by the hospital.  
                                    If the donor turns out to be malicious it can be removed by any of the hospitals in the system.
                                    Transfusion can be tracked at various stages right from when the donor donates to when the blood is 
                                    transfused and the storage time of plasma/blood would be recorded in the Blockchain.
                                    </CardText>
                                </CardBody>
                            </Card>
                        </CardDeck>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12" style={{marginTop: '60px'}}>
                         <h5>
                         But, why Blockchain ? &nbsp; &nbsp;
                         <img src="assets/images/blockchain.png" alt="" width="30px" height="35px"/> {' '}
                        </h5>
                         <hr />
                    </div>
                </div> 
                <div className="row">
                    <div className="col-12">
                        <p>
                        Despite, the traditional web applications that function in a similar manner of connecting donors and patients the need for introducing such a system arrives due to trust and authenticity that tags along due to Blockchain. 
                        Along with centralized cloud storage (Firebase), a distributed storage ledger (Smart Contracts) authenticates the entity and ensures that the data is not manipulated at any point in time. 
                        </p>
                
                    </div>
                </div> 
            </div>
        )
    }
}

export default AboutUs;