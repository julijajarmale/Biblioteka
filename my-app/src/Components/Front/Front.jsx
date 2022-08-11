

import FrontContext from "./FrontContext";
import FrontNav from "./Nav";
import axios from "axios";
import { authConfig } from "../../Functions/auth";
import { useEffect, useState } from "react";
import BooksList from "./List";


function Front() {

  const [books, setBooks] = useState(null);
 


  useEffect(() => {
      axios.get('http://localhost:3003/books', authConfig())
          .then(res => setBooks(res.data));
  }, []);


  return (
    <FrontContext.Provider
      value={{
        books,
       
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

