import configData from './config/config.json'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

// localStorage.getItem('token')
// axios.defaults.headers.common['Authorization'] =  'Bearer ' + localStorage.getItem('token');
axios.defaults.baseURL = configData.API_URL;


export let rerenderfunction = () =>{

 ReactDOM.render(
  <BrowserRouter> 
    <App />  
  </BrowserRouter>,
  document.getElementById('root')
);

 }

 rerenderfunction();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
