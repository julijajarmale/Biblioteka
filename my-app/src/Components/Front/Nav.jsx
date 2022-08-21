import {  NavLink } from "react-router-dom";

function FrontNav() {

    return (
        <>
            <div className="container header">
                <div className="row">
                    <div className="col-12">
                        <nav className="nav">
                            <NavLink to="/admin/" className="nav-link" style={
                                ({ isActive }) =>
                                    isActive ? {
                                        color: 'crimson'
                                    } : null
                            }>Admin</NavLink>
                             <NavLink to="/logout">Logout</NavLink>
                           
                              
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FrontNav;