import React, {Component} from 'react';
import {Jumbotron} from 'reactstrap';
import PlasmaDonation from '../../contracts/PlasmaDonation';
import instance from '../../contracts/instance';
import web3 from '../../contracts/web3';
import '../../styles/HomeComponent.css';
import Circle from './CircleComponent';

class Home extends Component {

    state = {
        plasmaManager : '',
        contractAddress : null,
        totalSeekers : null,
        totalDonors: null,
        totalHospitals : null
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

        const seekers = await instance.methods.viewAllSeekers().call();
        const donors = await instance.methods.viewAllDonors().call();
        const hospitals = await instance.methods.viewAllHospitals().call();

        this.setState({
            plasmaManager,
            contractAddress : deployedNetwork.address,
            totalSeekers : seekers.length,
            totalDonors : donors.length,
            totalHospitals : hospitals.length
        })
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
                         because it is the essential starting material needed to manufacture therapies that 
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
                    
                    {/* <div className="row">
                    <div className="col-12">
                        <p style={{fontSize:'18px'}}>The Plasma Manager of this contract is &nbsp;
                            <Link className="link-content" to="/myprofile">
                                {this.state.plasmaManager}
                            </Link>
                        
                            <br />While, the contract is deployed to {this.state.contractAddress} address.
                        </p>                 
                   </div> */}
                 {/* </div> */}
                    <br />
                <div className="row">
                    <div className="col-7">
                        <br />
                        <br />
                         <img src="/assets/images/covid19.jpg" alt=""/>
                    </div>
                    <div className="col-5">
                        <p style={{fontSize: '18px'}}>
                            Convalescent plasma therapy was the only means of rehabilitation initially
                            when there was no vaccine for COVID-19.
                            Convalescent plasma is collected from someone who has 
                            recovered from a virus. When a person is infected with a virus, 
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
                <br/>  
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
            totalDonors = {this.state.totalDonors}/>
        </div> 

        </> 
        );
    }
}  
export default Home; 