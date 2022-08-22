

import FrontContext from "./FrontContext";
import FrontNav from "./Nav";
import axios from "axios";
import { authConfig } from "../../Functions/auth";
import { useEffect, useState } from "react";
import BooksList from "./List";
import ReservationList from "./ReservationList";

function Front() {

  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [books, setBooks] = useState(null);
  const [reservations, setReservations] = useState(null);
  const [createReservation, setCreateReservation] = useState(null);
  const [rateNow, setRateNow] = useState(null);
  

  

//READ BOOKS
  useEffect(() => {
      axios.get('http://localhost:3003/books', authConfig())
          .then(res => setBooks(res.data));
  }, []);

 //READ RES
 useEffect(() => {
  axios
    .get("http://localhost:3003/reservation", authConfig())
    .then((res) => setReservations(res.data));
}, [lastUpdate]);

//CREATE RES

useEffect(() => {
  if (null === createReservation) return;
  axios.post("http://localhost:3003/reservation", createReservation, authConfig()).then((res) => {
    setLastUpdate(Date.now());
  });
}, [createReservation]);

 // Rate
  // Create
  useEffect(() => {
    if (null === rateNow) return;
    axios
      .put("http://localhost:3003/reservation/" + rateNow.id, rateNow, authConfig())
      .then((_) => {
        setLastUpdate(Date.now());
      });
  }, [rateNow]);

  return (
    <FrontContext.Provider
      value={{
       books,
       reservations, 
       setCreateReservation,
       setRateNow,
       

      }}
    >
       
        <FrontNav />
        <div className="container">
        <div className="row">
           <ReservationList/>
          </div>
          <div className="row">
            <BooksList/>
          </div>
        </div>
      
                    
                    
                    
                   
            
                   
      
    </FrontContext.Provider>
  );
}

export default Front;

