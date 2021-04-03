import React from 'react';
import '../../styles/FollowComponent.css';

function FollowUs(props){
    return(
        <div className="follow-us">
        <div className="container">
         <div className="row">          
                <div className="col-12">
                    <div className="text-center">
                     <br />
                        <strong className="heading-footer">FOLLOW US </strong> &nbsp; &nbsp; &nbsp; 
                        <a className="btn btn-social-icon" href="http://www.instagram.com/profile.php?id="><i className="fa fa-instagram"> </i></a>
                        <a className="btn btn-social-icon" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook" > </i></a>
                        <a className="btn btn-social-icon" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin" > </i></a>
                        <a className="btn btn-social-icon" href="http://twitter.com/"><i className="fa fa-twitter" > </i></a>
                        <a className="btn btn-social-icon" href="http://youtube.com/"><i className="fa fa-youtube" > </i></a>
                        <br />
                        <br />
                        <div className="text-center">
                           <small><b>©Copyright GECGn (Alumni)</b></small>
                        </div>
                    </div>
                </div>                  
            </div>
        </div> 
    </div>
    );
}

export default FollowUs;