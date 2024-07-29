import React, { useState } from "react";
import Axios from "axios";
// import input con reac 
import { InputText } from 'primereact/inputtext';
//  inicio of session
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Login = ()=> {
  // valid usuer for que pueda acceder
  if(cookies.get('user')){
    window.location.href="./home";
  } 
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [message, setmessage] = useState('');

    const handleLogin  = async(e) => { 
      var nodeResponse = document.getElementById('message');
      e.preventDefault();     
      
      await Axios.post('http://localhost:3000/login',{name:user,password:pass})
       .then((res)=>{             

        if (res.data[0].nombre) {         
          // variabels of session
          var json = res.data[0];
          cookies.set("id",json.id );
          cookies.set("user",json.nombre);
          cookies.set("pass", json.contrasena);     
          window.location.href = "/home";

        }else{          
           nodeResponse.classList.remove('invisible');          
           setmessage(res.data);
           // TIME OF MESSAGE
           setTimeout(()=>{
             nodeResponse.classList.add('invisible');
           },2000)
        }
       })   
       .catch((err)=>{console.log(err)})                
    }
    return (
    <>  
    <title> Login </title>
    <main className="main-content  mt-0">
    <div className="page-header align-items-start min-vh-100" style={{backgroundImage:'url(/img/wallpaper.jpeg)'}}>
      <span className="mask bg-gradient-dark opacity-6"></span>
      <div className="container my-auto">
        <div className="row">
          <div className="col-lg-4 col-md-8  mx-auto mt-4">
            <div className="card z-index-0 fadeIn3 fadeInBottom">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-secondary shadow-primary border-radius-lg py-3 pe-1">
                  <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Inicia Sesion</h4>
                  <div className="row mt-3">
                    <div className="col-2 text-center ms-auto">
                      <a className="btn btn-link px-3"  >
                        <i className="fa fa-facebook text-white text-lg"></i>
                      </a>
                    </div>
                    <div className="col-2 text-center px-1">
                      <a className="btn btn-link px-3"  >
                        <i className="fa fa-github text-white text-lg"></i>
                      </a>
                    </div>
                    <div className="col-2 text-center me-auto">
                      <a className="btn btn-link px-3"  >
                        <i className="fa fa-google text-white text-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <form className="text-start">
                    <label className="form-label">Usuario</label>                                                     
                    <div className="input-group input-group-outline my-3  ">
                      <InputText  
                        onChange={(e) => setUser(e.target.value)}
                        className="form-control " 
                        placeholder="Usuario"
                        
                      />      
                     </div>                     
                      
                    <label className="form-label">Contraseña</label>                 
                    <div className="input-group input-group-outline my-3  ">
                        <InputText  
                          onChange={(e) => setPass(e.target.value)}
                          className="form-control" 
                          placeholder="Contraseña"
                          type="password"
                          
                        />     
                     </div>                                         
                     
                  <div className="text-center">
                    <button onClick={handleLogin} className="btn bg-gradient-primary w-100 my-4 mb-2">Iniciar sesion</button>
                  </div>
                  <p className="mt-4 text-sm text-center">                    
                    <a  id="message" className="  text-primary text-gradient font-weight-bold"> { message } </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
    </main>

    </>
  )
}
