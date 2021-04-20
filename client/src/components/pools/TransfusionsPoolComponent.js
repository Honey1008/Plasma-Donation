import React, { Component } from 'react';
import instance from '../../contracts/instance';
import web3 from '../../contracts/web3';
import { CardDeck, Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label} from 'reactstrap';
import '../../styles/ListEntities.css';
import RenderTransfusion from './RenderTransfusionComponent';
 
class TransfusionPool extends Component{

    state={
        isModalOpen: false,
        ethDonor : '',
        totalTransfusions: '',
        transfusions : null 
    }

    componentDidMount = async()=>{
        const totalTransfusions = await instance.methods.totalTransfusions().call();

        const transfusions = await Promise.all(
            Array(totalTransfusions)
            .fill().map((element,index) => {
             return instance.methods.transfusions(index).call();
        }));

        this.setState({
            totalTransfusions,
            transfusions
        });
    }
  
    toggleModal = () => {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        }) 
    }

    handleInitiateRequest = async(event) => {
        this.toggleModal();
        event.preventDefault();
        const date = new Date();
        const dateOfDonation = date.toString();
        const accounts = await web3.eth.getAccounts();
        await instance.methods
        .Donation(this.state.ethDonor,dateOfDonation)
        .send({from: accounts[0]});
    }
  
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                    <Button onClick={this.toggleModal}
                    className="btn-click"
                    style={{ marginTop:"25px", float:'right'}}>
                        Initiate New Request
                    </Button>
                         <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>
                                 Initiate Donation
                            </ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.handleInitiateRequest}>
                                    <FormGroup>
                                        <Label htmlFor="ethDonor">Ethereum Address of Donor</Label>
                                            <Input type="text" id="ethDonor" name="ethDonor" 
                                              placeholder="Enter Ethereum account address of Donor"
                                              onChange={this.handleChange}
                                            />
                                    </FormGroup>
                                    <Button type="submit" value="submit" className="btn-click"
                                    style={{ marginTop:"25px", float:'right'}}>
                                         Enter Donation Phase
                                    </Button>
                                </Form>
                            </ModalBody>
                         </Modal>     
                    </div>
                </div>
                <div className="row">
                   
                    {this.state.transfusions? 
                    this.state.transfusions.map((transfusion,index) => 
                        <div className="col-12 col-md-12 offset-md-1 m-3" key={index}>
                            <CardDeck>
                                <RenderTransfusion 
                                key={index}
                                id={index}
                                transfusion={transfusion}
                                />
                            </CardDeck>                    
                        </div>
                        ) 
                     : null}  
            </div>
        </div>     
        )
   }
}


export default TransfusionPool;