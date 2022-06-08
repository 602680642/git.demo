import React from 'react';
import ReactDOM from 'react-dom';
v
import  {BrowserRouter}   from 'react-router-dom'
import App from './App';
import store from './redux/store'

ReactDOM.render(

  <BrowserRouter>

     <App />
  </BrowserRouter>


,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

