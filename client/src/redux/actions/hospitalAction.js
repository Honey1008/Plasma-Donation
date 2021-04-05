export const addHospital = (hospital) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
            //async call to database
            const firestore = getFirestore();
            firestore.collection('hospitals').add({
                ...hospital,
                addedAt : new Date()
            }).then(() => {
                dispatch({type: 'ADD_HOSPITAL', hospital});
            }).catch((err) => {
                dispatch({ type: 'ADD_HOSPITAL_ERROR', err});
            })     
    };
};