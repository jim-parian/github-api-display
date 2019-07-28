import React from 'react'
import './Paginator.css'

class Paginator extends React.Component {
    constructor(props) {
        super(props);


        // Explicit binding function to the instance of this class
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(event, url) {
        event.preventDefault();
        this.props.handlePaginatorClick(url)
    }

    render() {
        console.log(this.props.handlePaginatorClick)
        return (
            <div className="pagination">
                {this.props.pagination.active ?
                    <>
                        <a
                            href={this.props.pagination.first ? this.props.pagination.first.url : '#'}
                            className={!this.props.pagination.first ? 'not-active' : ''}
                            onClick={(e) => this.handleClick(e, this.props.pagination.first.url)}
                        >First</a>
                        <a
                            href={this.props.pagination.prev ? this.props.pagination.prev.url : '#'}
                            className={!this.props.pagination.prev ? 'not-active' : ''}
                            onClick={(e) => this.handleClick(e, this.props.pagination.prev.url)}
                        >Prev</a>
                        <a
                            href={'#'}
                            className={"active-page"}
                        >{this.props.pagination.active}/{this.props.pagination.maxPage}</a>
                        <a
                            href={this.props.pagination.next ? this.props.pagination.next.url : '#'}
                            className={!this.props.pagination.next ? 'not-active' : ''}
                            onClick={(e) => this.handleClick(e, this.props.pagination.next.url)}
                        >Next</a>
                        <a
                            href={this.props.pagination.last ? this.props.pagination.last.url : '#'}
                            className={!this.props.pagination.last ? 'not-active' : ''}
                            onClick={(e) => this.handleClick(e, this.props.pagination.last.url)}
                        >Last</a>
                    </>
                    : ''
                }
            </div>
        )

    }

}

export default Paginator