
function message(e) {
    var html = $.parseHTML(e.responseText)
    if (html != null) {
        for (var i = 0; i < html.length; i++) {
            if (html[i].innerHTML != null && html[i].innerHTML.indexOf('java.lang') !== -1) {
                return html[i].innerHTML.split(":")[1].trim();
            }
        }
    }
}

function mensajeSoporte() {
    mensajeAlerta('Error', 'Error no controlado, contactenos para asistirte o intenta de nuevo.');
}

function getMsjSoporte() {
    return 'Ocurrio un problema no controlado. Por favor intentelo en unos minutos.';
}


function status() {
    return "<center><img src='./img/spinner.gif'/></center>";
}

function mensajeAlerta(titulo, mensaje) {
    navigator.notification.confirm(mensaje, null, titulo, 'Aceptar');
}
function redireccionarRegistro(buttonIndex) {
    if (buttonIndex == 2) {
        $.mobile.navigate("#divRegistrarUsuario");
    }
}

function redireccionarRecordarClave(buttonIndex) {
    if (buttonIndex == 2) {
        $.mobile.navigate("#page-remember");
    }
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

