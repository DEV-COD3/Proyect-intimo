
import {Navbar} from './Navbar.jsx'
import {Menu} from './Menu.jsx'
import {Footer} from './Footer.jsx'//  view of data primeraReact 
import React, { useState, useEffect,useRef} from "react";
//  inicio of session
import Cookies from "universal-cookie";
const cookies = new Cookies(); 
// DATATABLE COLUM EQUIQUETAS (TAG) INPUT DE PRIMERA REACT
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'; 
// import axios para las consultas al server
import Axios from "axios";
// import Toast message ASND button 
import { Button } from 'primereact/button';
//  imiport modal  add usuer
import { ModalUser } from '../components/ModalUser.jsx';
// import TOAST primera react library
import { Toast } from 'primereact/toast';
    
export const User =  () => {
    // valid usuer for que pueda acceder
    if(!cookies.get('user')){
        window.location.href="./login";
    }
    const [users, setUsers] = useState(null);
// funcion encargada de renderisar la pagina para que este en tiempo real 
    const updateUsers = () => {     
        Axios.get('http://localhost:3000/allUsers')
        .then((res) => {setUsers(res.data);})    
        .catch((err)=>{console.log(err)})      
    }  
    useEffect(() => { 
        updateUsers(); 
      }, []);  
 
     // este es el que se encarga de mostrar la imagen del perfil
    const templateImgPerfil = (user) => {
        return (
        <div className="flex align-items-center gap-2">
            <img
            alt={user.nombre}
            src={'../img/products/avatar.png'}
            width="32"
            />            
        </div>
        );
    };
    // PANTILLA DE ACCIONES CAMPO
    const templateAccions = (user) => {
        return (
            <div className="col-md-12">              
             <button 
                value={user.id} 
                onClick={deleteUser} 
                className=" col-md-3 mr-2 btn btn-danger rounded-4 p-3">Eliminar
            </button>         
             
             <button 
                value={user.id} 
                onClick={deleteUser} 
                className=" col-md-3 mr-2 btn btn-warning rounded-4 p-3">Editar
            </button>         
             
          </div>
        )
    };
    // DELETED users
    const deleteUser = async(e) => {
        var userDeleted = e.target.value;      

        await Axios.post('http://localhost:3000/deleteUser',{id:userDeleted})
            .then((res) => {
                toast.current.show({ 
                    severity: 'success', 
                    summary: res.data ,                    
                    life: 3000
                  });
                  updateUsers();         
            })
            .catch((err) =>{console.log(err);})       
        
    }  

    // const header = renderHeader();

  // -----MESAAGE NOTIFICATION-----------------------------------------------------------------------------------
  const toast = useRef(null);

    return (
        <>    
        {/* PARA CARGAR LAS NOTIFICACIONES */}
         <Toast ref={toast} />
         <title>Usuarios</title> 
    
          <Menu/>
           
          <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ps ps--active-y "> 
            <Navbar/>        
             <div className="container-fluid py-4 mt-2 ">                 
                <div className="card border-radius-card">
                <div className="card-header row justify-content-between font-weight-bolder bg-gradient-dark text-white">
                    TODOS || USUARIOS                                 
                    <div className="col-lg-4 col-sm-12 col-md-6">                          
                        <ModalUser 
                            name={'Agregar'} 
                            funcionReload={updateUsers()}            
                        />                             
                    </div>  
                </div>
                    <DataTable  
                    value={users}                 
                        paginator 
                        rows={5} 
                        rowsPerPageOptions={[5, 10, 25, 50]} 
                        tableStyle={{ minWidth: '50rem' }}  >
                            <Column field="" body={templateImgPerfil} header="Perfil" style={{ width: '25%' }}></Column>
                            <Column field="nombre" header="Nombre" style={{ width: '25%' }}></Column>
                            <Column body="********" header="Contraseña" style={{ width: '25%' }}></Column>
                            <Column field="representative.name"  header="Acciones" style={{ width: '25%' }}></Column>
                    </DataTable>
                 </div>            
             </div>           
            <Footer/>
          </main>
    
    
        
         
        </>
      )


}