import React, { Component } from 'react';

class MyClickable extends Component {

  handleClick() {
    this.props.onClick(this.props.index);
  }

  render () {
    return (
      <li className={this.props.isActive ? 'active' : ''} onClick={this.handleClick.bind(this)}>
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
  }

  handleClick(index) {
    this.setState({activeIndex: index})
  }

  render() {
    return (
      <nav className="purple lighten-3">
        <div className="nav-wrapper">
          <a className="brand-logo right">Logo</a>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <MyClickable name="About me" index={0} isActive={this.state.activeIndex===0} onClick={this.handleClick.bind(this)}/>
            <MyClickable name="Work" index={1} isActive={this.state.activeIndex===1} onClick={this.handleClick.bind(this)}/>
          </ul>
        </div>
      </nav>
    );
  }
}


export default Navbar;
