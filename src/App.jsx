import React, { useState } from 'react';
import { Box } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Licitaciones from './components/Licitaciones';
import Proveedores from './components/Proveedores';

function App() {
  const [view, setView] = useState('home');

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
      <Header onNavigate={setView} />
      <div className="container my-4">
        {view === 'home' && <Home />}
        {view === 'licitaciones' && <Licitaciones />}
        {view === 'proveedores' && <Proveedores />}
      </div>
      <Footer />
    </Box>
  );
}

export default App;
