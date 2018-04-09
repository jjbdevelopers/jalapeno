/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var c = c || {};
var GrupoLi = '<li ><a href="#pgEditarGrupo?id=LINK">ID</a></li>';
var GrupoHdr = '<li data-role="list-divider" style="background-color:#08b " >Grupo</li>';
var noGrupo = '<li id="noNote">No hay grupos disponibles</li>';


c.GruposController = function () {

    //definir las variables
    this.$grupos = null;
    this.$gruposAdd = null;
    this.$gruposSalir = null;
    this.$gruposAddSalir = null;
    this.$pageSignIn = null;
    this.$pageGrupos = null;
    this.$btnGuardarGrupos = null;
    this.$nombreGrupo = null;

};
c.GruposController.prototype.init = function () {
    //asociar las variables a los html
    this.$grupos = $("#grupos");
    this.$gruposAdd = $("#grupos-add");
    this.$gruposSalir = $("#grupos-salir", this.$grupos);
    this.$nombreGrupo = $("#nombre-grupo", this.$gruposAdd);
    this.$btnGuardarGrupos = $("#btn-guardar-grupo", this.$gruposAdd);
    this.$gruposAddSalir = $("#gruposadd-salir", this.$gruposAdd);
    this.$pageGrupos = "#grupos";
    this.$pageSignIn = "#page-signin";

    //this.$btnCargarGrupos = $("#btn-cargar-dispositivos", this.$grupos);
};

c.GruposController.prototype.cerrarSession = function () {
    var me = this;
    c.Session.deleteInstance();
    $.mobile.navigate(me.$pageSignIn);
};

c.GruposController.prototype.guardarGrupo = function (nombreGrupo, correo) {
    //alert("Ingreso");
    var url = c.Settings.guardarGruposUrl.replace("{correo}", correo).replace("{nombreGrupo}", nombreGrupo);

    $.ajax({
        url: url,
        type: c.Settings.TYPE_GET,
        async: false,

        success: function (resp) {

            if (resp == 'EXISTE') {

               
                alert( 'El Grupo' + nombreGrupo + ' ya se encuentra registrado!');
            }
                     
          return;
            


        },
        error: function (e) {
            var mensaje = message(e);
            if (mensaje == null) {
                console.log("error al guardar grupos.")
            } else {
                console.log(mensaje);
            }
        }
        
    });
    




};

c.GruposController.prototype.iraGrupos = function () {
    var me = this;
    $.mobile.navigate(me.$pageGrupos);



};

c.GruposController.prototype.cargarGrupos = function (usuario) {
    var url = c.Settings.gruposUrl.replace("{correo}", usuario.correo);

    $.ajax({
        url: url,
        type: c.Settings.TYPE_GET,
        dataType: c.Settings.DATA_TYPE_JSON,
        contentType: c.Settings.APPLICATION_JSON,
        success: function (resp) {

            var html = '';
            for (var n = 0; n < resp.length; n++)
            {
                var grupo = JSON.parse(resp[n]);
                var nombreGrupo = grupo.nombre;

                var nLnk = nombreGrupo.replace(/-/g, ' ');
                var id = grupo.gruposPK.codGrupo;
                html += GrupoLi.replace(/ID/g, nLnk).replace(/LINK/g, id);

            }

            $('#listaGrupos').html(GrupoHdr + html).listview('refresh');


        },
        error: function (e) {
            var mensaje = message(e);
            if (mensaje == null) {
                console.log("error al cargar grupos.")
            } else {
                console.log(mensaje);
            }
        }
    });


}



