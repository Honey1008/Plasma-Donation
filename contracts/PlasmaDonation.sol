// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract PlasmaDonation{
    
    //Array of addresses that can used to retrieve the entities using map functionality in the frontend.
    address[] public totalSeekers; //array of addresses that keeps the track of total seekers in the system.
    address[] public totalDonors; // array of addresses that keeps the track of total Donors in the system.
    address[] public totalHospitals; //array of addresses that keeps track of total Hospitals in the system.
    
    //state variable that stores address of creator of contract with access of admin level.
    address public plasmaManager; 
    
    //enumeration that stores the status of transfusion
    enum status{requestInitiated,requestAdded,requestApproved,requestCompleted} 
    
    //State variable that keeps track of successfully completed transfusions
    uint public totalCompletedTransfusions = 0;
    
    //structure to create a new datatype Seeker
    struct Seeker{
        address ethSeeker;
        string hashOfSeekersData;
        address associatedHospital;
        bool isSeekerEligible;
        bool exist;
    }
    
    //mappings that store data of Seeker and the index at which the donor is stored respectively.
    mapping(address => Seeker) public seekers;
    mapping(address => uint) public indexOfSeeker;
       
    //structure to create a new datatype Donor.
    struct Donor{
        address ethDonor;
        string hashOfDonorsData;
        address associatedHospital;
        bool isDonorEligible;
        bool exist;
    }
    
    //mappings that store data of Donor and the index at which the donor is stored respectively.
    mapping(address => Donor) public donors;
    mapping(address => uint) public indexOfDonor;
    
    //structure to create a new datatype Hospital.
    struct Hospital{
        address ethHospital;
        string hospitalName;
        string hashOfHospitalsData;
        bool isHospitalLegitimate;
        bool exist;
    }
    //mappings that store data of Hospital and the index at which the donor is stored respectively.
    mapping(address => Hospital) public hospitals;
    mapping(address => uint) public indexOfHospital;

    //structure to create a new datatype TransfusionState
    struct TransfusionState{
        uint indexOfTransfusion;
        address ethSeeker;
        address ethDonor;
        address ethHospital;
        status stateOfTransfusion;
        string storageTime;
        string updatedOn;
        bool exist;
    }    
     
    //Array of transfusions;
    TransfusionState[] public transfusions;
    
   //Assures that the function is only invoked by the plasma Manager
    modifier onlyManager(){
        require(msg.sender == plasmaManager,"You do not have the authority to perform this operation!");
        _;
    } 
    
    //Checks the existence of Seeker in Network.
    modifier checkSeekerExist(address _ethSeeker){
        require(seekers[_ethSeeker].exist,"Seeker with the given address doesn't exist in the network.");
        _;
    }
    
    //Checks existence of Donor in the Network.
    modifier checkDonorExist(address _ethDonor){
        require(donors[_ethDonor].exist,"Donor with the given address doesn't exist in the network.");
        _;
    }
    
    //Checks existence of Hospital in Network.
    modifier checkHospitalExist(address _ethHospital){
        require(hospitals[_ethHospital].exist,"Hospital with the given address doesn't exist in the network.");
        _;
    }
    
    //The constructor assigns the deployer of contract's address to plasmaManager.
    constructor(){
        plasmaManager = msg.sender;
    }
    
    //The hospital with which the seeker is associated validates the seeker and verifies that s/he is eligible or not.
    function validateSeeker(address _ethSeeker) public checkSeekerExist(_ethSeeker) 
    {
        require(msg.sender == seekers[_ethSeeker].associatedHospital,"Access Denied! You do not have the authority to validate as patient is not associated with this hospital");
        require(!seekers[_ethSeeker].isSeekerEligible,"The seeker has already been validated");
        seekers[_ethSeeker].isSeekerEligible = true;
    }
    
    //Adds the seeker data onto the network.
    function addSeeker(string memory _hashOfSeekersData,address _associatedHospital) public 
    {
        //checks whether the seeker is already added or not.
        require(!seekers[msg.sender].exist, "User with this address already exists as a seeker!");
        Seeker storage seeker = seekers[msg.sender];
        seeker.ethSeeker = msg.sender;
        seeker.hashOfSeekersData = _hashOfSeekersData;
        seeker.associatedHospital = _associatedHospital;
        seeker.exist = true; //Indicates that the seeker is now a part of the network.
        seeker.isSeekerEligible = false;
        
        totalSeekers.push(msg.sender);  //Adding seeker's address.     
        indexOfSeeker[msg.sender] = totalSeekers.length; //store the index on which seeker is added. 
    }
   
    // Donor is added to the network.
    function addDonor(string memory _hashOfDonorsData) public
    {
        //checks whether the donor is already added or not.
        require(!donors[msg.sender].exist, "User with this address already exists as a donor!");
        Donor storage donor = donors[msg.sender];
        donor.ethDonor = msg.sender;
        donor.hashOfDonorsData = _hashOfDonorsData;
        donor.exist = true; //Indicates that the donor is now a part of the network.
        donor.isDonorEligible = false;
        
        totalDonors.push(msg.sender); //Adding donors address.   
        indexOfDonor[msg.sender] = totalDonors.length; //store the index on which donor is added.
    }
   
    // The Hospital is validated by Plasma Manager.
    function validateHospital(address _ethHospital) public onlyManager {
        require(!hospitals[_ethHospital].isHospitalLegitimate,"The authenticity of hospital is already verified by Plasma Manager");
        hospitals[_ethHospital].isHospitalLegitimate = true;
    }
    
    // Hospital is added to the network.
    function addHospital(address _ethHospital, string memory _hospitalName, string memory _hashOfHospitalsData) onlyManager public
    {   
        //checks whether the hospital is already added or not.
        require(!hospitals[_ethHospital].exist,"This Hospital is already added!");
        //The hospital can be added only after verification by plasmaManager.
        require(hospitals[_ethHospital].isHospitalLegitimate,"The hospital has yet not been validated by the Plasma Manager");
        
        Hospital storage hospital = hospitals[_ethHospital];
        hospital.ethHospital = _ethHospital;
        hospital.hospitalName = _hospitalName;
        hospital.hashOfHospitalsData = _hashOfHospitalsData;
        hospital.exist = true; //Indicates that the hospital is now a part of the network.
        
        totalHospitals.push(_ethHospital); //After adding hospital to the network increments the statevariable to keep track of total Hospitals in the system.
        indexOfHospital[_ethHospital] = totalHospitals.length;
    }
   
    //removes the seeker if S/he turns out to be malicious. This operation can only be performed by the hospital.
    function removeSeeker(address _ethSeeker) public checkSeekerExist(_ethSeeker) checkHospitalExist(msg.sender){
        
        require(msg.sender == seekers[_ethSeeker].associatedHospital,"You do not have the authority to perform this operation.");
        delete seekers[_ethSeeker]; // deletes the information of seeker from mappings seeker.
        uint index = indexOfSeeker[_ethSeeker] - 1; // get the index on which the seeker with the address _ethSeeker is stored.
        if(index == totalSeekers.length - 1) {
            totalSeekers.pop(); // if the seeker is present at the last index just perform pop operation.
        } else{
             delete totalSeekers[index]; //deleting that address from array totolSeekers.
             totalSeekers[index] = totalSeekers[totalSeekers.length - 1]; //copying the last element to the deleted element index.
             totalSeekers.pop(); // pop the redundant last element.
             indexOfSeeker[totalSeekers[index]] = index + 1; //set the index value of the last element in mapping.
        }
        delete indexOfSeeker[_ethSeeker]; //deleting the seeker from the mapping.
    }
    
    //removes the donor if S/he turns out to be malicious. This operation can only be performed by any Hospital.
    function removeDonor(address _ethDonor) public checkDonorExist(_ethDonor) checkHospitalExist(msg.sender){
        
        delete donors[_ethDonor];
        uint index = indexOfDonor[_ethDonor] - 1;  //get the index on which the donor with the address _ethDonor is stored.
        if(index == totalDonors.length - 1){
            totalDonors.pop();
        } else{
            delete totalDonors[index];  //deleting that address from array totalDonors.
            totalDonors[index] = totalDonors[totalDonors.length - 1]; //copying the last element to the deleted element's index.
            totalDonors.pop(); // removing the last element.
            indexOfDonor[totalDonors[index]] = index + 1; //updating the index value of that last element.
        }
        delete indexOfDonor[_ethDonor]; //deleting the donor from the mapping.
    }
  
    //removes the hospital if it turns out to be malicious. This operation can only be performed by Manager.
    function removeHospital(address _ethHospital) onlyManager checkHospitalExist(_ethHospital) public{
       
        delete hospitals[_ethHospital];
        uint index = indexOfHospital[_ethHospital] - 1; //get the index on which the hospital with address _ethHospital is stored.
        if(index == totalHospitals.length - 1){
            totalHospitals.pop();
        } else{
            delete totalHospitals[index]; //deleting that address from array totalHospitals.
            totalHospitals[index] = totalHospitals[totalHospitals.length-1];//copying the last eelement to the deleted element's index.
            totalHospitals.pop(); //poping the last redundant element.
            indexOfHospital[totalHospitals[index]] = index + 1; //setting the index of the last element
        }
        delete indexOfHospital[_ethHospital]; //deleting the hospital from the mapping.
    }
    
    //Hospital validates the Donor before collecting Plasma.
    function validateDonor(address _ethDonor) public checkHospitalExist(msg.sender) checkDonorExist(_ethDonor){
       require(hospitals[msg.sender].exist,"You must be added as a hospital to the network to perform this operation");    
       require(!donors[_ethDonor].isDonorEligible,"The Donor has already been validated");
       donors[_ethDonor].associatedHospital = msg.sender;
       donors[_ethDonor].isDonorEligible = true;
    }
    
    //Information about the Donation when the plasma is collected from the donor before transfusing it to any patient.
    function Donation(address _ethDonor, string memory _updatedOn)public checkDonorExist(_ethDonor) checkHospitalExist(msg.sender){
        require(donors[_ethDonor].isDonorEligible,
        "First the donor needs to be validated by the hospital in order to add transfusion");
        require(donors[_ethDonor].associatedHospital == msg.sender,
        "Donation information must be added by the hospital who validated the donor.");
        
        TransfusionState memory newTransfusion = TransfusionState({
            indexOfTransfusion : transfusions.length,
            //As the plasma is not transfused yet, initializing seekers address.
            ethSeeker : 0x0000000000000000000000000000000000000000,
            ethDonor : _ethDonor,
            ethHospital : msg.sender,
            stateOfTransfusion : status.requestInitiated,
            storageTime : "", //initializing the storage time 
            updatedOn : _updatedOn, //adding the donation timestamp to the array timeStamps.
            exist : true
        });
        transfusions.push(newTransfusion);
    }
    
    //Adding the storage phase information.
    function Storage(uint index, string memory _updatedOn) public checkHospitalExist(msg.sender)
    {
        require(transfusions[index].stateOfTransfusion == status.requestInitiated,
        "Before going ahead with the storage phase add the donation information. ");
        require(transfusions[index].ethHospital == msg.sender,
        "Only the associated hospital has the authority to modify the state of tranfusion");
        
        transfusions[index].stateOfTransfusion = status.requestAdded;
        transfusions[index].updatedOn = _updatedOn;

    }
    
    //Associating the patient that is transfused with the donor's Plasma.
    function Tranfusion(uint index, address _ethSeeker, string memory _updatedOn, string memory _storageTime) public
    {
        require(transfusions[index].stateOfTransfusion == status.requestAdded,
        "Before going ahead with transfusion phase add the storage information");
        require(seekers[_ethSeeker].exist && hospitals[msg.sender].exist,
        "Check again that both seeker and hospital are added into network");
        require(msg.sender == seekers[_ethSeeker].associatedHospital,
        "The transfusion details can only be added by the hospital in which the patient is being treated.");
        
        transfusions[index].ethSeeker = _ethSeeker;
        transfusions[index].stateOfTransfusion = status.requestApproved;
        transfusions[index].updatedOn = _updatedOn;
        transfusions[index].storageTime = _storageTime;
    }
    
    //The Tranfusion completed successfully.
    function Complete(uint index, string memory _updatedOn) public checkSeekerExist(transfusions[index].ethSeeker) 
    checkDonorExist(transfusions[index].ethDonor) checkHospitalExist(msg.sender)
    {
       require(transfusions[index].stateOfTransfusion == status.requestApproved,
       "The request of tranfusion must be approved prior to this step.");
        require(msg.sender == seekers[transfusions[index].ethSeeker].associatedHospital,
        "The transfusion details can only be added by the hospital in which the patient is being treated.");
      
       transfusions[index].stateOfTransfusion = status.requestCompleted;
       transfusions[index].updatedOn = _updatedOn;
       totalCompletedTransfusions++;
    }
    
    //Obtaining all the addresses of entities added to the system so in the front end.
    //We can obtain all the data using map functionality.
    function viewAllSeekers() public view returns (address[] memory){
        return totalSeekers;
    }
    
    function viewAllDonors() public view returns (address[] memory){
        return totalDonors;
    }
    
    function viewAllHospitals() public view returns (address[] memory){
        return totalHospitals;
    }
    /* Note : For viewing all the transfusions just use mapping on the transfusions array*/
}