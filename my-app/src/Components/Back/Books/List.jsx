import { useContext } from "react";
import BackContext from "../BackContext";
import Book from "./Book";


function BooksList() {
  const { books } = useContext(BackContext);

  return (
    <div className="container book-list-container">
      <div className="row">
        <div className="col-12">
          <h2>Knygų sąrašas</h2>
          <div className="book-list-group">
          <ul className="book-list">
            {books
              ? books.map((book) => (
                  <Book key={book.id} book={book}></Book>
                ))
              : null}
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BooksList;
