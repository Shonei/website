import React, { Component } from 'react';
import './upload.css';

class Upload extends Component {

  constructor(props){
    super(props);

    this.state = {
      src : '',
      file : ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };


  handleClick() {
    // this.setState({img : <img className="responsive-img image" src={this.state.src} alt='Hello'/>})
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
          <form action="#">
            <div className="col s2">
              <div className="file-field input-field valign-wrapper">
                <div className="btn">
                  <span>File</span>
                  <input type="file" onChange={this.handleChange}/>
                </div>
              </div>
            </div>
            <div className="col s10">
              <img className="responsive-img image center-align" src={this.state.src} alt='Hello'/> 
            </div>
          </form>
        </div>
            </div>
            <div className="divider"></div>
        <div className="row selection">
          <div className="col s2">
            <a className="waves-effect waves-light btn" onClick={this.handleClick}>button</a> 
          </div>
        </div>
            <div className="card-image">

          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
