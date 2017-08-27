import React, { Component } from 'react';

class Delete extends Component {

  constructor(props){
    super(props);

    this.state = {
      nodes: '',
      toBeRemoved: [],
      selectedVal: '',
      message: '',
      log: this.props.dataStorage.auth().currentUser ? 'Log off' : 'Log in',
    }

    this.css = { color:'#ab47bc'};

    this.database = this.props.dataStorage.database();
    this.storage = this.props.dataStorage.storage().ref();

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.addToRemoveList = this.addToRemoveList.bind(this);
    this.delete = this.delete.bind(this);
    this.handleUserLogIn = this.handleUserLogIn.bind(this);
  }

  handleSelectChange(event) {
    event.preventDefault();
    this.database.ref(event.target.value + '/').once('value').then(snapshot => {
      const nodes = snapshot.val();
      const arr = [];

      for(let i in nodes){
        nodes[i].highlight = false;
        nodes[i].databaseRef = i;
        arr.push(nodes[i]);
      }

      this.setState({nodes : arr});
    });

    this.setState({selectedVal : event.target.value})
  }

  delete(user) {
    this.state.toBeRemoved.forEach(ele => {
    
      this.storage.child(this.state.selectedVal + '/' + ele.name).delete().then(data => {
        this.database.ref(this.state.selectedVal + '/' + ele.databaseRef).remove();
        this.setState({message : 'Files have been deleted'});
      }).catch(error => {
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
      })
    })
  }

  handleClick() {
    const firebase = this.props.dataStorage;

    var provider = new firebase.auth.GoogleAuthProvider();

    this.refs.focusEl.scrollIntoView();

    if(firebase.auth().currentUser) {
      this.delete();
    } else {
      this.props.dataStorage.auth().signInWithPopup(provider)
      .then(this.delete)
      .catch(error => console.log(error));
    }
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

  addToRemoveList(node) {
    const arr = this.state.toBeRemoved;

    for(let i = 0; i < arr.length; i++) {
      if(arr[i].url === node.url) {
        arr.splice(i, 1);
        node.highlight = false;
        this.setState({toBeRemoved : arr});
        return;
      }
    }

    node.highlight = true;
    arr.push(node);
    this.setState({toBeRemoved : arr});
  }

  renderRow(index, nodes) {
    const arr = []

    for(let i = 0; i < 3; i++) {
      if(!nodes[i+index]) {
        break;
      }

      arr.push(
        <div 
          key={i+index} 
          className={nodes[i+index].highlight ? "col s3 z-depth-5" : "col s3"}>
          <a onClick={() => {this.addToRemoveList(nodes[i+index])}}>
            <img className="responsive-img image" src={nodes[i+index].url} alt={nodes[i+index].name}/>
          </a>
        </div>);
    }
    
    return arr;
  }

  renderImages(nodes) {
    if(!nodes) {
      return;
    }

    let rowCount =(nodes.length-1 / 3) >> 0; 
    const arr = [];

    for(let imageRows = 0; imageRows <= rowCount; imageRows++) {
      arr.push(
        <div key={imageRows} className="row section">
          <div className="valign-wrapper center-align">
            <div className="col s1"></div>
              {this.renderRow(imageRows * 3, nodes)}
            <div className="col s1"></div>
          </div>
        </div>);
    }

    return arr;
  }

  componentDidMount() {
    document.getElementById('selectDelete').onchange = this.handleSelectChange;
    window.$('#selectDelete').material_select();
  }

  render() {
    return (
      <div>
        <div className="card purple lighten-4">
          <div className="card-content">
            <div className="row selection">
              <div className="col s4">
                <div className="input-field valign-wrapper">
                  <select id="selectDelete">
                    <option value="">Choose gallery</option>
                    <option value="eggs">Eggs</option>
                    <option value="jewellry">Jewellry</option>
                    <option value="embroidery">Embroidery</option>
                  </select>
                </div>
                <div className="col s12">
                  <p ref="focusEl" style={this.css}>{this.state.message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card-image">
            {this.renderImages(this.state.nodes)}
          </div>
          <div className="card-action">
            <div className="row selection">
              <div className="col s6 m3">
                <button 
                  className="btn waves-effect waves-light"
                  onClick={this.handleClick}
                >Delete</button>
              </div>
              <div className="col s6 m3">
                <button 
                  className="btn waves-effect waves-light"
                  onClick={this.handleUserLogIn}
                >{this.state.log}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Delete;
