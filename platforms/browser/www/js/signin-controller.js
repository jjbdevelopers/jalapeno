var c = c || {};

c.SignInController = function () {
    this.$signInPage = null;
    this.bookingsPageId = null;
    this.$btnSubmit = null;
    this.$ctnErr = null;
    this.$txtdocumento = null;
    this.$txtdocumentoRecordar = null;
    this.$txtPassword = null;
    this.$txtRegId = null;
    this.$chkKeepSignedIn = null;
    this.$remeberPage = null;
};

c.SignInController.prototype.init = function () {
    this.$signInPage = $("#page-signin");
    this.bookingsPageId = "#pap";
    this.papPageId = "#menu";
    this.$btnSubmit = $("#btn-submit", this.$signInPage);
    this.$ctnErr = $("#ctn-err", this.$signInPage);
    this.$txtdocumento = $("#txt-documento", this.$signInPage);
    this.$txtPassword = $("#txt-password", this.$signInPage);
    this.$txtRegId = $("#txt-regId", this.$signInPage);
    this.$chkKeepSignedIn = $("#chk-keep-signed-in", this.$signInPage);
};

c.SignInController.prototype.initRemember = function () {
    this.$signInPage = $("#page-signin");
    this.$remeberPage = $("#page-remember");
    this.bookingsPageId = "#pap";
    this.papPageId = "#menu";
    this.$btnSubmit = $("#btn-submit", this.$remeberPage);
    this.$ctnErr = $("#ctn-err", this.$remeberPage);
    this.$txtdocumentoRecordar = $("#txt-documento-recordar", this.$remeberPage);
};


c.SignInController.prototype.emailAddressIsValid = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

c.SignInController.prototype.resetSignInForm = function () {

    var invisibleStyle = "bi-invisible",
            invalidInputStyle = "bi-invalid-input";

    this.$ctnErr.html("");
    this.$ctnErr.removeClass().addClass(invisibleStyle);
    this.$txtdocumento.removeClass(invalidInputStyle);
    this.$txtPassword.removeClass(invalidInputStyle);
    this.$txtdocumento.val("");
    this.$txtPassword.val("");
    this.$txtRegId.val("");
    this.$chkKeepSignedIn.prop("checked", false);

};
//var usuario = {
//    codTipoDocumento: 0, documentoIdentidad: null, nombre: null, apellido: null, correo: null, edad: 0, fechaNacimiento: null, codigo: null, clave: null, claveConfirmacion: null, sexo: null
//};


c.SignInController.prototype.onSignInCommand = function () {
    var usuario = c.Settings.usuario;
    var me = this,
            emailAddress = me.$txtdocumento.val().trim(),
            password = me.$txtPassword.val().trim(),
            regId = me.$txtRegId.val().trim(),
            invalidInput = false,
            invisibleStyle = "bi-invisible",
            invalidInputStyle = "bi-invalid-input";

    // Reset styles.
    me.$ctnErr.removeClass().addClass(invisibleStyle);
    me.$txtdocumento.removeClass(invalidInputStyle);
    me.$txtPassword.removeClass(invalidInputStyle);

    // Flag each invalid field.
    if (emailAddress.length === 0) {
        me.$txtdocumento.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (password.length === 0) {
        me.$txtPassword.addClass(invalidInputStyle);
        invalidInput = true;
    }

    // Make sure that all the required fields have values.
    if (invalidInput) {
        me.$ctnErr.html("<p>Porfavor ingrese los datos requeridos.</p>");
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        return;
    }

//    if (!me.emailAddressIsValid(emailAddress)) {
//        me.$ctnErr.html("<p>Please enter a valid email address.</p>");
//        me.$ctnErr.addClass("bi-ctn-err").slideDown();
//        me.$txtdocumento.addClass(invalidInputStyle);
//        return;
//    }
    usuario.usuario = emailAddress;
    usuario.clave = password;
    usuario.regId = regId;
    $.mobile.loading("show");

    $.ajax({
        type: 'POST',
        url: c.Settings.signInUrl,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(usuario), //"email=" + emailAddress + "&password=" + password,
        success: function (resp) {
            $.mobile.loading("hide");

            if (resp.success === true) {
                // Create session.                 
                var today = new Date();
                var expirationDate = new Date();
                expirationDate.setTime(today.getTime() + c.Settings.sessionTimeoutInMSec);

                usuario.codTipoDocumento = resp.codTipoDocumento;
                usuario.documentoIdentidad = resp.documentoIdentidad;
                usuario.nombre = resp.nombre;
                usuario.apellido = resp.apellido;
                usuario.correo = resp.correo;

                c.Session.getInstance().set({
                    userProfileModel: resp.nombre + ' ' + resp.apellido,
                    sessionId: resp.correo,
                    expirationDate: expirationDate,
//                    keepSignedIn: me.$chkKeepSignedIn.is(":checked"),
                    keepSignedIn: me.$chkKeepSignedIn.val().match(/^(true|t|yes|y|1)$/i),
                    usuario: usuario
                });
                // Go to main menu.
                $.mobile.navigate(me.papPageId);
                return;
            } else {
                if (resp.extras.msg) {
                    switch (resp.extras.msg) {
                        case c.ApiMessages.DB_ERROR:
                            // TODO: Use a friendlier error message below.
                            me.$ctnErr.html("<p>Ocurrio un problema y no se ha podido iniciar sesión.  Por favor intentelo en unos minutos.</p>");
                            me.$ctnErr.addClass("bi-ctn-err").slideDown();
                            break;
                        case c.ApiMessages.INVALID_PWD:
                        case c.ApiMessages.EMAIL_NOT_FOUND:
                            me.$ctnErr.html("<p>Usuario o contraseña incorrectos.  Por favor intentelo nuevamente.</p>");
                            me.$ctnErr.addClass("bi-ctn-err").slideDown();
                            me.$txtdocumento.addClass(invalidInputStyle);
                            break;
                    }
                }
            }
        },
        error: function (e) {
            $.mobile.loading("hide");

            // TODO: Use a friendlier error message below.
//            me.$ctnErr.html("<p>Ocurrio un problema y no se ha podido iniciar sesión.  Por favor intentelo en unos minutos.</p>");
            var mensaje = message(e);
            console.log(mensaje);
            if (mensaje == null) {
                me.$ctnErr.html("<p>Ocurrio un problema y no se ha podido iniciar sesión.  Por favor intentelo en unos minutos.</p>");
            } else if (mensaje == "MSG_USUARIO_NO_EXISTE") {
                navigator.notification.confirm(
                        'El usuario ingresado no existe', // message
                        redireccionarRegistro, // callback to invoke
                        'Ingreso de Usuario', // title
                        ['Intentar nuevamente', 'Registrarse']             // buttonLabels
                        );
            } else if (mensaje == "MSG_OLVIDO_CLAVE") {
                navigator.notification.confirm(
                        'La clave ingresada no es correcta.', // message
                        redireccionarRecordarClave, // callback to invoke
                        'Ingreso de Usuario', // title
                        ['Intentar nuevamente', 'Recordar Contraseña']             // buttonLabels
                        );
            } else {
                me.$ctnErr.html("<p>" + mensaje + "</p>");
            }
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
};

c.SignInController.prototype.onRememberCommand = function () {
    var usuario = c.Settings.usuario;
    var me = this,
            emailAddress = me.$txtdocumentoRecordar.val().trim(),
            password = me.$txtPassword.val().trim(),
            regId = me.$txtRegId.val().trim(),
            invalidInput = false,
            invisibleStyle = "bi-invisible",
            invalidInputStyle = "bi-invalid-input";

    // Reset styles.
    me.$ctnErr.removeClass().addClass(invisibleStyle);
    me.$txtdocumentoRecordar.removeClass(invalidInputStyle);
    me.$txtPassword.removeClass(invalidInputStyle);

    // Flag each invalid field.
    if (emailAddress.length === 0) {
        me.$txtdocumentoRecordar.addClass(invalidInputStyle);
        invalidInput = true;
    }

    // Make sure that all the required fields have values.
    if (invalidInput) {
        me.$ctnErr.html("<p>Porfavor ingrese los datos requeridos.</p>");
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        return;
    }

    usuario.documentoIdentidad = emailAddress;
    $.mobile.loading("show");

    $.ajax({
        type: 'POST',
        url: c.Settings.recordarUrl,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(usuario), //"email=" + emailAddress + "&password=" + password,
        success: function (resp) {
            $.mobile.loading("hide");

            if (resp.success === true) {
                // Create session.                 
                me.$ctnErr.html("<p>Los datos de ingreso serán enviados al correo registrado.</p>");
                me.$ctnErr.addClass("bi-ctn-err").slideDown();
                // Go to main menu.
                //$.mobile.navigate(me.$signInPage);
                return;
            } else {
                if (resp.extras.msg) {
                    switch (resp.extras.msg) {
                        case c.ApiMessages.DB_ERROR:
                            // TODO: Use a friendlier error message below.
                            me.$ctnErr.html("<p>Ocurrio un problema y no se ha podido iniciar sesión.  Por favor intentelo en unos minutos.</p>");
                            me.$ctnErr.addClass("bi-ctn-err").slideDown();
                            break;
                        case c.ApiMessages.INVALID_PWD:
                        case c.ApiMessages.EMAIL_NOT_FOUND:
                            me.$ctnErr.html("<p>Usuario o contraseña incorrectos.  Por favor intentelo nuevamente.</p>");
                            me.$ctnErr.addClass("bi-ctn-err").slideDown();
                            me.$txtdocumentoRecordar.addClass(invalidInputStyle);
                            break;
                    }
                }
            }
        },
        error: function (e) {
            $.mobile.loading("hide");
            console.log(e.message);
            // TODO: Use a friendlier error message below.
//            me.$ctnErr.html("<p>Ocurrio un problema y no se ha podido iniciar sesión.  Por favor intentelo en unos minutos.</p>");
            var mensaje = message(e);
            if (mensaje == null) {
                me.$ctnErr.html("<p>Ocurrio un problema y no se ha podido enviar la información.  Por favor intentelo en unos minutos.</p>");
            } else if (mensaje == "MSG_USUARIO_NO_EXISTE") {
                navigator.notification.confirm(
                        'El usuario ingresado no existe', // message
                        redireccionarRegistro, // callback to invoke
                        'Ingreso de Usuario', // title
                        ['Intentar nuevamente', 'Registrarse']             // buttonLabels
                        );
            } else {
                me.$ctnErr.html("<p>" + mensaje + "</p>");
            }
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
};

//c.RegistroUsuarioController = function () {
//    this.$divRegistrarUsuario = null;
//    this.$tipoDocumentoUsuario = null;
//    this.$documentoUsuario = null;
//    this.$nombreUsuario = null;
//    this.$apellidoUsuario = null;
//    this.$epsUsuario = null;
//    this.$fechaNacimientoUsuario = null;
//    this.$radio = null;
//    this.$departamentoUsuario = null;
//    this.$municipioUsuario = null;
//    this.$direccionUsuario = null;
//    this.$correoUsuario = null;
//    this.$telefonoUsuario = null;
//    this.$celularUsuario = null;
//    this.$claveUsuario = null;
//    this.$claveConfirmacionUsuario = null;
//};
//
//c.RegistroUsuarioController.prototype.init = function () {
//    this.$divRegistrarUsuario = $("#divRegistrarUsuario");
//    this.$tipoDocumentoUsuario = $("#tipoDocumentoUsuario", this.$divRegistrarUsuario);
//    this.$documentoUsuario = $("#documentoUsuario", this.$divRegistrarUsuario);
//    this.$nombreUsuario = $("#nombreUsuario", this.$divRegistrarUsuario);
//    this.$apellidoUsuario = $("#apellidoUsuario", this.$divRegistrarUsuario);
//    this.$epsUsuario = $("#epsUsuario", this.$divRegistrarUsuario);
//    this.$fechaNacimientoUsuario = $("#fechaNacimientoUsuario", this.$divRegistrarUsuario);
//    this.$radio = $("#radio", this.$divRegistrarUsuario);
//    this.$departamentoUsuario = $("#departamentoUsuario", this.$divRegistrarUsuario);
//    this.$municipioUsuario = $("#municipioUsuario", this.$divRegistrarUsuario);
//    this.$direccionUsuario = $("#direccionUsuario", this.$divRegistrarUsuario);
//    this.$correoUsuario = $("#correoUsuario", this.$divRegistrarUsuario);
//    this.$telefonoUsuario = $("#telefonoUsuario", this.$divRegistrarUsuario);
//    this.$celularUsuario = $("#celularUsuario", this.$divRegistrarUsuario);
//    this.$claveUsuario = $("#claveUsuario", this.$divRegistrarUsuario);
//    this.$claveConfirmacionUsuario = $("#claveConfirmacionUsuario", this.$divRegistrarUsuario);
//};
//
//c.RegistroUsuarioController.prototype.validarRegistroUsuario = function (usuario, solicitudRegistro) {
//    var invalidInput = false, invisibleStyle = "bi-invisible",
//            invalidInputStyle = "bi-invalid-input", invalidSelectStyle = "bi-invalid-select";
//
//    this.$tipoDocumentoUsuario.removeClass(invalidInputStyle);
//    this.$documentoUsuario.removeClass(invalidInputStyle);
//    this.$nombreUsuario.removeClass(invalidInputStyle);
//    this.$apellidoUsuario.removeClass(invalidInputStyle);
//    this.$epsUsuario.removeClass(invalidInputStyle);
//    this.$fechaNacimientoUsuario.removeClass(invalidInputStyle);
//    this.$departamentoUsuario.removeClass(invalidInputStyle);
//    this.$municipioUsuario.removeClass(invalidInputStyle);
//    this.$direccionUsuario.removeClass(invalidInputStyle);
//    this.$correoUsuario.removeClass(invalidInputStyle);
//    this.$telefonoUsuario.removeClass(invalidInputStyle);
//    this.$celularUsuario.removeClass(invalidInputStyle);
//    this.$claveUsuario.removeClass(invalidInputStyle);
//    this.$claveConfirmacionUsuario.removeClass(invalidInputStyle);
//
//    if (usuario.codTipoDocumento === -1 || usuario.codTipoDocumento.length === 0) {
//        this.$tipoDocumentoUsuario.addClass(invalidInputStyle);
//        invalidInput = true;
//    }
//    if (usuario.documentoIdentidad.length === 0) {
//        this.$documentoUsuario.addClass(invalidInputStyle);
//        invalidInput = true;
//    }
//    if (usuario.nombre.length === 0) {
//        this.$nombreUsuario.addClass(invalidInputStyle);
//        invalidInput = true;
//    }
//    if (usuario.apellido.length === 0) {
//        this.$apellidoUsuario.addClass(invalidInputStyle);
//        invalidInput = true;
//    }
//    if (solicitudRegistro.codCliente == -1) {
//        this.$epsUsuario.addClass(invalidInputStyle);
//        invalidInput = true;
//    }
//    if (usuario.fechaNacimiento.length === 0) {
//        this.$fechaNacimientoUsuario.addClass(invalidInputStyle);
//        invalidInput = true;
//    }
//    if (solicitudRegistro.codDpto == -1) {
//        this.$departamentoUsuario.addClass(invalidInputStyle);
//        invalidInput = true;
//    }
//    if (solicitudRegistro.codCiudad == -1) {
//        this.$municipioUsuario.addClass(invalidInputStyle);
//        invalidInput = true;
//    }
//    if (usuario.direccion.length === 0) {
//        this.$direccionUsuario.addClass(invalidInputStyle);
//        invalidInput = true;
//    }
//    if (usuario.correo.length === 0) {
//        this.$correoUsuario.addClass(invalidInputStyle);
//        invalidInput = true;
//    }
//    if (usuario.telefono.length === 0) {
//        if (usuario.telefonoCelular.length === 0) {
//            this.$telefonoUsuario.addClass(invalidInputStyle);
//            invalidInput = true;
//        }
//    }
//    if (usuario.telefonoCelular.length === 0) {
//        if (usuario.telefono.length === 0) {
//            this.$celularUsuario.addClass(invalidInputStyle);
//            invalidInput = true;
//        }
//    }
//    if (usuario.clave.length === 0) {
//        this.$claveUsuario.addClass(invalidInputStyle);
//        invalidInput = true;
//    }
//    if (usuario.claveConfirmacion.length === 0) {
//        this.$claveConfirmacionUsuario.addClass(invalidInputStyle);
//        invalidInput = true;
//    }
//
//    this.$epsUsuario.selectmenu('refresh');
//    this.$departamentoUsuario.selectmenu('refresh');
//    this.$municipioUsuario.selectmenu('refresh');
//    return invalidInput;
//};
