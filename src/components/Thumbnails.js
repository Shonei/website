import React, { Component } from 'react';

class Thumbnails extends Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
    this.makeThumbnail = this.makeThumbnail.bind(this);
  }

  handleClick() {
    this.props.action(1);
  }

  makeThumbnail(index, highlight = false) {
    let i;
    let length = this.props.imageSet.length; 

    if(index >= length) {
      i = index === length ? 0 : 1;
    } else if(index < 0) {
      i = length - 1;
    } else {
      i = index;
    }

    return (
      <ThumbnailImage 
        action={this.props.action}
        image={this.props.imageSet[i]}
        index={i} 
        highlight={highlight}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="row section">
          <div className="valign-wrapper">
            <div className="col s2"/>
              {this.makeThumbnail(this.props.largeImageIndex-1)}  
              {this.makeThumbnail(this.props.largeImageIndex, true)}
              {this.makeThumbnail(this.props.largeImageIndex+1)}
              {this.makeThumbnail(this.props.largeImageIndex+2)}
            <div className="col s2"/>
          </div>
        </div>  
      </div>
    );
  }
}

class ThumbnailImage extends Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.action(this.props.index);
  }

  render() {
    return (
      <div 
        className={this.props.highlight ? "col s2 z-depth-5" : "col s2"}
        id={this.props.highlight ? 'activeImage' : ''}
      >
        <a onClick={this.handleClick}>
          {this.props.image}
        </a>
      </div>
    );
  }
}

export default Thumbnails;