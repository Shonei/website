import React, { Component } from 'react';

class Upload extends Component {

  constructor(props){
    super(props);
    // console.log(this.props.dataStorage.auth().currentUser)
    this.state = {
      src : '',
      file : '',
      selectVal : '',
      disabled : true,
      message : '',
      log: 'Log in',
      description: ''
    };

    this.props.dataStorage.auth().onAuthStateChanged(user => {
      if(user) {
        this.setState({log : 'Log off'});
      } else {
        this.setState({log : 'Log in'});
      }
    })

    this.css = { color:'#ab47bc'};
    
    this.storageRef = this.props.dataStorage.storage().ref();

    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this._enableButton = this._enableButton.bind(this);
    this.handleUserLogIn = this.handleUserLogIn.bind(this);
  }

  uploadFile(user, firebase, storageRef) {

    const uploadTask = storageRef.child(this.state.selectVal + '/' + this.state.file.name).put(this.state.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({message : 'Upload %: ' + progress});
    }, error => {
      switch (error.code) {
        case 'storage/unauthorized':
          this.setState({message : 'Error: You dont have permission to upload files'});
          break;

        case 'storage/quota_exceeded':
          this.setState({message : 'Error: The server storage is full.'});
          break;

        case 'storage/invalid_checksum':
          this.setState({message : 'Error: Reupload the file and try again.'});
          break;

        case 'storage/unknown':
          this.setState({message : 'We are expiriencing technical difficulties.'});
          break;

        default:
          this.setState({message : 'Error: Please try refreshing the page and try again'});
      }
    }, 
    () => {
      const database = this.props.dataStorage.database;

      // Replaces character firebase doesn't allow in keys
      const key = this.state.file.name.replace(/[.#$/[\]]/g, '');
      const newPost = database().ref().child(this.state.selectVal);
      
      newPost.update({[key] : {
      	url: uploadTask.snapshot.downloadURL,
      	name: this.state.file.name,
      	description: this.state.description
      }});

      this.setState({message : 'File upload done.'})
    });
  }


  handleUpload() {

    const firebase = this.props.dataStorage;
    const storageRef = this.props.dataStorage.storage().ref();

    const provider = new firebase.auth.GoogleAuthProvider();

    this.refs.focusEl.scrollIntoView();

    if(firebase.auth().currentUser) {
      this.uploadFile(null, firebase, storageRef);
    } else {
      this.props.dataStorage.auth().signInWithPopup(provider)
      .then(user => this.uploadFile(user, firebase, storageRef))
      .catch(error => console.log(error));
    }
  }

  handleChange(event) {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        src: reader.result,
      });

      this._enableButton();
    };
    // console.log(file)
    reader.readAsDataURL(file);
  }

  _enableButton() {
    if(this.state.file !== '' &&
      this.state.selectVal !== '') {
      this.setState({disabled : false});
    } else {
      this.setState({disabled : true});
    }
  }

  handleSelectChange(event) {
    event.preventDefault();

    this.setState({selectVal : event.target.value});

    this._enableButton();
  }

  handleUserLogIn() {
    const firebase = this.props.dataStorage;
    const provider = new firebase.auth.GoogleAuthProvider();

    if(firebase.auth().currentUser) {
      firebase.auth().signOut()
        .then(() => this.setState({log : 'Log in'}))
        .catch(error => this.setState({message : 'We had a problem with loggin you off'}));
    } else {
      this.props.dataStorage.auth().signInWithPopup(provider)
      .then(user => this.setState({log : 'Log off'}))
      .catch(error => this.setState({message : 'There was a problem with loging in'}));
    }
  }

  componentDidMount() {
    document.getElementById('selectGallery').onchange = this.handleSelectChange;
    window.$('#selectGallery').material_select();
    // window.$('#description').val('New Text');
    window.$('#description').trigger('autoresize');
  }

  render() {
    return (
      <div>
        <div className="card purple lighten-4">
          <div className="card-content">
            <div className="row selection">
              <div className="col s6 m2">
                <div className="file-field input-field valign-wrapper">
                  <div className="btn">
                    <span>File</span>
                    <input type="file" onChange={this.handleChange}/>
                  </div>
                </div>
              </div>
              <div className="col s6 m4">
                <div className="input-field valign-wrapper">
                  <select id="selectGallery">
                    <option value="">Choose gallery</option>
                    <option value="eggs">Eggs</option>
                    <option value="jewellry">Jewellry</option>
                    <option value="embroidery">Embroidery</option>
                  </select>
                </div>
              </div>
              <div className="col s12">
              <p ref="focusEl" style={this.css}>{this.state.message}</p>
              </div>
            </div>
          </div>
          <div className="card-image">
            <div className="col s10">
              <img className="responsive-img image center-align" src={this.state.src} alt=''/> 
            </div>
          </div>
          <div className="card-content">
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <textarea id="description" className="materialize-textarea" onChange={event =>this.setState({description: event.target.value})}></textarea>
                    <label htmlFor="description">Description</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="card-action">
            <div className="row selection">
              <div className="col s6 m3">
                <a className="waves-effect waves-light btn" disabled={this.state.disabled} onClick={this.handleUpload}>Upload</a> 
              </div>
              <div className="col s6 m3">
                <a className="waves-effect waves-light btn" onClick={this.handleUserLogIn}>{this.state.log}</a> 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
