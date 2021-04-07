const initState = {
    HOSPITALS : [
        {
            id : 0,
            img : "assets/images/hospital.png",
            ethadd : "0x435353535355353535535353",
            name : "Savitri Devi",
            contact : 9090909090, 
            address : "Near Shastri Nagar, Ahemdabad"
        },
        {
            id : 1,
            img : "assets/images/hospital.png",
            ethadd : "0x435353535355350000005353",
            name : "Government Hospital, Gandhinagar ",
            contact : 9090909090, 
            address : "In front of Pathika Ashram, Gandhinagar"
        },
        {
            id : 2,
            img : "assets/images/hospital.png",
            ethadd : "0x43535300000000000005353",
            name : "We care hospital pvt. limited",
            contact : 9090909090,
            address : "Jafarabad, Godhra"
        }
    ]
}

export const Hospitals = (state = initState, action) => {
    switch(action.type) {
        case 'ADD_HOSPITAL':
            console.log('Added Hospital',action.hospital);
            return state;
            break;
        case 'ADD_HOSPITAL_ERROR':
            console.log('Add Hospital Error',action.err);
            return state;
            break;         
        default: 
            return state;
    }
}