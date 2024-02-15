import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import logo from "../../assest/newLogo.png";
import darklogo from "../../assest/darklogo3.png";

import React, { useContext } from 'react'
import { DataContext } from '../context/DataProvider';


const Image = styled("img")({
  width: 400,
  margin: "auto",
});

// const Heading = styled(Typography)`
// font-size : 70px;
// color: #FFFF;
// line-height: 1;
// `;

// const SubHeading = styled(Typography)`
// font-size: 20px;
// background : #FFFFFFF;
// `;



const Banner = () => {
  const {mode} = useContext(DataContext);
  return (
  <>
    {(mode === 'white') ? 
    <Image className="img" src={logo} alt="login" />
    : 
    <>
    <Image className="img" src={darklogo} alt="login" />
    <Typography style={{textAlign: 'center',fontSize: '15px', fontWeight: '500', color: 'black', letterSpacing: '2px', textTransform: 'uppercase'}}>Uniting words Igniting Vibes</Typography>
    </>
  }
  </>
  )
}

export default Banner