const palabrasClave = [
  "rin", "juego de rines", "rines",
  "llantas", "llanta", "juego de llantas"
];

function contienePalabraClave(texto) {
  const t = texto.toLowerCase();
  return palabrasClave.some(p => t.includes(p));
}

function agregarFila() {
  const tabla = document.getElementById("tabla-productos").getElementsByTagName('tbody')[0];
  const fila = tabla.insertRow();

  const celdas = [
    '<input type="text" class="descripcion">',
    '<input type="number" class="cantidad" min="1" value="1">',
    '<input type="number" class="precio-unitario" min="0">',
    '<input type="number" class="precio-juego" min="0">',
    '<input type="number" class="total" readonly>',
    '<button class="btn eliminar" onclick="eliminarFila(this)">🗑️</button>'
  ];

  const clases = [
    "descripcion",
    "cantidad",
    "precio-unitario",
    "td-precio-juego ocultar", // td con clase para ocultar
    "total",
    "acciones"
  ];

  for (let i = 0; i < clases.length; i++) {
    const celda = fila.insertCell();
    celda.className = clases[i];
    celda.innerHTML = celdas[i];
  }

  const inputDescripcion = fila.querySelector(".descripcion");
  const inputCantidad = fila.querySelector(".cantidad");
  const inputPrecioUnitario = fila.querySelector(".precio-unitario");
  const inputPrecioJuego = fila.querySelector(".precio-juego");
  const inputTotal = fila.querySelector(".total");
  const tdJuego = fila.querySelector(".td-precio-juego");

  function actualizarCampos() {
    const desc = inputDescripcion.value;

    if (contienePalabraClave(desc)) {
      tdJuego.classList.remove("ocultar");
      inputPrecioJuego.disabled = false;
      inputPrecioJuego.readOnly = false;
    } else {
      tdJuego.classList.add("ocultar");
      inputPrecioJuego.value = "";
      inputPrecioJuego.disabled = true;
    }

    const cantidad = parseFloat(inputCantidad.value) || 0;
    const precioJuego = parseFloat(inputPrecioJuego.value) || 0;
    const precioUnitario = parseFloat(inputPrecioUnitario.value) || 0;

    if (contienePalabraClave(desc) && precioJuego > 0) {
      const precioPorUnidad = precioJuego / 4;
      inputPrecioUnitario.value = precioPorUnidad.toFixed(2);
      inputTotal.value = (cantidad * precioPorUnidad).toFixed(2);
    } else {
      inputTotal.value = (cantidad * precioUnitario).toFixed(2);
    }

    actualizarTotalFinal();
  }

  [inputDescripcion, inputCantidad, inputPrecioUnitario, inputPrecioJuego].forEach(input => {
    input.addEventListener("input", actualizarCampos);
  });
}

function eliminarFila(btn) {
  const fila = btn.closest("tr");
  fila.remove();
  actualizarTotalFinal();
}

function actualizarTotalFinal() {
  const totales = document.querySelectorAll(".total");
  let suma = 0;
  totales.forEach(input => {
    suma += parseFloat(input.value) || 0;
  });
  document.getElementById("total-final").textContent = `$${suma.toFixed(2)}`;
}
