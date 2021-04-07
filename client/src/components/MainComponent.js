import React,{ Component } from 'react';
import PlasmaDonation from "../contracts/PlasmaDonation.json";
import getWeb3 from "../getWeb3";
import Home from './layout/HomeComponent';
import Header from './layout/HeaderComponent';
import Footer from './layout/FooterComponent';
import FollowUs from './layout/FollowComponent';
import SeekerPool from './pools/SeekerPoolComponent';
import HospitalPool from './pools/HospitalPoolComponent';
import DonorPool from './pools/DonorPoolComponent';
import HospitalForm from './auth/HospitalFormComponent';
import SeekerForm from './auth/SeekerFormComponent';
import DonorForm from './auth/DonorFormComponent';
import SeekerProfile from './pools/ProfileComponent';
import Contact from './layout/ContactComponent';
import Dashboard from './dashboard/DashBoardComponent';
import LoginPage from './auth/LoginPageComponent';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form'
import { SEEKERS } from '../shared/seekers';

const mapDispatchToProps = (dispatch) => ({
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
});

class Main extends Component {

  state = { 
    contract: undefined, 
    accounts: null,
    web3: null, 
    seekers: SEEKERS
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
      this.setState({ web3,accounts, contract: instance });
      } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  

  render() {
   const SeekerWithId = ({match}) => {
     return(
       <SeekerProfile seeker={this.state.seekers.filter((seeker) => seeker.id === parseInt(match.params.seekerId,10))[0]} />
      );

   }

    if (!this.state.web3) { 
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
      <Header />      
      <Switch>
        <Route path="/home" 
          component={() => <Home />} />

        <Route path="/hospitals" component={HospitalPool} />
        <Route exact path="/seekers" component={() => <SeekerPool seekers={this.state.seekers}/> } />
        <Route path="/seekers/:seekerId" component={SeekerWithId} />
        <Route path ="/donors" component={DonorPool} />
        <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
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

export default withRouter(connect(null, mapDispatchToProps)(Main));