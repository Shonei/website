import React, { Component } from 'react';
import Thumbnails from './Thumbnails';
import LargeImage from './LargeImage';
import './gallery.css';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      descriptions: [],
      currentImageIndex: 0,
      databasePath: this.props.databasePath
    };

    this.database = this.props.dataStorage.database();

    this.handleClick = this.handleClick.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateImages = this.updateImages.bind(this);
  }

  componentDidMount() {
    this.updateImages(this.state.databasePath);

    if(window.FB) {
      window.FB.XFBML.parse();
    }
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({databasePath: nextProps.databasePath});
    this.updateImages(nextProps.databasePath);
  }

  updateImages(path) {
    this.database.ref(path + '/').once('value').then(snapshot => {
      const nodes = snapshot.val();
      const imageArr = [];
      const descriptionArr = [];
      
      for(let i in nodes) {
        const img = <img className="responsive-img image" src={nodes[i].url} alt={i}/>;
        const description = <p className="center-align">{nodes[i].description}</p>;
        
        imageArr.push(img);
        descriptionArr.push(description);
      }
      
      this.setState({images: imageArr});
      this.setState({descriptions: descriptionArr});
    });
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
              largeImageIndex={this.state.currentImageIndex}
            />
            </div>
          <div className="divider"/>
          <div className="card-image">
            <LargeImage 
              image={this.state.images[this.state.currentImageIndex]}
              description={this.state.descriptions[this.state.currentImageIndex]}
              currentIndex={this.state.currentImageIndex}
              totalImages={this.state.images.length}
              action={this.handleClick}
            />
          </div>
        </div>
        <div className="fb-comments" data-href="https://website-6de1e.firebaseapp.com/" data-numposts="5"/>
      </div>
    );
  }
}

export default Gallery;
