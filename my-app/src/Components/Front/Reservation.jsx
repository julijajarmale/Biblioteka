

function Reservation({ reservation,}) {

   
    return (
        <li className="book-list-item">
      <div className="content">
        <div className="book-item">
          {reservation.photo ? (
            <div className="book-cover">
              <img src={reservation.photo} alt={reservation.title} />
            </div>
          ) : null}
        </div>
        <b className="book-item">{reservation.title}</b>
        <span className="book-item">
          {reservation.author} 
        </span>
        <span className="item">{reservation.name}</span>
        <span className="item">{reservation.date}</span>
        <span className="item">{reservation.date_end}</span>
        <span
          className="item"
          style={{ color: reservation.approved ? "green" : "red" }}
        >
          {reservation.approved ? "Rezervacija patvirtinta, galite atsiimti knygą" : "Rezervacija laukia patvirtinimo"}
        </span>
      </div>
    </li>
    );
  }
  
  export default Reservation;