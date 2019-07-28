import React from 'react';
import './ApiForm.css'

class ApiForm extends React.Component {

  searchSubstring = 'tom'
  minRepositories = 20
  minFollowers = 100

  constructor(props) {
    super(props);

    this.state = {
      searchSubstring: this.searchSubstring,
      minRepositories: this.minRepositories,
      minFollowers: this.minFollowers,
    };
    
    // Explicit binding function to the instance of this class
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleFormSubmit(this.state.searchSubstring,this.state.minRepositories, this.state.minFollowers)
  }

  handleReset(event) {
    event.preventDefault();
    this.setState({
      searchSubstring: this.searchSubstring,
      minRepositories: this.minRepositories,
      minFollowers: this.minFollowers,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} onReset={this.handleReset} className="form-inline">
        {/* <div>{'Github Api Form'}</div> */}
        <label>
          {'Search sub-string (user name) : '}
          <input
            name="searchSubstring"
            type="text"
            value={this.state.searchSubstring}
            onChange={this.handleInputChange} />
        </label>
        {/* <br /> */}
        <label>
          {'Min repositories : '}
          <input
            name="minRepositories"
            type="number"
            value={this.state.minRepositories}
            onChange={this.handleInputChange} />
        </label>
        <label>
          {'Min followers : '}
          <input
            name="minFollowers"
            type="number"
            value={this.state.minFollowers}
            onChange={this.handleInputChange} />
        </label>
        <button
          name="submit"
          type="submit"
          className="form-button-run"
          >Run</button>
        <button
          name="reset"
          type="reset"
          className="form-button-reset"
         >Reset</button>
      </form>
    );
  }
}

export default ApiForm