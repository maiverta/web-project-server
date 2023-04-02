import React from 'react';
import ReactDOM from 'react-dom';
// //global styles imports
import "./assets/fonts/roboto/stylesheet.css";
import "./assets/css/reset.scss";
import "./assets/css/global.scss";
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './store/auth-context';


ReactDOM.render(
  <AuthContextProvider>
  {/* <BrowserRouter> */}
    <App />
  {/* </BrowserRouter> */}
  </AuthContextProvider>,
  document.getElementById('root')
);


// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';

// // import './index.css';
// import App from './App';
// import { AuthContextProvider } from './store/auth-context';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <AuthContextProvider>
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
//   </AuthContextProvider>
// );


