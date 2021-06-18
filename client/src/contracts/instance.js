import web3 from './web3';

const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "donors",
    "outputs": [
      {
        "internalType": "address",
        "name": "ethDonor",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "hashOfDonorsData",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "associatedHospital",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isDonorEligible",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "exist",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "hospitals",
    "outputs": [
      {
        "internalType": "address",
        "name": "ethHospital",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "hospitalName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "hashOfHospitalsData",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "exist",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "plasmaManager",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "seekers",
    "outputs": [
      {
        "internalType": "address",
        "name": "ethSeeker",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "hashOfSeekersData",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "associatedHospital",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isSeekerEligible",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "exist",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalCompletedTransfusions",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalDonors",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalHospitals",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalSeekers",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "transfusions",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "indexOfTransfusion",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "ethSeeker",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "ethDonor",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "ethHospital",
        "type": "address"
      },
      {
        "internalType": "enum PlasmaDonation.status",
        "name": "stateOfTransfusion",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "storageTime",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "updatedOn",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "exist",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_ethSeeker",
        "type": "address"
      }
    ],
    "name": "validateSeeker",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_hashOfSeekersData",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_associatedHospital",
        "type": "address"
      }
    ],
    "name": "addSeeker",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_hashOfDonorsData",
        "type": "string"
      }
    ],
    "name": "addDonor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_ethHospital",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_hospitalName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_hashOfHospitalsData",
        "type": "string"
      }
    ],
    "name": "addHospital",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_ethSeeker",
        "type": "address"
      }
    ],
    "name": "removeSeeker",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_ethDonor",
        "type": "address"
      }
    ],
    "name": "removeDonor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_ethHospital",
        "type": "address"
      }
    ],
    "name": "removeHospital",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_ethDonor",
        "type": "address"
      }
    ],
    "name": "validateDonor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_ethDonor",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_updatedOn",
        "type": "string"
      }
    ],
    "name": "Donation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_updatedOn",
        "type": "string"
      }
    ],
    "name": "Storage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_ethSeeker",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_updatedOn",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_storageTime",
        "type": "string"
      }
    ],
    "name": "Tranfusion",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_updatedOn",
        "type": "string"
      }
    ],
    "name": "Complete",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalTransfusions",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]
const instance = new web3.eth.Contract(
    abi,
    '0xF99093ae574f55af94A65A8A5E49D57Aa750Ea72'
);

export default instance;