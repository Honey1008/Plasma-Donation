import React,{ Component} from 'react';
import Notification from './Notifications';

class Dashboard extends Component{
    render(){
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col sm-12 md-6">

                    </div>
                    <div className="col sm-12 md-5 offset-1">
                        <Notification />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;