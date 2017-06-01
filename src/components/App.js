import React, { Component } from 'react';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			url: null,
		}

    this.database = this.props.dataStorage.database();

    this.database.ref('/img/aboutMe/').once('value').then(snapshot => {
      const urls = snapshot.val();
      this.setState({url : urls.img1})
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
           		<img src={this.state.url} alt='img1'/>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
