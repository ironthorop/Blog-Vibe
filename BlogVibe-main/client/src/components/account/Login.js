import React, { useState, useContext, useEffect } from "react";
import { Box, TextField, Button, Typography, styled} from "@mui/material";
import logo from "../../assest/newLogo.png";
import darklogo from "../../assest/darklogo3.png";
import { API } from "../../service/api.js";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { DataContext } from "../context/DataProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Component = styled(Box)(({ theme }) => ({
  width: '400px',
  margin: 'auto',
  height: '100vh',
  paddingTop: "30px",
  boxShadow: '5px 2px 5px 2px rgb(0 0 0/ 0.6)',
  [theme.breakpoints.down('md')]: {
    boxShadow: 'none',
  },
}));
;
const Image = styled("img")({
  width: 400,
  margin: "auto",
  marginRight: "30px",
  display: "flex",
  padding: "20px 0 0",
});
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  
  flex: 1;
  flex-direction: column;
  & > div,
  & > button {
    margin-top: 20px;
  }
`;

const TextFiel = styled(TextField)`
  &:focus {
   background-color: none;
  }
`;
const LoginButton = styled(Button)`
  text-transform: none;
  background: black;
  color: #fff;
  &:hover{
    background:#232b4d;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  }
`;

const LoginButton2 = styled(Button)`
  text-transform: none;
  background: black;
  color: #fff;
  &:hover{
    background: #485cb0;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  }
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: transparent;
  color: black;
  font-size: 15px;
  font-weight: 600;
  height: 40px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;



// const Error = styled(Typography)`
// font-size:10px;
// color:#ff6161;
// line-height:0;
// margin-top: 10px;
// font-weight: 600;

// `;


const Text = styled(Typography)`
  color: #878787;
`;


const signupInitialValues = {
  name : '',
  username: '',
  password: ''
}
const loginInitialValues = {
  username: '',
  password: ''
}
 



const Login = ({isUserAuthenticated}) => {
  const [account, toggleAccount] = useState("login");
  const [signup , setSignup] = useState(signupInitialValues);
  const [login , setLogin] = useState(loginInitialValues);
  const [error, setError] = useState('');

  const {setAccount,mode, setMode} = useContext(DataContext);
  
  const location = useLocation();



  useEffect(() => {
    isUserAuthenticated(true);
  }, [isUserAuthenticated]);
  
  const navigate = useNavigate();
  const toggleSignup = ()=>{
    account === "login" ?
    toggleAccount("signup") 
    : toggleAccount('login');
  }


  const notifySignup = () => {
    toast.success('Saved Details Successfully', {
      position: "top-right",
      autoClose: 2000,
      theme: (mode == 'white') ? 'light' : 'dark',
      });
   }
   const notifyunSignup = () => {
    toast.error("SignUp Failed {try with another username}", {
      position: "top-right",
      autoClose: 2000,
      theme: (mode == 'white') ? 'light' : 'dark',
      });
  }
  
  const notifyLogin = () => {
    toast.success('Logged in Successfully', {
      position: "top-center",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
transitionL: 'zoom',
draggable: true,
progress: undefined,
      theme: (mode == 'white') ? 'light' : 'dark',
      });
  }
  const notifyLoginFailed = () => {
    toast.error("Login Failed", {
      position: "top-right",
      autoClose: 2000,
      theme: (mode == 'white') ? 'light' : 'dark',
      });
  }

  const onInputChange = (e)=>{
    setError('');
   setSignup({ ...signup , [e.target.name]: e.target.value});
  }
  const onValueChange = (e)=>{

    setLogin({ ...login, [e.target.name]: e.target.value})
  }
  const loginUser = async () => {
    try {
      let response = await API.userLogin(login);
  
      if (response.isSuccess) {
        notifyLogin();
         // Show toast notification for successful login
        setError('');
        sessionStorage.setItem('accessToken', `Bearer ${response.data.accessesToken}`);
        sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
        setAccount({ username: response.data.username, name: response.data.name });
        navigate('/');
     
      } else {
        setError('An error occurred during login. Please try again later.');
        console.log("Error:", response.message);
      }
    } catch (error) {
      notifyLoginFailed();
      setError('An error occurred during login. Please try again later.');
      console.error("Error during login:", error);
      setTimeout(() => {
        window.location.reload(true)
      }, 2800);
      
    }
  };
  
  
  const signUpUser = async () => {
    try {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            notifySignup();
            setError('');
            setSignup(signupInitialValues);
            toggleAccount("login");
        } else {
            setError("Something went wrong. Please try again later.");
        }
    } catch (error) {
       notifyunSignup();
        setError("An error occurred while signing up. Please try again later.");
    }
};

  return (
    <Component style={{backgroundColor: `${mode}`}}  >
    {(mode === 'white') ?     <DarkModeIcon  onClick={()=>setMode(prevStyle => (prevStyle === '#23395d' ? 'white' : '#23395d'))} fontSize="large" style={{float: 'right', marginRight: '30px', cursor: 'pointer', color: 'black'}}/> 
  :   <LightModeIcon  onClick={()=>setMode(prevStyle => (prevStyle === '#23395d' ? 'white' : '#23395d'))} fontSize="large" style={{float: 'right', marginRight: '30px', cursor: 'pointer', color: 'black'}}/>}

      <Box>
        {(mode === 'white') ? 
        <Image className="img" src={logo} alt="login" />
        : 
        <>
        <Image className="img" src={darklogo} alt="login" />
        <Typography style={{   marginBottom: '4px', textAlign: 'center',fontSize: '15px', fontWeight: '500', color: 'black', letterSpacing: '2px', textTransform: 'uppercase'}}>Uniting words Igniting Vibes</Typography>
        </>
      }
        
        {account === "login" ? (
          <Wrapper>
            <TextFiel variant="standard" name="username" value={login.username} onChange={(e)=>onValueChange(e)} label="Enter username" />
            <TextFiel variant="standard"  name="password" value={login.password} onChange={(e)=>onValueChange(e)} label="Enter password" />
            <LoginButton variant="contained" onClick={()=>loginUser()}>Login</LoginButton>
            <Text style={{ textAlign: "center", marginTop: "10px", color: "black" }}>Or</Text>
            <SignupButton   className="btn" onClick={()=>toggleSignup()}>Create an Account</SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextFiel variant="standard" name="name" value={signup.name} onChange={(e)=>onInputChange(e)} label="Enter Name" />
            <TextFiel variant="standard" name="username" value={signup.username} onChange={(e)=>onInputChange(e)} label="Enter username" />
            <TextFiel variant="standard" name="password" value={signup.password} onChange={(e)=>onInputChange(e)} label="Enter password" />

            { error && <Typography>{error}</Typography>}
            <LoginButton onClick={()=>signUpUser()} variant="contained">SignUp</LoginButton>
            <Text style={{ textAlign: "center", marginTop: "10px", color: "black" }}>Or</Text>
            <SignupButton onClick={()=>toggleSignup()}>Already have an Account</SignupButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
