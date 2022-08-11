

function Book({ book }) {



  return (
    <li className="book-list-item">
      <div className="content">
        <div className="book-item">
          {book.photo ? (
            <div className="book-cover">
              <img src={book.photo} alt={book.title} />
            </div>
          ) : null}
        </div>
        <b className="book-item">{book.title}</b>
        <span className="book-item">
          {book.author} 
        </span>
       
       
      </div>

    
    </li>
  );
}

export default Book;
