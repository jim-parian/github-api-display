import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ApiForm from './ApiForm.js'
import GithubAPI from './GithubAPI';
import DisplaySelector from './DisplaySelector';
import ItemList from './ItemList.js'
import ItemCount from './ItemCount.js'
import Paginator from './Paginator.js'

class App extends React.Component {

  state = {
    developers: null,
    displaySelector: 'grid', // possible value : list|grid
    numberOfItem: 0,
    githubPagination: {}, // github preco : use url given by API
    init : false
  }

  handleFormSubmit = async (term, minRepo, minFollow) => {
    try {
      const response = await GithubAPI.get(`search/users?q=${term}+repos:>${minRepo}+followers:>${minFollow}`)
      console.log(response);
      this.setState({
        developers: response.data.items,
        numberOfItem: response.data.total_count,
        githubPagination: this.handleGithubPagination(response.headers.link),
      })
      this.setState({init:true})
      console.log(this.state.githubPagination)
    } catch (error) {
      console.error(error);
    }
  }

  handleDisplaySelectorClick = (currentSelector) => {
    this.setState({
      displaySelector: currentSelector
    })
  }

  handleGithubPagination(pagination) {
    const elements = pagination.split(',')
    console.log(elements)
    const next = this.githubPaginationElement(elements, /next/gi)
    const prev = this.githubPaginationElement(elements, /prev/gi)
    const first = this.githubPaginationElement(elements, /first/gi)
    const last = this.githubPaginationElement(elements, /last/gi)
    let activePage
    if (next) {
      activePage = Number(next.page)  - 1
    } else {
      activePage = Number(prev.page)  + 1
    }
    let maxPage
    console.log(this.state.githubPagination)
    if(this.state.init){
      maxPage = this.state.githubPagination.maxPage
    } else {
      maxPage = last.page
    }
    return { next: next, prev: prev, first: first, last: last, active: activePage, maxPage : maxPage}
  }

  githubPaginationElement(elements, regex) {
    let result = elements.find(i => i.match(regex))
    if (result) {
      const url = result.split(';')[0].replace(/<(.*)>/gi, '$1').trim()
      const page = url.replace(/.*page=(\d+).*/gi, '$1')
      return { url: url, page: page }
    } else return undefined
  }

  handlePaginatorClick   = async (url) => {
    try {
      console.log(url);
      const response = await GithubAPI.get(url)
      console.log(response);
      
      this.setState({
        developers: response.data.items,
        numberOfItem: response.data.total_count,
        githubPagination: this.handleGithubPagination(response.headers.link),
      })
      console.log(this.state.githubPagination)
    } catch (error) {
      console.error(error);
    }
  }

  renderPaginator(){
    return <Paginator pagination={this.state.githubPagination} handlePaginatorClick={this.handlePaginatorClick} />
  }

  render() {
    return (
      <div className="App">
        <h1>Github most popular users</h1><br></br>
        <ApiForm handleFormSubmit={this.handleFormSubmit}></ApiForm>
        <ItemCount number={this.state.numberOfItem} />
        {this.renderPaginator()}
        <DisplaySelector displaySelector={this.state.displaySelector} handleDisplaySelectorClick={this.handleDisplaySelectorClick}></DisplaySelector>
        <ItemList displaySelector={this.state.displaySelector} items={this.state.developers} emptyMessage="No item, to get them please launch the request" />
        {this.renderPaginator()}
      </div>
    );
  }
}

export default App;
