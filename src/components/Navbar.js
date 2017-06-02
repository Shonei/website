import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Eggs from './Eggs';
import Upload from './Upload';
import AboutMe from './AboutMe';

class MyClickable extends Component {

  handleClick() {
    this.props.onClick(this.props.index);
  }

  componentDidMount() {
    if(this.props.active) {
      this.props.onClick(this.props.index);
    }
  }

  render () {
    return (
      <li className={this.props.active ? 'active' : ''} onClick={this.handleClick.bind(this)}>
        <a>{this.props.name}</a>
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
      <Eggs dataStorage={this.props.dataStorage} />,
      <Upload dataStorage={this.props.dataStorage} />
    ];

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(index) {
    ReactDOM.render(this.mainBody[index], document.getElementById('root'));
    window.sessionStorage.setItem('navbar-state', String(index));
    this.setState({activeIndex: index});
  }

  render() {
    return (
      <nav className="purple lighten-3">
        <div className="nav-wrapper">
          <a className="brand-logo right">Logo</a>
          <ul id="nav-mobile" className="left">
            <MyClickable name="About me" index={0} active={String(this.state.activeIndex)==='0'} onClick={this.handleClick}/>
            <MyClickable name="Eggs" index={1} active={String(this.state.activeIndex)==='1'} onClick={this.handleClick}/>
            <MyClickable name="Upload" index={2} active={String(this.state.activeIndex)==='2'} onClick={this.handleClick}/>
          </ul>
        </div>
      </nav>
    );
  }
}


export default Navbar;
