import React from 'react'
import "./App.css"
import {RouterProvider} from "react-router"
import {router} from "./app.routes.jsx"
import { useAuth } from '../features/auth/hooks/useAuth.js';
import { useEffect } from 'react';
const App = () => {
  const {handleCurrentUser} = useAuth();

  useEffect(() =>{
    handleCurrentUser();
  },[]);
  return (
    <RouterProvider router ={router}/>
  )
}

export default App