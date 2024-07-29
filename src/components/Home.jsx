import {Navbar} from './Navbar.jsx'
import {Menu} from './Menu.jsx'
import {Footer} from './Footer.jsx'
//  view of data primeraReact 
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag" 
// import axios para las consultas al server
import Axios from "axios";
// icons 
import { BsBrush,BsEyeFill  } from "react-icons/bs";
//  inicio of session
import Cookies from "universal-cookie";
const cookies = new Cookies(); 

export const Home = ()=> {
// valid usuer for que pueda acceder
  if(!cookies.get('user')){
    window.location.href="./login";
  }
  const [products, setProducts] = useState([]); 

  useEffect(() => { 
    Axios.get('http://localhost:3000/getProducts')
    .then((res) => {
      setProducts(res.data);      
    })    
    .catch((err)=>{console.log(err)}) 

  }, []);

  const status = (product) => {
    switch (product.estado) {
      case 'Disponible':
        return 'success';
      case 'Agotado':
          return 'warning';      
      default: 
        return null;        
    }
  };   

  const itemTemplate = (product) => {
    
    return (       
      <div className="col-12">         
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4  ">
         <div style={{position:'relative'}}>
          <img
              className="w-5 sm:w-5rem xl:w-5rem shadow-2 block xl:block mx-auto border-round"
              src={`../img/products/${product.routeImg}`}
              alt={product.nombre}                   
            />                       
         </div>           
         
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4 border-round">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{product.nombre}</div>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <Rating value={product.estrellas} readOnly cancel={false}></Rating>         
                  <i className="">Descripcion: </i> <BsEyeFill />
                  {/* <span className="font-semibold">{product.descripcion}</span>                  */}
                  <Tag 
                  value={product.estado}
                  severity={status(product)}
                ></Tag>
                </span>                
              </div>
            </div>              
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">${product.precio}</span>
              <Button              
                icon={<BsBrush/>}
                className="p-button-rounded"                
              ></Button>              
            </div>
          </div> 
        </div>
      </div>
    );
  };

    return (
    <>    
     <title> Home </title> 

      <Menu/>
       
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ps ps--active-y "> 
        <Navbar/>        
         <div className="container-fluid py-4 mt-2">
            <div className="row justify-content-center">
              <div className="card col-md-11 col-sm-12">
                <div className="card-header font-weight-bolder bg-gradient-dark text-white">
                    LISTA  ||  PRODUCTOS                   
                </div>
                <div className="card-body text-center ">
                  <DataView 
                    value={products}
                    itemTemplate={itemTemplate}
                    paginator              
                    rows={5}
                    // rowsPerPageOptions={[5, 10, 25, 50]} 
                    />
                </div>           
              </div>           
          </div>
        </div>       
        <Footer/>
      </main>    
     
    </>
  )
}
 
