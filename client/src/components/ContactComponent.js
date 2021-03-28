import React from 'react';

function Contact(props) {
    return(
        <div className="container">
            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        50-Tulsi Tenament,<br />
                        Near ITI, Jafarabad, Godhra<br />
                        Gujarat, India <br />
                        </address>
                        <i className="fa fa-phone fa-lg"></i> (+91) 9106595511 <br />
                        <i className="fa fa-envelope fa-lg"></i> <a href="mailto:genesis@plasma.com">genesis@plasma.com</a>
                </div>
                <div className="col-12 col-sm-6">
                    <h5>Map of our Location</h5>
                </div>
            </div>
        </div>
    );
}

export default Contact;