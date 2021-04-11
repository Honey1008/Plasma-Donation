import React from 'react';
import '../../styles/PrintErrorMsg.css';
function PrintErrorMsg(props){
    return(
        <div>
             {props.isError ? 
                <div className="row-error">   
                    <h6 className="error-heading">Opps!!!</h6>
                    <p>{props.errorMsg}</p> 
                </div> 
            :null
            }
        </div>
    )
}

export default PrintErrorMsg;
