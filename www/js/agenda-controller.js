var c = c || {};
c.AgendaController = function () {
    this.$agenda = null;
    this.$fechaAgenda = null;
    this.$btnCargarAgenda = null;
    this.$agendaSalir = null;
    this.$pageSignIn = null;
};
c.AgendaController.prototype.init = function () {
    this.$agenda = $("#agenda");
    this.$fechaAgenda = $("#fecha-agenda", this.$agenda);
    this.$btnCargarAgenda = $("#btn-cargar-agenda", this.$agenda);
    this.$agendaSalir = $("#agenda-salir", this.$agenda);
    this.$pageSignIn = "#page-signin";
};
c.AgendaController.prototype.cargarAgendaDia = function (usuario, fecha) {
    var invalidInput = false, invisibleStyle = "bi-invisible",
            invalidInputStyle = "bi-invalid-input", invalidSelectStyle = "bi-invalid-select";
    var $divAgendaUsuario = "#div-agenda-usuario";
    var html = '';
//    var html = '<div data-role="collapsible" data-theme="b" data-content-theme="b">'
//                + '<h4>Heading1</h4>'
//            + '<p>I m the collapsible content with a themed content block set to "b".</p>'
//            + '</div>'
//            + '<div data-role="collapsible" data-theme="b" data-content-theme="b">'
//            + '    <h4>Heading2</h4>'
//            + '    <p>Im the collapsible content with a themed content block set to "b".</p>'
//            + '</div>';
    var div = '<div data-role="collapsible" data-theme="b" data-content-theme="b">';
    var divRole = '<div role="main" class="ui-content">';
    var divFin = '</div>';
    var url = c.Settings.agendaUsuarionUrl.replace("{codDocumento}", usuario.codTipoDocumento)
            .replace("{documentoIdentidad}", usuario.documentoIdentidad).replace("{fecha}", fecha);
    console.log(url);
    if (fecha === "") {
        html += divRole + '<div data-role="footer" data-theme="b" class="bi-notification-input"> Indica la fecha de agenda ' + divFin + divFin;
        $($divAgendaUsuario).html(html);
        $($divAgendaUsuario).trigger("create");
        return;
    }

//    var data = JSON.stringify(usuario);
    $.mobile.loading("show");
    $.ajax({
        url: url,
        type: c.Settings.TYPE_GET,
        dataType: c.Settings.DATA_TYPE_JSON,
        contentType: c.Settings.APPLICATION_JSON,
        data: null,
        success: function (resp) {
            if (resp.length > 0) {
                for (var n = 0; n < resp.length; n++)
                {
//                var object = JSON.parse(resp[n]);
                    html += div;
                    html += '<h4>' + resp[n].fecha + ' - ' + resp[n].paciente + '</h4>';
                    html += '<p> Establecimiento: ' + resp[n].establecimiento + '</p>';
                    html += '<p> Documento: ' + resp[n].documento_beneficiario + '</p>';
                    html += '<p> Paciente: ' + resp[n].paciente + '</p>';
                    html += divFin;
                }
            } else {
                html += divRole + '<div data-role="footer" data-theme="b" ><center>Tu agenda se encuentra libre</center> ' + divFin + divFin;
            }
            $($divAgendaUsuario).html(html);
            $($divAgendaUsuario).trigger("create");
            $.mobile.loading("hide");
        }
    });


};

c.AgendaController.prototype.cerrarSession = function () {
    var me = this;
    c.Session.deleteInstance();
    $.mobile.navigate(me.$pageSignIn);
};
