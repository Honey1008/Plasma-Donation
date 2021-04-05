import { combineReducers } from 'redux';
import { Hospitals } from './hospitalReducer';
import { Auth } from './authReducer';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from '../forms';
import { firestoreReducer } from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';

export const rootReducer = combineReducers({
    auth: Auth,
    hospitals: Hospitals,
    firestore : firestoreReducer,
    firebase : firebaseReducer , 
    ...createForms({
        feedback: InitialFeedback
      })
})