const API_URL = "https://clinicatecnologica.cl/ipss/api/mercadoPublico/resultado.json";

function showHome() {
  document.getElementById('main-content').innerHTML = `
    <div class="text-center">
      <h6>Bienvenido a Licita seguro</h6>
      <p>Consulta licitaciones públicas y busca proveedores de manera fácil y transparente.</p>
      <button class="btn btn-primary" onclick="showLicitaciones()">Ver Licitaciones</button>
      <button class="btn btn-secondary" onclick="showProveedores()">Buscar Proveedor</button>
    </div>
  `;
}

function showLicitaciones() {
  document.getElementById('main-content').innerHTML = `
    <h2>Licitaciones Disponibles</h2>
    <form class="row g-3 mb-3" id="filter-form">
      <div class="col-md-3">
        <label for="codigoExterno" class="form-label">Código Externo</label>
        <input type="text" class="form-control" id="codigoExterno" placeholder="Ej: 608897-86-LE24">
      </div>
      <div class="col-md-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="nombre" placeholder="Nombre licitación">
      </div>
      <div class="col-md-3">
        <label for="codigoEstado" class="form-label">Código Estado</label>
        <select class="form-select" id="codigoEstado">
          <option value="">Todos</option>
          <option value="8">Publicada</option>
          <option value="5">Cerrada</option>
        </select>
      </div>
      <div class="col-md-3">
        <label for="fechaCierre" class="form-label">Fecha de Cierre</label>
        <input type="date" class="form-control" id="fechaCierre">
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Filtrar</button>
      </div>
    </form>
    <div id="licitaciones-list" class="row"></div>
  `;
  fetchLicitaciones();

  document.getElementById('filter-form').onsubmit = function(e) {
    e.preventDefault();
    fetchLicitaciones();
  };
}

function fetchLicitaciones() {
  const codigoExterno = document.getElementById('codigoExterno')?.value.trim().toLowerCase();
  const nombre = document.getElementById('nombre')?.value.trim().toLowerCase();
  const codigoEstado = document.getElementById('codigoEstado')?.value;
  const fechaCierre = document.getElementById('fechaCierre')?.value;

  fetch(API_URL)
    .then(res => {
      if (!res.ok) throw new Error('Error de red o API');
      return res.json();
    })
    .then(data => {
      let licitaciones = data?.Listado || [];
      if (codigoExterno) {
        licitaciones = licitaciones.filter(l => l.CodigoExterno.toLowerCase().includes(codigoExterno));
      }
      if (nombre) {
        licitaciones = licitaciones.filter(l => l.Nombre.toLowerCase().includes(nombre));
      }
      if (codigoEstado) {
        licitaciones = licitaciones.filter(l => String(l.CodigoEstado) === codigoEstado);
      }
      if (fechaCierre) {
        licitaciones = licitaciones.filter(l => l.FechaCierre.slice(0, 10) === fechaCierre);
      }
      renderLicitaciones(licitaciones);
    })
    .catch((err) => {
      console.error('Error al cargar licitaciones:', err);
      document.getElementById('licitaciones-list').innerHTML = `<div class="alert alert-danger">No se pudieron cargar las licitaciones.<br>${err.message}</div>`;
    });
}

function estadoTexto(codigo) {
  switch (codigo) {
    case 8: return "Publicada";
    case 5: return "Cerrada";
    default: return "Desconocido";
  }
}

function renderLicitaciones(licitaciones) {
  const container = document.getElementById('licitaciones-list');
  if (!licitaciones.length) {
    container.innerHTML = '<div class="alert alert-warning">No hay licitaciones para mostrar.</div>';
    return;
  }
  container.innerHTML = licitaciones.map(l => `
    <div class="col-md-6 col-lg-4 mb-3">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${l.Nombre}</h5>
          <p class="card-text">Código: ${l.CodigoExterno}</p>
          <p class="card-text">Estado: ${estadoTexto(l.CodigoEstado)}</p>
          <p class="card-text">Fecha de cierre: ${l.FechaCierre.slice(0, 10)}</p>
          <button class="btn btn-outline-primary" onclick='showDetalleLicitacion(${JSON.stringify(l)})'>Ver Detalles</button>
        </div>
      </div>
    </div>
  `).join('');
}

function showDetalleLicitacion(licitacion) {
  document.getElementById('main-content').innerHTML = `
    <h2>Detalle de Licitación</h2>
    <ul class="list-group mb-3">
      <li class="list-group-item"><strong>Código:</strong> ${licitacion.CodigoExterno}</li>
      <li class="list-group-item"><strong>Nombre:</strong> ${licitacion.Nombre}</li>
      <li class="list-group-item"><strong>Estado:</strong> ${estadoTexto(licitacion.CodigoEstado)}</li>
      <li class="list-group-item"><strong>Fecha de cierre:</strong> ${licitacion.FechaCierre.slice(0, 10)}</li>
    </ul>
    <button class="btn btn-secondary" onclick="showLicitaciones()">Volver</button>
  `;
}

function showProveedores() {
  document.getElementById('main-content').innerHTML = `
    <h2>Buscar Proveedor por RUT</h2>
    <form id="proveedor-form" class="mb-3">
      <div class="mb-3">
        <input type="text" class="form-control" id="rut" placeholder="Ingrese RUT (ej: 12345678-9)" required>
      </div>
      <button type="submit" class="btn btn-primary">Buscar</button>
    </form>
    <div id="proveedor-result"></div>
  `;
  document.getElementById('proveedor-form').onsubmit = function(e) {
    e.preventDefault();
    buscarProveedor(document.getElementById('rut').value);
  };
}

function buscarProveedor(rut) {
  // Simulación: en un caso real, deberías consultar una API de proveedores
  document.getElementById('proveedor-result').innerHTML = `
    <div class="alert alert-info">Resultados para el RUT: <strong>${rut}</strong> (simulado)</div>
  `;
}

// Mostrar homepage al cargar
showHome();