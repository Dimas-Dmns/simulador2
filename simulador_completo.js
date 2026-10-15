
let clientes = [];
let clienteSeleccionado = null;
let tasaInteres = 15;
let clienteCreditoSeleccionado = null;

// PARTE 3: arreglo de créditos registrados
let creditos = [];

// Variables para guardar el último cálculo del crédito
let montoCalculado = 0;
let plazoIngresado = 0;
let cuotaCalculada = 0;
let creditoAprobadoActual = false;

/* =========================================
   PARTE 1: NAVEGACIÓN ENTRE SECCIONES
========================================= */

function ocultarSecciones() {
    let secciones = document.querySelectorAll("section");

    secciones.forEach(function (seccion) {
        seccion.classList.remove("activa");
    });
}

function mostrarSeccion(id) {
    ocultarSecciones();

    let componente = document.getElementById(id);

    if (componente !== null) {
        componente.classList.add("activa");
    }

    // Al abrir el historial, mostrar todos los créditos
    if (id === "listaCreditos") {
        pintarCreditos(creditos);
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

    tasaInteres = valorTasa;

    mensaje.textContent =
        "Tasa configurada correctamente: " +
        tasaInteres + "%";
}

/* =========================================
   PARTE 3A: CREAR Y LISTAR CLIENTES
========================================= */

function guardarCliente() {
    let valorCedula =
        document.getElementById("txtCedula").value.trim();

    let valorNombre =
        document.getElementById("txtNombre").value.trim();

    let valorApellido =
        document.getElementById("txtApellido").value.trim();

    let ingresosTexto =
        document.getElementById("txtIngresos").value;

    let egresosTexto =
        document.getElementById("txtEgresos").value;

    let valorCorreo =
    document.getElementById("txtCorreo").value.trim();

    let valorIngresos = Number(ingresosTexto);
    let valorEgresos = Number(egresosTexto);

    let mensaje = document.getElementById("mensajeCliente");

    if (!/^\d{10}$/.test(valorCedula)) {
        mensaje.textContent =
            "La cédula debe contener exactamente 10 dígitos.";
        return;
    }

    if (valorNombre === "" || valorApellido === "") {
        mensaje.textContent =
            "Ingresa el nombre y apellido.";
        return;
    }

    if (
        ingresosTexto.trim() === "" ||
        !Number.isFinite(valorIngresos) ||
        valorIngresos < 0
    ) {
        mensaje.textContent =
            "Ingresa un valor válido para los ingresos.";
        return;
    }

    if (
        egresosTexto.trim() === "" ||
        !Number.isFinite(valorEgresos) ||
        valorEgresos < 0
    ) {
        mensaje.textContent =
            "Ingresa un valor válido para los egresos.";
        return;
    }

    let clienteExistente = buscarCliente(valorCedula);

    if (clienteSeleccionado !== null) {
        // Actualizar el cliente seleccionado
        if (clienteSeleccionado.cedula !== valorCedula) {
            mensaje.textContent =
                "No puedes cambiar la cédula del cliente seleccionado.";
            return;
        }

        clienteSeleccionado.nombre = valorNombre;
        clienteSeleccionado.apellido = valorApellido;
        clienteSeleccionado.ingresos = valorIngresos;
        clienteSeleccionado.egresos = valorEgresos;
        clienteSeleccionado.correo= valorCorreo;

        mensaje.textContent =
            "Cliente actualizado correctamente.";

    } else {
        // Crear un cliente nuevo
        if (clienteExistente !== null) {
            mensaje.textContent =
                "Ya existe un cliente con esa cédula.";
            return;
        }

        let datoCliente = {
            cedula: valorCedula,
            nombre: valorNombre,
            apellido: valorApellido,
            ingresos: valorIngresos,
            egresos: valorEgresos,
            correo: valorCorreo
        };

        clientes.push(datoCliente);

        mensaje.textContent =
            "Cliente guardado correctamente.";
    }

    pintarClientes();
    limpiar();
}

function pintarClientes() {
    let contenido = "";

    for (let i = 0; i < clientes.length; i++) {
        let cliente = clientes[i];

        contenido += `
            <tr>
                <td>${escaparHTML(cliente.cedula)}</td>
                <td>${escaparHTML(cliente.nombre)}</td>
                <td>${escaparHTML(cliente.apellido)}</td>
                <td>${escaparHTML(cliente.correo || "")}</td>
                <td>$${Number(cliente.ingresos).toFixed(2)}</td>
                <td>$${Number(cliente.egresos).toFixed(2)}</td>
                <td>
                    <button
                        type="button"
                        onclick="seleccionarCliente('${cliente.cedula}')"
                    >
                        Actualizar
                    </button>
                </td>
            </tr>
        `;
    }

    document.getElementById("tablaClientes").innerHTML =
        contenido;
}

/* =========================================
   FUNCIÓN AUXILIAR: ESCAPAR TEXTO HTML
========================================= */

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

    document.getElementById("txtApellido").value =
        clienteSeleccionado.apellido;

    document.getElementById("txtIngresos").value =
        clienteSeleccionado.ingresos;

    document.getElementById("txtEgresos").value =
        clienteSeleccionado.egresos;

    document.getElementById("txtCedula").readOnly = true;

    document.getElementById("mensajeCliente").textContent =
        "Modifica los datos y pulsa Guardar cliente.";
}

function limpiar() {
    document.getElementById("txtCedula").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellido").value = "";
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";

    document.getElementById("txtCedula").readOnly = false;

    clienteSeleccionado = null;
}

/* =========================================
   PARTE 4: BUSCAR CLIENTE PARA EL CRÉDITO
========================================= */

function buscarClienteCredito() {
    let cedula =
        document.getElementById("txtCedulaCredito").value.trim();

    let mensaje = document.getElementById("mensajeCredito");
    let datosClienteCredito =
        document.getElementById("datosClienteCredito");

    let resultadoCredito =
        document.getElementById("resultadoCredito");

    // Invalidar cualquier aprobación anterior
    creditoAprobadoActual = false;

    document.getElementById("btnAsignarCredito").disabled = true;

    montoCalculado = 0;
    plazoIngresado = 0;
    cuotaCalculada = 0;

    mensaje.textContent = "";
    datosClienteCredito.innerHTML = "";
    resultadoCredito.innerHTML = "";
    resultadoCredito.className = "";

    clienteCreditoSeleccionado = null;

    if (cedula === "") {
        mensaje.textContent =
            "Ingresa la cédula del cliente.";
        return;
    }

    let clienteEncontrado = buscarCliente(cedula);

    if (clienteEncontrado === null) {
        mensaje.textContent =
            "No se encontró un cliente con esa cédula.";
        return;
    }

    if (
        clienteEncontrado.apellido === undefined ||
        clienteEncontrado.ingresos === undefined ||
        clienteEncontrado.egresos === undefined
    ) {
        mensaje.textContent =
            "El cliente no tiene registrados apellido, ingresos y egresos. " +
            "Actualiza sus datos en la sección Clientes.";
        return;
    }

    clienteCreditoSeleccionado = clienteEncontrado;

    datosClienteCredito.innerHTML = `
        <h3>Datos del Cliente</h3>

        <p>
            <strong>Cédula:</strong>
            ${escaparHTML(clienteEncontrado.cedula)}
        </p>

        <p>
            <strong>Nombre:</strong>
            ${escaparHTML(clienteEncontrado.nombre)}
        </p>

        <p>
            <strong>Apellido:</strong>
            ${escaparHTML(clienteEncontrado.apellido)}
        </p>

        <p>
            <strong>Ingresos:</strong>
            $${Number(clienteEncontrado.ingresos).toFixed(2)}
        </p>

        <p>
            <strong>Egresos:</strong>
            $${Number(clienteEncontrado.egresos).toFixed(2)}
        </p>
    `;

    mensaje.textContent =
        "Cliente encontrado correctamente.";
}

/* =========================================
   FUNCIONES DE CÁLCULO DEL CRÉDITO
   SE CONSERVA LA LÓGICA DE LA PARTE 2
========================================= */

function calcularDisponible(ingresos, egresos) {
    let disponible = ingresos - egresos;

    if (disponible < 0) {
        return 0;
    }

    return disponible;
}

function calcularCapacidadPago(montoDisponible) {
    return montoDisponible * 0.5;
}

function calcularInteresSimple(monto, tasa, plazoAnios) {
    return monto * (tasa / 100) * plazoAnios;
}

function calcularTotalPagar(monto, interes) {
    return monto + interes + 100;
}

function calcularCuotaMensual(total, plazoAnios) {
    return total / (plazoAnios * 12);
}

function aprobarCredito(capacidadPago, cuotaMensual) {
    return capacidadPago > cuotaMensual;
}

/* =========================================
   CALCULAR CRÉDITO
========================================= */

function calcularCreditoCliente() {
    let mensaje = document.getElementById("mensajeCredito");

    let resultadoCredito =
        document.getElementById("resultadoCredito");

    let btnAsignarCredito =
        document.getElementById("btnAsignarCredito");

    // Cada cálculo nuevo invalida el anterior
    creditoAprobadoActual = false;
    btnAsignarCredito.disabled = true;

    montoCalculado = 0;
    plazoIngresado = 0;
    cuotaCalculada = 0;

    resultadoCredito.innerHTML = "";
    resultadoCredito.className = "";

    if (clienteCreditoSeleccionado === null) {
        mensaje.textContent =
            "Primero busca un cliente por su cédula.";
        return;
    }

    let montoTexto =
        document.getElementById("txtMontoCredito").value;

    let plazoTexto =
        document.getElementById("txtPlazoCredito").value;

    let monto = Number(montoTexto);
    let plazoAnios = Number(plazoTexto);

    if (
        montoTexto.trim() === "" ||
        !Number.isFinite(monto) ||
        monto <= 0
    ) {
        mensaje.textContent =
            "Ingresa un monto de crédito válido.";
        return;
    }

    if (
        plazoTexto.trim() === "" ||
        !Number.isInteger(plazoAnios) ||
        plazoAnios <= 0
    ) {
        mensaje.textContent =
            "Ingresa un plazo válido en años.";
        return;
    }

    let ingresos =
        Number(clienteCreditoSeleccionado.ingresos);

    let egresos =
        Number(clienteCreditoSeleccionado.egresos);

    let disponible =
        calcularDisponible(ingresos, egresos);

    let capacidadPago =
        calcularCapacidadPago(disponible);

    let tasa = Number(tasaInteres);

    let interes =
        calcularInteresSimple(monto, tasa, plazoAnios);

    let totalPagar =
        calcularTotalPagar(monto, interes);

    let cuotaMensual =
        calcularCuotaMensual(totalPagar, plazoAnios);

    let creditoAprobado =
        aprobarCredito(capacidadPago, cuotaMensual);

    resultadoCredito.innerHTML = `
        <h3>Resultado del Crédito</h3>

        <p>
            <strong>Disponible mensual:</strong>
            $${disponible.toFixed(2)}
        </p>

        <p>
            <strong>Capacidad de pago:</strong>
            $${capacidadPago.toFixed(2)}
        </p>

        <p>
            <strong>Interés generado:</strong>
            $${interes.toFixed(2)}
        </p>

        <p>
            <strong>Total a pagar:</strong>
            $${totalPagar.toFixed(2)}
        </p>

        <p>
            <strong>Cuota mensual:</strong>
            $${cuotaMensual.toFixed(2)}
        </p>

        <p>
            <strong>RESULTADO:</strong>
            ${creditoAprobado ? "APROBADO" : "RECHAZADO"}
        </p>
    `;

    if (creditoAprobado) {
        resultadoCredito.className = "aprobado";

        // Guardar los valores del cálculo aprobado
        montoCalculado = monto;
        plazoIngresado = plazoAnios;
        cuotaCalculada = cuotaMensual;
        creditoAprobadoActual = true;

        btnAsignarCredito.disabled = false;

    } else {
        resultadoCredito.className = "rechazado";

        btnAsignarCredito.disabled = true;
    }

    mensaje.textContent =
        "Cálculo realizado correctamente.";
}

/* =========================================
   PARTE 3 - PASO 2: ASIGNAR CRÉDITO
========================================= */

function asignarCredito() {
    if (
        !creditoAprobadoActual ||
        clienteCreditoSeleccionado === null
    ) {
        document.getElementById("mensajeCredito").textContent =
            "Solo puedes asignar un crédito aprobado.";
        return;
    }

    let credito = {
        cedula: clienteCreditoSeleccionado.cedula,
        nombre: clienteCreditoSeleccionado.nombre,
        apellido: clienteCreditoSeleccionado.apellido,
        monto: montoCalculado,
        tasa: tasaInteres,
        plazo: plazoIngresado,
        cuota: cuotaCalculada
    };

    // Registrar el crédito aprobado
    creditos.push(credito);

    document.getElementById("mensajeCredito").textContent =
        "Crédito asignado correctamente.";

    // Evitar registrar accidentalmente dos veces el mismo cálculo
    creditoAprobadoActual = false;

    document.getElementById("btnAsignarCredito").disabled = true;
}

/* =========================================
   PARTE 3 - PASO 4: BUSCAR CRÉDITOS
========================================= */

function buscarCreditos(cedula) {
    let creditosEncontrados = [];

    for (let i = 0; i < creditos.length; i++) {
        if (creditos[i].cedula === cedula) {
            creditosEncontrados.push(creditos[i]);
        }
    }

    return creditosEncontrados;
}

/* =========================================
   PARTE 3 - PASO 5: PINTAR CRÉDITOS
========================================= */

function pintarCreditos(creditos) {
    let contenido = "";

    for (let i = 0; i < creditos.length; i++) {
        let credito = creditos[i];

        contenido += `
            <tr>
                <td>${escaparHTML(credito.cedula)}</td>
                <td>${escaparHTML(credito.nombre)}</td>
                <td>${escaparHTML(credito.apellido)}</td>
                <td>$${Number(credito.monto).toFixed(2)}</td>
                <td>${Number(credito.tasa).toFixed(2)}%</td>
                <td>${credito.plazo} años</td>
                <td>$${Number(credito.cuota).toFixed(2)}</td>
            </tr>
        `;
    }

    document.getElementById("tablaCreditos").innerHTML =
        contenido;

    let mensaje =
        document.getElementById("mensajeHistorial");

    if (creditos.length === 0) {
        mensaje.textContent =
            "No se encontraron créditos registrados.";
    } else {
        mensaje.textContent =
            "Créditos encontrados: " + creditos.length;
    }
}

/* =========================================
   PARTE 3 - PASO 6: BUSCAR DESDE EL HISTORIAL
========================================= */

function buscarCreditosCliente() {
    let cedula = document
        .getElementById("buscarCedulaListado")
        .value
        .trim();

    let mensaje =
        document.getElementById("mensajeHistorial");

    if (cedula === "") {
        mensaje.textContent =
            "Ingresa la cédula del cliente.";
        return;
    }

    let creditosEncontrados = buscarCreditos(cedula);

    pintarCreditos(creditosEncontrados);
}

/* =========================================
   INICIALIZAR LA TABLA DE CLIENTES
========================================= */

pintarClientes();

function contacto(){
    let cont = document.getElementById("contact")
}
