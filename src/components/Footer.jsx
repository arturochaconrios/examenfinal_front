import React from 'react';

// Footer component
const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '1rem', background: '#f1f1f1', marginTop: 'auto' }}>
      <span>© {new Date().getFullYear()} Antigüedades Sthandier</span>
    </footer>
  );
};

export default Footer;
