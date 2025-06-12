import React, { useState, useEffect } from "react";
import { Box, Typography, Alert, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const API_URL = 'https://api.mercadopublico.cl/servicios/v1/Publico/Empresas/BuscarProveedor';
const API_TICKET = "AC3A098B-4CD0-41AF-81A5-41284248419B";

// Ejemplo de RUTs para mostrar todos (la API no tiene endpoint para "todos", así que puedes mostrar algunos por defecto)
const RUTS_DEMO = [
  "77.653.382-3",
  "76.123.456-7",
  "80.123.456-9"
];

function Proveedores() {
  const [rut, setRut] = useState("");
  const [proveedores, setProveedores] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Mostrar algunos proveedores por defecto al cargar
  useEffect(() => {
    setLoading(true);
    setError("");
    Promise.all(
      RUTS_DEMO.map(rutDemo =>
        fetch(`${API_URL}?rutempresaproveedor=${encodeURIComponent(rutDemo)}&ticket=${API_TICKET}`)
          .then(res => res.ok ? res.json() : null)
          .then(data => (data && data.Listado && data.Listado.length > 0 ? data.Listado[0] : null))
          .catch(() => null)
      )
    ).then(results => {
      setProveedores(results.filter(Boolean));
      setLoading(false);
    });
  }, []);

  const buscarProveedor = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setProveedores([]);
    try {
      const url = `${API_URL}?rutempresaproveedor=${encodeURIComponent(rut)}&ticket=${API_TICKET}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("No se pudo conectar a la API");
      const data = await res.json();
      if (data && data.Listado && data.Listado.length > 0) {
        setProveedores([data.Listado[0]]);
      } else {
        setError("No se encontró el proveedor para el RUT ingresado.");
      }
    } catch (err) {
      setError("Error al buscar proveedor: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Obtener todas las claves posibles para mostrar todas las columnas
  const allKeys = Array.from(
    proveedores.reduce((acc, prov) => {
      Object.keys(prov).forEach(k => acc.add(k));
      return acc;
    }, new Set())
  );

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Proveedores</Typography>
      <form className="mb-3" onSubmit={buscarProveedor}>
        <TextField
          label="Buscar por RUT (ej: 12345678-9)"
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
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {allKeys.length === 0 ? (
                <TableCell>No hay datos para mostrar</TableCell>
              ) : (
                allKeys.map(key => (
                  <TableCell key={key}><b>{key}</b></TableCell>
                ))
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {proveedores.map((prov, idx) => (
              <TableRow key={idx}>
                {allKeys.map(key => (
                  <TableCell key={key}>{prov[key] ?? ""}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Proveedores;