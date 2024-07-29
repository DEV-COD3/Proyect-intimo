// icon para el menu hamburger
import { HiMiniBars4   } from "react-icons/hi2";
// react comoponentes 
import React, { useState, useEffect,useRef  } from 'react';
//  inicio of session
import Cookies from "universal-cookie";
const cookies = new Cookies();  
// import Toast message ASND button
import { Toast } from 'primereact/toast'; 
// import splitButton de primera react manu para abajo
import { SplitButton } from 'primereact/splitbutton';
         

export const Navbar = () => {
      
  const toast = useRef(null);

  const items = [
      {
        label: 'Cerrar session',
        icon: 'pi pi-refresh',
        className: 'perfil-menu',
        command: () => {
            cookies.remove('id');
            cookies.remove('user');
            cookies.remove('pass');
            toast.current.show({ severity: 'success', summary: ' Session Cerrada' });
            window.location.href="./login";
          }
      },
      {
        label: 'Mi perfil',
        icon: 'pi pi-refresh',
        className: 'perfil-menu-center',         
        command: () => {
            
        }
    },
       
  ];
  
  return (
    
     <>    
    <Toast ref={toast} />

    <nav className=" navbar navbar-main navbar-expand-lg px-0 mx-4 border-radius-xl shadow-none position-sticky blur shadow-blur mt-4 left-auto top-1 z-index-sticky" id="navbarBlur" >
      <div className="container-fluid py-1 px-3 ">
          <div className="row">  
              <div className="col-md-12">
                <div className="fon-20 config-menu">          
                  <HiMiniBars4  />                    
              </div>               
            </div>
          </div>            
          <div className="row">  
              <div className="col-md-12">              
                  <img src="../img/products/avatar.png" className="avatar  border-radius-lg" alt="user1"/>
                  <SplitButton label={cookies.get('user')} icon="pi pi-plus" model={items} text />           
            </div>
          </div>                  
      </div>
    </nav>
     </>
  );
};