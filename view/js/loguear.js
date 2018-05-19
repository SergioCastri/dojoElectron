//Módulo para comunicar la vista con el controlador
const ipcRenderer = require('electron').ipcRenderer;

function loguear(event) {
    console.log('Va a registrar');
    event.preventDefault() // evita que se haga el submit del form
    
    // Captura datos del html   
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;    

    // Envia al controlador los datos y un canal
    ipcRenderer.send('ingresar-submission', user, pass);
}

// En caso de error se muestra el mensaje
ipcRenderer.on('error-message', function (event, message) {
    
    const responseParagraph = document.getElementById('response');

    responseParagraph.innerHTML = message
});

// Si se ingresa correctamente
ipcRenderer.on('ingreso-exitoso', function(event, file){

    window.location.replace(file);
});

// Si los datos no concuerdan
ipcRenderer.on('ingreso-denegado', function(event, file){

    window.location.replace(file);
});

