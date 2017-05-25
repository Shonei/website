import React, { Component } from 'react';

class AboutMe extends Component {

  constructor(){
    super();

    this.text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
`;
  }

  render() {
    return (
      <div>
        <div className="row selection">
          <h2 className="center-align">Heading</h2>
        </div>
        <div class="divider"></div>
        <div className="row section">
          <div className="col s6">
            <img src="aPB2KbP_700b.jpg" alt="profile" className="responsive-img"/>
          </div>
          <div className="col s6">
            <h4 className="center-align">Some text</h4>
            <p className="center-align">{this.text}</p>
          </div>
        </div>  
        <div class="divider"></div>
        <div className="row section">
          <div className="col s6">
            <h4 className="<center-align></center-align>">Some text</h4>
            <p className="center-align">{this.text}</p>
          </div>
          <div className="col s6">
            <img src="aPB2KbP_700b.jpg" alt="profile" className="responsive-img"/>
          </div>
        </div>
        <div class="divider"></div>
        <div className="row section">
            <div className="video-container">
              <iframe title="vid" width="854" height="480" src="https://www.youtube.com/embed/BsSmBPmPeYQ" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
      </div>
    );
  }

}

export default AboutMe;
