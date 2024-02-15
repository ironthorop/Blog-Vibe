import React, { useContext, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { TextField, Button, Grid , styled, Box, Typography} from '@mui/material';
import { DataContext } from '../context/DataProvider';
import logo from "../../assest/newLogo.png";
import darklogo from "../../assest/darklogo3.png";



const Container = styled(Box)(({ theme }) => ({
  paddingTop: '100px',
  paddingLeft: '150px',
  paddingRight: '150px',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  height: '100vh',
  display: 'flex',

 
  [theme.breakpoints.down('md')]: {
   paddingTop:  '50px',
   paddingLeft: '15px',
   paddingRight: '15px',
   flexDirection: 'column'


  
  },
}));


const StyledButton = styled(Button)`
  text-transform: none;
  background: black;
  color: #fff;
  &:hover{
    background:#232b4d;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  }
`;

const Image = styled('img')(({ theme }) => ({

  marginLeft: '50px',
  marginTop: '20px',
  width: '450px',
  [theme.breakpoints.down('md')]: {
 
    marginLeft: '0px',
    width: '350px',
  },
}));

function App() {
  const form = useRef();
 const {mode} =  useContext(DataContext);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_8mimbc4', 'template_7stf43v', form.current, 'xlMlRfrP3inyd0PZn')
      .then((result) => {
          console.log(result.text);
          console.log("message sent")
          e.target.reset();
      }, (error) => {
          console.log(error.text);
      });
  };



  return (
    <Container style={{backgroundColor: `${mode}`}}>
    <form ref={form} onSubmit={sendEmail}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField style={{color: 'black'}} label="Enter Your Name" variant="outlined" fullWidth name="user_name" />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Your Email" variant="outlined" fullWidth name="user_email" />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          name="message"
        />
      </Grid>
      <Grid item xs={12}>
        <StyledButton type="submit" variant="contained"  fullWidth>
          Send Message
        </StyledButton>
      </Grid>
    </Grid>
  </form>

  { (mode === 'white') ? 
  <Image className="img" src={logo} alt="login" />
  : 
  <Box style={{display: 'flex', flexDirection: 'column'}}>
  <Image className="img" src={darklogo} alt="login" />
  <Typography style={{ marginLeft: '50px',  marginBottom: '4px', textAlign: 'center',fontSize: '15px', fontWeight: '500', color: 'black', letterSpacing: '2px', textTransform: 'uppercase'}}>Uniting words Igniting Vibes</Typography>
  </Box>
}
      </Container>
  );
}

export default App;
