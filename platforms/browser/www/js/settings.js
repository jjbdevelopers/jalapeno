var servicio = "http://rs-pvapp.rhcloud.com/webresources/";

var usuario = {
    codTipoDocumento: 0, documentoIdentidad: null, nombre: null, apellido: null, usuario: null, correo: null, edad: 0, fechaNacimiento: null, codigo: null,
    clave: null, claveConfirmacion: null, sexo: null, direccion: null, telefono: null, telefonoCelular: null, regId: null, tUsuarioSiuDirecciones: tUsuarioSiuDirecciones
};

var solicitudRegistro = {
    codSolicitudRegistro: 0, codCliente: 0, codDpto: 0, codCiudad: 0, fechaRegistro: null, horaRegistro: null
};

var alistamientoPK = {
    codEmpresa: 0, codCaf: null, numeroAlistamiento: 0
};

var alistamiento = {
    alistamientoPK: alistamientoPK, nap: null, estado: null
};

var tUsuarioSiuDireccionesPK = {
    codTipoDocumento: 0, documentoIdentidad: null, codMpio: 0, direccion: null
};

var tUsuarioSiuDirecciones = {
    tUsuarioSiuDireccionesPK: tUsuarioSiuDireccionesPK, telefono: null
};
//var servicio = "http://10.1.1.185:8095/paprs/webresources/";
//var servicio = "http://localhost:9090/webresources/";
//var servicio = "http://localhost:8080/webresources/";
//var servicio = "http://localhost:8084/rs/webresources/";

var c = c || {};
c.Settings = c.Settings || {};
c.Estados = c.Estados || {};
c.Estados.ALISTAR_PAP_MOVIL = 'ALISTAR_PAP_MOVIL';
c.Estados.ALISTAR_PAP_MOVIL_DOMICILIO = 'ALISTAR_PAP_MOVIL_DOMICILIO';
c.Settings.TYPE_POST = 'POST';
c.Settings.TYPE_GET = 'GET';
c.Settings.APPLICATION_JSON = 'application/json';
c.Settings.DATA_TYPE_JSON = 'json';
c.Settings.COD_INSTITUCION = 3;

//c.Settings.signUpUrl = "http://127.0.0.1:30000/api/account/register";  //"http://192.168.1.104:30000/api/account/register"; //;
//c.Settings.signInUrl = "http://190.14.226.155:8095/paprs/webresources/generic/post/validarUsuario";//"http://127.0.0.1:30000/api/account/logon"; //"http://192.168.1.104:30000/api/account/logon"; //
c.Settings.signInUrl = servicio + "generic/post/validarUsuario";
c.Settings.recordarUrl = servicio + "generic/post/recordarUsuario";
c.Settings.autorizacionUrl = servicio + "pap/get/autorizacionesUsuario";
c.Settings.agendaUsuarionUrl = servicio + "oasys/get/agendaUsuario/" + c.Settings.COD_INSTITUCION + "/{codDocumento}/{documentoIdentidad}/{fecha}";
c.Settings.confirmarAutorizacionUrl = servicio + 'pap/post/autorizacionesUsuario';
c.Settings.alistamientoUrl = servicio + "pap/get/alistamientosUsuario";
c.Settings.bookingsUrl = servicio + "generic/post/validarUsuario";
c.Settings.direccionesUsuarioUrl = servicio + "generic/get/direccionesUsuario";
c.Settings.sessionIdKey = "pap-session";
c.Settings.sessionTimeoutInMSec = 86400000 * 30;   // 30 days.
c.Settings.usuario = usuario;
c.Settings.solicitudRegistro = solicitudRegistro;
c.Settings.municipiosUrl = servicio + 'generic/get/municipios/';

