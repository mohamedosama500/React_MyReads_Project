import React from 'react';
import Changeshelfbooks from './Changeshelfbooks';
const Bookshelf = props => {
    const { shelf, books, onMove } = props;
    const booksOnThisShelf = books.filter(book => book.shelf === shelf.key);
    const Book = ({ book, shelf, onMove }) => (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${ book.imageLinks? book.imageLinks.thumbnail : 'icons/book-placeholder.svg'})`}}/>
            <Changeshelfbooks book={book} shelf={shelf} onMove={onMove} />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors ? book.authors.join(', ') : 'Unknown Author'}
          </div>
        </div>
      </li>);
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksOnThisShelf.map(book => (
              <Book key={book.id} book={book} shelf={shelf.key} onMove={onMove} />))}
          </ol>
        </div>
      </div>);
  };
export default Bookshelf;
  