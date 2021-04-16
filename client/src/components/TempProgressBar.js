import React, { Component } from 'react';
import '../styles/TempStyles.css'

class TempProgressBar extends Component {
    render() {
        return (
          
            <div className="container-progress">
                <ul className="progressbar">
                    <li class="active"> Donation Request Initiated</li>
                    <li>Donation Completed</li>
                    <li>Transfusion Request Initiated</li>
                    <li>Transfusion Completed</li>
                </ul>
                <br />
                <br />
                <br />
            
            </div>
           
        )
    }
}
export default  TempProgressBar;