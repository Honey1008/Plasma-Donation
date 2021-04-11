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
            <div className="home-content">
            <h1>Home</h1>
          
            <Circle totalHospitals={this.state.totalHospitals}
            totalSeekers = {this.state.totalSeekers}
            totalDonors = {this.state.totalDonors}/>
            <h6>The contract is deployed to address {this.state.contractAddress}</h6>
            <h6>The Manager of the contract is {this.state.plasmaManager}</h6>
            </div>
           </>  
        );
    }
}  
export default Home; 