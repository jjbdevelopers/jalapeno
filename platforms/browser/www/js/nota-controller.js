var c = c || {};

c.NotaController = function () {
    this.$nota = null;
    this.$notaSalir = null;
    this.$pageSignIn = null;
};
c.NotaController.prototype.init = function () {
    this.$nota = $("#nota");
    this.$notaSalir = $("#nota-salir", this.$nota);
    this.$pageSignIn = "#page-signin";
};

c.NotaController.prototype.cerrarSession = function () {
    var me = this;
    c.Session.deleteInstance();
    $.mobile.navigate(me.$pageSignIn);
};
