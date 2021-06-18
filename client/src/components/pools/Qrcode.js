import React, { Component } from 'react'
import QRCode from 'qrcode.react';
import {Button, Spinner, Modal, ModalHeader, ModalBody} from 'reactstrap';

export default class Qrcode extends Component {
    
    state = {
        isQrModalOpen: true,
        qrloading : false
    }

    downloadQR = () => {
        const canvas = document.getElementById("qrcode");
        const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "Status.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    toggleQrModal = () => {
        this.setState({
          isQrModalOpen: !this.state.isQrModalOpen
        });
    }

    render() {
        return (
            <div>
                <Button className="btn-click"
                            onClick={this.toggleQrModal}>
                                {this.state.qrloading? <Spinner color="light"/> : <span>Generate QR</span>  } 
                </Button>
                <Modal isOpen={this.state.isQrModalOpen} toggle={this.toggleQrModal}>
                                <ModalHeader toggle={this.toggleQrModal}>
                                     Transfusion Status
                                </ModalHeader>
                                <ModalBody>
                                    <span style={{padding: '20px 130px'}}>
                                        <QRCode 
                                        id="qrcode"
                                            value="
                                            seeker: 0x873982980309838998324890483908490140891424,
                                            donor: 0x767823897983897743887478789497811,
                                            hospital: 0x4578938974973897819781281112323,
                                            storage time : 2 days,
                                            updated On : 12-4-2021"
                                            size={200}
                                            level={'H'}
                                        />
                                    </span>
                                    <br />
                                    <br />
                                    <Button className="btn-click" onClick={this.downloadQR} 
                                    style={{float: "right"}}> Download QR </Button>       
                                </ModalBody>
                        </Modal>                     
            </div>
        )
    }
}
