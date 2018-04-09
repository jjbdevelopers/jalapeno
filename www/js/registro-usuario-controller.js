var c = c || {};

c.RegistroUsuarioController = function () {
    this.$divRegistrarUsuario = null;
    this.$tipoDocumentoUsuario = null;
    this.$documentoUsuario = null;
    this.$nombreUsuario = null;
    this.$apellidoUsuario = null;
    this.$epsUsuario = null;
    this.$fechaNacimientoUsuario = null;
    this.$radio = null;
    this.$departamentoUsuario = null;
    this.$municipioUsuario = null;
    this.$direccionUsuario = null;
    this.$correoUsuario = null;
    this.$telefonoUsuario = null;
    this.$celularUsuario = null;
    this.$claveUsuario = null;
    this.$claveConfirmacionUsuario = null;
};

c.RegistroUsuarioController.prototype.init = function () {
    this.$divRegistrarUsuario = $("#divRegistrarUsuario");
    this.$tipoDocumentoUsuario = $("#tipoDocumentoUsuario", this.$divRegistrarUsuario);
    this.$documentoUsuario = $("#documentoUsuario", this.$divRegistrarUsuario);
    this.$nombreUsuario = $("#nombreUsuario", this.$divRegistrarUsuario);
    this.$apellidoUsuario = $("#apellidoUsuario", this.$divRegistrarUsuario);
    this.$epsUsuario = $("#epsUsuario", this.$divRegistrarUsuario);
    this.$fechaNacimientoUsuario = $("#fechaNacimientoUsuario", this.$divRegistrarUsuario);
    this.$radio = $("#radio", this.$divRegistrarUsuario);
    this.$departamentoUsuario = $("#departamentoUsuario", this.$divRegistrarUsuario);
    this.$municipioUsuario = $("#municipioUsuario", this.$divRegistrarUsuario);
    this.$direccionUsuario = $("#direccionUsuario", this.$divRegistrarUsuario);
    this.$correoUsuario = $("#correoUsuario", this.$divRegistrarUsuario);
    this.$telefonoUsuario = $("#telefonoUsuario", this.$divRegistrarUsuario);
    this.$celularUsuario = $("#celularUsuario", this.$divRegistrarUsuario);
    this.$claveUsuario = $("#claveUsuario", this.$divRegistrarUsuario);
    this.$claveConfirmacionUsuario = $("#claveConfirmacionUsuario", this.$divRegistrarUsuario);
};

c.RegistroUsuarioController.prototype.validarRegistroUsuario = function (usuario, solicitudRegistro) {
    var invalidInput = false, invisibleStyle = "bi-invisible",
            invalidInputStyle = "bi-invalid-input", invalidSelectStyle = "bi-invalid-select";

    this.$tipoDocumentoUsuario.removeClass(invalidInputStyle);
    this.$documentoUsuario.removeClass(invalidInputStyle);
    this.$nombreUsuario.removeClass(invalidInputStyle);
    this.$apellidoUsuario.removeClass(invalidInputStyle);
    this.$epsUsuario.removeClass(invalidInputStyle);
    this.$fechaNacimientoUsuario.removeClass(invalidInputStyle);
    this.$departamentoUsuario.removeClass(invalidInputStyle);
    this.$municipioUsuario.removeClass(invalidInputStyle);
    this.$direccionUsuario.removeClass(invalidInputStyle);
    this.$correoUsuario.removeClass(invalidInputStyle);
    this.$telefonoUsuario.removeClass(invalidInputStyle);
    this.$celularUsuario.removeClass(invalidInputStyle);
    this.$claveUsuario.removeClass(invalidInputStyle);
    this.$claveConfirmacionUsuario.removeClass(invalidInputStyle);

    if (usuario.codTipoDocumento === -1 || usuario.codTipoDocumento.length === 0) {
        this.$tipoDocumentoUsuario.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (usuario.documentoIdentidad.length === 0) {
        this.$documentoUsuario.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (usuario.nombre.length === 0) {
        this.$nombreUsuario.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (usuario.apellido.length === 0) {
        this.$apellidoUsuario.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (solicitudRegistro.codCliente == -1) {
        this.$epsUsuario.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (usuario.fechaNacimiento.length === 0) {
        this.$fechaNacimientoUsuario.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (solicitudRegistro.codDpto == -1) {
        this.$departamentoUsuario.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (solicitudRegistro.codCiudad == -1) {
        this.$municipioUsuario.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (usuario.direccion.length === 0) {
        this.$direccionUsuario.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (usuario.correo.length === 0) {
        this.$correoUsuario.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (usuario.telefono.length <= 6) {
        if (usuario.telefonoCelular.length <= 6) {
            this.$telefonoUsuario.addClass(invalidInputStyle);
            invalidInput = true;
        }
    }
    if (usuario.telefonoCelular.length <= 6) {
        if (usuario.telefono.length <= 6) {
            this.$celularUsuario.addClass(invalidInputStyle);
            invalidInput = true;
        }
    }
    if (usuario.clave.length === 0) {
        this.$claveUsuario.addClass(invalidInputStyle);
        invalidInput = true;
    }
    if (usuario.claveConfirmacion.length === 0) {
        this.$claveConfirmacionUsuario.addClass(invalidInputStyle);
        invalidInput = true;
    }

    this.$epsUsuario.selectmenu('refresh');
    this.$departamentoUsuario.selectmenu('refresh');
    this.$municipioUsuario.selectmenu('refresh');
    return invalidInput;
};