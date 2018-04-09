//var servicio = "http://rs-pvapp.rhcloud.com/webresources/";
// var servicio = "http://127.0.0.1:8084/webresources/";
// var servicio = "http://localhost:8081/webresources/";
//var servicio = "http://190.14.226.155:8095/rs/webresources/";
//var servicio = "http://rsapp-rsapp.a3c1.starter-us-west-1.openshiftapps.com/webresources/";
var servicio = "http://localizarsjws-app-localizars.7e14.starter-us-west-2.openshiftapps.com/webresources/";

var usuario = {
    codTipoDocumento: 0, documentoIdentidad: null, nombre: null, apellido: null, usuario: null, correo: null, edad: 0, fechaNacimiento: null, codigo: null,
    clave: null, claveConfirmacion: null, sexo: null, direccion: null, telefono: null, telefonoCelular: null, regId: null, dispositivos: Dispositivos
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

var DispositivosPK = {
    correo: null, codDispositivo: 0
};

var Dispositivos = {
    dispositivosPK: DispositivosPK, identificador: null, fecha: null, serial: null
};

var LocalizacionesDispositivoPK = {
    correo: null, codDispositivo: 0, codLocalizacion: 0
};

var LocalizacionesDispositivo = {
    localizacionesDispositivoPK: LocalizacionesDispositivoPK, fecha: null, latitude: 0, longitud: 0
};


//var servicio = "http://10.1.1.185:8095/paprs/webresources/";
//var servicio = "http://localhost:9090/webresources/";
//var servicio = "http://localhost:8080/webresources/";
//var servicio = "http://localhost:8084/rs/webresources/";

var c = c || {};
c.Settings = c.Settings || {};
c.Estados = c.Estados || {};
c.Estilos = c.Estilos || {};

c.Estilos.INVISIBLE_STYLE = 'bi-invisible';
c.Estilos.INVALID_INPUT_STYLE = 'bi-invalid-input';

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
c.Settings.dispositivosUsuarioUrl = servicio + "localizador/get/dispositivos/usuario/{correo}";
c.Settings.dispositivosGrupoUsuarioUrl = servicio + "localizador/get/dispositivos/grupo/usuario/{correo}/{codGrupo}";
c.Settings.localizacionesDispisitivoUrl = servicio + "localizador/post/localizaciones/dispositivo";
c.Settings.registrarUsuario = servicio + "generic/post/registrar/usuario";
c.Settings.actualizarUsuario = servicio + "generic/put/usuario";
c.Settings.gruposUrl = servicio + "localizador/get/grupos/usuario/{correo}";
c.Settings.sessionIdKey = "localiza-session";
c.Settings.guardarGruposUrl = servicio + "localizador/get/grupos/guardar/{nombreGrupo}/{correo}";
c.Settings.sessionTimeoutInMSec = 86400000 * 30;   // 30 days.
c.Settings.usuario = usuario;
c.Settings.usuario.dispositivos = Dispositivos;
c.Settings.solicitudRegistro = solicitudRegistro;
c.Settings.municipiosUrl = servicio + 'generic/get/municipios/';

