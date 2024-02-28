import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import StorefrontIcon from '@mui/icons-material/Storefront';;

export default function NavBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <StorefrontIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/main"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Reyavaya Technologies
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <Button
              key={'main'}
              onClick={()=>window.location.href="/main"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {'Home'}
            </Button>
            <Button
              key={'product'}
              onClick={()=>window.location.href="/product"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {'Poduct'}
            </Button>
            <Button
              key={'brands'}
              onClick={()=>window.location.href="/viewBrand"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {'Brands'}
            </Button>
            <Button
              key={'suppliers'}
              onClick={()=>window.location.href="/suppliers"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {'Suppliers'}
            </Button>
            <Button
              key={'stock'}
              onClick={()=>window.location.href="/stock"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {'Stock'}
            </Button>
            <Button
              key={'cart'}
              onClick={()=>window.location.href="/viewcart"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {'cart'}
            </Button>
          </Box>
          <StorefrontIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Reyavaya
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button
              key={'main'}
              onClick={()=>window.location.href="/main"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {'Home'}
            </Button>
            <Button
              key={'product'}
              onClick={()=>window.location.href="/product"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {'Poduct'}
            </Button>
            <Button
              key={'brands'}
              onClick={()=>window.location.href="/viewBrand"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {'Brands'}
            </Button>
            <Button
              key={'suppliers'}
              onClick={()=>window.location.href="/suppliers"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {'Suppliers'}
            </Button>
            <Button
              key={'stock'}
              onClick={()=>window.location.href="/stock"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {'Stock'}
            </Button>
            <Button
              key={'cart'}
              onClick={()=>window.location.href="/viewcart"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {'Cart'}
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={'profile'} onClick={()=>window.location.href="/signup"}>
                  <Typography textAlign="center">{'Profile'}</Typography>
                </MenuItem>
              <MenuItem key={'logout'} onClick={()=>{
                  localStorage.removeItem("user");
                  localStorage.removeItem("cart")
                  window.location.href="/"
                }}>
                <Typography textAlign="center">{'Logout'}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
