

import FrontContext from "./FrontContext";
import FrontNav from "./Nav";
//import axios from "axios";
//import { authConfig } from "../../Functions/auth";


function Front() {

 
  return (
    <FrontContext.Provider
      value={{
       
      }}
    >
      <FrontNav />
      <div className="container">
        <div className="row">
          
        </div>
      </div>
      <div className="container">
        <div className="row">
         
         
        </div>
      </div>
    </FrontContext.Provider>
  );
}

export default Front;

