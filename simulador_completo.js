
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

function ocultarSecciones() {
    let secciones = document.querySelectorAll("section");

    secciones.forEach(function(seccion) {
        seccion.classList.remove("activa");
    });
}

function mostrarSeccion(id) {
    ocultarSecciones();

    document.getElementById(id).classList.add("activa");
}

function guardarTasa() {
    let componente = document.getElementById("tasaInteres");
    let valorTasa = Number(componente.value);
    let mensaje = document.getElementById("mensajeTasa");

    if (
        componente.value.trim() === "" ||
        !Number.isFinite(valorTasa) ||
        valorTasa < 10 ||
        valorTasa > 20
    ) {
        mensaje.textContent = "La tasa debe estar entre 10% y 20%";
        return;
    }

    mensaje.textContent =
        "Tasa configurada correctamente: " + valorTasa + "%";
}


function guardarCliente() {
    let valorCedula = document.getElementById("txtCedula").value.trim();
    let valorNombre = document.getElementById("txtNombre").value.trim();
    let valorEdadTexto = document.getElementById("txtEdad").value.trim();
    let valorEdad = Number(valorEdadTexto);

    if (
        valorCedula === "" ||
        valorNombre === "" ||
        valorEdadTexto === "" ||
        !Number.isFinite(valorEdad)
    ) {
        alert("Completa todos los campos correctamente.");
        return;
    }

    if (clienteSeleccionado !== null) {
        // Actualizar el objeto seleccionado.
        clienteSeleccionado.nombre = valorNombre;
        clienteSeleccionado.edad = valorEdad;
    } else {
        // Buscar si ya existe la cédula.
        let clienteExistente = buscarCliente(valorCedula);

        if (clienteExistente !== null) {
            alert("Ya existe un cliente con esa cédula.");
            return;
        }

        // Crear un nuevo cliente.
        let datoCliente = {};

        datoCliente.cedula = valorCedula;
        datoCliente.nombre = valorNombre;
        datoCliente.edad = valorEdad;

        clientes.push(datoCliente);
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
                <td>${cliente.cedula}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.edad}</td>
                <td>
                    <button onclick="seleccionarCliente('${cliente.cedula}')">
                        Actualizar
                    </button>
                </td>
            </tr>
        `;
    }

    document.getElementById("tablaClientes").innerHTML = contenido;
}

function buscarCliente(cedula) {
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cedula === cedula) {
            return clientes[i];
        }
    }

    return null;
}

function seleccionarCliente(cedula) {
    clienteSeleccionado = buscarCliente(cedula);

    if (clienteSeleccionado === null) {
        return;
    }

    document.getElementById("txtCedula").value =
        clienteSeleccionado.cedula;

    document.getElementById("txtNombre").value =
        clienteSeleccionado.nombre;

    document.getElementById("txtEdad").value =
        clienteSeleccionado.edad;
}



