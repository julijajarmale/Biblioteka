import { useContext,  useState } from "react";
import setDateFormat from "../../../Functions/setDateFormat";
import BackContext from "../BackContext";

function Reservation({ reservation }) {
  const { setDeleteReservation, setApproveReservation, setExtendReservation } = useContext(BackContext);

  const [nextDate, setNextDate]= useState("");

  const handleDelete = () => {
    setDeleteReservation(reservation);
  };

  const handleApprove = () => {
    const data = { ...reservation, approved: 1 };
    setApproveReservation(data);
  };

  const handleDissaprove = () => {
    const data = { ...reservation, approved: 0 };
    setApproveReservation(data);
  };

  
    const handleNewDate = () => {
        const data = { 
         next_date: nextDate,
         reservation: reservation.id
     
        
        };
    
        setExtendReservation(data);
        setNextDate(setDateFormat);
        console.log(data)
        console.log(reservation.id)
        console.log(reservation)

        
      };
  

  return (
    <li className="admin-list-item">
      <div className="content">
        <b className="admin-item">{reservation.title}</b>
        <i className="admin-item">{reservation.name}</i>
        <span className="admin-item">Pradžios data:{new Date(Date.parse(reservation.date)).toLocaleString()}</span>
        <span className="admin-item">Pabaigos data:{new Date(Date.parse(reservation.date_end)).toLocaleString()}</span>
        <div className="form-row">
              <input
                type="date"
                className="input"
                placeholder="Knygos pavadinimas"
                onChange={(e) => setNextDate(e.target.value)}
                value={nextDate}
              />
              <button className="button btn5" onClick={handleNewDate}>Pratęsti rezervaciją</button>
            </div>
        <span
          className="item"
          style={{ color: reservation.approved ? "green" : "red" }}
        >
          {reservation.approved ? "Approved" : "Not approved"}
        </span>
      </div>
      <div className="photo-box">
      <div className="herbas">
            <img src={reservation.photo} alt={reservation.name} />
          </div>
      </div>

      <div className="buttons">
        <button type="button" className="button btn5" onClick={handleApprove}>
          Patvirtinti
        </button>
        <button
          type="button"
          className="button btn2"
          onClick={handleDissaprove}
        >
          Atšaukti 
        </button>
    
        <button type="button" className="button btn3" onClick={handleDelete}>
          Ištrinti
        </button>
      </div>
    </li>
  );
}

export default Reservation;