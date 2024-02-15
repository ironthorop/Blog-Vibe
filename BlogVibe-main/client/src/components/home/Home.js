import React, { useContext } from 'react'
import Banner from '../banner/Banner'
import Categories from './Categories'
import { Grid } from '@mui/material'
import Posts from '../post/Posts'
import { DataContext } from '../context/DataProvider'


const Home = () => {
  const {mode} =  useContext(DataContext);

  
  
  return (
    <div  style={{marginTop: "60px", backgroundColor: `${mode}`}}>
   
   <Grid container>
   <Grid item lg={2} sm={3} md={2} xs={1}>
   <div style={{position: "fixed"}}><Categories /></div>
   </Grid>
   <Grid container item lg={10} md={9} sm={9} xs={12}>
    <div style={{display: "flex", flexDirection: "column"}}>
    <div style={{textAlign : "center"}}>
    <Banner/>
    </div>
    <div style={{marginTop: "40px"}} ><Posts/></div>
    </div>
   </Grid>
   </Grid>
  
    </div>
  )
}

export default Home