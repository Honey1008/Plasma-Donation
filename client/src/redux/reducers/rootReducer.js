import { combineReducers } from 'redux';
import { Hospitals } from './hospitalReducer';
import { Seekers } from './seekerReducer';
import { Donors } from './donorReducer';
import { Transfusions } from './transfusionReducer';
import { Auth } from './authReducer';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from '../forms';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

export const rootReducer = combineReducers({
    auth: Auth,
    hospitals: Hospitals,
    seekers : Seekers,
    donors : Donors,
    transfusions : Transfusions,
    firestore : firestoreReducer,
    firebase : firebaseReducer, 
    ...createForms({
        feedback: InitialFeedback
      })
})