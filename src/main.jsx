import React from 'react'
import ReactDOM from 'react-dom/client'
// ?  MODULOS  PAGINAS
import { Login } from './components/Login.jsx'
import { Home } from './components/Home.jsx'
import { Index } from './components/Index.jsx'
import {Create} from './components/Create.jsx'
import { Category} from './components/Category.jsx'
import {User} from './components/User.jsx'
import {MoreVent} from './components/MoreVent.jsx'
// ROUTES
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
 
const router = createBrowserRouter([
  { 
    path: "/login",
    element: <Login/> ,
  }, 
  { 
    path: "/home",
    element: <Home/>,
  },
  { 
    path: "/",
    element: <Index/>,
  },
  { 
    path: "/create",
    element: <Create/>,
  },
  { 
    path: "/category",
    element: <Category/>,
  },
  { 
    path: "/user",
    element: <User/>,
  },
  { 
    path: "/morevent",
    element: <MoreVent/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router}/>
  </React.StrictMode>
);
