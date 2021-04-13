import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
import React, { Component } from 'react';
const mapStyles = {
    width: '400px',
    height: '300px',
  };
class MapComponent extends Component {
    render() {
        return (
            <div>   
                <Map
                    google={this.props.google}
                    zoom={8}
                    style={mapStyles}
                    initialCenter={{ lat: 23.153290, lng: 72.391333}}>
                
                    <Marker position={{ lat: 23.153290, lng: 72.391333 }} />
                </Map>  
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDqTCHAxFEV3fEH5Fe3hOUBx39E0Hbo1yU'
  })(MapComponent);
