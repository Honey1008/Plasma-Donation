export const addDonor = (donor) => {
    return(dispatch, getState,{ getFirebase, getFirestore }) => {
        //async call to database
        const firestore = getFirestore();
        firestore.collection('donors').add({
            ...donor,
            addedOn: new Date()
        }).then(() => {
            dispatch({ type: 'ADD_DONOR',donor});
        }).catch((err) => {
            dispatch({ type: 'ADD_DONOR_ERROR', err});
        })    
    }
};

export const removeDonor = (donorId) => {
    return(dispatch,getState,{getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('donors').doc(donorId).delete()
        .then(()=>{
            dispatch({type: 'REMOVE_DONOR'});
        }).catch((err) => {
            dispatch({type: 'REMOVE_DONOR_ERROR', err})
        })
    }
}; 