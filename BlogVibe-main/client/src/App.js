import React, {  useState } from "react";
import "./App.css";
import Login from "./components/account/Login";
import DataProvider from "./components/context/DataProvider";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import {BrowserRouter, Routes, Route, Outlet, Navigate} from 'react-router-dom'
import CreatePost from "./components/create/CreatePost";
import DataView from "./components/details/DataView";
import Update from "./components/create/Update";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PrivateRoute = ({isAuthenticated}) => {
 return isAuthenticated ?
  <React.Fragment>
  <Header/>
  <Outlet/>
 </React.Fragment> 
 : <Navigate replace to='/login'/>
}
function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div className="App" >
        <Routes>
            <Route path="/login" element={<Login isUserAuthenticated={isUserAuthenticated}/>} />
            <Route path="/" element = {<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route path="/" element={<Home/>} />
            </Route>

            <Route path="/create" element = {<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route path="/create" element={<CreatePost/>} />
            </Route>
              
            <Route path="/details/:id" element = {<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route path="/details/:id" element={<DataView/>} />
            </Route>

            <Route path="/update/:id" element = {<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route path="/update/:id" element={<Update/>} />
            </Route>

            <Route path="/about" element = {<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route path="/about" element={<About/>} />
            </Route>

            <Route path="/contact" element = {<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route path="/contact" element={<Contact/>} />
            </Route>
        </Routes>
        <ToastContainer/>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
