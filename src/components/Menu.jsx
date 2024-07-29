import React, { useState } from "react"; 
import { NavLink } from 'react-router-dom';
// ICON 
import {HiMiniHome,
        HiMiniRectangleStack,
        HiMiniUserGroup,
        HiWrenchScrewdriver,
        HiMiniTruck,
        HiPencilSquare } from "react-icons/hi2";

export const Menu = () => {
  // const [showMenu, setShowMenu] = useState(false);
  return (
    <>
   <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
    <div className="sidenav-header">
      <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a className="navbar-brand m-0" href="/">
        <img src="./favicon.ico" className="navbar-brand-img h-100 mr-2" alt="main_logo"/>
        <span className="ms-1 font-weight-bold text-white p-4">I  N  T  I / H O M E</span>
      </a>
    </div>
    <hr className="horizontal light mt-0 mb-2"/>
    <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className=" nav-link text-white" to="/home">   
            <div className="fon-20 text-white text-center me-2 d-flex align-items-center justify-content-center">       
             <HiMiniHome/>   
            </div>             
            <span className="nav-link-text ms-1"> Mis productos Web</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink  className="  nav-link text-white" to="/create">   
            <div className="fon-20 text-white text-center me-2 d-flex align-items-center justify-content-center">
              <HiPencilSquare  />           
            </div>             
            <span className="nav-link-text ms-1">Crear Producto</span>
          </NavLink>  
        </li>
        <li className="nav-item">
          <NavLink className="  nav-link text-white" to="/category">   
            <div className="fon-20 text-white text-center me-2 d-flex align-items-center justify-content-center">
              <HiMiniRectangleStack />   
            </div>             
            <span className="nav-link-text ms-1">Categorias</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="  nav-link text-white" to="/User">   
            <div className="fon-20 text-white text-center me-2 d-flex align-items-center justify-content-center">
              <HiMiniUserGroup/>   
            </div>             
            <span className="nav-link-text ms-1">Usuarios</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className=" nav-link text-white" to="/Morevent">   
            <div className="fon-20 text-white text-center me-2 d-flex align-items-center justify-content-center">
              <HiMiniTruck/>   
            </div>             
            <span className="nav-link-text ms-1">Mas vendidos</span>
          </NavLink>
        </li>          
        <li className="nav-item">
          <NavLink className=" nav-link text-white" to="/ ">   
            <div className="fon-20 text-white text-center me-2 d-flex align-items-center justify-content-center">
              <HiWrenchScrewdriver/>   
            </div>             
            <span className="nav-link-text ms-1">Mi inventario</span>
          </NavLink>
        </li>          
      </ul>
    
    </div>
    <div className="sidenav-footer position-absolute w-100 bottom-0 ">
      <div className="mx-3">         
        <a className=" btn btn-outline-primary mt-4 w-100" href="/" type="button">MI WEB</a>
      </div>
    </div>
  </aside>
    </>
  );
};

 
