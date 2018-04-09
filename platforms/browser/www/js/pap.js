/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

document.write("<script type='text/javascript' src='util.js'></script>");
document.write("<script type='text/javascript' src='index.js'></script>");
document.write("<script type='text/javascript' src='settings.js'></script>");

//var usuario = {
//    codTipoDocumento: 0, documentoIdentidad: null, nombre: null, apellido: null, correo: null, edad: 0, fechaNacimiento: null, codigo: null,
//    clave: null, claveConfirmacion: null, sexo: null, direccion: null, telefono: null, telefonoCelular: null
//};
//
//var solicitudRegistro = {
//    codSolicitudRegistro: 0, codCliente: 0, codDpto: 0, codCiudad: 0, fechaRegistro: null, horaRegistro: null
//};

function cargarClientes() {
    if ($('#epsUsuario').has('option').length <= 1) {
        $.ajax({
            url: servicio + 'generic/get/clientes',
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (resp) {
                for (var n = 0; n < resp.length; n++)
                {
                    var object = JSON.parse(resp[n]);
                    $('#epsUsuario').append($('<option>', {
                        value: object.codigo,
                        text: object.nombre
                    }));
                }

            },
            error: function (e) {
                var mensaje = message(e);
                if (mensaje == null) {
                    console.log("error al cargar clientes.")
                } else {
                    console.log(mensaje);
                }
            }
        });
    }
}

function cargarDepartamentos() {
    if ($('#departamentoUsuario').has('option').length <= 1) {
        $.ajax({
            url: servicio + 'generic/get/departamentos',
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (resp) {
                for (var n = 0; n < resp.length; n++)
                {
                    var object = JSON.parse(resp[n]);
                    $('#departamentoUsuario').append($('<option>', {
                        value: object.codigo,
                        text: object.nombre
                    }));
                    $('#departamentoEnvio').append($('<option>', {
                        value: object.codigo,
                        text: object.nombre
                    }));
                }

            }
        });
    }
}

function cargarDepartamentosMapa() {
    if ($('#departamentoMapa').has('option').length <= 1) {
        $.ajax({
            url: servicio + 'generic/get/departamentos',
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (resp) {
                for (var n = 0; n < resp.length; n++)
                {
                    var object = JSON.parse(resp[n]);
                    $('#departamentoMapa').append($('<option>', {
                        value: object.codigo,
                        text: object.nombre
                    }));
                }

            }
        });
    }
}

function cargarMunicipiosMapa(codDepartamento) {
    $('#municipioMapa').find('option').remove();
    $.ajax({
        url: servicio + 'generic/get/municipios/' + codDepartamento,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (resp) {
            for (var n = 0; n < resp.length; n++)
            {
                var object = JSON.parse(resp[n]);
                $('#municipioMapa').append($('<option>', {
                    value: object.codigo,
                    text: object.nombre
                }));
            }
        }
    });
    $('#municipioMapa').selectmenu('refresh');
}

function cargarMunicipios(codDepartamento) {
    $('#municipioUsuario').find('option').remove();
    $('#municipioUsuario').append($('<option>', {
        value: -1,
        text: 'Seleccione'
    }, true));
    $.ajax({
        url: servicio + 'generic/get/municipios/' + codDepartamento,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (resp) {
            for (var n = 0; n < resp.length; n++)
            {
                var object = JSON.parse(resp[n]);
                $('#municipioUsuario').append($('<option>', {
                    value: object.codigo,
                    text: object.nombre
                }));
            }
        }
    });
    $('#municipioUsuario').selectmenu('refresh');
}


function registrarUsuario() {
    usuario.codTipoDocumento = document.getElementById("tipoDocumentoUsuario").value;
    usuario.documentoIdentidad = document.getElementById("documentoUsuario").value;
    usuario.nombre = document.getElementById("nombreUsuario").value;
    usuario.apellido = document.getElementById("apellidoUsuario").value;
    usuario.correo = document.getElementById("correoUsuario").value;
    usuario.clave = document.getElementById("claveUsuario").value;
    usuario.claveConfirmacion = document.getElementById("claveConfirmacionUsuario").value;
    usuario.fechaNacimiento = document.getElementById("fechaNacimientoUsuario").value;
    if ($('#radio1:checked').val() != null && $('#radio1:checked').val() !== 'undefined') {
        usuario.sexo = $('#radio1:checked').val();
    }
    if ($('#radio2:checked').val() != null && $('#radio2:checked').val() !== 'undefined') {
        usuario.sexo = $('#radio2:checked').val();
    }
    usuario.direccion = $("#direccionUsuario").val();
    usuario.telefono = $("#telefonoUsuario").val();
    usuario.telefonoCelular = $("#celularUsuario").val();

    solicitudRegistro.codCliente = document.getElementById("epsUsuario").value;
    solicitudRegistro.codDpto = document.getElementById("departamentoUsuario").value;
    solicitudRegistro.codCiudad = document.getElementById("municipioUsuario").value;

    if (validarRegistroUsuario(usuario, solicitudRegistro)) {
        mensajeAlerta('Registro de Usuario','Por favor ingrese los datos requeridos.');
        return;
    }

    if (!$('#acuerdoUsuario').is(":checked")) {
        mensajeAlerta('Registro de Usuario', 'Acepte los terminos y condiciones');
        return;
    }


//    var data = JSON.stringify({cupon: cupon, centroComercial: centroComercial, tienda: tienda, categoria: categoria, usuario: usuario});
    var data = JSON.stringify({usuario: usuario, solicitudRegistro: solicitudRegistro});

    $.ajax({
        url: servicio + 'generic/post/usuario',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: data,
        success: function (resp) {
            //función cargar cupones usuario.
            mensajeAlerta('Creación de Usuario', 'Usuario creado correctamente. ');
            $.mobile.navigate("#page-signin");
        },
        error: function (e) {
            var mensaje = message(e);
            if (mensaje == null) {
                mensajeSoporte();
            } else {
                mensajeAlerta('Registro de Usuario', mensaje);
            }
        }
    });
}

function cargarAutorizacionesUsuario() {
    usuario.codigo = '123';
    $.ajax({
        url: servicio + 'generic/get/AutorizacionesUsuario',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(usuario),
        success: function (resp) {
            listarAutorizacionesUsuario(resp);
        },
        error: function (e) {
            var mensaje = message(e);
            if (mensaje == null) {
                mensajeSoporte();
            } else {
                mensajeAlerta('Error',mensaje);
            }
        }
    });
}

function listarAutorizacionesUsuario(resp) {
    for (var i = 0; i < resp.length; i++) {
        var autorizacion = JSON.parse(resp[i]);
        $('#autorizaciones').append('<option value="' + autorizacion.codAutorizacion + '">' + autorizacion.codAutorizacion + '</option>');
    }
    $('#autorizaciones').selectmenu('refresh');
}

function cargarCafsCiudad(ciudad, latlng, map) {
    //var cafsResp =[];
    $.ajax({
        url: servicio + 'generic/get/CafsCiudad/' + ciudad,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        success: function (resp) {
            var cafs = [];
            for (var i = 0; i < resp.length; i++) {
                var object = JSON.parse(resp[i]);
                cafs.push({codigo: object.codigo, nombre: object.nombre, latitud: object.latitud, longitud: object.longitud, distancia: 0});
            }
            //cafsResp=cafs;
            listarCafs(cafs, latlng, map);
        }
    });
    //listarCafs(cafsResp);
    //return cafsResp;
}
function ventana_detalle(marker, distancia) {
    var infowindow = new google.maps.InfoWindow({
        content: '<div style="color: black;">' + marker.title + '<br> La Distancia al caf es: ' + distancia + ' metros</div>'
    });

    marker.addListener('click', function () {
        infowindow.open(marker.get('map'), marker);
    });
}
function listarCafs(cafs, latlng, map)
{
    var distancia;
    var cafImgen = 'images/audifarma.png';
    for (var i = 0; i < cafs.length; i++) {
        var caf = cafs[i];
        var marker = new google.maps.Marker({
            position: {lat: parseFloat(caf.latitud), lng: parseFloat(caf.longitud)},
            map: map,
            icon: cafImgen,
            title: caf.nombre,
            zIndex: i + 1,
            label: caf.nombre
        });
        distancia = google.maps.geometry.spherical.computeDistanceBetween(latlng, new google.maps.LatLng(caf.latitud, caf.longitud));
        cafs[i].distancia = distancia;
        ventana_detalle(marker, distancia.toFixed(0).toString());
    }

    cafs.sort(function (a, b) {
        var a1 = a.distancia, b1 = b.distancia;
        if (a1 == b1)
            return 0;
        return a1 < b1 ? 1 : -1;
    });
    $('#cafs option').remove();
    $('#cafs').selectmenu('refresh');
    for (var i = 0; i < cafs.length; i++) {
        var caf = cafs[i];
        $('#cafs').append('<option value="' + caf.codigo + '">' + caf.nombre + '</option>');
    }
    $('#cafs').selectmenu('refresh');

    for (var i = 0; i < cafs.length; i++) {
        var caf = cafs[i];
        $('#cafsac').append('<option value=441>PEREIRA ESPECIALIZADO MAC</option>');
    }
    $('#cafsac').selectmenu('refresh');
}

function cargarCafsDepartamento(departamento) {
    var cafsResp = [];
    $.ajax({
        url: servicio + 'generic/get/CafsDepartamento/' + departamento,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        success: function (resp) {
            var cafs = [];
            for (var i = 0; i < resp.length; i++) {
                var object = JSON.parse(resp[i]);
                cafs.push({codigo: object.codigo, nombre: object.nombre, latitud: object.latitud, longitud: object.longitud, distancia: 0});
            }
            cafsResp = cafs;

        }
    });
    return cafsResp;
}

function getAcuerdo() {
    acuerdo = "Entre las partes de conviene que: \n\
\n\
1. AUDIFARMA S.A, es una empresa dedicada al suministro de medicamentos y debido a que actúa como operador logístico de la EPS a la que pertenezco, es quien realiza el proceso de dispensación de medicamentos que me son prescritos.\
\n\n\
2. Que AUDIFARMA diseñó el Sistema de Información de Usuarios con el fin de publicar información general de interés para todas las personas a las que se les dispensan medicamentos, el cual es  de acceso libre.\
\n\n\
3. Que cada usuario tiene derecho a consultar información única y privada sobre el proceso de entrega de sus medicamentos, para lo cual el usuario se debe Registrar y crear usuario y clave, la cual es única por persona.\
\n\n\
4. Que para acceder a esta información, el Usuario necesariamente debe registrar como datos obligatorios, la dirección del correo electrónico y teléfonos de contacto. Con base en lo anterior y teniendo en cuenta que reúno las condiciones de Usuario de la empresa AUDIFARMA S.A., notifico que obrando libre y voluntariamente bajo mi propio nombre, en uso del pleno de mis facultades legales e intelectuales, por medio del presente escrito, MANIFIESTO Y DECLARO:\
\n\n\
1. Que una vez leído el documento denominado ACUERDO DE INGRESO AL SISTEMA Y POLÍTICAS DE USO DE LA INFORMACIÓN de la empresa Audifarma S.A., estoy de acuerdo con su contenido y lo acepto en su totalidad.\
\n\n\
2. Que me comprometo a dar uso adecuado a la información que se encuentra en este sistema.\
\n\n\
3. Que me comprometo a Utilizar la información sólo como medio de ayuda para acceder a la dispensación de sus medicamentos.\
\n\n\
4. Que me responsabilizo del uso que dé a la información extraída del sistema de Información de Usuarios de Audifarma con su usuario y clave.\
\n\n\
5. Que me comprometo a No compartir su usuario y clave de acceso con otras persona.\
\n\n\
6. Que me comprometo a Contactar a Audifarma en caso de evidenciar algún fallo en la información extraída.\
\n\n\
7. Que me comprometo a Permitir a Audifarma el uso de la información consignada al momento de su registro para efectos de contacto como correo electrónico y teléfonos de contacto.";
    return acuerdo;
}

function iniciarSesion() {
    usuario.documentoIdentidad = document.getElementById("documentoUsuario").value;
    usuario.clave = document.getElementById("claveUsuario").value;
    $.ajax({
        url: servicio + 'generic/post/validarUsuario',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(usuario),
        success: function (resp) {
            //función cargar cupones usuario.
            mensajeAlerta('Inicio de Sessión','Usuario logueado');
        },
        error: function (e) {
            var mensaje = message(e);
            if (mensaje == null) {
                mensajeSoporte();
            } else {
                mensajeAlerta('Error',mensaje);
            }
        }
    });
}

function quitarAcentos(cadena)
{
    cadena = cadena.replace('Á', 'A');
    cadena = cadena.replace('É', 'E');
    cadena = cadena.replace('Í', 'I');
    cadena = cadena.replace('Ó', 'O');
    cadena = cadena.replace('Ú', 'U');
    cadena = cadena.replace('Ñ', 'N');
    cadena = cadena.replace('Ä', 'A');
    cadena = cadena.replace('Ë', 'E');
    cadena = cadena.replace('Ï', 'I');
    cadena = cadena.replace('Ö', 'O');
    cadena = cadena.replace('Ü', 'U');
    return cadena;
}
