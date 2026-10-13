
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
    let valorEdad = Number(document.getElementById("txtEdad").value);

    let datoCliente = {};

    datoCliente.cedula = valorCedula;
    datoCliente.nombre = valorNombre;
    datoCliente.edad = valorEdad;

    clientes.push(datoCliente);

    pintarClientes();
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



