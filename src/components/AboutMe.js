import React, { Component } from 'react';
import './aboutMe.css';

class Text extends Component {
  render() {
    return (
      <div>
        <input type="checkbox" className="read-more-state" id={this.props.id} />
        <p className="center-left read-more-wrap">Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          <span className="read-more-target">Libero fuga facilis vel consectetur quos sapiente deleniti eveniet dolores tempore eos deserunt officia quis ab? Excepturi vero tempore minus beatae voluptatem!</span>
        </p>
        <label htmlFor={this.props.id} className="read-more-trigger"/>
      </div>
    );
  }
}

class AboutMe extends Component {

  componentDidMount() {
    if(window.FB) {
      window.FB.XFBML.parse();
    }
  }

  render() {
    return (
      <div>
        <div className="row selection">
          <h2 className="center-align">Heading</h2>
        </div>
        <div className="divider"/>
        <div className="row section">
          <div className="col s12 m12 l6">
            <img src="aPB2KbP_700b.jpg" alt="profile" className="responsive-img"/>
          </div>
          <div className="col s12 m12 l6">
            <h4 className="left-align">Some text</h4>
            <Text id={'text1'} />
          </div>
        </div>  
        <div className="divider"/>
        <div className="row section">
          <div className="col s12 m12 l6">
            <h4 className="left-align">Some text</h4>
            <Text id={'text2'}/>
          </div>
          <div className="col s12 m12 l6">
            <img src="aPB2KbP_700b.jpg" alt="profile" className="responsive-img"/>
          </div>
        </div>
        <div className="row selection">
          <div className="coll left-align">
            <div className="fb-like" data-href="https://website-6de1e.firebaseapp.com/" data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="true"/> 
          </div>
        </div>
      </div>
    );
  }
}

export default AboutMe;
