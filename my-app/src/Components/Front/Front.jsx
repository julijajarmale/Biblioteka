

import FrontContext from "./FrontContext";
import FrontNav from "./Nav";
import axios from "axios";
import { authConfig } from "../../Functions/auth";
import { useEffect, useState } from "react";
import BooksList from "./List";


function Front() {

  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [books, setBooks] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [createReservation, setCreateReservation] = useState(null);

//READ BOOKS
  useEffect(() => {
      axios.get('http://localhost:3003/books', authConfig())
          .then(res => setBooks(res.data));
  }, []);

 //READ RES
 useEffect(() => {
  axios
    .get("http://localhost:3003/reservation", authConfig())
    .then((res) => setReservation(res.data));
}, [lastUpdate]);

//CREATE RES

useEffect(() => {
  if (null === createReservation) return;
  axios.post("http://localhost:3003/reservation", createReservation, authConfig()).then((res) => {
    setLastUpdate(Date.now());
  });
}, [createReservation]);


  return (
    <FrontContext.Provider
      value={{
       books,
       reservation, 
       setCreateReservation
      }}
    >
      <FrontNav />
      <div className="container">
        <div className="row">
          <BooksList/>
        </div>
      </div>
      
      
    </FrontContext.Provider>
  );
}

export default Front;

