import React, {Component} from 'react';
import {Jumbotron, CardDeck, Card, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import PlasmaDonation from '../../contracts/PlasmaDonation';
import instance from '../../contracts/instance';
import web3 from '../../contracts/web3';
import '../../styles/HomeComponent.css';
import Circle from './CircleComponent';
import {Link} from 'react-router-dom';


class Home extends Component { 

    state = {
        plasmaManager : '',
        contractAddress : null,
        totalSeekers : null,
        totalDonors: null,
        totalHospitals : null,
        totalTransfusions: null
    }

    componentDidMount = async() => {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = PlasmaDonation.networks[networkId];
        let plasmaManager; 
        await instance.methods.plasmaManager().call(function (err, res) {
            if (err) {
              console.log("An error occured : ", err);
              return
            }
            plasmaManager = res;
        });

        const seekers = await instance.methods.totalSeekers().call();
        const donors = await instance.methods.totalDonors().call();
        const hospitals = await instance.methods.totalHospitals().call();
        const transfusions = await instance.methods.totalTransfusions().call();

        this.setState({
            plasmaManager,
            contractAddress : deployedNetwork.address,
            totalSeekers : seekers,
            totalDonors : donors,
            totalHospitals : hospitals,
            totalTransfusions : transfusions
        });
    }
   

    render() {
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
            <div className="container">
                <div className="row" style={{marginTop:'20px'}}>
                    <div className="col-12">
                         <h1 style={{fontFamily: 'serif'}}>Welcome</h1>
                        <hr /> 
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <p style={{fontSize:'18px'}}>
                        Plasma often is referred to as the <quote><em>"Gift of Life" </em></quote>&nbsp;
                        <img src="/assets/images/life.png" width="30px" height="30px" alt="" /> &nbsp;                    
                         because it is an essential starting material needed to manufacture therapies that 
                         help thousands of people worldwide with rare, chronic diseases to live healthier, 
                         productive and fulfilling lives. 
                        </p>
                        <br />
                        <p style={{fontSize:'18px'}}>
                        Become a part of the lifesaving journey that plasma takes from a dedicated donor 
                        to the thousands of patients with rare diseases who depend on plasma protein therapies 
                        to lead healthy, productive, and fulﬁlling lives. 
                        </p>
                    </div>
                </div>
                    
                <div className="row">
                    <div className="col-8 offset-2" >           
                    <br />
                    <img src="/assets/images/covid19.jpg" alt="" 
                    style={{border: '1px solid #f1f1f1', padding: '40px 30px'}}/>
                    
                        
                    </div>
                </div>          
                <br />  
                <div className="row">
                <div className="col-12">
                        <p style={{fontSize: '18px'}}>
                            Convalescent plasma is collected from someone who has 
                            recovered from a virus. 
                            Convalescent plasma therapy was the only means of rehabilitation initially
                            when there was no vaccine for COVID-19.
                            When a person is infected with a virus, 
                            their body starts making antibodies to fight it. It is believed 
                            these antibodies could be the key ingredient for a treatment to help
                            others with the same virus.

                        </p>
                        <p style={{fontSize: '18px'}}>
                            Your donated plasma touches the lives and families of thousands of 
                            patients who require life-saving therapies and treatments made from plasma-derived protein products. 
                            The plasma we collect goes to patients who need transfusions.
                        </p>
                    </div>    
                </div>            
               <br />
                <div className="row">
                    <div className="col-12">
                    <h4 style={{fontFamily: 'serif',textAlign:'center'}}>
                        Be a part of this revloution, cause the future is upto us! &nbsp;
                        <img src="/assets/images/star.png" alt="" width="30px" height="30px"/></h4>
                    <hr/>
                    </div>
                </div>
           
            <Circle totalHospitals={this.state.totalHospitals}
            totalSeekers = {this.state.totalSeekers}
            totalDonors = {this.state.totalDonors}
            totalTransfusions = {this.state.totalTransfusions}/>

            <hr />
            <div className="row">
                    <div className="col-12">
                        <p style={{fontSize:'18px'}}>
                        <img src="assets/images/manager.png" alt="" width="25px" height="25px"/> {' '}
                                     &nbsp;&nbsp;
                                     Plasma Manager of this contract is &nbsp;
                            <Link className="link-content" to="/myprofile">
                                {this.state.plasmaManager}
                            </Link>
                            <br />
                            <br />
                            <img src="assets/images/contract.png" alt="" width="25px" height="25px"/> {' '}
                                     &nbsp;&nbsp;
                                     Contract is deployed at {this.state.contractAddress}
                        </p>                 
                   </div>
                 </div>
            <hr />

            <div className="row">
                    <div className="col-12">
                        <CardDeck>
                            <Card style={{marginTop: '20px'}} className="card">
                                <CardBody style={{fontFamily: 'serif'}}>
                                <CardTitle tag="h6" style={{fontSize: '24px'}}>
                                    <blockquote>
                                    &nbsp;Giving is not just about making a donation. It is about 
                                    making a difference.&nbsp;
                                    </blockquote>
                                </CardTitle>
                              <br />
                                <CardSubtitle tag="h6" className="mb-2 text-muted" 
                                    style={{float: 'right', fontSize:'18px'}}>
                                   - Kathy Calvin, former President and CEO of UN  
                                </CardSubtitle>
                                </CardBody>
                            </Card>
                        </CardDeck>
                    </div>
                </div>
        </div> 

        </> 
        );
    }
}  
export default Home; 