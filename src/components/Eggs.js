import React, { Component } from 'react';
import {Thumbnails} from './Thumbnails';
import './eggs.css';

class Eggs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      currentImageIndex: 0,
    };

    this.database = this.props.dataStorage.database();
    this.handleClick = this.handleClick.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.database.ref('eggs/').once('value').then(snapshot => {
      const nodes = snapshot.val();
      const arr = [];

      for(let i in nodes){
        const img = <img className="responsive-img image" src={nodes[i].url} alt={i}/>; 
        arr.push(img);
      }
      
      this.setState({images: arr});
    });

    if(window.FB) {
      window.FB.XFBML.parse();
    }
  }

  handleClick(index) {
    this.setState({currentImageIndex : index});
  }

  render() {
    return (
      <div>
        <div className="card purple lighten-4">
          <div className="card-content">
            <Thumbnails 
              imageSet={this.state.images}
              action={this.handleClick}
              largeImageIndex={this.state.currentImageIndex}/>
            </div>
            <div className="divider"></div>
            <div className="card-image">
            <LargeImage 
              image={this.state.images[this.state.currentImageIndex]}
              currentIndex={this.state.currentImageIndex}
              totalImages={this.state.images.length}
              action={this.handleClick}/>
          </div>
        </div>
        <div className="fb-comments" data-href="https://website-6de1e.firebaseapp.com/" data-numposts="5"></div>
      </div>
    );
  }
}

class LargeImage extends Component {
  constructor(props) {
    super(props);
  
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.nextImageIndex = this.nextImageIndex.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }

  nextImageIndex(index) {
    const length = this.props.totalImages;
    let i;

    if(index >= length) {
      i = 0;
    } else if(index < 0) {
      i = length - 1;
    } else {
      i = index;
    }

    return i;
  }

  handleLeftClick() {
    this.props.action(this.nextImageIndex(this.props.currentIndex-1));
  }

  handleRightClick() {
    this.props.action(this.nextImageIndex(this.props.currentIndex+1));
  }

  handleKeyPress(event) {
    if(event.keyCode === 37) {
      this.handleLeftClick();
    } else if(event.keyCode === 39) {
      this.handleRightClick();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    document.body.style.backgroundColor = '#f3e5f5';
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
    document.body.style.backgroundColor = 'white';
  }

  render() {
    return (
      <div>
        <div className="row selection">
          <div className="col s1"></div>
          <div className="col s1">
            <button 
              className="btn waves-effect waves-light"
              onClick={this.handleLeftClick}
              onKeyDown={this.handleKeyPress}
              >Prev</button>
          </div>
          <div className="col s1"></div>
          <div className="col s6 center-align">
            {this.props.image}
          </div> 
          <div className="col s1"></div>
          <div className="col s1">
            <button 
              className="btn waves-effect waves-light"
              onClick={this.handleRightClick}
            >Next</button>
          </div>
          <div className=" col s1"></div>
        </div>
      </div>
    );
  }
}

export default Eggs;
