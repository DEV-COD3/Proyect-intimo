import {Navbar} from './Navbar.jsx'
import {Menu} from './Menu.jsx'
import {Footer} from './Footer.jsx'
//  view of data primeraReact 
import React, { useState, useEffect ,useRef } from "react";
// import axios para las consultas al server
import Axios from "axios";
//  inicio of session
import Cookies from "universal-cookie";
const cookies = new Cookies(); 
// import input con reac 
import { InputText } from 'primereact/inputtext'; 
// import Toast message ASND button
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
// data table para mostrar mis productos primeraReact
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// avatar primeraReact
import { Avatar } from 'primereact/avatar';
// import styles media queries
import '../../assets/css/media.css';   


export const MoreVent = ()=> {
// valid usuer for que pueda acceder
  if(!cookies.get('user')){
    window.location.href="./login";
  }
  const [products,setProducts] = useState([]);
  const [destac,setDestac] = useState([]);
  // ME consulta todos los porductos y me los carga antese de que la web se vea con este hook 
  useEffect(() => {
    Axios.get('http://localhost:3000/getProducts')
    .then((res) => setProducts(res.data))
    .catch((err) => console.log(err));
    allDestacados();
  }, []);
  // consulta a mi api para ver en la card del lado los que se van agregando 
  const allDestacados = () => {
    Axios.get('http://localhost:3000/allDestacados')
    .then( (res) => {                   
          if (res.data == 'No se encontraron datos en la tabla') {
            setDestac(); 
          }else{ setDestac(res.data);  }
    })
    .catch(err => console.log(err));
  }
   // el template me captura el id para enviar el backend y ser eliminado  
   const templateDestac = (captureId) => {
    return (  
      <div  className="col-md-12">            
        <button  
            value={captureId.id}
            onClick={deleteDestac}  
            className=" col-md-12  btn btn-danger rounded-4 p-">  Borrar
        </button> 
      </div>
 
    );
  };
  // funcion encargada de enviar al server para ser borrar  un producto mas vendido
  const deleteDestac = async(idDelete) => {
    var sendIdDelete ={id:idDelete.target.value};

   await Axios.post('http://localhost:3000/deleteDestac ',sendIdDelete)
    .then(response => {
      toast.current.show({ 
        severity: 'error', 
        summary: response.data.toUpperCase(),             
        life: 2000
      });       
      allDestacados();
    })
    .catch(err => console.log(err));  

  }
   // templarte este es el que se encarga de mostrar la imagen del perfil 
  const showImg = (img) => {
    return (          
        <Avatar image={`../img/products/${img.routeImg}`} size="large" shape="circle" />    
    );
  };
  // el template para mover al otro apartado agregar a mi web 
  const templateAccions = (captureId) => {
    return (  
      <div  className="col-md-12">            
        <button  
            value={captureId.id}
            onClick={saveInWeb}  
            className=" col-md-12  btn btn-warning rounded-4 p-">  Mover
        </button> 
      </div>
 
    );
  };
// funcion encargada de pasar a la tabla destacados 1 para ver en el mismo sistema en el apartado del lado y 2 para verla en la pagina web 
  const saveInWeb = async(id) => { 
    var sednId ={id:id.target.value};

    await Axios.post('http://localhost:3000/addProductWeb',sednId)
      .then((response) => {
        toast.current.show({ 
          severity: 'success', 
          summary: response.data.toUpperCase(),             
          life: 2000
        }); 
        allDestacados();
      })
      .catch(err => console.log(err));   
  }
 // -----MESAAGE-----------------------------------------------------------------------------------
 const toast = useRef(null);
 
  return (
  <> 
    {/* PARA CARGAR LAS NOTIFICACIONES */}
    <Toast ref={toast} />

    <title> Lo Mas Destacado </title> 
    <Menu/>       
 
  <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ps ps--active-y "> 
        <Navbar/> 
        <div className="container-fluid py-4 mt-4">
          <div className='row'>    
              <div className="card col-md-12 quitar-margin col-sm-12 col-lg-6" style={{marginRight:"3em",marginLeft:"1em", }} >              
                <div className="card-header font-weight-bolder bg-gradient-dark text-white">
                      MIS  ||  PRODUCTOS                   
                    </div>
                      <div className="card-body  ">   
                        <div className="card">
                          <DataTable value={products} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                              <Column field="" body={showImg} header="IMG" style={{ width: '19%' }}></Column>                              
                              <Column field="nombre" header="Nombre" style={{ width: '25%' }}></Column>
                              <Column field="precio" header="Precio" style={{ width: '25%' }}></Column>
                              <Column field="estado" header="Estado" style={{ width: '25%' }}></Column>
                              <Column body={templateAccions} header="Acciones" style={{ width: '25%' }}></Column>                                    
                          </DataTable>
                        </div>                                 
                      </div>
                    <hr className="dark horizontal my-0"/>
                    <div className="card-footer d-flex">           
                </div>             
            </div>         
              <div className="card col-md-12 col-sm-12 col-lg-5" >              
                <div className="card-header font-weight-bolder bg-gradient-dark text-white">
                      AGREGAR  || A MI WEB MAS VENDIDOS                  
                  </div>
                  <div className="card-body  ">   
                    <div className="card">
                      <DataTable value={destac} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="" body={showImg} header="IMG" style={{ width: '19%' }}></Column>                              
                        <Column field="nombre" header="Nombre" style={{ width: '25%' }}></Column>
                        <Column field="precio" header="Precio" style={{ width: '25%' }}></Column>
                        <Column field="estado" header="Estado" style={{ width: '25%' }}></Column>
                        <Column body={templateDestac} header="Acciones" style={{ width: '25%' }}></Column>                                    
                      </DataTable>
                    </div>                                 
                  </div>
                  <hr className="dark horizontal my-0"/>
                  <div className="card-footer d-flex">           
              </div>
              </div>         
          </div>
       </div>          
      
        <Footer/>
      </main>
 
     
    </>
  )
}
 
