/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

document.write("<script type='text/javascript' src='pap.js'></script>");

$(document).ready(function () {
    $.mobile.loading("show");
    cargarClientes();
    cargarDepartamentos();
    $('#textareaAcuerdo').val(getAcuerdo());
    $.mobile.loading("hide");
});

$.mobile.document
            // "epsUsuario-menu" is the ID generated for the listview when it is created
            // by the custom selectmenu plugin. Upon creation of the listview widget we
            // want to prepend an input field to the list to be used for a filter.
            .on("listviewcreate", "#epsUsuario-menu", function (e) {
                    var input,
                                listbox = $("#epsUsuario-listbox"),
                                form = listbox.jqmData("filter-form"),
                                listview = $(e.target);
                    // We store the generated form in a variable attached to the popup so we
                    // avoid creating a second form/input field when the listview is
                    // destroyed/rebuilt during a refresh.
                    if (!form) {
                            input = $("<input data-type='search'></input>");
                            form = $("<form></form>").append(input);
                            input.textinput();
                            $("#epsUsuario-listbox")
                                        .prepend(form)
                                        .jqmData("filter-form", form);
                    }
                    // Instantiate a filterable widget on the newly created listview and
                    // indicate that the generated input is to be used for the filtering.
                    listview.filterable({input: input});
            })
            // The custom select list may show up as either a popup or a dialog,
            // depending how much vertical room there is on the screen. If it shows up
            // as a dialog, then the form containing the filter input field must be
            // transferred to the dialog so that the user can continue to use it for
            // filtering list items.
            //
            // After the dialog is closed, the form containing the filter input is
            // transferred back into the popup.
            .on("pagebeforeshow pagehide", "#epsUsuario-dialog", function (e) {
                    var form = $("#epsUsuario-listbox").jqmData("filter-form"),
                                placeInDialog = (e.type === "pagebeforeshow"),
                                destination = placeInDialog ? $(e.target).find(".ui-content") : $("#epsUsuario-listbox");
                    form
                                .find("input")
                                // Turn off the "inset" option when the filter input is inside a dialog
                                // and turn it back on when it is placed back inside the popup, because
                                // it looks better that way.
                                .textinput("option", "inset", !placeInDialog)
                                .end()
                                .prependTo(destination);
            });