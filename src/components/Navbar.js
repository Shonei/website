import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { render } from 'react-snapshot';
import Gallery from './Gallery';
import Upload from './Upload';
import Delete from './Delete';
import AboutMe from './AboutMe';
import NotFound from './404';
import Sitemap from './Sitemap';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active : '0'
    };

    this.mainBody = {
      '/galleries/eggs' : <Gallery dataStorage={this.props.dataStorage} databasePath='eggs' />,
      '/galleries/jewellry' : <Gallery dataStorage={this.props.dataStorage} databasePath='jewellry' />,
      '/galleries/embrodery' : <Gallery dataStorage={this.props.dataStorage} databasePath='embroidery' />,
      '/admin/upload' : <Upload dataStorage={this.props.dataStorage} />,
      '/admin/delete' : <Delete dataStorage={this.props.dataStorage} />,
      '/' : <AboutMe />
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    if(window.location.pathname === '/google19744ead373ed70d.html'){
      render('google-site-verification: google19744ead373ed70d.html', document.getElementById('root'));
    } else if(window.location.pathname === '/sitemap') {
      render(<Sitemap/>, document.getElementById('root'));
    } else if(!this.mainBody[window.location.pathname]) {
      render(<NotFound/>, document.getElementById('root'));
    } else {
      render(this.mainBody[window.location.pathname], document.getElementById('root'));
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
          <li className={this.state.active === 'eggs' ? 'active' : ''} ><a href="/galleries/eggs">Eggs</a></li>
          <li className={this.state.active === 'jewllery' ? 'active' : ''} ><a href="/galleries/jewellry">Jewellry</a></li>
          <li className={this.state.active === 'embodery' ? 'active' : ''} ><a href="/galleries/embrodery">Embrodery</a></li>
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
