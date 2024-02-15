import styled from '@emotion/styled'
import { AppBar, Toolbar} from '@mui/material'
import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { DataContext } from '../context/DataProvider';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { toast } from 'react-toastify';

const Component = styled(AppBar)`
background: #ffff;
color: #000;

`;

const Container = styled(Toolbar)`
justify-content:center;
margin: 5px;
& > a {
    padding: .5rem;
    color: #000;
    text-decoration:none;
}
`
const Header = () => {
  const {setMode, mode} = useContext(DataContext);
  const navigate = useNavigate();
 
  const notifyLogout = () => {
    toast.success('Logged Out Successfully', {
      position: "top-right",
      autoClose: 2000,
      theme: (mode === 'white') ? 'light' : 'dark',
      });
  }
  const sendMessage = () =>{
           notifyLogout();
           navigate("/login");
           setTimeout(() => {
            window.location.reload(true)
          }, 2800);
  }


  return (

    <Component  style={{backgroundColor: `${mode}`, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
    <div>
    <h1></h1>
    </div>
    <Container>
    <Link to='/'>Home</Link>
    <Link to='/about'>About</Link>
    <Link to='/contact'>Contact</Link>
    <a onClick={sendMessage}>Log Out</a>
    </Container>
    <div >
    {(mode === 'white') ?     <DarkModeIcon  onClick={()=>setMode(prevStyle => (prevStyle === '#23395d' ? 'white' : '#23395d'))} fontSize="large" style={{float: 'right',marginTop: '12px', marginRight: '30px', cursor: 'pointer', color: 'black'}}/> 
    :   <LightModeIcon  onClick={()=>setMode(prevStyle => (prevStyle === '#23395d' ? 'white' : '#23395d'))} fontSize="large" style={{float: 'right', marginTop: '12px', marginRight: '30px', cursor: 'pointer', color: 'black'}}/>}
    </div>
    </Component>
 
  )
}

export default Header