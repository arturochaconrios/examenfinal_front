import React, { useEffect, useState } from "react";
import { Box, Typography, Alert, Card, CardContent } from "@mui/material";

const API_BASE = 'https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json';
const API_TICKET = 'AC3A098B-4CD0-41AF-81A5-41284248419B';

function estadoTexto(codigo) {
  switch (codigo) {
    case 5: return "Cerrada";
    case 6: return "Adjudicada";
    case 7: return "Desierta";
    case 8: return "Publicada";
    case 18: return "Revocada";
    default: return "Desconocido";
  }
}

function Licitaciones() {
  const [licitaciones, setLicitaciones] = useState([]);
  const [filtros, setFiltros] = useState({
    fecha: "",
    estado: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    let url = `${API_BASE}?ticket=${API_TICKET}`;
    if (filtros.fecha) url += `&fecha=${filtros.fecha.replaceAll("-", "")}`;
    if (filtros.estado) url += `&estado=${filtros.estado}`;
    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error("Error de red o API");
        return res.json();
      })
      .then(data => {
        if (data?.Listado && data.Listado.length > 0) {
          setLicitaciones(data.Listado);
          setError("");
        } else {
          setLicitaciones([]);
          setError("No se encontraron licitaciones en la API.");
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setLicitaciones([]);
          setError("No se pudo conectar a la API.");
        }
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [filtros]);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Licitaciones Disponibles</Typography>
      {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', alignItems: 'end' }}>
        <div>
          <label className="form-label">Fecha (YYYY-MM-DD)</label>
          <input
            type="date"
            value={filtros.fecha}
            onChange={e => setFiltros({ ...filtros, fecha: e.target.value })}
            className="form-control"
            style={{ width: 170 }}
          />
        </div>
        <div>
          <label className="form-label">Estado</label>
          <select
            value={filtros.estado}
            onChange={e => setFiltros({ ...filtros, estado: e.target.value })}
            className="form-select"
            style={{ width: 140 }}
          >
            <option value="">Todos</option>
            <option value="publicada">Publicada</option>
            <option value="cerrada">Cerrada</option>
            <option value="adjudicada">Adjudicada</option>
            <option value="desierta">Desierta</option>
            <option value="revocada">Revocada</option>
          </select>
        </div>
      </Box>
      <Box>
        {licitaciones.length === 0 && !loading && (
          <Alert severity="info">No hay licitaciones para mostrar.</Alert>
        )}
        {licitaciones.map((l) => (
          <Card key={l.CodigoExterno} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{l.Nombre}</Typography>
              <Typography variant="body2">Código: {l.CodigoExterno}</Typography>
              <Typography variant="body2">Estado: {estadoTexto(l.CodigoEstado)}</Typography>
              <Typography variant="body2">Fecha de cierre: {l.FechaCierre?.slice(0, 10)}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default Licitaciones;