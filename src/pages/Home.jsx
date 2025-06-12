import React from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Grid, Divider } from '@mui/material';

function Home() {
  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)' }}>
            <CardContent>
              <Typography variant="h3" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
                LicitaSeguro
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Transparencia y acceso a la información pública en Chile
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>LicitaSeguro</strong> es una compañía dedicada a facilitar información transparente y accesible sobre licitaciones públicas en Chile.
                Actualmente, no cuenta con un portal propio; todas las búsquedas de licitaciones se realizan directamente en la plataforma de Mercado Público.
                Para mejorar su servicio, LicitaSeguro desea implementar un sitio web público que permita a sus usuarios:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Buscar y consultar licitaciones públicas de manera sencilla y rápida." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Filtrar licitaciones por estado y fechas relevantes." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Visualizar detalles completos de cada licitación disponible." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Buscar proveedores registrados en Mercado Público por RUT." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Acceder a información actualizada y confiable directamente desde la fuente oficial." />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #f3e5f5 0%, #e1f5fe 100%)' }}>
            <CardContent>
              <Typography variant="h5" color="secondary" sx={{ fontWeight: 600 }}>
                Visión
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1">
                Ser la plataforma líder en Chile en acceso y transparencia de información sobre licitaciones públicas,
                promoviendo la igualdad de oportunidades y la confianza en los procesos de contratación del Estado.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ background: 'linear-gradient(135deg, #fffde7 0%, #e3f2fd 100%)' }}>
            <CardContent>
              <Typography variant="h5" color="secondary" sx={{ fontWeight: 600 }}>
                Misión
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1">
                Facilitar a ciudadanos y empresas el acceso a información pública de licitaciones,
                entregando herramientas modernas, confiables y fáciles de usar,
                que permitan tomar decisiones informadas y fomentar la transparencia en el mercado público chileno.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          Nuestro objetivo es entregar una experiencia transparente, moderna y eficiente para todos quienes buscan información sobre licitaciones públicas en Chile.
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;