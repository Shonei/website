import React, { Component } from 'react';

class Upload extends Component {

  constructor(props){
    super(props);

    this.state = {
      src : '',
      file : '',
      selectVal : '',
      disabled : true
    };
    
    this.storageRef = this.props.dataStorage.storage().ref();

    this.handleChange = this.handleChange.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
    this._uploadTask = this.uploadFile.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this._enableButton = this._enableButton.bind(this);
  }

  uploadFile(user, firebase, storageRef) {

    const _uploadTask = storageRef.child(this.state.selectVal + '/' + this.state.file.name).put(this.state.file);

    _uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // TO DO display %
      console.log(progress);
    }, error => console.log(error) , 
    () => {
      // console.log(_uploadTask.snapshot.downloadURL)
      const database = this.props.dataStorage.database;

      // Replaces character firebase doesn't allow in keys
      const key = this.state.file.name.replace(/[.#$/[\]]/g, '');
      const newPost = database().ref().child(this.state.selectVal);
      
      newPost.update({[key] : _uploadTask.snapshot.downloadURL});
    });
  }


  handleSignin() {

    const firebase = this.props.dataStorage;
    const storageRef = this.props.dataStorage.storage().ref();

    var provider = new firebase.auth.GoogleAuthProvider();

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
        src: reader.result
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

  componentDidMount() {
    document.getElementById('selectGallery').onchange = this.handleSelectChange;
    window.$('#selectGallery').material_select();
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
              <div className="col s4">
                <div className="input-field valign-wrapper">
                  <select id="selectGallery" onChange={this.handleSelectChange}>
                    <option value="">Choose gallery</option>
                    <option value="eggs">Eggs</option>
                  </select>
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
                <a className="waves-effect waves-light btn" disabled={this.state.disabled} onClick={this.handleSignin}>Upload</a> 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
