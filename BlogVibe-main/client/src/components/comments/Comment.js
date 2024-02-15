import { Delete } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React , {useContext}from 'react'
import { DataContext } from '../context/DataProvider'
import styled from '@emotion/styled'
import { API } from '../../service/api'
import { toast } from 'react-toastify'



const Component = styled(Box)`

margin-top: 30px;
padding: 10px;

`;
const Container = styled(Box)`

display:flex;
margin-bottom: 5px;

`;

const Name = styled(Typography)`
    font-weight:600;
    font-size: 18px;
    margin-right: 20px
`;

const StyledDate = styled(Typography)`
   color: #878787;
   font-size: 14px;
`;
const DeleteIcon = styled(Delete)`
   margin-left: auto;
`;


const Comment = ({comment, setToggle}) => {
    const {account,mode} = useContext(DataContext);

    const notifyComment = () => {
        toast.success('Commented Deleted Successfully', {
          position: "bottom-right",
          autoClose: 1500,
          theme: (mode == 'white') ? 'light' : 'dark',
          });
      }

    const removeComment = async()=>{
        let response =   await API.deleteComment(comment._id);
        if(response.isSuccess){
            notifyComment();
            setToggle(prevState => !prevState)
        }
    }
  return (
       <Component style={{backgroundColor: `${mode}`}}>
       <Container>
       <Name>{comment.name}</Name>
       <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
       {comment.name === account.username && <DeleteIcon onClick={()=>removeComment()}/> }
       </Container>
       <Box>
        <Typography style={{color: 'black'}}>{comment.comment}</Typography>
       </Box>
       
       </Component>
  )
}

export default Comment