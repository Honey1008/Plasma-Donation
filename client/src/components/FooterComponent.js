import React from 'react';
import '../styles/FooterComponent.css';
import { Link } from 'react-router-dom';


function Footer(props) {
    return(
    
            <div className="footer">
                <hr className="footer-line"/>
                <div className="container">
                    <div className="row">             
                        <div className="col-md-3 col-sm-4">
                            <h5 className="heading-footer">QUICK LINKS</h5>
                            <ul className="list-unstyled">
                                <li><Link className="link-content" to="/home">Home</Link></li>
                                <li><Link className="link-content" to="/aboutus">About Us</Link></li>
                                <li><Link className="link-content" to="/plasmamanager">Plasma Manager</Link></li>
                                <li><Link className="link-content" to="/contactus">Contact Us</Link></li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-4 mr-auto">
                            <h5 className="heading-footer">VIEW ENTITIES</h5>
                            <ul className="list-unstyled">
                                <li><Link className="link-content" to="/plasmamanager">Plasma Center</Link></li>
                                <li><Link className="link-content" to="/hospitals">Hospitals</Link></li>
                                <li><Link className="link-content" to="/seekers">Seeker</Link></li>
                                <li><Link className="link-content" to="/donors">Donor</Link></li>   
                            </ul>
                        </div>  
                        <div className="col-md-3 col-sm-4 ml-auto">
                            <h5 className="heading-footer" >ADDRESS</h5>
                            <address>
                              50- Tulsi Tenament, <br />
                              Near ITI, Jafarabad<br />
                              Godhra, Gujarat, India.<br />
                            </address>  <br />                    
                        </div>   
                        <div className = "col-md-3 col-sm-4 ml-auto">
                            <h5 className="heading-footer">CONTACT</h5>
                            <Link  className="link-content" to="/contactus">Feedback</Link> <br />
                            <i className="fa fa-phone fa-lg"></i>(+91)9106595511<br />
                            <i className="fa fa-envelope fa-lg"></i> <a className="link-content" href="mailto:plasma@genesis.com">
                                plasma@genesis.com</a> <br />
                        </div>
                        </div> 
                    </div>
                    
                </div>
    );
}

export default Footer;