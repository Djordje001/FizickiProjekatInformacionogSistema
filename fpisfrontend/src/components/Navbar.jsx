// import React from 'react'
// import { Outlet } from "react-router-dom"; 
// import {Link} from 'react-router-dom';
// import { Button } from 'react-bootstrap';

// function NavBar() {
//   const activeStyle = {
//     color: 'blue',
//     fontWeight: 'bold'
//   };
   
//   return (
//     <>
    
    
    
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//   <div className="container-fluid">
    
//     <p className='navbar-brand'>Qatar 2022</p>
//     {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button> */}
//     <div className="collapse navbar-collapse" id="navbarText">
//       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//         <li className="nav-item">
        
//           <Link to={`/home`} className="nav-link" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
//                 Home
//         </Link>
//         </li>
//         <li className="nav-item">
        
//         <Link to={`/groups`} className="nav-link" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
//               Groups
//       </Link>
//       </li>
//         <li className="nav-item">
         
//         <Link to={`/add`} className="nav-link" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
//                 Add group or add team
//         </Link>
//         </li>
//         <li className="nav-item">
          
//         <Link to={`/addmatch`} className="nav-link" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
//                 Add Match
//         </Link>
//         </li>


      
//         <li className="nav-item">
          
//           <Link to={`/matches`} className="nav-link" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
//                   Matches
//           </Link>
//           </li>
       


        
        
       


//         {/* <li className="nav-item">

      
//         <Button onClick={(e)=>{logout(e)}} variant="primary">Logout</Button>
//         </li> */}
//       </ul>
      
//     </div>
//   </div>
  
// </nav>
// <Outlet/>

// </>
//   )
// }

// export default NavBar


import React from 'react';
import { Outlet, NavLink, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();

  const getLinkStyle = (path) => ({
    color: location.pathname === path ? 'blue' : 'black',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <p className='navbar-brand'>Qatar 2022</p>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/home" className="nav-link" style={getLinkStyle("/home")}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/groups" className="nav-link" style={getLinkStyle("/groups")}>
                  Groups
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/add" className="nav-link" style={getLinkStyle("/add")}>
                  Add group or add team
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/addmatch" className="nav-link" style={getLinkStyle("/addmatch")}>
                  Add Match
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/matches" className="nav-link" style={getLinkStyle("/matches")}>
                  Matches
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;