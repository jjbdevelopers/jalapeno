var c = c || {};
c.AutorizacionController = function () {
    this.$confirmarPage = null;
    this.$domicilioPage = null;
    this.$divAutorizacionesUsuario = null;
    this.$divAutorizacionesDomicilioUsuario = null;
    this.$btnConfirmar = null;
    this.$btnDomicilioConfirmar = null;
    this.$membersCtrlGroup = null;
};
c.AutorizacionController.prototype.init = function () {
    this.$confirmarPage = $("#confirmar");
    this.$domicilioPage = $("#domicilio");
    this.$divAutorizacionesUsuario = $("#div-autorizaciones-usuario", this.$confirmarPage);
    this.$divAutorizacionesDomicilioUsuario = $("#div-autorizaciones-domicilio-usuario", this.$domicilioPage);
    this.$btnConfirmar = $("#btn-confirmar", this.$confirmarPage);
    this.$btnDomicilioConfirmar = $("#btn-domicilio-confirmar", this.$domicilioPage);

    this.$membersCtrlGroup = $("#members-ctrlgroup", this.$divAutorizacionesUsuario);
};

c.AlistamientoController = function () {
    this.$mis_ordenesPage = null;
    this.$divAlistamientosUsuario = null;
};

c.AlistamientoController.prototype.init = function () {
    this.$mis_ordenesPage = $("#mis_ordenes");
    this.$divAlistamientosUsuario = $("#div-alistamientos-usuario", this.$mis_ordenesPage);

};

c.UsuarioController = function () {
    this.$domicilioPage = null;
    this.$btnDomicilioConfirmar = null;
    this.$direccionesUsuario = null;
    this.$departamentoEnvio = null;
    this.$municipioEnvio = null;
    this.$direccionEnvio = null;
    this.$domicilioErr = null;
    this.$telefonoEnvio = null;


};

c.UsuarioController.prototype.init = function () {
    this.$domicilioPage = $("#domicilio");
    this.$btnDomicilioConfirmar = $("#btn-domicilio-confirmar", this.$domicilioPage);
    this.$direccionesUsuario = $("#direccionesUsuario", this.$domicilioPage);
    this.$departamentoEnvio = $("#departamentoEnvio", this.$domicilioPage);
    this.$municipioEnvio = $("#municipioEnvio", this.$domicilioPage);
    this.$direccionEnvio = $("#direccionEnvio", this.$domicilioPage);
    this.$domicilioErr = $("#domicilio-err", this.$domicilioPage);
    this.$telefonoEnvio = $("#telefonoEnvio", this.$domicilioPage);
};

c.UsuarioController.prototype.cargarDireccionesUsuario = function (usuario) {
    if ($('#direccionesUsuario').has('option').length <= 1) {
        var data = JSON.stringify(usuario);
        $.ajax({
            url: c.Settings.direccionesUsuarioUrl,
            type: c.Settings.TYPE_POST,
            dataType: c.Settings.DATA_TYPE_JSON,
            contentType: c.Settings.APPLICATION_JSON,
            data: data,
            success: function (resp) {
                for (var n = 0; n < resp.length; n++)
                {
                    var object = JSON.parse(resp[n]);
                    var value = '{"d":[{"codDepartamento":"' + object.municipio.departamento.codigo
                            + '","codMunicipio":"' + object.tUsuarioSiuDireccionesPK.codMpio + '","direccion":"'
                            + object.tUsuarioSiuDireccionesPK.direccion + '","telefono":"' + object.telefono + '"}]}';
                    $('#direccionesUsuario').append($('<option>', {
                        value: value,
                        text: object.municipio.nombre + ' - ' + object.tUsuarioSiuDireccionesPK.direccion
                    }));
                }
                $('#direccionesUsuario').selectmenu('refresh');

            }
        });
    }
};

c.UsuarioController.prototype.cargarMunicipiosEnvio = function () {
    var codDepartamento = this.$departamentoEnvio.val(), invisibleStyle = "bi-invisible", invalidInputStyle = "bi-invalid-input", invalidSelect = "bi-invalid-select", camposValidos = true;
    if (codDepartamento == -1) {
        return;
    } else {
        this.$departamentoEnvio.removeClass(invalidSelect);
    }

    this.$municipioEnvio.find('option').remove();
    this.$municipioEnvio.append($('<option>', {
        value: -1,
        text: 'Seleccione Ciudad Envio'
    }, true));

    $.ajax({
        url: c.Settings.municipiosUrl + codDepartamento,
        type: c.Settings.TYPE_GET,
        dataType: c.Settings.DATA_TYPE_JSON,
        contentType: c.Settings.APPLICATION_JSON,
        success: function (resp) {
            for (var n = 0; n < resp.length; n++)
            {
                var object = JSON.parse(resp[n]);
                $('#municipioEnvio').append($('<option>', {
                    value: object.codigo,
                    text: object.nombre
                }));
            }
        }
    });
    this.$municipioEnvio.selectmenu('refresh');
};



c.AutorizacionController.prototype.onConfirmar = function () {
//    this.$membersCtrlGroup.find('INPUT').each(function () {
//        var value = $(this).filter(':checked').val();
//        if (value != null) {
//            console.log(value);
//            alert('check => ' + value);
//        }
//    });
    var alistamientoList = [];
    var i = 0;
    $('#members-ctrlgroup').find('INPUT').each(function () {
        var value = $(this).filter(':checked').val();
        alistamiento = new Object();
        alistamientoPK = new Object();
        if (value != null) {
            console.log(value);
            alistamiento.nap = value.split('-')[0];
            alistamientoPK.numeroAlistamiento = value.split('-')[1];
            alistamiento.alistamientoPK = alistamientoPK;
            alistamiento.estado = c.Estados.ALISTAR_PAP_MOVIL;
            alistamientoList[i] = alistamiento;
            i++;
        }
    });

    tUsuarioSiuDirecciones = new Object();

    if (alistamientoList.length > 0) {
        var data = JSON.stringify({alistamiento: alistamientoList, tUsuarioSiuDirecciones: tUsuarioSiuDirecciones});
        $.ajax({
            url: c.Settings.confirmarAutorizacionUrl,
            type: c.Settings.TYPE_POST,
            dataType: c.Settings.DATA_TYPE_JSON,
            contentType: c.Settings.APPLICATION_JSON,
            data: data,
            success: function (resp) {
                $('#members-ctrlgroup').find('INPUT').each(function () {
                    var value = $(this).filter(':checked').val();
                    if (value != null) {
                        $(this).prop("checked", false).checkboxradio("refresh");
                        $(this).attr("disabled", true);
                    }
                });

                mensajeAlerta('Autorizaciones Alistadas', 'Se envío la solicitud de alistar las solicitudes indicadas.');
            },
            error: function (e) {
                var mensaje = message(e);
                if (mensaje == null) {
                    mensajeSoporte();
                } else {
                    mensajeAlerta('Error',mensaje);
                }
            }
        });
    } else {
        mensajeAlerta('Seleccione las autorizaciones a confirmar.', 'Indica Autorización');
    }
};

c.UsuarioController.prototype.onSeleccionarDireccion = function () {
    var value = this.$direccionesUsuario.val();
    if (value == -1) {
        return;
    }
//    console.log(value);
    obj = JSON.parse(value);
//    console.log(obj.d[0].direccion);
    this.$departamentoEnvio.val(obj.d[0].codDepartamento);
    
    this.$municipioEnvio.find('option').remove();
    this.$municipioEnvio.append($('<option>', {
        value: -1,
        text: 'Seleccione Ciudad Envio'
    }, true));

    $.ajax({
        url: c.Settings.municipiosUrl + obj.d[0].codDepartamento,
        type: c.Settings.TYPE_GET,
        dataType: c.Settings.DATA_TYPE_JSON,
        contentType: c.Settings.APPLICATION_JSON,
        success: function (resp) {
            for (var n = 0; n < resp.length; n++)
            {
                var object = JSON.parse(resp[n]);
                $('#municipioEnvio').append($('<option>', {
                    value: object.codigo,
                    text: object.nombre
                }));
            }
            $('#municipioEnvio').val(obj.d[0].codMunicipio);
            $('#municipioEnvio').selectmenu('refresh');
        }
    });
    
//    var optionValues = [];
//
//    this.$municipioEnvio.each(function () {
//        optionValues.push($(this).val());
//        console.log($(this).val());
//        console.log($(this).val() == obj.d[0].codMunicipio);
//    });

//    this.$municipioEnvio.val(obj.d[0].codMunicipio);
    this.$direccionEnvio.val(obj.d[0].direccion);
    this.$telefonoEnvio.val(obj.d[0].telefono);

    this.$departamentoEnvio.selectmenu('refresh');
//    this.$municipioEnvio.selectmenu('refresh');
};

c.UsuarioController.prototype.onConfirmarDomicilio = function () {
    var alistamientoList = [];
    var i = 0, invisibleStyle = "bi-invisible", invalidInputStyle = "bi-invalid-input", invalidSelect = "bi-invalid-select", camposValidos = true, telefonoInvalido = false;

    this.$departamentoEnvio.removeClass(invalidSelect);
    this.$municipioEnvio.removeClass(invalidSelect);
    this.$direccionEnvio.removeClass(invalidInputStyle);
    this.$domicilioErr.removeClass().addClass(invisibleStyle);

    if (this.$departamentoEnvio.val() == -1) {
        this.$departamentoEnvio.addClass(invalidSelect);
        camposValidos = false;
    }
    if (this.$municipioEnvio.val() == -1) {
        this.$municipioEnvio.addClass(invalidSelect);
        camposValidos = false;
    }
    if (this.$direccionEnvio.length <= 0) {
        this.$direccionEnvio.addClass(invalidInputStyle);
        camposValidos = false;
    }
    if (this.$telefonoEnvio.length <= 0) {
        this.$telefonoEnvio.addClass(invalidInputStyle);
        camposValidos = false;
    }
//    if (this.$telefonoEnvio.length > 45) {
//        this.$telefonoEnvio.addClass(invalidInputStyle);
//        camposValidos = false;
//        telefonoInvalido = true;
//    }
    this.$departamentoEnvio.selectmenu('refresh');
    this.$municipioEnvio.selectmenu('refresh');
    if (!camposValidos) {
        var html = '<p>Porfavor ingrese los datos requeridos.';
        if (telefonoInvalido) {
            html += '<br/>Valide el tamaño y estructura del telefono.';
        }
        html += '</p>';
        this.$domicilioErr.html(html);
        this.$domicilioErr.addClass("bi-ctn-err").slideDown();
        return;
    }

    var usuario = c.Session.getInstance().get().usuario;

    tUsuarioSiuDirecciones = new Object();
    tUsuarioSiuDireccionesPK = new Object();
    tUsuarioSiuDireccionesPK.codTipoDocumento = usuario.codTipoDocumento;
    tUsuarioSiuDireccionesPK.documentoIdentidad = usuario.documentoIdentidad;
    tUsuarioSiuDireccionesPK.codMpio = this.$municipioEnvio.val();
    tUsuarioSiuDireccionesPK.direccion = this.$direccionEnvio.val();

    tUsuarioSiuDirecciones.tUsuarioSiuDireccionesPK = tUsuarioSiuDireccionesPK;
    tUsuarioSiuDirecciones.telefono = this.$telefonoEnvio.val();

    $('#members-ctrlgroup').find('INPUT').each(function () {
        var value = $(this).filter(':checked').val();
        alistamiento = new Object();
        alistamientoPK = new Object();
        if (value != null) {
//            console.log(value);
            alistamiento.nap = value.split('-')[0];
            alistamientoPK.numeroAlistamiento = value.split('-')[1];
            alistamiento.alistamientoPK = alistamientoPK;
            alistamiento.estado = c.Estados.ALISTAR_PAP_MOVIL_DOMICILIO;
            alistamientoList[i] = alistamiento;
            i++;
        }
    });

    if (alistamientoList.length > 0) {
        var data = JSON.stringify({alistamiento: alistamientoList, tUsuarioSiuDirecciones: tUsuarioSiuDirecciones});
        $.ajax({
            url: c.Settings.confirmarAutorizacionUrl,
            type: c.Settings.TYPE_POST,
            dataType: c.Settings.DATA_TYPE_JSON,
            contentType: c.Settings.APPLICATION_JSON,
            data: data,
            success: function (resp) {
                $('#members-ctrlgroup').find('INPUT').each(function () {
                    var value = $(this).filter(':checked').val();
                    if (value != null) {
                        $(this).prop("checked", false).checkboxradio("refresh");
                        $(this).attr("disabled", true);
                    }
                });

                mensajeAlerta('Autorizaciones Alistadas', 'Se envío la solicitud de alistar las solicitudes indicadas.');
            },
            error: function (e) {
                var mensaje = message(e);
                if (mensaje == null) {
                    mensajeSoporte();
                } else {
                    mensajeAlerta('Error',mensaje);
                }
            }
        });
    } else {
        mensajeAlerta('Seleccione las autorizaciones que desea a domicilio.', 'Indica Autorización');
    }
};

c.AutorizacionController.prototype.cargarAutorizacionesUsuario = function (usuario, domicilio) {
    var $divAutorizaciones = "#div-autorizaciones-usuario";
    var $btn = "#btn-confirmar";
    if (domicilio) {
        $divAutorizaciones = "#div-autorizaciones-domicilio-usuario";
        $btn = "#btn-domicilio-confirmar";
    }

    var fset = '<fieldset data-role="controlgroup" id="members-ctrlgroup"><legend>Autorizaciones Usuario</legend>';
    var labels = '';
    $.mobile.loading("show");
//    $("#div-autorizaciones-usuario").html('<p>*** Cargando Autorizaciones ***</p>');
//    $("#div-autorizaciones-usuario").trigger("create");
    $($divAutorizaciones).html('<p>*** Cargando Autorizaciones ***</p>');
    $($divAutorizaciones).trigger("create");

//    $("#btn-confirmar").button();
//    $("#btn-confirmar").prop('disabled', true).button("refresh");
    $($btn).button();
    $($btn).prop('disabled', true).button("refresh");

    $.ajax({
        type: 'POST',
        url: c.Settings.autorizacionUrl,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(usuario),
        success: function (resp) {
            for (var i = 0; i < resp.length; i++) {
//                $("#btn-confirmar").prop('disabled', false).button("refresh");
                $($btn).prop('disabled', false).button("refresh");
                var object = JSON.parse(resp[i]);
                labels += '<input type="checkbox" checked value=' + object.nap + '-' + object.alistamientoPK.numeroAlistamiento + ' id="s'
                        + i
                        + '"><label for="s'
                        + i
                        + '">Autorización-'
                        + object.nap
                        + '</label>';
                var labelMx = '';
                for (var ix = 0; ix < object.medicamentoComercialList.length; ix++) {
                    labelMx += '<ul><li>';
                    var mx = object.medicamentoComercialList[ix];
                    labelMx += mx.descripcion;
                    labelMx += '</li></ul>';
                }
                labels += labelMx;
            }
//            $("#div-autorizaciones-usuario").html(fset + labels + '</fieldset>');
//            $("#div-autorizaciones-usuario").trigger("create");
            $($divAutorizaciones).html(fset + labels + '</fieldset>');
            $($divAutorizaciones).trigger("create");

            $.mobile.loading("hide");
        }
        , error: function (e) {
            $.mobile.loading("hide");
            var mensaje = message(e);
            if (mensaje == null) {
//                $("#div-autorizaciones-usuario").html('<p>' + getMsjSoporte() + '</p>');
                $($divAutorizaciones).html('<p>' + getMsjSoporte() + '</p>');
            } else {
//                $("#div-autorizaciones-usuario").html('<p>' + mensaje + '</p>');
                $($divAutorizaciones).html('<p>' + mensaje + '</p>');
            }
//            $("#div-autorizaciones-usuario").trigger("create");
            $($divAutorizaciones).trigger("create");
        }
    });
};

c.AlistamientoController.prototype.cargarAlistamientosUsuario = function (usuario) {
    var fset = '';
    var labels = '';
    var medicamentos = '';
    $.mobile.loading("show");
    $("#div-alistamientos-usuario").html('<p>*** Cargando Alistamientos ***</p>');
    $("#div-alistamientos-usuario").trigger("create");
    $.ajax({
        type: 'POST',
        url: c.Settings.alistamientoUrl,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(usuario),
        success: function (resp) {
            labels += '<table data-role="table" id="movie-table" data-mode="column" class="ui-body-d ui-shadow table-stripe ui-responsive"  data-column-popup-theme="a"> '
                    + '<thead> <th data-priority="persist">Nap</th> <th data-priority="persist">Estado</th><th data-priority="persist">Fecha</th> </tr>   </thead> '
                    + '<tbody> ';
            for (var i = 0; i < resp.length; i++) {
                var object = JSON.parse(resp[i]);
                medicamentos='';
                //medicamentos=object.medicamentoComercialList;
                for (var j = 0; j < object.AlistamientoMedicamentoComercialList.length; j++) {
                    medicamentos += '<tr><td >'+object.AlistamientoMedicamentoComercialList[j].descripcion +'</td><td>'+object.AlistamientoMedicamentoComercialList[j].cantidad+'</td></tr>';
                }
                labels += '<tr><td><a href="#alistamiento-popup" onclick="mostrarAlistamientoDetalle(' + object.nap + ',\'' + object.caf.nombre + '\',\'' + object.estado + '\',\'' + object.fechaRegistro + '\',\'' + medicamentos + '\');" '
                        + ' data-rel="popup" data-position-to="window" data-transition="pop" >' + object.nap + '</a></td> '
                        + ' <td>' + object.estado + '</td><td>' + object.fechaRegistro + '</td></tr>';
            }
            labels += '</tbody> </table>';
            $("#div-alistamientos-usuario").html(labels);
            $("#div-alistamientos-usuario").trigger("create");
            $.mobile.loading("hide");
        }
        , error: function (e) {
            $.mobile.loading("hide");
            var mensaje = message(e);
            if (mensaje == null) {
                $("#div-alistamientos-usuario").html('<p>' + getMsjSoporte() + '</p>');
            } else {
                $("#div-alistamientos-usuario").html('<p>' + mensaje + '</p>');
            }
            $("#div-alistamientos-usuario").trigger("create");
        }
    });
};

function mostrarAlistamientoDetalle(nap, caf, estado,fecha,medicamentos) {
    $('#alistamiento-detalle').html('<p>Caf: ' + caf + '</p><p>Autorización: ' + nap + '</p><p>Estado: ' + estado + '</p><p>Fecha solicitud: ' + fecha + '</p>Medicamentos: ' 
            +'<table data-role="table" id="movie-table" data-mode="column" class="ui-body-d ui-shadow table-stripe ui-responsive"  data-column-popup-theme="a"> '
            + '<thead> <th data-priority="persist">Nombre</th> <th data-priority="persist">Cantidad</th></tr></thead> '
            + '<tbody> ' + medicamentos + '</tbody> </table>');
}
