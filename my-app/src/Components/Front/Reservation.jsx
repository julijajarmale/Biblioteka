import { useContext, useState } from "react";
import FrontContext from "./FrontContext";


function Reservation({ reservation,}) {

  const { setRateNow,} = useContext(FrontContext);
  const [rate, setRate] = useState(0);
   

  //const handleRating = () => {
  //  const data = { rate: rate,
  //    reservation: reservation.id };
  //    setRateNow(data);
  //};

  const rateIt = (e) => {
    setRate(e.target.value);
    setRateNow({
      rate: parseInt(e.target.value),
      id: reservation.id,
    });
  };
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
        <span className="item">{new Date(Date.parse(reservation.date)).toLocaleString()}</span>
        <span className="item">{new Date(Date.parse(reservation.date_end)).toLocaleString()}</span>
        <span
          className="item"
          style={{ color: reservation.approved ? "green" : "red" }}
        >
          {reservation.approved ? "Rezervacija patvirtinta, galite atsiimti knygą" : "Rezervacija laukia patvirtinimo"}
        </span>
        <b
          className="item">
            Įvertinkite paslaugos kokybę:
        <select value={rate} onChange={rateIt}>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={10 - i}>
                {10 - i} *
              </option>
            ))}
          </select>
          {rate ? Number(rate).toFixed(2) : '0.00'}
          </b>
          
      </div>
    </li>
    );
  }
  
  export default Reservation;