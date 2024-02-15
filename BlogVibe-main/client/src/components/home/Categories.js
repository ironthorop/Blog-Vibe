import { Button, Table, TableBody, TableCell, TableHead, TableRow, styled ,ToggleButton} from '@mui/material'
import React , {useContext, useState} from 'react'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import { categories } from '../../constants/data'
import { Link , useSearchParams} from 'react-router-dom';
import { DataContext } from '../context/DataProvider';


const StyledTable = styled(Table)`
border: 1px solid rgba(224,224 , 224, 1);
border: none;
`;
const StyledTable2 = styled(Table)`
border: none;
background-color: transparent;

`;

const StyledButton = styled(Button)`
margin:20px;
width:85%;
background: black;
transition: 0.5s;
color: #fff;
&:hover{
  background-color: #232b4d;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
`;

const StyledButton1 = styled(ToggleButton)`
margin:20px;
width:60%;
background: white;
color: black;
border: 2px solid black;
font-weight: 700;
`;

const StyledLink = styled(Link)`
 text-decoration: none;
 color: black;
`;

const StyledLink2 = styled(Link)`
 text-decoration: none;
 color: black;
 font-size:20px;
 font-weight: 500;
`;


const Categories = () => {
  const [searchParams] = useSearchParams();
  const [toggle,setToggle] = useState('none');
  const category = searchParams.get('category');
   const {mode} =  useContext(DataContext)


  return (
    
    
    <>
    <h4 className='category' style={{margin: '10px', fontWeight: '500'}}>CATEGORIES</h4>
    <div className='category' >
    <StyledTable>
    <TableHead>
    <TableRow>
    <TableCell style={{borderBottom: 'none', }}>
    <StyledLink to='/'  >ALL</StyledLink>
    </TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
    { 
      
      categories.map((category , index) => (
        <TableRow key={index}>
        <TableCell style={{borderBottom: 'none'}} >
        <StyledLink style={{textTransform: 'uppercase'}} to={`/?category=${category.type}`}>
        {category.type}
        </StyledLink>
        </TableCell>
        </TableRow>
      ))
    }
  
    </TableBody>
    </StyledTable>
    <StyledLink  to={`/create?category=${category || ''}`} style={{textDecoration: "none"}}>
    <StyledButton variant='contained'>Create Blog</StyledButton>
    </StyledLink>
    </div>

    <div  className='category-3'>
    <div style={{display: `${toggle}`, backgroundColor: `${mode}`}}  >
   
    <StyledTable2>
    <TableHead>
    <TableRow>
    <TableCell style={{borderBottom: 'none', textTransform: 'uppercase', fontWeight: '500', fontSize: '20px'}}>
    <StyledLink to='/'  > All Categories</StyledLink>
    </TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
    { 
      
      categories.map((category , index) => (
        <TableRow key={index}>
        <TableCell style={{borderBottom: 'none'}} >
        <StyledLink2 to={`/?category=${category.type}`}>
        {category.type}
        </StyledLink2>
        </TableCell>
        </TableRow>
      ))
    }
  
    </TableBody>
    </StyledTable2>
    <StyledLink to={`/create?category=${category || ''}`} style={{textDecoration: "none"}}>
    <StyledButton variant='contained'>Create Blog</StyledButton>
    </StyledLink>
    </div>
    <div  className='category-2'>
    <StyledButton1   color="primary"  style={{backgroundColor: `${mode}`}} onClick={()=>setToggle(prevStyle => (prevStyle === 'none' ? 'block' : 'none'))} variant='contained' value="left" key="left">
    <FormatAlignLeftIcon />
    </StyledButton1>
    </div>
    </div>


    
  

    </>


  )
}

export default Categories