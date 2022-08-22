import { useContext } from "react";
import FrontContext from "./FrontContext";
import Book from "./Book";
import Search from "./Search";



function BooksList() {
  const { books } = useContext(FrontContext);

  return (
   
        <div className="col-12 ">
  
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
     
  );
}

export default BooksList;
