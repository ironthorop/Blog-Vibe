

import React, {useEffect, useState} from 'react'
import {API} from '../../service/api'
import { Box, Grid } from '@mui/material';
import Post from './Post';
import {Link, useSearchParams} from 'react-router-dom'


const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [searchParams] = useSearchParams();
   

    const category = searchParams.get('category');

    useEffect(()=>{
          const fetchData = async ()=>{
            let response =   await API.getAllPosts({category : category || ''});
            if(response.isSuccess){
                setPosts(response.data);
            }
          }
          fetchData(); 
    }, [category])
  return (
  
   <div className='row'>

   {posts && posts.length > 0 ? posts.toReversed().map(post => (
    
   <div key={post._id} className='col-lg-6  col-xl-4 col-md-6'>
    <Grid  item lg={12} md={12} sm={12} xs={12}>
    <Link to= {`details/${post._id}`} style={{textDecoration: "none" , color: "inherit"}}>
    <Post post = {post}/>
    </Link>
    </Grid>
    </div>

   )) : <Box style = {{color : '#878787' , margin: '30px 80px', fontSize: 18}}> No Data available to display </Box>}

   </div>

  )
}

export default Posts