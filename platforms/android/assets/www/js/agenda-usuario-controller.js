var c = c || {};
c.AgendaUsuarioController = function () {
    this.$agenda = null;
    this.$fechaAgenda = null;
};
c.AgendaUsuarioController.prototype.init = function () {
    this.$agenda = $("#agenda");
    this.$fechaAgenda = $("#fecha-agenda", this.$agenda);

};
c.AgendaUsuarioController.prototype.cargarAgendaDia = function (usuario, fecha) {
    var invalidInput = false, invisibleStyle = "bi-invisible",
            invalidInputStyle = "bi-invalid-input", invalidSelectStyle = "bi-invalid-select";
    
};

