import React, { useState, useEffect,useRef  } from 'react';
//  inicio of session
import Cookies from "universal-cookie";
const cookies = new Cookies();  
// import Toast message ASND button
import { Toast } from 'primereact/toast'; 
// import splitButton de primera react manu para abajo
import { SplitButton } from 'primereact/splitbutton';
 
export const CloseSession = () => {
        
    const toast = useRef(null);

    const items = [
        {
            label: 'Cerrar session',
            icon: 'pi pi-refresh',
            command: () => {
                cookies.remove('id');
                cookies.remove('user');
                cookies.remove('pass');
                toast.current.show({ severity: 'success', summary: ' Session Cerrada' });
                window.location.href="./login";
            }
        },
         
    ];

    return (
        <>  
          <Toast ref={toast} />
           
          <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="d-flex px-2 py-1">
                <div>
                  <img src="../img/products/avatar.png" className="avatar ms-8 border-radius-lg" alt="user1"/>
                </div>                  
                <div className="  flex justify-content-center">             
                    <SplitButton label={cookies.get('user')} icon="pi pi-plus" model={items} text />                  
                </div>           
            </div>             
          </div>         
        </div> 
        </>
    );
}
 
 