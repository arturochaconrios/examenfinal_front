import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Licitaciones from './components/Licitaciones';
import Proveedores from './components/Proveedores';
import LicitacionDetalle from './components/LicitacionDetalle';

function App() {
  const [view, setView] = useState('home');
  const [codigoDetalle, setCodigoDetalle] = useState('');

  const handleNavigate = (nextView, codigo = '') => {
    setView(nextView);
    if (nextView === 'detalleLicitacion') {
      setCodigoDetalle(codigo || '1057539-17LR25'); // Código por defecto o el que envíes
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '64px',
        backgroundColor: '#fff',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Header onNavigate={handleNavigate} />
      <div className="container my-4">
        {view === 'home' && <Home />}
        {view === 'licitaciones' && <Licitaciones />}
        {view === 'proveedores' && <Proveedores />}
        {view === 'detalleLicitacion' && (
          <LicitacionDetalle
            codigo={codigoDetalle}
            onVolver={() => setView('home')}
          />
        )}
      </div>
      <Footer />
      <Button color="inherit" onClick={() => handleNavigate("detalleLicitacion", "1057539-17LR25")}>
        Ver Detalle Licitación
      </Button>
    </Box>
  );
}

export default App;
