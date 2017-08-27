import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Gallery from './Gallery';
import Upload from './Upload';
import Delete from './Delete';
import AboutMe from './AboutMe';

class MyClickable extends Component {

  componentDidMount() {
    if(this.props.active) {
      this.props.onClick(this.props.index);
    }
  }
  
  handleClick() {
    this.props.onClick(this.props.index);
  }

  render () {
    return (
      <li className={this.props.active ? 'active' : ''} onClick={this.handleClick.bind(this)}>
        <a href="#!">{this.props.name}</a>
      </li>
    );
  }
}

class Navbar extends Component {
  constructor(props) {
    super(props);

    const currentState = window.sessionStorage.getItem('navbar-state');

    this.state = {
      activeIndex: (currentState !== null) ? currentState : 0,
    };

    this.mainBody = [
      <AboutMe />,
      <Upload dataStorage={this.props.dataStorage} />,
      <Delete dataStorage={this.props.dataStorage} />,
      <Gallery dataStorage={this.props.dataStorage} databasePath='eggs' />,
      <Gallery dataStorage={this.props.dataStorage} databasePath='jewellry' />,
      <Gallery dataStorage={this.props.dataStorage} databasePath='embroidery' />
    ];

    // this.provider = new this.props.dataStorage.auth.GoogleAuthProvider();

    this.handleClick = this.handleClick.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    window.$(".dropdown-button").dropdown();
  }

  handleClick(index) {
    ReactDOM.render(this.mainBody[index], document.getElementById('root'));
    window.sessionStorage.setItem('navbar-state', String(index));
    this.setState({activeIndex: index});
  }

  render() {
    return (
      <div>
        <ul id="admin-actions" className="dropdown-content">
          <MyClickable name="Upload" index={1} active={String(this.state.activeIndex)==='1'} onClick={this.handleClick}/>
          <MyClickable name="Delete" index={2} active={String(this.state.activeIndex)==='2'} onClick={this.handleClick}/>
        </ul>
        <ul id="galleries" className="dropdown-content">
          <MyClickable name="Eggs" index={3} active={String(this.state.activeIndex)==='3'} onClick={this.handleClick}/>
          <MyClickable name="Jewellry" index={4} active={String(this.state.activeIndex)==='4'} onClick={this.handleClick}/>
          <MyClickable name="Embroidery" index={5} active={String(this.state.activeIndex)==='5'} onClick={this.handleClick}/>
        </ul>
        <nav className="purple lighten-3">
          <div className="nav-wrapper">
            <ul>
              <MyClickable name="About me" index={0} active={String(this.state.activeIndex)==='0'} onClick={this.handleClick}/>
              <li><a className="dropdown-button" href="#!" data-activates="galleries">Galleries<i className="material-icons right">arrow_drop_down</i></a></li>
              <li className="right"><a className="dropdown-button" href="#!" data-activates="admin-actions">Admin<i className="material-icons right">arrow_drop_down</i></a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}


export default Navbar;
