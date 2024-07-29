import React, { useState, useEffect,useRef} from 'react';
import {Navbar} from './Navbar.jsx'
import {Menu} from './Menu.jsx'
import {Footer} from './Footer.jsx'
// import input con reac 
import { InputText } from 'primereact/inputtext';  
// import Toast message ASND button
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
//  inicio of session
import Cookies from "universal-cookie";
const cookies = new Cookies();
// import axios para las consultas al server
import Axios from "axios";
 
export const Category = () => { 
    // valid usuer for que pueda acceder
  if(!cookies.get('user')){
    window.location.href="./login";
  }  
  const [category, setCategory] = useState("");  
  const [listCategory, setlistCategory] = useState();
  // eliminar categorias
  const deleCate = (e) => {
    e.preventDefault();
    var categoryDelete = e.target.value;

    Axios.post('http://localhost:3000/deleteCategories',{id:categoryDelete})  
     .then((res) => {
        toast.current.show({ 
          severity: 'error', 
          summary: res.data.toUpperCase(),                    
          life: 3000
        });
        updateCategories(); 
     });
  }     
   
// funcion encargada de renderizar la web para que sea en tiempo real
  const updateCategories = () => {
    Axios.get('http://localhost:3000/getCategories')
    .then((res)=>{ 

       setlistCategory(res.data.map(e =>        
       <div className="row height-30">            
          <div className="col-md-6 col-sm-6 col-6  ">
            <li>
              {e.nombre}   
            </li>
          </div>         
          <div  className="col-md-6 col-sm-6 col-6 text-center">          
             <button onClick={deleCate}  value={e.id} className='  btn-hover-new  ' 
             style={{padding:'10px 20px', backgroundColor:'#ffff' , color:'red', border:'none'}}>                
                Eliminar
              </button>
          </div>      
       </div>     
     ));             
    })    
    .catch((err)=>{console.log(err)}) 
    
  }
  // load all categories apenas inicie la web
  useEffect(() => {
    updateCategories();
  }, []);   
// funcion encargada de insertar categorias a la bd
  const addCategory = async (e) => {   
    e.preventDefault();
    
    var infoCategory = {
      category:category.toUpperCase(), 
        
      };      

    await Axios.post('http://localhost:3000/addCategory' , infoCategory)
      .then( res => {

          toast.current.show({ 
            severity: 'success', 
            summary: res.data, 
            // detail: res.data ,
            life: 2000
          });
          clear.current.reset();
          updateCategories();

      } )
      .catch( err => console.log(err));
    
  }

  // -----MESAAGE NOTIFICATION-----------------------------------------------------------------------------------
  const toast = useRef(null);
  //------- SE ENCARGA DE VACIAR LOS INPUTS AL INGRESAR LA CATEGORY --------------------------------
  const clear = useRef(null);
 
  return (
    
    <>

     {/* PARA CARGAR LAS NOTIFICACIONES */}
     <Toast ref={toast} />
      <title> Categorias</title> 

<Menu/>
  
<main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ps ps--active-y "> 
  <Navbar/>
    <div className="container-fluid py-4 mt-4 ">
      <div className="  row justify-content-center"> 
      <div className="card col-md-11 col-sm-12" >              
          <div className="card-header font-weight-bolder bg-gradient-dark text-white">
              CATEGORIAS                  
          </div>
              <div className="card-body text-center ">
              <form  ref={clear} role="form" className="text-start">
                <div className='row'>
                    <div className='form-group col-md-12'>
                      <label className="form-label">Lista de categorias</label>                   
                       {listCategory}                      
                    </div>                         
                </div>                                             
                <div className='row mt-1em'>                         
                    <div className='form-group col-md-8'>                    
                        <div className="input-group input-group-outline my-3  ">
                          <InputText  
                            onChange={(e) => setCategory(e.target.value)}
                            className="form-control" 
                            placeholder="Digite aqui la categoria a agregar..."
                            type='text'
                            />
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                      <Button                        
                        className="bg-dark col-md-12 mt-2 col-sm-12 col-12" 
                        onClick={addCategory} 
                        label="Agregar" 
                        rounded
                      />
                    </div>
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
