
// Datos de clientes
var clientes = [];
var clienteIdCounter = 1;
// Función para registrar un nuevo cliente
function registrarCliente(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    var numeroIdentificacion = document.getElementById("numeroIdentificacion").value;
    var nombres = document.getElementById("nombres").value;
    var apellidos = document.getElementById("apellidos").value;
    var telefono = document.getElementById("telefono").value;
    var correoElectronico = document.getElementById("correoElectronico").value;
    var placa = document.getElementById("placa").value;
    var vehiculo = document.getElementById("vehiculo").value;

    // Crear un objeto cliente con los datos ingresados
    var cliente = {
        id: clienteIdCounter++,
        numeroIdentificacion: numeroIdentificacion,
        nombres: nombres,
        apellidos: apellidos,
        telefono: telefono,
        correoElectronico: correoElectronico,
        placa: placa,
        vehiculo: vehiculo
    };

    // Agregar el cliente a la lista de clientes
    clientes.push(cliente);

    // Limpiar el formulario
    document.getElementById("registroClienteForm").reset();

    // Actualizar la lista de clientes
    actualizarListaClientes();
    cargarOpcionesClientes(); // Agregar esta línea para cargar las opciones de clientes en el formulario de compra de tiquetes
}


// Función para buscar clientes por nombre, apellidos o documento de identidad
function buscarClientes() {
    var filtro = document.getElementById("buscador").value.toLowerCase();

    // Filtrar los clientes por el criterio de búsqueda
    var clientesFiltrados = clientes.filter(function (cliente) {
        return (
            cliente.nombres.toLowerCase().includes(filtro) ||
            cliente.apellidos.toLowerCase().includes(filtro) ||
            cliente.numeroIdentificacion.toLowerCase().includes(filtro)
        );
    });

    // Actualizar la lista de clientes con los resultados de búsqueda
    actualizarListaClientes(clientesFiltrados);
}

// Función para eliminar un cliente
function eliminarCliente(index) {
    clientes.splice(index, 1);
    actualizarListaClientes();
}
// Función para editar un cliente
function editarCliente() {

  
}


// Función para actualizar la lista de clientes en el HTML
function actualizarListaClientes(clientesMostrar) {
    var tablaClientesElement = document.getElementById("tablaClientes");
    tablaClientesElement.innerHTML = "";

    // Si no se proporciona la lista de clientes a mostrar, se utiliza la lista completa
    if (!clientesMostrar) {
        clientesMostrar = clientes;
    }

    // Crear la estructura de la tabla
    var tablaHTML =
        "<table>" +
        "<tr>" +
        "<th>Número de identificación</th>" +
        "<th>Nombres</th>" +
        "<th>Apellidos</th>" +
        "<th>Teléfono</th>" +
        "<th>Correo electrónico</th>" +
        "<th>Placa del auto</th>" +
        "<th>Tipo de vehiculo</th>" +
        "<th>Acciones</th>" +
        "</tr>";

    // Generar las filas de la tabla con los datos de los clientes
    var filasHTML = clientesMostrar.map(function (cliente, index) {
        return (
            "<tr>" +
            "<td>" + cliente.numeroIdentificacion + "</td>" +
            "<td>" + cliente.nombres + "</td>" +
            "<td>" + cliente.apellidos + "</td>" +
            "<td>" + cliente.telefono + "</td>" +
            "<td>" + cliente.correoElectronico + "</td>" +
            "<td>" + cliente.placa + "</td>" +
            "<td>" + cliente.vehiculo + "</td>" +
            "<td><button onclick=\"eliminarCliente(" + index + ")\">Eliminar</button>" +
            "</tr>"
        );
    });

    // Combinar las filas en el HTML de la tabla
    tablaHTML += filasHTML.join("");

    // Cerrar la tabla
    tablaHTML += "</table>";

    // Agregar la tabla de clientes al elemento HTML
    tablaClientesElement.innerHTML = tablaHTML;
}

// Agregar evento de envío del formulario de registro
document.getElementById("registroClienteForm").addEventListener("submit", registrarCliente);

// Agregar evento de entrada en el campo de búsqueda
document.getElementById("buscador").addEventListener("input", buscarClientes);

// Actualizar la lista de clientes inicialmente
actualizarListaClientes();

/* CODIGO PARA LA SECCION 2: GESTION DE RUTAS AEREAS*/

// Variables globales
let idCounter = 1; // Contador para generar IDs únicos
let listaRutas = []; // Array para almacenar las rutas

// Función para agregar una ruta
function agregarRuta(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Obtener los valores del formulario
    const nombreServicio = document.getElementById('nombreServicio').value;
    const valorServicio = document.getElementById('valorServicio').value;
    const ciudadOrigen = document.getElementById('ciudadOrigen').value;
    const puntosFidelizacion = document.getElementById('puntosFidelizacion').value;

    // Crear un objeto ruta con los valores ingresados
    const ruta = {
        id: idCounter++,
        nombre: nombreServicio,
        valorServicio: parseInt(valorServicio),
        origen: ciudadOrigen,
        puntosFidelizacion: parseInt(puntosFidelizacion)
    };

    // Agregar la ruta al array y limpiar el formulario
    listaRutas.push(ruta);
    limpiarFormulario();
    mostrarListaRutas();
    cargarOpcionesRutas();
}

// Función para limpiar el formulario después de agregar una ruta
function limpiarFormulario() {
    document.getElementById('nombreServicio').value = '';
    document.getElementById('valorServicio').value = '';
    document.getElementById('ciudadOrigen').value = '';
    document.getElementById('puntosFidelizacion').value = '';
}

// Función para mostrar la lista de rutas en la tabla
function mostrarListaRutas() {
    const tablaRutas = document.getElementById('listaRutas');
    // Limpiar la tabla
    tablaRutas.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre del Servicio</th>
                <th>Valor del Servicio</th>
                <th>Ciudad del servicio</th>
                <th>Puntos para Fidelización</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            ${listaRutas.map(generarFilaRuta).join('')}
        </tbody>
    `;
}

// Función auxiliar para generar la fila de una ruta
function generarFilaRuta(ruta) {
    return (

        "<tr>" +
        "<td>" + ruta.id +" </td>" +
        "<td>" + ruta.nombre + "</td>" +
        "<td>" + ruta.valorServicio + "</td>" +
        "<td>" + ruta.origen +"</td>" +
        "<td>" + ruta.puntosFidelizacion + "</td>" +
        "<td><button onclick=\"eliminarRuta(" + ruta.id + ")\">Eliminar</button>" +
        "</tr>"
        );
    
}
// Función para eliminar una ruta
function eliminarRuta(id) {
    // Filtrar la ruta con el ID proporcionado y actualizar el array de rutas
    listaRutas = listaRutas.filter(ruta => ruta.id !== id);
    mostrarListaRutas();
}

// Escuchar el evento submit del formulario y llamar a la función agregarRuta
document.getElementById('agregarServicio').addEventListener('submit', agregarRuta);

// Mostrar la lista de rutas inicialmente
mostrarListaRutas();

function cargarOpcionesClientes() {
    const clienteSelect = document.getElementById('cliente');
    clienteSelect.innerHTML = clientes.map(cliente => `<option value="${cliente.id}">${cliente.nombres} ${cliente.apellidos}</option>`);
}


// Función para cargar las opciones de rutas en el formulario de compra de tiquetes
function cargarOpcionesRutas() {
    const rutaSelect = document.getElementById("ruta");
    rutaSelect.innerHTML = "";

    listaRutas.map((ruta) => {
        const option = document.createElement("option");
        option.value = ruta.id;
        option.textContent = `${ruta.nombre}- en la ciudad de - ${ruta.origen} `;
        rutaSelect.appendChild(option);
    });
}

function comprarTiquete(event) {
    event.preventDefault();

    const clienteId = parseInt(document.getElementById("cliente").value);
    const rutaId = parseInt(document.getElementById("ruta").value);

    const cliente = clientes.find(cliente => cliente.id === clienteId);
    const ruta = listaRutas.find(ruta => ruta.id === rutaId);

    let valorSinImpuestos = ruta.valorServicio;
    if (typeof valorSinImpuestos !== 'number' || isNaN(valorSinImpuestos)) {
        alert('El valorSinImpuestos no es un número válido.');
        console.error('El valorSinImpuestos no es un número válido.');
        return;
    }

    const impuestoIVA = valorSinImpuestos * 0.14;
    const tasaImpuesto = valorSinImpuestos * 0.04;
    const valorTotal = valorSinImpuestos + impuestoIVA + tasaImpuesto;

    const compraResumen = document.getElementById('compra-resumen');
    compraResumen.innerHTML = '';

    const resumen = document.createElement('p');
    resumen.textContent = `Resumen de la Compra:
          Cliente: ${cliente.nombres} ${cliente.apellidos}
          Valor Servicio: $${valorSinImpuestos.toFixed(2)}
          Impuesto IVA (14%): $${impuestoIVA.toFixed(2)}
          Total a Pagar: $${valorTotal.toFixed(2)}`;
    compraResumen.appendChild(resumen);

    // Abonar puntos de fidelización al cliente
    cliente.puntosFidelizacion += ruta.puntosFidelizacion;

    // Actualizar la lista de puntos de fidelización
    mostrarPuntosFidelizacion();

    // Limpiar el formulario
    document.getElementById('compra-form').reset();
}

// Escuchar el evento submit del formulario de compra de tiquetes y llamar a la función comprarTiquete
document.getElementById('compra-form').addEventListener('submit', comprarTiquete);


