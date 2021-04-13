import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import TransfusionPool from '../pools/TransfusionsPoolComponent';
import '../../styles/HospitalDashboard.css';

const HospitalDashboard = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return ( 
    <div>
        <div className="container">
            <div className="row">
                <div className="col-12  dashboard-tab">
                <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }} style={{color: 'black'}}>
                                Transfusions
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}>
                                Initiate the donation
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '3' })}
                                onClick={() => { toggle('3'); }}>
                                Add Request
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '4' })}
                                onClick={() => { toggle('4'); }}>
                                 Append A Seeker
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '5' })}
                                onClick={() => { toggle('5'); }}>
                                Donation Complete
                            </NavLink>
                        </NavItem>
                    </Nav>
                
                </div>

            </div>
            <div className="row">
                <div className="col-12">
                    <TabContent activeTab={activeTab} className="content">
                        <TabPane tabId="1">
                            <TransfusionPool />
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                <h4>Form for initiating the request</h4>
                                </Col>
                            </Row>  
                        </TabPane>
                        <TabPane tabId="3">
                            <Row>
                                <Col sm="12">
                                <h4>Form for adding the storage time</h4>
                                </Col>
                            </Row>  
                        </TabPane>
                        <TabPane tabId="4">
                            <Row>
                                <Col sm="12">
                                <h4>Form for approving the request of seeker</h4>
                                </Col>
                            </Row>  
                        </TabPane>
                        <TabPane tabId="5">
                            <Row>
                                <Col sm="12">
                                <h4>Form for Completion</h4>
                                </Col>
                            </Row>  
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        </div>
    </div>
  );
}

export default HospitalDashboard;
