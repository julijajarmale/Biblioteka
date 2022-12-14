import { useContext } from "react";
import FrontContext from "./FrontContext";
import Reservation from "./Reservation";
import Sort from "./Sort";


function ReservationList() {
  const { reservations } = useContext(FrontContext);

  return (
   
        <div className="col-12 ">
          <h2>Jūsų rezervacijos</h2>
          <Sort/>
          <div className="book-list-group">
          <ul className="book-list">
            {reservations
              ? reservations.map((reservation) => (
                  <Reservation key={reservation.id} reservation={reservation}></Reservation>
                ))
              : null}
          </ul>
          </div>
        </div>
     
  );
}

export default ReservationList;
