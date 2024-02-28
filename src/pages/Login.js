import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card } from '@mui/material';
import EmployeeService from "../services/Employee";
import Copyright from './components/Copyright';
import SnackBar from './components/SnackBar';

const defaultTheme = createTheme();

export default function Login() {
  
  const[message, setMessage] = React.useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let user = {
      username: data.get('username'),
      password: data.get('password'),
    };
    EmployeeService.authenticate(user).then(res => {
      if(res.data !== null && res.data !== "") {
        localStorage.setItem("user", JSON.stringify(res.data))
        window.location.href="/main"
      } else {
        setMessage("error");
      }
    })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
              Reyavaya Technologies Login
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: '#3186d4' }}>
              <LockOutlinedIcon />
            </Avatar>
            {message === 'error' ? <SnackBar type={"error"} message={"Login failed! Check username or password"} open={true}/> : null}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="username"
                id="username"
                name="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type='password'
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
      </Grid>     
    </ThemeProvider>
  );
}