import { combineReducers, createStore } from 'redux';
import { Seekers } from './seekers';
import { Donors } from './donors';
import { Hospitals } from './hospitals';
import { Transfusions } from './transfusions';
import { Auth, AUth } from './authReducer';

export const ConfigureStore = () => {
    const store = createStore(
      combineReducers ({
          auth : Auth,
          seekers : Seekers,
          donors: Donors,
          hospitals : Hospitals,
          transfusions : Transfusions
      })
    ); 
    return store;
}   