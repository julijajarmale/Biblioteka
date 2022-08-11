import BackContext from './BackContext';

import Nav from './Nav';

//import axios from 'axios';
//import { authConfig } from '../../Functions/auth';
import Admin from './Admin/Admin';


function Back({show}) {
   

    return (
        <BackContext.Provider value={{
           

            
        }}>
              {
                show === 'admin' ?
                    <>
                    
                    <Nav/>
                    <Admin/>
                    
                   
            
                    </>
                    : show === 'books' ? <div>Crud</div>: 
                        null
            }
        </BackContext.Provider>
    )
}
export default Back;