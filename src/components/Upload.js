import React, { Component } from 'react';
import './upload.css';

class Upload extends Component {

  constructor(props){
    super(props);

    this.state = {
      src : '',
      file : ''
    }
    
    this.storageRef = this.props.dataStorage.storage().ref();

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
  };

  handleSignin() {
    const firebase = this.props.dataStorage;
    const storageRef = this.props.dataStorage.storage().ref();

    var provider = new firebase.auth.GoogleAuthProvider();

    this.props.dataStorage.auth().signInWithPopup(provider).then(result => {
      console.log(result)
      const uploadTask = storageRef.child('practise/' + this.state.file.name).put(this.state.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: 
            console.log('Upload is running');
            break;
        }
      }, error => console.log(error) , () => console.log(uploadTask.snapshot.downloadURL));
    }).catch(function(error) {
      console.log(error)
    });
  }


  handleClick() {
    const uploadTask = this.storageRef.child('practise/' + this.state.file.name).put(this.state.file);
    
    const firebase = this.props.dataStorage;

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: 
          console.log('Upload is running');
          break;
      }
    }, error => console.log(error) , () => {
      var downloadURL = uploadTask.snapshot.downloadURL;
    });
  }

  handleChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        src: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    return (
      <div>
        <div className="card purple lighten-4">
          <div className="card-content">
            <div className="row selection">
              <div className="col s2">
                <div className="file-field input-field valign-wrapper">
                  <div className="btn">
                    <span>File</span>
                    <input type="file" onChange={this.handleChange}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-image">
            <div className="col s10">
              <img className="responsive-img image center-align" src={this.state.src} alt='Hello'/> 
            </div>
          </div>
          <div className="card-action">
            <div className="row selection">
              <div className="col s2">
                <a className="waves-effect waves-light btn" onClick={this.handleClick}>Upload</a> 
                <a className="waves-effect waves-light btn" onClick={this.handleSignin}>Sign In</a> 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
