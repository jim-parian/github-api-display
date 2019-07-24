import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ApiForm from './ApiForm.js'
import GithubAPI from './GithubAPI';
import DisplaySelector from './DisplaySelector';
import ItemList from './ItemList.js'

class App extends React.Component {

  state = {
    developers : null,
    displaySelector : 'grid' // possible value : list|grid
  }

  handleFormSubmit = async (term, minRepo, minFollow) => {
    try {
      const response = await GithubAPI.get(`search/users?q=${term}+repos:>${minRepo}+followers:>${minFollow}`)
      console.log(response);
      this.setState({
        developers : response.data.items
      })
    } catch (error) {
      console.error(error);
    }
  }

  handleDisplaySelectorClick = (currentSelector) => {
    this.setState({
      displaySelector : currentSelector
    })
  }


  render() {
    return (
      <div className="App">
        <ApiForm handleFormSubmit={this.handleFormSubmit}></ApiForm>
        <DisplaySelector displaySelector={this.state.displaySelector} handleDisplaySelectorClick={this.handleDisplaySelectorClick}></DisplaySelector>
        <ItemList displaySelector={this.state.displaySelector} items={this.state.developers}/>
      </div>
    );
  }
}

export default App;
