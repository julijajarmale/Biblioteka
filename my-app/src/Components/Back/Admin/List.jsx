import { useContext } from "react";
import BackContext from "../BackContext";
import Reservation from "./Reservation";

function List() {
  const { reservations } = useContext(BackContext);

  return (
    <div className="container list-container">
      <div className="row">
        <div className="col-12 list-form">
          <h2>Rezervacijų sąrašas</h2>
          <div className="list-group">
            <ul className="list-group-item">
              {reservations
                ? reservations.map((reservation) => (
                    <Reservation key={reservation.id} reservation={reservation}></Reservation>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;