import { combineReducers } from '@reduxjs/toolkit';
import notification_store from './features/notification_store';
import auth_store from './features/auth_store';
import transactions_store from './features/transactions_store';


const rootReducer = combineReducers({
    notification_store: notification_store,
    auth_store: auth_store,	
    transactions_store: transactions_store
});

export default rootReducer;
