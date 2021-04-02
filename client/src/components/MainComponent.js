import React,{ Component } from 'react';
import PlasmaDonation from "../contracts/PlasmaDonation.json";
import getWeb3 from "../getWeb3";
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import FollowUs from './FollowComponent';
import SeekerPool from './SeekerPoolComponent';
import HospitalPool from './HospitalPoolComponent';
import DonorPool from './DonorPoolComponent';
import HospitalForm from './HospitalFormComponent';
import SeekerForm from './SeekerFormComponent';
import DonorForm from './DonorFormComponent';
import SeekerProfile from './ProfileComponent';
import Contact from './ContactComponent';
import Dashboard from './dashboard/DashBoardComponent';
import { HOSPITALS } from '../shared/hospitals';
import { SEEKERS } from '../shared/seekers';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './auth/LoginPageComponent';


class Main extends Component {

  state = { 
    PlasmaDonationInstance: undefined, 
    web3: null, 
    plasmaManager: null, 
    isManager: false,
    hospitals : HOSPITALS,
    seekers : SEEKERS
  };

  componentDidMount = async () => {
    // FOR REFRESHING PAGE ONLY ONCE -
    if(!window.location.hash){
      window.location = window.location + '#loaded';
      window.location.reload();
    }

    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PlasmaDonation.networks[networkId];
      const instance = new web3.eth.Contract(
        PlasmaDonation.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, plasmaManager: accounts[0], PlasmaDonationInstance: instance }, this.runExample);

      const creator = await this.state.PlasmaDonationInstance.methods.plasmaManager().call();
      if(this.state.plasmaManager === creator){
        this.setState({isOwner : true});
      }

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  

  render(){

    const HomePage =() => {
      return(
        
        <div> 
          <Home />
          The Manager of the contract is {this.state.plasmaManager}.
        </div>
      );
    }

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
      <Header />      
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route path="/hospitals" component={()=> <HospitalPool hospitals={this.state.hospitals} /> } />
        <Route exact path="/seekers" component={() => <SeekerPool seekers={this.state.seekers}/> } />
        <Route path ="/donors" component={DonorPool} />
        <Route path="/contactus" component={Contact} />
        <Route path ="/hospitalform" component={HospitalForm} />
        <Route path="/seekerform" component={SeekerForm} />
        <Route path="/donorform" component={DonorForm} />
        <Route path ="/login" component={LoginPage} />
        <Route path="/aboutus" component={Dashboard} />
        <Redirect to="/home" />
      </Switch>  
      <Footer />
      <FollowUs/>
      </div>
    );
  }
  
}

export default Main;