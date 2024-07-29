import React, { useState, useEffect,useRef  } from 'react';
import {Navbar} from './Navbar.jsx'
import {Menu} from './Menu.jsx'
import {Footer} from './Footer.jsx'
// import select con npm react 
import { MultiSelect } from "react-multi-select-component";
// import upload con react
import { FileUpload } from 'primereact/fileupload';
// import textarea con react
import { InputTextarea } from 'primereact/inputtextarea';
// import axios para las consultas al server
import Axios from "axios";
// import input con reac 
import { InputText } from 'primereact/inputtext';
// import Toast message ASND button
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
//  inicio of session
import Cookies from "universal-cookie";
const cookies = new Cookies();
// PRIMERA REACT - MODULES
import "primereact/resources/themes/lara-light-indigo/theme.css";          
import "primereact/resources/primereact.min.css";  
// template styels
import '../../assets/css/material-dashboard.css'
 
//  stylos importantes PrimeraReact
import  'primeflex/primeflex.css'

export const Create = () => {   
// valid usuer for que pueda acceder
  if(!cookies.get('user')){
    window.location.href="./login";
  }
  // get all categories
   const categories = [];    
   const [category, setcategory] = useState([]); 
   const [selected, setSelected] = useState([]); 
  //Me trae y me captura por defecto si esta disponible o agotado  
   const status = [];
   const [selectedEstatus, setSelectedEstatus] = useState([]);
   const cities = [
       { name: 'Disponible' },
       { name: 'Agotado' }
   ];
  // mapeo para meter data en multiSelect
   cities.map(e => {status.push({label: e.name,value:e.name})})

  // me trae todas las categorias antes de que cargue la web
   useEffect(() => {
    Axios.get('http://localhost:3000/getCategories')
       .then((res)=>{
        setcategory(res.data)         
       })    
       .catch((err)=>{console.log(err)}) 
  }, []);
  // mapeo para meter data en multiSelect
  category.map(e => {categories.push({label: e.nombre,value:e.id})})

  // -------------------------SAVE IMG AND DATA--------------------------------------------------------------------------
  const [file,setFile]       = useState([]);
  const [name, setName]      = useState(); 
  const [price, serPrice]    = useState(); 
  const [descrip,setDescrip] = useState();  
  const [star,setStar]       = useState();

  const handleSave = (e) => {
    setFile(e.files[0]);

    const data = new FormData();
    data.append('file',file);     

// sube imagen a el servidor 
    Axios.post('http://localhost:3000/upload', data)
      .then(res =>{

          if (res.data !==' ') {  
            toast.current.show({ 
              severity: 'success', 
              summary: res.data.toUpperCase(), 
              // detail: res.data ,
              life: 2000
            });           
          } else { 
            toast.current.show({ 
              severity: 'error',  
              summary: 'imagen no cargada',               
              life: 2000
            });  
            
          }
    });
  }
  const handleSendData = async(e) => {
    e.preventDefault();

    if(name == '' || price == '' || descrip == '' || star == '' || selectedEstatus == '' || selected == '') {
      toast.current.show({ 
        severity: 'error', 
        summary:'Debes llenar todos los campos', 
        // detail: res.data ,
        life: 2000
      });    
    } else {      

    var infoProduct = {
      name:name, 
      price:price,
      description:descrip,     
      category:selected[0].value, //value id      
      status:selectedEstatus[0].value,
      nameImg:file.name,
      star:star
    }; 
 
    await Axios.post('http://localhost:3000/insertProduct ', infoProduct)
      .then(res =>{        
          toast.current.show({ 
            severity: 'success', 
            summary: res.data ,             
            life: 2000
          });
          window.location.href = "/home";
      })
    }
      
  }     
  
  // -----MESAAGE-----------------------------------------------------------------------------------
  const toast = useRef(null);
 
  return (
    <>
    
    {/* PARA CARGAR LAS NOTIFICACIONES */}
      <Toast ref={toast} />
      <title>Productos</title> 

      <Menu/>        
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ps ps--active-y "> 
        <Navbar/>
        <div className="container-fluid py-4 mt-4">
          <div className='row'>   
            <div className="col-md-4 me-3">            
                <FileUpload  
                customUpload    
                uploadHandler={handleSave}      
                className="card"
                name="file"                 
                multiple accept="image/*" 
                maxFileSize={2000000} 
                emptyTemplate={<h6 className="m-0">Selecciona la imagen de el producto</h6>} 
                />
             <div>                 
        </div>
            </div>         
            <div className="card col-md-7 " >              
                <div className="card-header font-weight-bolder bg-gradient-dark text-white">
                    INGRESAR  ||  PRODUCTOS                   
                </div>
                  <div className="card-body text-center ">
                  <form role="form" className="text-start">
                    <div className='row'>
                        <div className='form-group col-md-6'>
                          <label className="form-label">Nombre</label> 
                            <div className="input-group input-group-outline my-3  ">                              
                              <InputText  
                              onChange={(e) => setName(e.target.value)}
                              className="form-control" 
                              placeholder="Nombre"
                              name="bbb" 
                              />                              
                            </div>
                        </div>
                        <div className='form-group col-md-6'>
                          <label className="form-label">Precio</label> 
                            <div className="input-group input-group-outline my-3  ">
                              <InputText  
                                onChange={(e) => serPrice(e.target.value)}
                                className="form-control" 
                                placeholder="$"
                                type='number'
                                />
                            </div>
                        </div>
                    </div>                                    
                     <label className="form-label">Seleciona la categoria del producto</label>                     
                          {/* <div> { JSON.stringify(file )} </div> */}
                      <MultiSelect
                      // opcion es un array 
                        options={categories}                                                
                        value={selected}  
                        onChange={setSelected}
                        labelledBy={ 'selected' }
                        isCreatable={true}  
                        className="col-md-12" 
                        name="aa"                       
                      />                            
                      <InputTextarea  
                      className="col-12 mt-3 " 
                      placeholder=" Escribe la descripcion del producto"
                      onChange={(e) => setDescrip(e.target.value)} 
                      rows={5}   
                      />                    
                      <div className='row'>
                        <div className='form-group col-md-6'>
                            <label className="form-label">Estado</label> 
                              <div className="input-group input-group-outline my-3  ">
                                <MultiSelect
                                  // status es un array 
                                    options={status}
                                    value={selectedEstatus} 
                                    onChange={setSelectedEstatus} 
                                    labelledBy={ 'selected' }
                                    isCreatable={true}  
                                    className="col-md-12" 
                                    name="aa"                       
                                  /> 
                              </div>
                          </div>
                          <div className='form-group col-md-6'>
                           <label className="form-label">Estrellas</label> 
                              <div className="input-group input-group-outline my-3  ">
                                <InputText   
                                  onChange={(e) => setStar(e.target.value)}
                                  className="form-control" 
                                  placeholder="Estrellas del  del 1 al 5"
                                  type='number'
                                  />
                              </div>
                          </div>
                      </div>
                      <div className=' flex justify-content-center'>
                        <Button 
                        className="p-button-rounded bg-dark col-md-7" 
                        onClick={handleSendData} 
                        label="Guardar" 
                                              
                        />
                      </div>
                  </form>                 
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
  );
};

//   <label className="form-label">Contraseña</label>
// <div className="input-group input-group-outline mb-3">
//   <input type="password" className="form-control"  placeholder="Contraseña"/>
// </div>
// <div className="form-check form-switch d-flex align-items-center mb-3">
//   <input className="form-check-input" type="checkbox" id="rememberMe"  />
//   <label className="form-check-label mb-0 ms-3" >Ver contraseña</label>
// </div>
// <div className="text-center">
//   <button   className="btn bg-gradient-primary w-100 my-4 mb-2">Iniciar sesion</button>
// </div>
// <p className="mt-4 text-sm text-center">                    
//   <a  id="message" className="  text-primary text-gradient font-weight-bold"> </a>
// </p>

