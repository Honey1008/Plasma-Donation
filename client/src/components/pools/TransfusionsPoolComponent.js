import React, { Component } from 'react';
// import instance from '../../contracts/instance';
// import web3 from '../../contracts/web3';
import { CardDeck, Card,CardBody,CardTitle,CardSubtitle
    ,CardText, Button, Spinner } from 'reactstrap';
import '../../styles/ListEntities.css';
import PrintErrorMsg from '../layout/PrintErrorMsgComponent';

function TransfusionPool(){
    return(
        <div className="container">
            <div className="row">
                <br />
                <br />
                {/* {transfusions? 
                transfusions.map(transfusion =>  */}
                    <div  className="col-12 col-md-12 offset-md-1 m-3">
                        <CardDeck>
                            <RenderTransfusion />
                        </CardDeck>                    
                     </div>
                     {/* ) */}
                {/* : null}  */}
        </div>
    </div>     
    )
}

class RenderTransfusion extends Component {
    state = {
        loading: false,
        errorMessage : ''
    }

    render() {
        return (
             <Card>
                <CardBody>
                   <CardTitle tag="h5">
                       <img src="/assets/images/transfusion.png" 
                             width="40px" height="40px" alt=""/>&nbsp;
                             &nbsp; Transfusion Request (index number)
                   </CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                        Total transfusions in our network
                    </CardSubtitle>
                        <hr />
                    <CardText>
                        View ongoing transfusions in the network
                    </CardText>
                    {/* <Progress /> */}                 
                    <CardText>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </CardText>
                    <div className="text-right">
                        <Button className="btn-click"
                                // onClick={()=>{this.handleRemoveSeeker(seeker)}}
                                >
                                {this.state.loading? <Spinner color="light"/> : <span>Add</span>  } 
                        </Button>
                            &nbsp;&nbsp;&nbsp; 
                        <Button className="btn-click"
                            // onClick={()=>{this.handleValidateSeeker(seeker.ethSeeker)}}
                            >
                                Approve
                        </Button>
                            &nbsp;&nbsp;&nbsp; 
                        <Button className="btn-click" 
                            // onClick={({seeker})=>{this.handleViewProfile({seeker})}}
                            >
                                Complete
                        </Button>
                    </div> 
                    <CardText>
                            <br />
                            <PrintErrorMsg isError={!!this.state.errorMessage} errorMsg={this.state.errorMessage}/>
                     </CardText>
                </CardBody>        
             </Card>            
        )
    }
}
export default TransfusionPool;