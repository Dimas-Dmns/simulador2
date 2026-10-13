let clientes = [];
let clienteSeleccionado = null;
let tasaInteres = 15;


/* =========================================
   PARTE 1: NAVEGACIÓN ENTRE SECCIONES
========================================= */

// Quita la clase activa de todas las secciones.
function ocultarSecciones() {
    let secciones = document.querySelectorAll("section");

    secciones.forEach(function(seccion) {
        seccion.classList.remove("activa");
    });
}


// Oculta todas las secciones y muestra la indicada.
function mostrarSeccion(id) {
    ocultarSecciones();

    let componente = document.getElementById(id);

    if (componente !== null) {
        componente.classList.add("activa");
    }
}


/* =========================================
   PARTE 2: CONFIGURAR TASA
========================================= */

function guardarTasa() {
    let componente = document.getElementById("tasaInteres");
    let valorTexto = componente.value;
    let valorTasa = Number(valorTexto);

    let mensaje = document.getElementById("mensajeTasa");

    // Validar que el campo no esté vacío
    // y que el valor esté entre 10 y 20.
    if (
        valorTexto.trim() === "" ||
        !Number.isFinite(valorTasa) ||
        valorTasa < 10 ||
        valorTasa > 20
    ) {
        mensaje.textContent =
            "La tasa debe estar entre 10% y 20%";

        return;
    }

    // Guardar la tasa válida.
    tasaInteres = valorTasa;

    mensaje.textContent =
        "Tasa configurada correctamente: " +
        tasaInteres +
        "%";
}


/* =========================================
   PARTE 3A: CREAR Y LISTAR CLIENTES
========================================= */

// Crear o actualizar un cliente.
function guardarCliente() {
    let valorCedula =
        document.getElementById("txtCedula").value.trim();

    let valorNombre =
        document.getElementById("txtNombre").value.trim();

    let valorEdadTexto =
        document.getElementById("txtEdad").value.trim();

    let valorEdad = Number(valorEdadTexto);

    let mensaje = document.getElementById("mensajeCliente");

    // Validar cédula.
    if (!/^\d{10}$/.test(valorCedula)) {
        mensaje.textContent =
            "La cédula debe contener exactamente 10 dígitos.";

        return;
    }

    // Validar nombre.
    if (valorNombre === "") {
        mensaje.textContent =
            "Debes ingresar el nombre del cliente.";

        return;
    }

    // Validar edad.
    if (
        valorEdadTexto === "" ||
        !Number.isInteger(valorEdad) ||
        valorEdad < 0
    ) {
        mensaje.textContent =
            "Ingresa una edad válida.";

        return;
    }

    // Si hay un cliente seleccionado, actualizarlo.
    if (clienteSeleccionado !== null) {

        clienteSeleccionado.nombre = valorNombre;
        clienteSeleccionado.edad = valorEdad;

        mensaje.textContent =
            "Cliente actualizado correctamente.";

    } else {

        // Buscar si ya existe la cédula.
        let clienteExistente = buscarCliente(valorCedula);

        if (clienteExistente !== null) {
            mensaje.textContent =
                "Ya existe un cliente con esa cédula.";

            return;
        }

        // Crear un objeto cliente.
        let datoCliente = {};

        datoCliente.cedula = valorCedula;
        datoCliente.nombre = valorNombre;
        datoCliente.edad = valorEdad;

        // Agregar el objeto al arreglo.
        clientes.push(datoCliente);

        mensaje.textContent =
            "Cliente guardado correctamente.";
    }

    // Actualizar la tabla.
    pintarClientes();

    // Vaciar los campos.
    limpiar();
}


// Genera las filas de la tabla dinámicamente.
function pintarClientes() {
    let contenido = "";

    for (let i = 0; i < clientes.length; i++) {
        let cliente = clientes[i];

        contenido += `
            <tr>
                <td>${escaparHTML(cliente.cedula)}</td>

                <td>${escaparHTML(cliente.nombre)}</td>

                <td>${cliente.edad}</td>

                <td>
                    <button
                        type="button"
                        onclick="seleccionarCliente('${cliente.cedula}')">
                        Actualizar
                    </button>
                </td>
            </tr>
        `;
    }

    document.getElementById("tablaClientes").innerHTML =
        contenido;
}


// Evita interpretar los datos de texto como HTML.
function escaparHTML(valor) {
    return String(valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}


/* =========================================
   PARTE 3B: BUSCAR CLIENTES
========================================= */

// Retorna el cliente encontrado o null.
function buscarCliente(cedula) {
    for (let i = 0; i < clientes.length; i++) {

        if (clientes[i].cedula === cedula) {
            return clientes[i];
        }
    }

    return null;
}


/* =========================================
   PARTE 3B: SELECCIONAR Y ACTUALIZAR
========================================= */

// Busca el cliente y carga sus datos en los inputs.
function seleccionarCliente(cedula) {
    let clienteEncontrado = buscarCliente(cedula);

    if (clienteEncontrado === null) {
        document.getElementById("mensajeCliente").textContent =
            "No se encontró el cliente.";

        return;
    }

    clienteSeleccionado = clienteEncontrado;

    document.getElementById("txtCedula").value =
        clienteSeleccionado.cedula;

    document.getElementById("txtNombre").value =
        clienteSeleccionado.nombre;

    document.getElementById("txtEdad").value =
        clienteSeleccionado.edad;

    // La cédula no se modifica al actualizar.
    document.getElementById("txtCedula").readOnly = true;

    document.getElementById("mensajeCliente").textContent =
        "Modifica los datos y pulsa Guardar cliente.";
}


/* =========================================
   PARTE 3B: LIMPIAR FORMULARIO
========================================= */

function limpiar() {
    document.getElementById("txtCedula").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtEdad").value = "";

    // Habilitar nuevamente la cédula.
    document.getElementById("txtCedula").readOnly = false;

    // Salir del modo de actualización.
    clienteSeleccionado = null;
}


// Mostrar la tabla al cargar la página.
pintarClientes();
