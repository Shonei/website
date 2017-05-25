/*jshint esversion: 6 */
import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";
import AboutMe from './components/AboutMe';
import Navbar from './components/Navbar';
import registerServiceWorker from './registerServiceWorker';
import './index.css';


const config = {
    apiKey: "AIzaSyCxqeJFjntHELHxRpIHUY6jLC8A7DTxDto",
    authDomain: "website-6de1e.firebaseapp.com",
    databaseURL: "https://website-6de1e.firebaseio.com",
    projectId: "website-6de1e",
    storageBucket: "website-6de1e.appspot.com",
    messagingSenderId: "198082921726"
};

firebase.initializeApp(config);

ReactDOM.render(<Navbar dataStorage={firebase} />, document.getElementById('navbar'));
ReactDOM.render(<AboutMe />, document.getElementById('root'));
registerServiceWorker();
