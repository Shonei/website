import React, { Component } from 'react';
import './App.css';
import * as firebase from "firebase";

class App extends Component {
	constructor() {
		super();

		this.state = {
			url: null,
		}

  	this.config = {
	    apiKey: "AIzaSyCxqeJFjntHELHxRpIHUY6jLC8A7DTxDto",
	    authDomain: "website-6de1e.firebaseapp.com",
	    databaseURL: "https://website-6de1e.firebaseio.com",
	    projectId: "website-6de1e",
	    storageBucket: "website-6de1e.appspot.com",
	    messagingSenderId: "198082921726"
  	};

  	firebase.initializeApp(this.config);
		this.storage = firebase.storage();
		this.pathReference = this.storage.ref('img/aEYbQ4K_460s.jpg');

		// this.getImageSrc = this.getImageSrc.bind(this);
	// }

 //  getImageSrc() {
  	this.pathReference.getDownloadURL().then( url => {
  		console.log(url);
  		this.setState({url : url})
		}).catch(error => {
			console.log(error);
			return '';
		});
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
         		<img src={this.state.url} alt='img1'/>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
