import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//iske upr sb basic

//it contains the redux slice
import authReducer from 'state';

//rest imports are for redux and redux-persist
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import{
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist"
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

//setup of redux-persist
const persistConfig = {
  key: 'root',
  storage,
  version : 1
}

const persistedReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
  reducer : persistedReducer,
  middleware : (getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck:{
        ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
    }
    }),
});


//basic
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
