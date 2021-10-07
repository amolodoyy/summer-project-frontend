import './App.css';
import { React, useState, useEffect } from 'react';
import AppHeader from './components/AppHeader';
import AppHeaderAuth from './components/AppHeaderAuth';
import Authorization from './components/Authorization';
import Registration from './components/Registration';
import AppMenu from './components/AppMenu';
import AppMenuAuth from './components/AppMenuAuth';
import AuthApi from './components/AuthApi';
import { state } from './components/Authorization';
import SpacesCreation from './components/SpacesCreation';


export const AuthHeader = () =>{

  return { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }

}



export default function App() {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token'))
    {
      setCurrentUser(true);
    }
    else{
      setCurrentUser(false);
    }
  },[]);



  return (
    <div>
      <AuthApi.Provider value={state.isAuth}>
        {currentUser ? <AppHeaderAuth /> : < AppHeader />}
        {currentUser ? <AppMenuAuth /> : <AppMenu />}
        <Authorization />
        <Registration />
        <SpacesCreation />
      </AuthApi.Provider>

    </div>
  );
}


