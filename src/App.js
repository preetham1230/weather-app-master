import React from 'react';
import logo from './logo.svg';
import './App.css';
import CitiesInfo from './CitiesInfo.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import store from './Store.js';
import Weather from './Weather.js'; 
import {connect} from 'react-redux';

export default class App extends React.Component{
 
  render(){
    

    return(
      <Provider store = {store}>
        
        <div className="App">
        <CitiesInfo/>
        <Weather/>  
        </div>
      </Provider>
      
    );
  }
}


//export default class App;
