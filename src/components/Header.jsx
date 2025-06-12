import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import logo from '/src/assets/logo.png';

function Header({ onNavigate }) {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#67d41e' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', mr: 2, cursor: 'pointer' }}
            onClick={() => onNavigate("home")}
          >
            <img src={logo} alt="Logo" style={{ height: 50, marginRight: 10 }} />
            <Typography variant="h6" noWrap>
              LicitaSeguro
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" onClick={() => onNavigate("licitaciones")}>
              Licitaciones
            </Button>
            <Button color="inherit" onClick={() => onNavigate("proveedores")}>
              Buscar Proveedor
            </Button>
            <Button color="inherit" onClick={() => onNavigate("detalleLicitacion")}>
              Ver Detalle Licitación
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
