import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
    // we are on the browser and metamsk is running
    web3 = new Web3(window.web3.currentProvider);

}else{
    //we are on the server *OR* metamask is not available 
    const provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:8545"
    );
    web3 = new Web3(provider);

}

export default web3;