var c = c || {};

c.PapController = function () {
    this.$papPage = null;
    this.$confirmarPage = null;
    this.$divIniciarConfirmacion = null;
    this.$labelUsuarioRegistrado = null;
    this.$linkCerrarSession = null;
    this.$menuSalir = null;
    this.$pageSignIn  = null;
};

c.PapController.prototype.init = function () {
    this.$menu = $("#menu");
    this.$confirmarPage = $("#confirmar");  
    this.$divIniciarConfirmacion = $("#div-iniciar-confirmacion", this.$menu);
    this.$labelUsuarioRegistrado = $("#label-usuario-registrado", this.$menu);
    this.$linkCerrarSession = $("#div-cerrar-sesion", this.$menu);
    this.$menuSalir = $("#menu-salir", this.$menu);
    this.$pageSignIn = "#page-signin";
};

c.PapController.prototype.iniciarConfirmacion = function () {
    console.log("se debe mover el metodo de navegación")
    //$.mobile.navigate(this.$confirmarPage);
    return;
};

c.PapController.prototype.cerrarSession = function () {
    var me = this;
    c.Session.deleteInstance();
    $.mobile.navigate(me.$pageSignIn);
};