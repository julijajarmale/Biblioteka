import { useContext, useState } from "react";
import setDateFormat from "../../Functions/setDateFormat";
import FrontContext from "./FrontContext";

function Book({ book }) {

  const { reservation, setCreateReservation} = useContext(FrontContext);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  

  const handleDonate = () => {
    const data = {
      name,
      date: date,
      endDate: endDate,
      book: book.id,
    };
    setCreateReservation(data);
    setName("");
    setDate(setDateFormat);
    setEndDate(setDateFormat);
   
  };


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

      <div className="form">
              <h4>Rezervuok knygą</h4>
              <div className="form-row">
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="form-row">
                <label>Pradžios data</label>
                <input
                  type="date"
                  className="input"
                  placeholder="Enter Surname"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                />
              </div>
              <div className="form-row">
              <label>Pabaigos data</label>
                <input
                  type="date"
                  className="input"
                  placeholder="Enter Surname"
                  onChange={(e) => setEndDate(e.target.value)}
                  value={endDate}
                />
              </div>

              <button type="button" className="btn" onClick={handleDonate}>
                Rezervuoti
              </button>
            </div>
    
    </li>
  );
}

export default Book;
