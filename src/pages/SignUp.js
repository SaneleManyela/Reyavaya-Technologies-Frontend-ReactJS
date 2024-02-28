import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card } from '@mui/material';
import Employee from '../services/Employee';
import Copyright from './components/Copyright';
import EmployeeService from "../services/Employee";
import NavBar from './components/NavBar';
import SnackBar from './components/SnackBar';
import validation from '../validation/validation';

const defaultTheme = createTheme();

export default function SignUp() {
  const[message, setMessage] = React.useState("");
  const [role, setRole] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [emailVaid, setEmailValid] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [contactNo, setContactNo] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  
  React.useEffect(()=>{
    loadUser();
  },[])
  
  const loadUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user !== null) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setAddress(user.address);
      setContactNo(user.contactNo);
      setUsername(user.username);
      setPassword(user.password);
      setRole(user.role);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = JSON.parse(localStorage.getItem("user"));
    const data = new FormData(event.currentTarget);

    let user = {
      id: 0,
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      address: data.get("address"),
      contactNo: data.get("contactNo"),
      username: data.get("username"),
      password: data.get("password"),
      role: data.get("role")
    };
        
    console.log(user)

    if(localStorage.getItem("user") == null) {
      EmployeeService.findEmployeeByUsername(user).then(res => {
        if(res.status === 200 && res.data !== "") {
          setMessage("warning");
        } else {
          Employee.signup(user).then(res => {
            console.log("Sign up",res.data);
            if(res.status === 200) {
              localStorage.setItem("user", JSON.stringify(res.data));
              window.location.href="/main"
            } else {
              setMessage("error");
            }
          })
        } 
      })
    } else {
      user.id = id.id;
      EmployeeService.findEmployeeByUsername(user).then(res => {
        if(res.status === 200 && res.data.id !== user.id) {
          setMessage("warning");
        } else {
          Employee.update(user).then(res => {
            if(res.status === 200) {
              localStorage.setItem("user", JSON.stringify(res.data));
              window.location.href="/main";
            } else {
              setMessage("error");
            }
          })
        } 
      })
    }
  };
  
  return (
    <ThemeProvider theme={defaultTheme}>
      {localStorage.getItem("user") !== null ? <NavBar /> : null}
      <Grid item xs={12} sm={8} justifyContent={"center"} component={Card} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              {localStorage.getItem("user") == null ? "Sign Up" : "Profile" }
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: '#3186d4' }}>
              <LockOutlinedIcon />
            </Avatar>
            {localStorage.getItem("user") == null ?
              (message === "warning" ? <SnackBar type={"warning"} message={"username exists"} open={true}/>
                : (message === "error" ? <SnackBar type={"error"} message={"Sign up failed!"} open={true}/> : null))
             : (message === "error" ? <SnackBar type={"error"} message={"Updating profile failed"} open={true}/> : null)
            }
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="firstName"
                name="firstName"
                autoFocus
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="lastName"
                id="lastName"
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
              />
              {emailVaid}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="email"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                onMouseOut={(e)=>{setEmailValid(e.target.value)}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label="address"
                name="address"
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="contactNo"
                label="contactNo"
                name="contactNo"
                value={contactNo}
                onChange={(e)=>setContactNo(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="password"
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel id="role">Roles</InputLabel>
                <Select
                  id="role"
                  label="role"
                  name="role"
                  value={role}
                  onChange={(e)=>setRole(e.target.value)}
                >
                    <MenuItem value={'user'}>user</MenuItem>
                    <MenuItem value={'admin'}>admin</MenuItem>
                </Select>
            </FormControl>
            {localStorage.getItem("user") == null ? (<Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleSubmit}
              >
                Sign In
              </Button>) : 
              (<Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleSubmit}
              >
                Update
              </Button>)}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
      </Grid>     
    </ThemeProvider>
  );
}