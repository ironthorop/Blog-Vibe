import { Box, Button, FormControl, InputBase, TextareaAutosize , styled} from '@mui/material'
import React, { useState , useEffect, useContext } from 'react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import uploadimg from '../../assest/up.gif'
import {useLocation , useNavigate } from 'react-router-dom';
import {DataContext} from '../context/DataProvider'
import {API} from '../../service/api'
import { toast } from 'react-toastify';



const Container =  styled(Box)(({ theme }) => ({
  padding: '150px 80px',
  height: '100vh',
  [theme.breakpoints.down('md')]: {
   
      padding: '50px 50px'
  
      
  },
  [theme.breakpoints.down('sm')]: {

    padding: '50px 10px'

}

}));

const Image = styled('img')(({ theme }) => ({
  width: '70%',
  height: '60vh',

  

  [theme.breakpoints.down('md')]: {
      height: '45vh'
      
  },
  [theme.breakpoints.down('sm')]: {
    height: '40vh'
}

}));



const StyledFormControl = styled(FormControl)`
margin-top: 10px;
display: flex;
flex-direction: row;
`;

const InputField = styled(InputBase)`
flex: 1;
margin: 0 30px;
`;

const Icon = styled(AddToPhotosIcon)`
   height: 50px;
   width: 50px;
   color: black;
`;

const TextArea = styled(TextareaAutosize)`
width: 100%;
margin-top: 50px;
font-size: 18px;
border: none;
color: black;

&:focus-visible {
outline: none;
}
`;

const StyledButton = styled(Button)`
  text-transform: none;
  height: 40px;
  background: black;
  color: #fff;
  &:hover{
    background:#454545;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  }
`;

const InitialPost = {
  title: '',
  description:  '',
  picture: '',
  username: '',
  categories: '',
  createdDate: new Date()

}


const CreatePost = () => {
  const [post, setPost] = useState(InitialPost);
  const [file, setFile] = useState('');
  const {account,mode} = useContext(DataContext)
  const location = useLocation();
  const navigate = useNavigate();
  const url = post.picture ? post.picture : uploadimg;
  
  useEffect(() => {
    const getImage = async () => { 
        if(file) {
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file); 
            const response = await API.uploadFile(data);
            post.picture = response.data;
            
        }
    }
    getImage();
    post.categories = location.search?.split('=')[1] || 'All';
    post.username = account.username;
}, [file])

  const handleChange = (e)=>{

    setPost({  ...post , [e.target.name]: e.target.value})
  }
  const notifyPost = () => {
    toast.success('Commented Successfully', {
      position: "bottom-right",
      autoClose: 2000,
      theme: (mode == 'white') ? 'light' : 'dark',
      });
  }

  const savePost =  async() =>{
   let response = await API.createPost(post);
   if(response.isSuccess){
    notifyPost();
    navigate('/');
   }
  }
  return (
    <Container style={{background: `${mode}`, width: '100%'}}>
    <div style={{width: '100%', textAlign: 'center'}}>
    <Image src={url} alt="banner"/>
    </div>
    <StyledFormControl>
    <label htmlFor='fileInput'>
    <Icon/>
    </label>
    <input type='file'
    id='fileInput'
    style={{display: "none"}}
    onChange={(e) => setFile(e.target.files[0])}
    />

    <InputField placeholder='Title' name='title' onChange={(e) => handleChange(e)}/>
    <StyledButton variant='contained' onClick={()=> savePost()}>Publish</StyledButton>
    </StyledFormControl>
    <TextArea style={{backgroundColor: `${mode}`}}
    minRows={5}
    placeholder='Tell Your Story'
    name='description' onChange={(e) => handleChange(e)}
    />
    </Container>
  )
}

export default CreatePost