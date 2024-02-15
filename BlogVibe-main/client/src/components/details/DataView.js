import { Box, Typography, styled } from '@mui/material'
import React, {useEffect, useState, useContext} from 'react'
import { useParams, Link , useNavigate} from 'react-router-dom'
import { API } from '../../service/api'
import loadingImage from '../../assest/loading.png'
import {Edit, Delete} from '@mui/icons-material'
import { DataContext } from '../context/DataProvider'
import Comments from '../comments/Comments'
import { toast } from 'react-toastify'





const Container =  styled(Box)(({ theme }) => ({

  padding: '80px 10rem',
  backgroundColor: 'black',
  

  [theme.breakpoints.down('md')]: {
      margin: '0',
      padding: '0 70px ',
      
  },
  [theme.breakpoints.down('sm')]: {
    margin: '0',
    padding: '0 10px',
}

}));

const ImageBox = styled(Box)({
  width: '100%',
  textAlign: 'center',
})

const Image = styled('img')(({ theme }) => ({
  width: '100%',
  height: '60vh',

[theme.breakpoints.down('sm')]: {
  width: '100%',
  height: '40vh',
},
}));

const Title = styled(Typography)`
font-size: 38px;
font-weight: 600;
text-align: center;
margin : 50px 0 10px 0;
word-break: break-word;
`;

const EditIcon = styled(Edit)`
margin: 10px;
height: 50px;
width: 50px;
padding: 5px;
border : 1px solid #878787;
border-radius: 50%;
`;
const DeleteIcon = styled(Delete)`
margin: 10px;
padding: 5px;
height: 50px;
width: 50px;
border : 1px solid #878787;
border-radius: 50%;
cursor: pointer;
color: error;
`;
const Author = styled(Box)`
color: #878787;
margin: 20px 0;
display: flex;

`;

const Desc = styled(Typography)`
word-break: break-word;
`;
const DataView = () => {
    const [post, setPost] = useState({});
    const {account,mode} = useContext(DataContext);

    const {id} = useParams();
    const navigate = useNavigate();
    const url =post.picture? post.picture : loadingImage
    useEffect(()=>{
        const fetchData = async()=>{
          let response = await API.getPostById(id);
          if(response.isSuccess){
            setPost(response.data);
          }
        }
        fetchData();
    }, [])

    const notifyDelete = () => {
      toast.success('Post Deleted Successfully', {
        position: "bottom-right",
        autoClose: 2000,
        theme: (mode === 'white') ? 'light' : 'dark',
        });
    }

    const deleteBlog = async ()=>{
      let response = await API.deletePost(post._id);
      if(response.isSuccess){
          notifyDelete();
           navigate('/');
      }
    }
  return (
   <Container style={{backgroundColor: `${mode}`}}>
   <ImageBox>
   <Image src={url}/>
   </ImageBox>
   <Box style= {{float: "right"}}>
   {
     account.username === post.username &&
    <>
    <Link to={`/update/${post._id}`}>
    <EditIcon color='primary'/>
    </Link>
    <DeleteIcon color='error' onClick={()=> deleteBlog()}/>
    </>
   }
   </Box>
   <Title style={{color: 'black'}}> {post.title}</Title>
   
   <Author>
   <Typography>Author : <Box component="span" style={{fontWeight: 600}}>{post.username}</Box></Typography>
   <Typography style={{marginLeft: "auto"}}>{new Date(post.createdDate).toDateString() }</Typography>
   </Author>
   <Desc style={{color: 'black'}}>{post.description}</Desc>

   <Comments post = {post}/>
   
   </Container>
  )
}

export default DataView