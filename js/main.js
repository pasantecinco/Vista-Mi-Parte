/**
 * LÓGICA DE FORMULARIO - PASO 3: INFORMACIÓN BANCARIA
 * Tienda Bolsillo - Registro de Mi Negocio Web
 * Autor: Juan Diego Torres Maldonado
 */

// Arreglo para almacenar cuentas bancarias adicionales
let cuentasAdicionales = [];

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  inicializarEventos();
});

function inicializarEventos() {
  // Manejo de clic en las cajas de subida de archivos
  configurarSubidaArchivo('caja-selfie', 'input-selfie', 'info-selfie');
  configurarSubidaArchivo('caja-certificado', 'input-certificado', 'info-certificado');

  // Enviar formulario principal
  const formPrincipal = document.getElementById('form-bancario');
  if (formPrincipal) {
    formPrincipal.addEventListener('submit', function (e) {
      e.preventDefault();
      guardarCuentaPrincipal();
    });
  }

  // Enviar formulario de cuenta adicional en el modal
  const formExtra = document.getElementById('form-cuenta-extra');
  if (formExtra) {
    formExtra.addEventListener('submit', function (e) {
      e.preventDefault();
      agregarCuentaAdicional();
    });
  }
}

// Configura el evento de clic en la tarjeta de archivo para abrir el selector nativo
function configurarSubidaArchivo(cajaId, inputId, infoId) {
  const caja = document.getElementById(cajaId);
  const input = document.getElementById(inputId);
  const info = document.getElementById(infoId);

  if (!caja || !input || !info) return;

  caja.addEventListener('click', function () {
    input.click();
  });

  input.addEventListener('change', function () {
    if (input.files && input.files.length > 0) {
      const archivo = input.files[0];
      info.textContent = '✓ ' + archivo.name + ' (' + (archivo.size / 1024 / 1024).toFixed(2) + ' MB)';
      caja.classList.add('con-archivo');
    }
  });
}

// Llena automáticamente el formulario con datos reales de Ecuador para pruebas
function completarDatosEjemplo() {
  document.getElementById('tipo-institucion').value = 'Banco';
  document.getElementById('institucion-financiera').value = 'Banco Pichincha';
  document.getElementById('tipo-cuenta').value = 'Ahorro';
  document.getElementById('numero-cuenta').value = '2204567891';
  document.getElementById('nombre-titular').value = 'Juan Diego Torres Maldonado';
  document.getElementById('cedula-titular').value = '1723456789';
  document.getElementById('correo-titular').value = 'juan.torres@ejemplo.com';

  // Simular archivos cargados de demostración
  const infoSelfie = document.getElementById('info-selfie');
  const infoCert = document.getElementById('info-certificado');
  const cajaSelfie = document.getElementById('caja-selfie');
  const cajaCert = document.getElementById('caja-certificado');

  infoSelfie.textContent = '✓ selfie_cedula_demostracion.jpg (1.8 MB)';
  infoCert.textContent = '✓ certificado_bancario_pichincha.pdf (0.9 MB)';
  cajaSelfie.classList.add('con-archivo');
  cajaCert.classList.add('con-archivo');

  mostrarAlerta('Se completó el formulario con datos de ejemplo para demostración.');
}

// Validación y guardado de la cuenta bancaria principal
function guardarCuentaPrincipal() {
  const institucion = document.getElementById('institucion-financiera').value.trim();
  const tipoCuenta = document.getElementById('tipo-cuenta').value;
  const numCuenta = document.getElementById('numero-cuenta').value.trim();
  const nombre = document.getElementById('nombre-titular').value.trim();
  const cedula = document.getElementById('cedula-titular').value.trim();
  const infoSelfie = document.getElementById('info-selfie').textContent;
  const infoCert = document.getElementById('info-certificado').textContent;

  // Validaciones básicas requeridas
  if (!institucion || !numCuenta || !nombre || !cedula) {
    alert('Por favor completa todos los campos obligatorios marcados con (*).');
    return;
  }

  if (cedula.length < 10) {
    alert('La cédula del titular debe tener 10 dígitos numéricos.');
    return;
  }

  if (!infoSelfie.includes('✓') || !infoCert.includes('✓')) {
    alert('Por favor selecciona los dos documentos requeridos: Selfie con documento y Certificado bancario.');
    return;
  }

  // Simular persistencia en sesión
  const cuentaPrincipal = {
    institucion: institucion,
    tipoCuenta: tipoCuenta,
    numeroCuenta: numCuenta,
    titular: nombre,
    cedula: cedula,
    selfieCargada: true,
    certificadoCargado: true
  };

  sessionStorage.setItem('cuenta_principal_tienda_bolsillo', JSON.stringify(cuentaPrincipal));
  mostrarAlerta('¡Cuenta bancaria principal guardada con éxito! Avanzando a: 4. Vista previa y envío.');
}

// Modal Ver Estado
function abrirModalEstado() {
  document.getElementById('modal-estado').classList.add('mostrar');
}

function cerrarModalEstado() {
  document.getElementById('modal-estado').classList.remove('mostrar');
}

// Modal Cuentas Adicionales
function abrirModalAgregarCuenta() {
  document.getElementById('modal-cuenta-extra').classList.add('mostrar');
}

function cerrarModalAgregarCuenta() {
  document.getElementById('modal-cuenta-extra').classList.remove('mostrar');
}

// Agrega una cuenta bancaria secundaria
function agregarCuentaAdicional() {
  const banco = document.getElementById('extra-banco').value.trim();
  const tipo = document.getElementById('extra-tipo').value;
  const numero = document.getElementById('extra-numero').value.trim();
  const titular = document.getElementById('extra-titular').value.trim();

  if (!banco || !numero || !titular) {
    alert('Por favor llena los datos de la cuenta adicional.');
    return;
  }

  const nuevaCuenta = {
    id: Date.now(),
    banco: banco,
    tipo: tipo,
    numero: numero,
    titular: titular
  };

  cuentasAdicionales.push(nuevaCuenta);
  actualizarListaCuentasAdicionales();
  cerrarModalAgregarCuenta();

  // Limpiar campos del modal
  document.getElementById('form-cuenta-extra').reset();
  mostrarAlerta('Cuenta adicional agregada correctamente.');
}

// Elimina una cuenta adicional
function eliminarCuentaAdicional(id) {
  cuentasAdicionales = cuentasAdicionales.filter(function (cta) {
    return cta.id !== id;
  });
  actualizarListaCuentasAdicionales();
}

// Actualiza el contador (0) y la vista de cuentas guardadas
function actualizarListaCuentasAdicionales() {
  const contador = document.getElementById('contador-adicionales');
  const contenedorLista = document.getElementById('lista-adicionales-container');
  const lista = document.getElementById('lista-cuentas');

  if (contador) {
    contador.textContent = 'Cuentas adicionales (' + cuentasAdicionales.length + ')';
  }

  if (!contenedorLista || !lista) return;

  if (cuentasAdicionales.length === 0) {
    contenedorLista.style.display = 'none';
    lista.innerHTML = '';
    return;
  }

  contenedorLista.style.display = 'block';
  lista.innerHTML = '';

  cuentasAdicionales.forEach(function (cta) {
    const item = document.createElement('div');
    item.className = 'tarjeta-cuenta-extra';
    item.innerHTML = `
      <div>
        <strong>${cta.banco}</strong> - ${cta.tipo} (N° ${cta.numero})<br>
        <span style="color: #64748b; font-size: 12px;">Titular: ${cta.titular}</span>
      </div>
      <button type="button" class="btn-quitar-cuenta" onclick="eliminarCuentaAdicional(${cta.id})">Eliminar</button>
    `;
    lista.appendChild(item);
  });
}

// Muestra un mensaje temporal de confirmación
function mostrarAlerta(mensaje) {
  const alerta = document.getElementById('alerta-global');
  if (!alerta) return;

  alerta.textContent = mensaje;
  alerta.style.display = 'block';

  setTimeout(function () {
    alerta.style.display = 'none';
  }, 4000);
}
