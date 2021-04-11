const initialState = {}

export const Hospitals = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_HOSPITAL':
            console.log('Added Hospital',action.hospital);
            return state;
        case 'ADD_HOSPITAL_ERROR':
            console.log('Add Hospital Error',action.err);
            return state; 
        case 'REMOVE_HOSPITAL':
            console.log('Remove Hospital');
            return state;
        case 'REMOVE_HOSPITAL_ERROR':
            console.log('Remove Hospital Error', action.err);
            return state;
        default: 
            return state;
    }
}