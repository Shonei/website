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
        <label htmlFor={this.props.id} className="read-more-trigger"></label>
      </div>
    );
  }
}

class AboutMe extends Component {

  render() {
    return (
      <div>
        <div className="row selection">
          <h2 className="center-align">Heading</h2>
        </div>
        <div className="divider"></div>
        <div className="row section">
          <div className="col s12 m12 l6">
            <img src="aPB2KbP_700b.jpg" alt="profile" className="responsive-img"/>
          </div>
          <div className="col s12 m12 l6">
            <h4 className="center-align">Some text</h4>
            <Text id={"text1"} />
          </div>
        </div>  
        <div className="divider"></div>
        <div className="row section">
          <div className="col s12 m12 l6">
            <h4 className="<center-align></center-align>">Some text</h4>
            <Text id={"text2"}/>
          </div>
          <div className="col s12 m12 l6">
            <img src="aPB2KbP_700b.jpg" alt="profile" className="responsive-img"/>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutMe;
