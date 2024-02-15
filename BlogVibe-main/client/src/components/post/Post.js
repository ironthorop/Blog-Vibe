import { Box, Typography, styled } from "@mui/material";
import { addElippsis } from "../../utils/common-utils";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";


const Container = styled(Box)`
border: 1px solid #d3cede;
border-radius: 10px;
margin: 10px;
margin-left: 10px;
margin-bottom: 10px;
height: 350px;
display: flex;
transition: .5s;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
flex-direction: column;
align-items: center;
& > p {
    padding : 0 5px 5px 5px;   
}
&:hover{
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
}
`;

const Image = styled('img')({
width: '100%',
borderRadius: "10px 10px 0 0 ",
objectFit: "cover",
height: 150
});

const Text = styled(Typography)`
color: #878787;
font-size: 12px;
`;

const Heading = styled(Typography)`
  font-size : 18px;
  font-weight: 600;
`;

const Detail = styled(Typography)`
  font-size:14px;
  word-break: break-word;
`;

const Post = ({post})=>{

  const {mode} = useContext(DataContext);
  const url = (post.picture) ? post.picture : "https://puducherry-dt.gov.in/wp-content/themes/district-theme-2/images/blank.jpg"
    return(
      <div>
      {(mode === 'white') ?
   <Container style={{backgroundColor: 'white', border: '1px solid black'}}>
    <Image  src={url} alt="blog" />
    <Text>{post.categories}</Text>
    <Heading  style={{fontWeight: '600', fontSize: '20px'}}>{addElippsis(post.title, 30)}</Heading>
    <Detail>{post.username}</Detail>
    <Typography>{addElippsis(post.description, 150)}</Typography>
   </Container>
  :
  <Container style={{backgroundColor: '#23395d', border: '1px solid black'}}>
  <Image  src={url} alt="blog" />
  <Text style={{fontWeight: '600' , color: '#cccccc'}}>{post.categories}</Text>
  <Heading  style={{fontWeight: '600', fontSize: '20px' , color: 'black'}}>{addElippsis(post.title, 30)}</Heading>
  <Detail  style={{fontWeight: '600' , color: 'black'}}>{post.username}</Detail>
  <Typography  style={{fontWeight: '400' , color: 'black'}}>{addElippsis(post.description, 150)}</Typography>
 </Container>
  
    }
   </div>
    )
}
export default Post;