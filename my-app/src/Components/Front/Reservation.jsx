function Reservation({ reservation }) {
    return (
      <li className="list-item">
        <div className="content">
        <span className="item">{reservation.name}</span>
        <span className="item">{reservation.date}</span>
        <span className="item">{reservation.date_end}</span>
        
        </div>
        
      </li>
    );
  }
  
  export default Reservation;