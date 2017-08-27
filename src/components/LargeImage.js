import React, { Component } from 'react';

class LargeImage extends Component {
  constructor(props) {
    super(props);
    
    this.xDown = null;
    this.yDown = null;

    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.nextImageIndex = this.nextImageIndex.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
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
    this.refs.focusEl.scrollIntoView();
  }

  handleRightClick() {
    this.props.action(this.nextImageIndex(this.props.currentIndex+1));
    this.refs.focusEl.scrollIntoView();
  }

  handleTouchMove(event) {
    if (!this.xDown || !this.yDown) {
      return;
    }

    let xUp = event.touches[0].clientX;  
    let yUp = event.touches[0].clientY;

    let xDiff = this.xDown - xUp;
    let yDiff = this.yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if (xDiff > 0) {
            this.handleRightClick();
        } else if(xDiff < 0) {
            this.handleLeftClick();
        }                       
    } 

    this.xDown = null;
    this.yDown = null;
  }

  handleTouchStart(event) {
    this.xDown = event.touches[0].clientX;
    this.yDown = event.touches[0].clientY;
  }

  handleKeyPress(event) {
    if(event.keyCode === 37) {
      this.handleLeftClick();
    } else if(event.keyCode === 39) {
      this.handleRightClick();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
    document.addEventListener('touchstart', this.handleTouchStart, false);        
    document.addEventListener('touchmove', this.handleTouchMove, false);
    document.body.style.backgroundColor = '#f3e5f5';
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
    document.removeEventListener('touchstart', this.handleTouchStart);        
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.body.style.backgroundColor = 'white';
  }

  render() {
    return (
      <div>
        <div className="row"/>
        <div ref="focusEl">
          <div className="row selection">
            <div className="col s1 m2"/>
            <div className="col s5 m2">
              <button 
                className="btn waves-effect waves-light"
                onClick={this.handleLeftClick}
                onKeyDown={this.handleKeyPress}
                >Prev</button>
            </div>
            <div className="col m4"/>
            <div className="col s5 m2">
              <button 
                className="btn waves-effect waves-light"
                onClick={this.handleRightClick}
              >Next</button>
            </div>
            <div className="col  s1 m2"/>
          </div>
          <div className="row selection">
            <div className="col s1"/>
            <div className="col s10 center-align">
              {this.props.image}
              {this.props.description}
            </div> 
            <div className="col s1"/>
          </div>
        </div>
        <div className="row"/>
      </div>
    );
  }
}

export default LargeImage;