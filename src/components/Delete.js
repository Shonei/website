import React, { Component } from 'react';

class Delete extends Component {

  constructor(props){
    super(props);

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(event) {
    event.preventDefault();
  }

  componentDidMount() {
    document.getElementById('selectDelete').onchange = this.handleSelectChange;
    window.$('#selectDelete').material_select();
  }

  render() {
    return (
      <div>
        <div className="card purple lighten-4">
          <div className="card-content">
            <div className="row selection">
              <div className="col s4">
                <div className="input-field valign-wrapper">
                  <select id="selectDelete">
                    <option value="">Choose gallery</option>
                    <option value="eggs">Eggs</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="card-image">

          </div>
          <div className="card-action">
            <div className="row selection">

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Delete;
