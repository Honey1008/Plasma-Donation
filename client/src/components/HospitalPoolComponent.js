import React from 'react';
import { Media } from 'reactstrap';

function RenderHospital({ hospital }) {
    return(
        <Media tag="li">
            <Media left middle>
               <Media object src={hospital.img} alt={hospital.name} />
            </Media>
            <Media body className="ml-5">
            <Media heading>
                <img src="assets/images/Ethereum.png" alt="" width="5%" heigth="5%"/>
                {hospital.ethadd}</Media>
                <p>{hospital.name}</p>
                <p>{hospital.address}</p>
                <p>{hospital.contact}</p>
            </Media>
        </Media>
    );

}

const HospitalPool = (props) => {

    const hospitallist = props.hospitals.map(hospital => {
        return(
            <div key={hospital.id} className="col-12 mt-5">
                <RenderHospital hospital={hospital} /> 
            </div>
        );
    });

    return(
        <div className="conatiner">
            <div className="row">
                <Media list>
                    {hospitallist}
                </Media>
            </div>
        </div>

    );
}
        

export default HospitalPool;