import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Eggs from './Eggs';
import AboutMe from './AboutMe';

class MyClickable extends Component {

  handleClick() {
    this.props.onClick(this.props.index);
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
    this.state = {
      activeIndex: 0,
    };

    this.mainBody = [
      <AboutMe />,
      <Eggs dataStorage={this.props.dataStorage} />
    ];
  }

  handleClick(index) {
    ReactDOM.render(this.mainBody[index], document.getElementById('root'));
    this.setState({activeIndex: index});
  }

  render() {
    return (
      <nav className="purple lighten-3">
        <div className="nav-wrapper">
          <a className="brand-logo right">Logo</a>
          <ul id="nav-mobile" className="left">
            <MyClickable name="About me" index={0} active={this.state.activeIndex===0} onClick={this.handleClick.bind(this)}/>
            <MyClickable name="Work" index={1} active={this.state.activeIndex===1} onClick={this.handleClick.bind(this)}/>
          </ul>
        </div>
      </nav>
    );
  }
}


export default Navbar;
