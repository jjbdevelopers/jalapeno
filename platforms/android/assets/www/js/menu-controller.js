var c = c || {};

c.MenuController = function () {
    this.$menuPage = null;
    this.$btnActualizarUsuario = null;
};

c.MenuController.prototype.init = function () {
    this.$menuPage = $("#menu");
    this.$inputNombre = $("#input-nombre", this.$menuPage);
    this.$inputApellido = $("#input-apellido", this.$menuPage);
    this.$btnActualizarUsuario = $("#btn-actualizar-usuario", this.$menuPage);


};

c.MenuController.prototype.actualizarDatosUsuario = function (usuario) {

    usuario.nombre = this.$inputNombre.val();
    usuario.apellido = this.$inputApellido.val();

    $.ajax({
        url: c.Settings.actualizarUsuario,
        type: c.Settings.TYPE_POST,
        dataType: c.Settings.DATA_TYPE_JSON,
        contentType: c.Settings.APPLICATION_JSON,
        data: JSON.stringify(usuario),
        success: function (resp) {

            console.log("user update.");
        },
        error: function (e) {
            var mensaje = message(e);
            if (mensaje == null) {
                mensajeSoporte();
            } else {
                mensajeAlerta('Registro Usuario', mensaje);
            }
        }
    });
};