const initialState = {}

export const Seekers = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_SEEKER':
            console.log('Added Seeker', action.seeker)
            return state;
        case 'ADD_SEEKER_ERROR':
            console.log('Add Seeker error', action.err);
            return state;
        case 'REMOVE_SEEKER':
            console.log('Seeker removed');
            return state;
        case 'REMOVE_SEEKER_ERROR':
            console.log('Seeker removed error ', action.err);
        default:
            return state;
    }
}

