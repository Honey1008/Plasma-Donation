import React from 'react';

function Circle(props) {
   
    var circleStyle = {
      padding: '10',
      margin: '50px 38px',
      display:"inline-block",
      backgroundColor: '#0F152E',
      borderRadius: "50%",
      width: 200,
      height: 200, 
      boxSizing : 'border-box',
      boxShadow : '5px 5px 5px grey'
    }

    var linkStyle = {
        color: 'white',
        textDecoration: 'none',
    }

    var headingStyle = {
        color: 'white',
        paddingTop: '30%', 
        paddingLeft: '45%',  
        margin: 'auto'
    }

    return (
    <>
            <div style={circleStyle}>
                <h2 style={headingStyle}> <a href="/hospitals" style={linkStyle}> {props.totalHospitals} </a></h2>
                <br />  
                <h5 style={{color: 'white',textAlign: 'center'}}><a href="/hospitals" style={linkStyle}> Total Hospitals</a></h5>
            </div>
            <div style={circleStyle}>
                <h2 style={headingStyle}> <a href="/seekers" style={linkStyle}> {props.totalSeekers} </a></h2> 
                <br />
                <h5 style={{color: 'white',textAlign: 'center'}}>
                <a href="/seekers" style={linkStyle}>Total Seekers</a></h5>
            </div>
            <div style={circleStyle}>
                <h2 style={headingStyle}> <a href="/donors" style={linkStyle}> {props.totalDonors} </a> </h2> 
                <br />
                <h5 style={{color: 'white',textAlign: 'center'}}>
                <a href="/donors" style={linkStyle}>Total Donors</a></h5>
            </div>
            <div style={circleStyle}>
                <h2 style={headingStyle}> <a href="/transfusions" style={linkStyle}> {props.totalTransfusions} </a> </h2> 
                <br />
                <h5 style={{color: 'white',textAlign: 'center'}}><a href="/transfusions" style={linkStyle}>
                    Total Transfusions</a></h5>
            </div>
     </>
    );
  }

export default Circle;