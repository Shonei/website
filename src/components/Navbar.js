import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Gallery from './Gallery';
import Upload from './Upload';
import Delete from './Delete';
import AboutMe from './AboutMe';
import NotFound from './404.js';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active : '0'
    }

    this.mainBody = {
      '/galleries/eggs' : <Gallery dataStorage={this.props.dataStorage} databasePath='eggs' />,
      '/galleries/jewellry' : <Gallery dataStorage={this.props.dataStorage} databasePath='eggs' />,
      '/galleries/embrodery' : <Gallery dataStorage={this.props.dataStorage} databasePath='embroidery' />,
      '/admin/upload' : <Upload dataStorage={this.props.dataStorage} />,
      '/admin/delete' : <Delete dataStorage={this.props.dataStorage} />,
      '/' : <AboutMe />,
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    
    if(!this.mainBody[window.location.pathname]) {
      ReactDOM.render(<NotFound/>, document.getElementById('root'));
    } else {
      ReactDOM.render(this.mainBody[window.location.pathname], document.getElementById('root'));
    }
    window.$(".dropdown-button").dropdown();
  }

  render() {
    return (
      <div>
        <ul id="admin-actions" className="dropdown-content">
        <li className={this.state.active === 'upload' ? 'active' : ''} ><a href="/admin/upload">Upload</a></li>
        <li className={this.state.active === 'delete' ? 'active' : ''} ><a href="/admin/delete">Delete</a></li>
        </ul>
        <ul id="galleries" className="dropdown-content">
          <li className={this.state.active === 'eggs' ? 'active' : ''} ><a href="/galleries/eggs">Jewellry</a></li>
          <li className={this.state.active === 'jewllery' ? 'active' : ''} ><a href="/galleries/jewellry">Embrodery</a></li>
          <li className={this.state.active === 'embodery' ? 'active' : ''} ><a href="/galleries/embrodery">Eggs</a></li>
        </ul>
        <nav className="purple lighten-3">
          <div className="nav-wrapper">
            <ul>
              <li className={this.state.active === 'about' ? 'active' : ''} ><a href="/">About me</a></li>
              <li><a className="dropdown-button" href="#" data-activates="galleries">Galleries<i className="material-icons right">arrow_drop_down</i></a></li>
              <li className="right"><a className="dropdown-button" href="#" data-activates="admin-actions">Admin<i className="material-icons right">arrow_drop_down</i></a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}


export default Navbar;
