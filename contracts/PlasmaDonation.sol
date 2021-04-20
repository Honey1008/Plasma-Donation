// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract PlasmaDonation {
    uint256 public totalSeekers = 0; //state variable that keeps the track of total seekers in the system.
    uint256 public totalDonors = 0; //state variable that keeps the track of total Donors in the system.
    uint256 public totalHospitals = 0; //state variable that keeps track of total Hospitals in the system.

    //state variable that stores address of creator of contract with access of admin level.
    address public plasmaManager;

    //enumeration that stores the status of transfusion
    enum status {
        requestInitiated,
        requestAdded,
        requestApproved,
        requestCompleted
    }

    //State variable that keeps track of successfully completed transfusions
    uint256 public totalCompletedTransfusions = 0;

    //structure to create a new datatype Seeker
    struct Seeker {
        address ethSeeker;
        string hashOfSeekersData;
        address associatedHospital;
        bool isSeekerEligible;
        bool exist;
    }

    //mappings that store data of Seeker.
    mapping(address => Seeker) public seekers;

    //structure to create a new datatype Donor.
    struct Donor {
        address ethDonor;
        string hashOfDonorsData;
        address associatedHospital;
        bool isDonorEligible;
        bool exist;
    }

    //mappings that store data of Donor.
    mapping(address => Donor) public donors;

    //structure to create a new datatype Hospital.
    struct Hospital {
        address ethHospital;
        string hospitalName;
        string hashOfHospitalsData;
        bool exist;
    }
    //mappings that store data of Hospital.
    mapping(address => Hospital) public hospitals;

    //structure to create a new datatype TransfusionState
    struct TransfusionState {
        uint256 indexOfTransfusion;
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
    modifier onlyManager() {
        require(
            msg.sender == plasmaManager,
            "You do not have the authority to perform this operation!"
        );
        _;
    }

    //Checks the existence of Seeker in Network.
    modifier checkSeekerExist(address _ethSeeker) {
        require(
            seekers[_ethSeeker].exist,
            "Seeker with the given address doesn't exist in the network."
        );
        _;
    }

    //Checks existence of Donor in the Network.
    modifier checkDonorExist(address _ethDonor) {
        require(
            donors[_ethDonor].exist,
            "Donor with the given address doesn't exist in the network."
        );
        _;
    }

    //Checks existence of Hospital in Network.
    modifier checkHospitalExist(address _ethHospital) {
        require(
            hospitals[_ethHospital].exist,
            "Hospital with the given address doesn't exist in the network."
        );
        _;
    }

    //The constructor assigns the deployer of contract as plasmaManager.
    constructor() {
        plasmaManager = msg.sender;
    }

    //The hospital with which the seeker is associated validates the seeker and verifies that s/he is eligible or not.
    function validateSeeker(address _ethSeeker)
        public
        checkSeekerExist(_ethSeeker)
        checkHospitalExist(msg.sender)
    {
        require(
            msg.sender == seekers[_ethSeeker].associatedHospital,
            "Access Denied! You do not have the authority to validate as patient is not associated with this hospital"
        );
        require(
            !seekers[_ethSeeker].isSeekerEligible,
            "The seeker has already been validated"
        );
        seekers[_ethSeeker].isSeekerEligible = true;
    }

    //Adds the seeker data onto the network.
    function addSeeker(
        string memory _hashOfSeekersData,
        address _associatedHospital
    ) public {
        //checks whether the seeker is already added or not.
        require(
            !seekers[msg.sender].exist,
            "User with this address already exists as a seeker!"
        );
        Seeker storage seeker = seekers[msg.sender];
        seeker.ethSeeker = msg.sender;
        seeker.hashOfSeekersData = _hashOfSeekersData;
        seeker.associatedHospital = _associatedHospital;
        seeker.exist = true; //Indicates that the seeker is now a part of the network.
        seeker.isSeekerEligible = false;
        totalSeekers++;
    }

    // Donor is added to the network.
    function addDonor(string memory _hashOfDonorsData) public {
        //checks whether the donor is already added or not.
        require(
            !donors[msg.sender].exist,
            "User with this address already exists as a donor!"
        );
        Donor storage donor = donors[msg.sender];
        donor.ethDonor = msg.sender;
        donor.hashOfDonorsData = _hashOfDonorsData;
        donor.exist = true; //Indicates that the donor is now a part of the network.
        donor.isDonorEligible = false;
        totalDonors++;
    }

    // Hospital is added to the network.
    function addHospital(
        address _ethHospital,
        string memory _hospitalName,
        string memory _hashOfHospitalsData
    ) public onlyManager {
        //checks whether the hospital is already added or not.
        require(
            !hospitals[_ethHospital].exist,
            "This Hospital is already added!"
        );

        Hospital storage hospital = hospitals[_ethHospital];
        hospital.ethHospital = _ethHospital;
        hospital.hospitalName = _hospitalName;
        hospital.hashOfHospitalsData = _hashOfHospitalsData;
        hospital.exist = true; //Indicates that the hospital is now a part of the network.
        totalHospitals++;
    }

    //removes the seeker if S/he turns out to be malicious. This operation can only be performed by the hospital.
    function removeSeeker(address _ethSeeker)
        public
        checkSeekerExist(_ethSeeker)
        checkHospitalExist(msg.sender)
    {
        require(
            msg.sender == seekers[_ethSeeker].associatedHospital,
            "You do not have the authority to perform this operation."
        );
        delete seekers[_ethSeeker]; // deletes the information of seeker from mappings seeker.
        totalSeekers--;
    }

    //removes the donor if S/he turns out to be malicious. This operation can only be performed by any Hospital.
    function removeDonor(address _ethDonor)
        public
        checkDonorExist(_ethDonor)
        checkHospitalExist(msg.sender)
    {
        delete donors[_ethDonor];
        totalDonors--;
    }

    //removes the hospital if it turns out to be malicious. This operation can only be performed by Manager.
    function removeHospital(address _ethHospital)
        public
        onlyManager
        checkHospitalExist(_ethHospital)
    {
        delete hospitals[_ethHospital];
        totalHospitals--;
    }

    //Hospital validates the Donor before collecting Plasma.
    function validateDonor(address _ethDonor)
        public
        checkDonorExist(_ethDonor)
    {
        require(
            hospitals[msg.sender].exist,
            "You must be added as a hospital to the network to perform this operation"
        );
        require(
            !donors[_ethDonor].isDonorEligible,
            "The Donor has already been validated"
        );
        donors[_ethDonor].associatedHospital = msg.sender;
        donors[_ethDonor].isDonorEligible = true;
    }

    //Information about the Donation when the plasma is collected from the donor before transfusing it to any patient.
    function Donation(address _ethDonor, string memory _updatedOn)
        public
        checkDonorExist(_ethDonor)
        checkHospitalExist(msg.sender)
    {
        require(
            donors[_ethDonor].isDonorEligible,
            "First the donor needs to be validated by the hospital in order to add transfusion"
        );
        require(
            donors[_ethDonor].associatedHospital == msg.sender,
            "Donation information must be added by the hospital who validated the donor."
        );

        TransfusionState memory newTransfusion =
            TransfusionState({
                indexOfTransfusion: transfusions.length,
                ethSeeker: //As the plasma is not transfused yet, initializing seekers address.
                0x0000000000000000000000000000000000000000,
                ethDonor: _ethDonor,
                ethHospital: msg.sender,
                stateOfTransfusion: status.requestInitiated,
                storageTime: "", //initializing the storage time
                updatedOn: _updatedOn, //adding the donation timestamp to the array timeStamps.
                exist: true
            });
        transfusions.push(newTransfusion);
    }

    //Adding the storage phase information.
    function Storage(uint256 index, string memory _updatedOn)
        public
        checkHospitalExist(msg.sender)
    {
        require(
            transfusions[index].stateOfTransfusion == status.requestInitiated,
            "Before going ahead with the storage phase add the donation information. "
        );
        require(
            transfusions[index].ethHospital == msg.sender,
            "Only the associated hospital has the authority to modify the state of transfusion"
        );

        transfusions[index].stateOfTransfusion = status.requestAdded;
        transfusions[index].updatedOn = _updatedOn;
    }

    //Associating the patient that is transfused with the donor's Plasma.
    function Transfusion(
        uint256 index,
        address _ethSeeker,
        string memory _updatedOn,
        string memory _storageTime
    ) public {
        require(
            transfusions[index].stateOfTransfusion == status.requestAdded,
            "Before going ahead with transfusion phase add the storage information"
        );
        require(
            seekers[_ethSeeker].exist && hospitals[msg.sender].exist,
            "Check again that both seeker and hospital are added into network"
        );
        require(
            msg.sender == seekers[_ethSeeker].associatedHospital,
            "The transfusion details can only be added by the hospital in which the patient is being treated."
        );

        transfusions[index].ethSeeker = _ethSeeker;
        transfusions[index].stateOfTransfusion = status.requestApproved;
        transfusions[index].updatedOn = _updatedOn;
        transfusions[index].storageTime = _storageTime;
    }

    //The Transfusion completed successfully.
    function Complete(uint256 index, string memory _updatedOn)
        public
        checkSeekerExist(transfusions[index].ethSeeker)
        checkDonorExist(transfusions[index].ethDonor)
        checkHospitalExist(msg.sender)
    {
        require(
            transfusions[index].stateOfTransfusion == status.requestApproved,
            "The request of tranfusion must be approved prior to this step."
        );
        require(
            msg.sender ==
                seekers[transfusions[index].ethSeeker].associatedHospital,
            "The transfusion details can only be added by the hospital in which the patient is being treated."
        );

        transfusions[index].stateOfTransfusion = status.requestCompleted;
        transfusions[index].updatedOn = _updatedOn;
        totalCompletedTransfusions++;
    }

    //returns total existing transfusions in the system.
    function totalTransfusions() public view returns (uint256) {
        return transfusions.length;
    }
}
