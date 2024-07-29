//? Module for SQL
const mysql = require('mysql');
//?express  
const express = require('express')
const app = express()
app.use(express.json())
//? port if the conexion 
const port = 3000
//? uso cors
const cors = require('cors')
app.use(cors())
//? where is runing my server IN PORT 3000
const fileUpload = require('express-fileupload')
app.use(fileUpload());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
 
})
//? credentials y conexion a BD 
var con = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'intimo'
});
con.connect();

//? API Watsapp of prueba. SEND MESSAGES(YA ESTA SIN USO)
// import WhatsApp from 'whatsapp';

//? consultas a mi API - 

// ==================================================================================================================
app.post('/login', (req, res) => {      
      
      const name = req.body.name;
      const password = req.body.password;        

      con.query("SELECT * FROM login WHERE nombre =  ? AND contrasena = ? ", [name,password],  (err,result) => {
             if (result.length > 0 ) { 
                   //?inicia sesion Todo lo referente a el login con libreria de node COOKIES             
                  res.send(result);
                  
            }else if(name == '' && password == ''){
                  res.send('CAMPOS VACIOS');
                   
            }else {
                  res.send('USUARIO O CONTRASEÑA NO SON VALIDOSS');

             }
      })
  
})
// categorias
app.get('/getCategories', (req, res) => {
      con.query('SELECT * FROM categorias', (err,result)=> {
         if (result.length > 0) {
            res.send(result);
         }else{
            res.send('No se encontraron categorias');
         }         
      }) 

})
app.post('/deleteCategories', (req, res) => {
      var id = req.body.id;       
      con.query('DELETE FROM categorias WHERE id = ?',[id], (err,result)=> {
            if(err){
                  res.send("No se eliminio la categoria");
            }else{
                  res.send("categoria elimninada");
            }
      });       

})
// Este se encarga de subir mi achivo / de manera local / con una libreria de de node.js fileUpload
app.post('/upload',(req,res) => {     
       
      var EDFile = req.files.file ;
      EDFile.mv(`../public/img/products/${EDFile.name}`,err => {
          if(err) return res.send({ message : err })  
          return res.send('File upload')
      })
       
  
})
//Esta funcion se encarga de consultarme todos los productos de la base de datos
app.get('/getProducts', (req, res) => {
       
      con.query('SELECT * FROM  productos', (err,result)=> {
         if (result.length > 0) {
            res.send(result);           
         }else{
            res.send('No se encontraron productos');
         }         
      }) 

})
//esta funcion se encarga de insertar un producto en la base de datos
app.post('/insertProduct', (req, res) => {
      
      var values = [
            req.body.name,
            req.body.description,
            req.body.nameImg,
            req.body.price,
            req.body.category,
            req.body.status,
            req.body.star,
      ]
     console.log(values);
      con.query('INSERT INTO productos (nombre,descripcion,routeImg,precio,categoria_id,estado,estrellas) VALUES(?)',[values], (err,result)=> {
            if (err) {
               res.send('No se insertaron los productos');
             }else{
               res.send('Producto insertado con exito');
            }              
      })
})
// funcion encargada de insertar a la tabla destacados se recibe un id para ello
app.post('/addProductWeb',(req,res) =>{
      var value = req.body.id;
      con.query('INSERT INTO destacados (producto_id) VALUES (?)',[value], (err,result)=>{
            if (err) {
             res.send('No se traslado correctamente');
            }else{
                  res.send('Producto trasladado con exito');
            }
      })
     
})
// funcion encargada de consultar los mas destacados para la web principal y el modulo de moverVent
app.get('/allDestacados',(req,res) =>{
      con.query('SELECT productos.* FROM  destacados INNER JOIN productos ON productos.id = destacados.producto_id', (err,result)=> {
            if (result.length > 0) {
                  res.send(result);           
               }else{
                  res.send('No se encontraron datos en la tabla');
               }             
        })     
})
//funcion encargada de eliminar un destacado con el id que se envia desde el FRONTEND
app.post('/deleteDestac', (req, res) => {
    var idDelete = req.body.id;
    
    con.query('DELETE FROM destacados WHERE producto_id = ?',[idDelete],(err,result) => {
      if(err) {
            res.send('Probemas para eliminar ');      
      }else {
            res.send('Destacado eliminado con exito');
      }
    })
       
})
// INNER JOIN productos ON productos.id = destacados.producto_id
app.get('/editProduct', (req, res) => {
      res.send('editando product');  
       
})
app.get('/deleteProduct', (req, res) => {
      res.send('borarando product');

})
app.post('/addCategory', (req, res) => {
      var values = [
            req.body.category           
      ] 

      con.query('INSERT INTO categorias (nombre) VALUES(?)',[values], (err,result)=> {
            if(err){
                 res.send("No se cargo la categoria");       
            }else{
                  res.send("Categoria guardada correctamente");
            }                 
      })
        
} ) 
app.get('/allUsers', (req, res) => {      
      
      con.query('SELECT * FROM  login', (err,result)=> {
           if(err){
               res.send("No se encontraron usuarios ");   
           }else{
               res.send(result);
           }

      })
} )
app.post('/sendMessage', (req, res) => {
      
      // console.log(req.body);
      var botId = '108272512033994';
      var phoneNbr = '3177680135';
      var bearerToken = 'EAAIsXlDJCmABO3HQtMvrKmDYxzSIcuH7Xwq0dTrOb9kGSFZAhzPx4nCVBu72SR0ZCZCUX9MrBlMYWtPFke9XpetcqKo1B3xSgBRpuIzgel3v2RZBIRf0CpqnYlEVmZABnV1usxHZCIDoJYBydxn8hFUv5Q2nFmNjTHcr8hUtK8osNZAnmmZBw0klxDRiHR2ZCvL8rXC9ULD6kObtV3SLgYRDwnJNsGZAwM3szrYv0ZD';
      var url = 'https://graph.facebook.com/v17.0/' + botId + '/messages';
      const data = {            
            "messaging_product": "whatsapp",
            "to": phoneNbr,
            "type": "template",
            "template": 
            {
                 "name": "request",
                  "language": 
                        {
                          "code": "es"                             
                        },
                  "components": [       
                        {
                              "type": "header",  
                              "parameters": [
                                  {
                                      "type": "image",
                                      "image": { 
                                            "link": "https://sm.starmedica.co/public/img/logotiopo.png",
                                          //   "filename": "LOGO" 
                                      }		                        	
                                  }]
                          },                  
                        {
                              "type": "body",
                              "parameters": [
                                    {
                                    "type": "text",
                                    "text": "Hola Angela para recordar que el dia de mañana 13/12/2023 tienes una cita"
                                    },                            
                              ]
                        }
                  ]
            }
      };

      var postReq = {
            method: 'POST',
            headers: {
                  'Authorization': 'Bearer ' + bearerToken,
                  'Content-Type': 'application/json'
            },
            
            body:JSON.stringify(data),                
            json: true,        
      }

      // USE FETCH TO WHATAPP
      fetch(url, postReq)
      .then(data => { return data.json()})
      .then(res => {console.log(res)})
      .catch(error => console.log(error));
                                                                                                                                                                                                                                    
} )
app.post('/insertUser', (req, res) => {      
     
      var values = [
            req.body.user,
            req.body.password
      ]
      con.query('INSERT INTO login (nombre,contrasena) VALUES (?)',[values], (err,result)=> {        
            if(err){
               res.send("No se inserto el usuario ");   
           }else{
               res.send('Usuario insertado con  exito');
           }

      })
} )     
app.post('/deleteUser', (req, res) => {      
     
      var id = req.body.id;   
      con.query('DELETE FROM login WHERE id = ?', [id], (err,result)=> {
           if(err){
               res.send("No se elimino usuario ");   
           }else{
               res.send("usuario eliminado");
           }

      })
} )
// me busca solo los productos que sean trajes
app.get('/getAllTrajes', (req, res) => {      

      con.query('SELECT * FROM  productos WHERE categoria_id = 1', (err,result)=> {
          if( err ){
            res.send("No se encontrarron productos porpulares ");           
          }else{
            res.send(result);  
             
          }
      })
} )


 