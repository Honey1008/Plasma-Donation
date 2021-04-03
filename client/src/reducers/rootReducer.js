import authReducer from './authReducer';
import entitiesReducer from "./entitiesReducer";
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    auth: authReducer,
    entity : entitiesReducer
})

export default rootReducer;