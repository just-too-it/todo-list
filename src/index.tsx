import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';

import './store/firebase/firebase'

// // import firebase from 'firebase'
// import 'firebase/firestore'


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD3LmjFuTih7nRHRBfZLMs-1UWps1cdz9E",
//   authDomain: "todo-c149d.firebaseapp.com",
//   projectId: "todo-c149d",
//   storageBucket: "todo-c149d.appspot.com",
//   messagingSenderId: "206158536714",
//   appId: "1:206158536714:web:2158b52b389d6fabcdbff3"
// };

// export const Context = createContext(null)

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const firestore = firebase.firestore()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    {/* <Context.Provider value={{
      firebase,
      firestore
    }}> */}<App />{/* </Context.Provider> */}
    
  </Provider>
);
