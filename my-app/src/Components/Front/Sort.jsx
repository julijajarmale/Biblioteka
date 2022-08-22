import { useContext, useState } from "react";
import FrontContext from "./FrontContext";

function Sort() {
  const { reservations, setReservations } = useContext(FrontContext);
  const [sortBy, setSortBy] = useState("default");

  const doSort = (e) => {
    setSortBy(e.target.value);
    const p = [...reservations];
    switch (e.target.value) {
      case "ascDate":
        p.sort((a, b) => {
          if (a.date > b.date) return 1;
          if (a.date < b.date) return -1;
          return 0;
        });
        break;
      case "descDate":
        p.sort((a, b) => {
          if (a.date > b.date) return -1;
          if (a.date < b.date) return 1;
          return 0;
        });
        break;

      default:
        p.sort((a, b) => a.row - b.row);
    }
    setReservations(p);
  };

  return (
    <div className="col-4">
      <div className="form">
        <label>Rūšiuoti pagal datą</label>
        <select className="input" value={sortBy} onChange={doSort}>
          <option value="default">Default</option>
          <option value="ascDate">Seniausios priekyje</option>
          <option value="descDate">Naujausios priekyje</option>
        </select>
      </div>
    </div>
  );
}

export default Sort;
