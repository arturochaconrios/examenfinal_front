import React, { useEffect, useState } from "react";
import { Box, Typography, Alert, Card, CardContent, CircularProgress, Button } from "@mui/material";

const API_BASE = 'https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json';
const API_TICKET = 'AC3A098B-4CD0-41AF-81A5-41284248419B';

function LicitacionDetalle({ codigo, onVolver }) {
  const [detalle, setDetalle] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!codigo) return;
    setLoading(true);
    setError("");
    setDetalle(null);
    const url = `${API_BASE}?codigo=${codigo}&ticket=${API_TICKET}`;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("Error de red o API");
        return res.json();
      })
      .then(data => {
        if (data?.Listado && data.Listado.length > 0) {
          setDetalle(data.Listado[0]);
        } else {
          setError("No se encontró información para la licitación solicitada.");
        }
      })
      .catch(() => setError("No se pudo conectar a la API."))
      .finally(() => setLoading(false));
  }, [codigo]);

  if (!codigo) return <Alert severity="info">No se ha seleccionado ninguna licitación.</Alert>;
  if (loading) return <Box sx={{ textAlign: "center", mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Button variant="outlined" sx={{ mb: 2 }} onClick={onVolver}>Volver</Button>
      {detalle && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {detalle.Nombre}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Código:</strong> {detalle.CodigoExterno}
            </Typography>
            <Typography variant="body2">
              <strong>Estado:</strong> {detalle.Estado}
            </Typography>
            <Typography variant="body2">
              <strong>Fecha de Publicación:</strong> {detalle.FechaPublicacion?.slice(0, 10)}
            </Typography>
            <Typography variant="body2">
              <strong>Fecha de Cierre:</strong> {detalle.FechaCierre?.slice(0, 10)}
            </Typography>
            <Typography variant="body2">
              <strong>Descripción:</strong> {detalle.Descripcion}
            </Typography>
            <Typography variant="body2">
              <strong>Organismo:</strong> {detalle.NombreOrganismo}
            </Typography>
            {/* Agrega más campos según lo que entregue la API */}
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default LicitacionDetalle;