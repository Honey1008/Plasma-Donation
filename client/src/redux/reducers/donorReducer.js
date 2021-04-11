const initialState = {}

export const Donors = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_DONOR':
            console.log('Added Donor', action.donor)
            return state;
        case 'ADD_DONOR_ERROR':
            console.log('Add Donor error', action.err);
            return state;
        case 'REMOVE_DONOR':
            console.log('Donor removed');
            return state;
        case 'REMOVE_DONOR_ERROR':
            console.log('Donor removed error ', action.err);
        default:
            return state;
    }
}
