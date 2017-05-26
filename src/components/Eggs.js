import React, { Component } from 'react';
import './eggs.css';

class Eggs extends Component {
	constructor(props) {
		super(props);

		this.state = {
      images: [],
			currentImageIndex: 0,
		}

    this.database = this.props.dataStorage.database();

    this.database.ref('/img/aboutMe/').once('value').then(snapshot => {
      const urls = snapshot.val();

      const arr = [];

      for(let i in urls){
        const img = <img className="responsive-img" src={urls[i]} alt={i}/> 
        arr.push(img);
      };
      
      this.setState({images: arr});
    });

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(index) {
    this.setState({currentImageIndex : index});
  };

  render() {
    return (
      <div>
        <Thumbnails 
          imageSet={this.state.images}
          action={this.handleClick}/>
        <LargeImage 
          image={this.state.images[this.state.currentImageIndex]}/>
      </div>
    );
  }
}

class Thumbnails extends Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.action(1);
  }

  render() {
    return (
      <div>
        <div className="row section">
          <div className="valign-wrapper">
            <div className="col s2"></div>
              <ThumbnailImage 
                action={this.props.action}
                imageSet={this.props.imageSet}
                index={0} />
              <ThumbnailImage 
                action={this.props.action}
                imageSet={this.props.imageSet}
                index={1} />
              <ThumbnailImage 
                action={this.props.action}
                imageSet={this.props.imageSet}
                index={2} />
              <ThumbnailImage 
                action={this.props.action}
                imageSet={this.props.imageSet}
                index={0} />
            <div className="col s2"></div>
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
  };

  handleClick() {
    this.props.action(this.props.index);
  }

  render() {
    return (
      <div className="col s2">
        <a onClick={this.handleClick}>
          {this.props.imageSet[this.props.index]}
        </a>
      </div>
    );
  };
}

class LargeImage extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
        <div>
          <div className="row selection">
            <div className="col s3"></div>
            <div className="col s6 center-align">
              {this.props.image}
            </div> 
            <div className=" col s3"></div>
          </div>
        </div>
      )
  }
}

export default Eggs;
