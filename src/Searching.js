import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';



class Searching extends Component {


  state = {
    query: '',
    results: []
  }


  updateQuery = (query) => {
    this.setState({
      query: query
    })
    this.updateResults(query);
  }


  updateResults = (query) => {

    if (query) {
      BooksAPI.search(query).then((results) => {
        //error handling ternary for search
        results.error ? this.setState({ results: [] }) : this.setState({ results: results })
      })
    } else {
      this.setState({ results: [] });
    }
  }


  render() {

    return (
      <div className="search-books">

        <div className="search-books-bar">

          <Link to="/" className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>

        </div>


        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.results.map(result => {
                let shelfName = "none";

                this.props.books.map(book => (
                  book.id === result.id ?
                  shelfName = book.shelf :
                  ''
                ));

                return (
                <li key={result.id}>
                <Book
                book={result}
                changeShelves={this.props.changeShelves}
                currentShelf={shelfName}
                />

                </li>
              );
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Searching;
