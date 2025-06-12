import React, { useState } from "react";
import { Box, Typography, Alert, Button, Card, CardContent, TextField } from "@mui/material";

const API_URL = 'https://api.mercadopublico.cl/servicios/v1/Publico/Empresas/BuscarProveedor';
const API_TICKET = "AC3A098B-4CD0-41AF-81A5-41284248419B";

function Proveedores() {
  const [rut, setRut] = useState("");
  const [proveedor, setProveedor] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const buscarProveedor = async (e) => {
    e.preventDefault();
    setProveedor(null);
    setError("");
    setLoading(true);
    try {
      const url = `${API_URL}?rutempresaproveedor=${encodeURIComponent(rut)}&ticket=${API_TICKET}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("No se pudo conectar a la API");
      const data = await res.json();
      if (data && data.Listado && data.Listado.length > 0) {
        setProveedor(data.Listado[0]);
      } else {
        setError("No se encontró el proveedor para el RUT ingresado.");
      }
    } catch (err) {
      setError("Error al buscar proveedor: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Buscar Proveedor por RUT</Typography>
      <form className="mb-3" onSubmit={buscarProveedor}>
        <TextField
          label="RUT (ej: 12345678-9)"
          value={rut}
          onChange={e => setRut(e.target.value)}
          required
          sx={{ mr: 2, width: 220 }}
          size="small"
        />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </form>
      {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}
      {proveedor && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{proveedor.Nombre}</Typography>
            <Typography variant="body2">RUT: {proveedor.RutProveedor}</Typography>
            <Typography variant="body2">Razón Social: {proveedor.RazonSocial}</Typography>
            <Typography variant="body2">Dirección: {proveedor.Direccion}</Typography>
            <Typography variant="body2">Comuna: {proveedor.Comuna}</Typography>
            <Typography variant="body2">Región: {proveedor.Region}</Typography>
            <Typography variant="body2">Teléfono: {proveedor.Telefono}</Typography>
            <Typography variant="body2">Email: {proveedor.Email}</Typography>
            {/* Agrega más campos según lo que entregue la API */}
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default Proveedores;