import React from 'react';
import '../../styles/Notifications.css';
import { Progress } from "reactstrap";

function Notification(props) {
    return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                     <b>Notifications</b>
                </div>
            </div>
            <br />
            <div className="row">
                <br />
                <div className="col-12 notification-added">
                Notification someone is added to the network.
                </div>
            </div>
            <br />
            <div className="row">
                <br />
                <div className="col-12 notification-removed">
                Notification someone is removed from the network.
                </div>
            </div>
            <br />
            <div className="row">
                <br />
                <div className="col-12 notification-operation">
                Notification some operation is taking place in the network.
                </div>
            </div>
            <br />
            <div className="row">
                <br />
                <div className="col-12 notification-completed">
                Notification when Donation is completed in the network.
                </div>
            </div>
        </div>
    )

}

export default Notification;