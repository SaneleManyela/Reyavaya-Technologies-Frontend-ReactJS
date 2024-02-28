import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import InventoryIcon from '@mui/icons-material/Inventory';

export default function StockNavBar() {
  
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <InventoryIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
            Reyavaya Tech Stock
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
              key={'ViewStock'}
              onClick={()=>window.location.href="/stock"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {'View Stock'}
            </Button>
            <Button
              key={'CreateStock'}
              onClick={()=>window.location.href="/addstock"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {'Create Stock'}
            </Button>
          </Box>
          <InventoryIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
              key={'ViewStock'}
              onClick={()=>window.location.href="/stock"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {'View Stock'}
            </Button>
            <Button
              key={'CreateStock'}
              onClick={()=>window.location.href="/addstock"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {'Create Stock'}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
