import React, { Component } from 'react';
import './aboutMe.css';

class Text extends Component {
  render() {
    return (
      <div>
        <input type="checkbox" className="read-more-state" id="post-1" />
        <p className="center-left read-more-wrap">Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          <span className="read-more-target">Libero fuga facilis vel consectetur quos sapiente deleniti eveniet dolores tempore eos deserunt officia quis ab? Excepturi vero tempore minus beatae voluptatem!</span>
        </p>
        <label htmlFor="post-1" className="read-more-trigger"></label>
      </div>
    );
  }
}

class AboutMe extends Component {

  constructor(){
    super();

    this.text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`;
  }

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
            <Text />
          </div>
        </div>  
        <div className="divider"></div>
        <div className="row section">
          <div className="col s12 m12 l6">
            <h4 className="<center-align></center-align>">Some text</h4>
            <Text />
          </div>
          <div className="col s12 m12 l6">
            <img src="aPB2KbP_700b.jpg" alt="profile" className="responsive-img"/>
          </div>
        </div>
        <div className="divider"></div>
        <div className="row section">
            <div className="video-container">
            </div>
        </div>
      </div>
    );
  }
}

              // <iframe title="vid" width="854" height="480" src="https://www.youtube.com/embed/BsSmBPmPeYQ" frameBorder="0" allowFullScreen></iframe>
export default AboutMe;
