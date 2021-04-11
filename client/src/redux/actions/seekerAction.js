export const addSeeker = (seeker) => {
    return(dispatch, getState,{ getFirebase, getFirestore }) => {
        //async call to database
        const firestore = getFirestore();
        firestore.collection('seekers').add({
            ...seeker,
            addedOn: new Date()
        }).then(() => {
            dispatch({ type: 'ADD_SEEKER',seeker});
        }).catch((err) => {
            dispatch({ type: 'ADD_SEEKER_ERROR', err});
        })    
    }
};

export const removeSeeker = (seekerId) => {
    return(dispatch,getState,{getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('seekers').doc(seekerId).delete()
        .then(()=>{
            dispatch({type: 'REMOVE_SEEKER'});
        }).catch((err) => {
            dispatch({type: 'REMOVE_SEEKER_ERROR', err})
        })
    }
}; 