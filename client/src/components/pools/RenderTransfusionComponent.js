import React, {Component} from 'react';
import {Card,CardBody,CardTitle,CardText,
     Spinner,Button, CardSubtitle , Modal, ModalHeader, ModalBody,
    Form, FormGroup,Label,Input} from 'reactstrap'
import PrintErrorMsg from '../layout/PrintErrorMsgComponent';
import '../../styles/ProgressBar.css';
import instance from '../../contracts/instance';
import web3 from '../../contracts/web3';

class RenderTransfusion extends Component {
    state = {
        loading: false,
        errorMessage : '',
        progressValue : '',
        i : 0,
        isModalOpen: false,
        ethSeeker : ''
    }

    componentDidMount = () => {
        const {transfusion} = this.props;
        var percent = 0;
        var increase;
        transfusion.stateOfTransfusion === '0'?
        increase = 25 : 
        (transfusion.stateOfTransfusion ==='1') ? 
        increase = 50:
        (transfusion.stateOfTransfusion ==='2') ? increase = 75 : increase = 100

        if (this.state.i == 0) {
            this.setState({i : 1});
            var elem = document.getElementById("myBar");
       
             var id = setInterval(frame, 20);
             var temp = percent
         
             function frame() {
            if(percent<temp+increase) {
                 percent++;
                 elem.style.width = percent + "%";
                 elem.innerHTML = percent  + "%";
             }
             }
         }

         this.setState({i: 0})
    }

   
    move = () => {
      
    if (this.state.i == 0) {
       this.setState({i : 1});
        var elem = document.getElementById("myBar");
        var parentelem = document.getElementById("myProgress");
        var width = elem.offsetWidth;
        var parentWidth = parentelem.offsetWidth;
        var percent = Math.round(100 * width / parentWidth);
      
        var id = setInterval(frame, 20);
        var temp = percent
        
        function frame() {
        if(percent<temp+25) {
            percent++;
            elem.style.width = percent + "%";
            elem.innerHTML = percent  + "%";
        }
        }
    }
    }

    toggleModal = () => {
        this.setState({loading: true, errorMessage: ''});
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });   
    }

    
    handleChange = (event) => {
        this.setState({ 
            [event.target.id]: event.target.value
        }) 
    }
 
    handleApproveRequest = async(event) => {
        this.setState({loading: true, errorMessage: ''});
        this.toggleModal();
        event.preventDefault();
        try{
        const accounts = await web3.eth.getAccounts();
        const prevDate = new Date(this.props.transfusion.updatedOn);
        var currentDate = new Date();
        const difference = Math.abs(currentDate-prevDate);
        const storageTime = Math.ceil(difference/(1000*3600*24)).toString();
        console.log(storageTime);
        await instance.methods
        .Transfusion(this.props.transfusion.indexOfTransfusion,this.state.ethSeeker, 
            currentDate.toString(), storageTime.toString())
        .send({from: accounts[0]});
        this.move();}catch(err){
            this.setState({ errorMessage: err.message });
        }    
        this.setState({loading: false});    
    }

    handleAddRequest = async(index) => {
        this.setState({loading: true, errorMessage: ''});
        try{
        const date = (new Date()).toString();
        const accounts = await web3.eth.getAccounts();
        await instance.methods
        .Storage(index,date)
        .send({from: accounts[0]});
        this.move();
        }
        catch(err){
            this.setState({ errorMessage: err.message });
        }
        this.setState({loading: false}); 
    }

    handleCompletion = async(index) => {
        this.setState({loading: true, errorMessage: ''});
        try{
            const date = (new Date()).toString();
            const accounts = await web3.eth.getAccounts();
            await instance.methods.Complete(index,date)
            .send({from: accounts[0]});
            this.move();
        } catch(err){
            this.setState({ errorMessage: err.message });
        }
        this.setState({loading: false});    
    }

    render() {
        const {id,transfusion} = this.props;
        return (
            <>
             <Card className="card">
                <CardBody>
                   <CardTitle tag="h5">
                       <img src="/assets/images/transfusion.jpg" 
                             width="40px" height="40px" alt=""/>&nbsp;
                             &nbsp; Transfusion Request &nbsp;
                             {`${id+1}`}
                   </CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                        &nbsp;
                        Status : 
                        &nbsp;
                        { transfusion.stateOfTransfusion === '0'?
                        <i> Donation Request Added</i>: 
                        (transfusion.stateOfTransfusion ==='1') ? 
                        <i>Donation Completed</i>:
                        (transfusion.stateOfTransfusion ==='2') ? 
                        <i>Transfusion Request Added</i> : <i>Transfusion Completed</i>}

                        <div style={{float: 'right'}}>
                        {transfusion.storageTime ? 
                        <span>
                            <img src="assets/images/coldStorage.png" alt="" width="30px" height="30px"/> {' '}
                           
                            {/* Storage Time :&nbsp; */}
                               {transfusion.storageTime === '1' ? 
                               <span>
                                   {transfusion.storageTime} day
                               </span>: <span> {transfusion.storageTime} days</span>}  
                               &nbsp;
                        </span>
                        : null}
                        </div>
                    </CardSubtitle>
                    <hr />
                    <br />
                    <CardText>
                        {transfusion.ethHospital ? 
                        <span>
                            <img src="assets/images/hospitalicon.png" alt="" width="35px" height="35px"/> {' '}
                            &nbsp;&nbsp;
                                {transfusion.ethHospital} 
                        </span>
                        : null}
                    </CardText>
                    <CardText>
                      {transfusion.ethDonor ? 
                        <span>
                           <img src="assets/images/donors.png" alt="" width="35px" height="35px"/> {' '}
                            &nbsp;&nbsp;
                           {transfusion.ethDonor}
                        </span>
                       : null}                 
                    </CardText>
                    <CardText>
                    {transfusion.stateOfTransfusion === '2' || transfusion.stateOfTransfusion === '3' 
                    ? 
                    <span>
                        <img src="assets/images/search.png" alt="" width="25px" height="25px"/> {' '}
                        &nbsp;&nbsp;
                        {transfusion.ethSeeker} 
                    </span>
                    : null}                 
                    </CardText>
                   
                    <br/>
                        <div className="container">
                            <div className="row">
                                <div className="col-10 ">
                                    <div id="myProgress">
                                        <div id="myBar">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <br/>
                    <div className="text-right">
                        {transfusion.stateOfTransfusion === '0' ? <Button className="btn-click"
                            onClick={()=>{this.handleAddRequest(transfusion.indexOfTransfusion)}}>
                                {this.state.loading? <Spinner color="light"/> : <span>Add</span>  } 
                        </Button>
                        : (transfusion.stateOfTransfusion === '1' ?
                         <Button className="btn-click"
                        onClick={this.toggleModal}>
                            {this.state.loading? <Spinner color="light"/> : <span>Approve</span>  }
                         </Button> : (transfusion.stateOfTransfusion=== '2')?
                         <Button className="btn-click" 
                         onClick={()=>{this.handleCompletion(transfusion.indexOfTransfusion)}}>
                         {this.state.loading? <Spinner color="light"/> : <span>Complete</span> }   
                        </Button> : null
                         )}    
                          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>
                                 Initiate Transfusion
                            </ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.handleApproveRequest}>
                                    <FormGroup>
                                        <Label htmlFor="ethSeeker">Ethereum Address of Seeker</Label>
                                            <Input type="text" id="ethSeeker" name="ethSeeker" 
                                              placeholder="Enter Ethereum account address of Seeker"
                                              onChange={this.handleChange}
                                            />
                                    </FormGroup>
                                    <Button type="submit" value="submit" className="btn-click"
                                    style={{ marginTop:"25px", float:'right'}}>
                                         Enter Transfusion Phase
                                    </Button>
                                </Form>
                            </ModalBody>
                         </Modal>                         
                    </div> 
                    <CardText>
                        <small className="text-muted">Last updated on ~ {transfusion.updatedOn}</small>
                    </CardText>
                    <CardText>
                     <br />
                     <PrintErrorMsg isError={!!this.state.errorMessage} errorMsg={this.state.errorMessage}/> 
           
                    </CardText>
                </CardBody>        
             </Card>    
            </>        
        )
    }
}

export default RenderTransfusion;