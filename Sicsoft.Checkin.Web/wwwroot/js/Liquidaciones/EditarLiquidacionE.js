﻿document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[type=number]').forEach(node => node.addEventListener('keypress', e => {
        if (e.keyCode == 13) {
            onChangeProducto();
        }
    }))
});
var ProdCadena = [];
var ImageBae64 = '';
var IMG2 = '';
var Productos = [];
var subtotalI = 0;
var impuestosI = 0;
var descuentosI = 0;
var totalComprobanteI = 0;

var impuestoI1 = 0;
var impuestoI2 = 0;
var impuestoI4 = 0;
var impuestoI8 = 0;
var impuestoI13 = 0;

var position = 0;



var bandera = false;
var idP = 0;
var subtotal = 0;
var impuestos = 0;
var descuentos = 0;
var totalComprobante = 0;

var impuesto1 = 0;
var impuesto2 = 0;
var impuesto4 = 0;
var impuesto8 = 0;
var impuesto13 = 0;
var oCargos = 0;
$(document).ready(function () {

    jQuery(document).ready(function ($) {
        $(document).ready(function () {
            $("#FecFactura").val($("#FechaI").val());
            $("#FecFactura").attr({
                "max": $("#FechaFinal").val(),
                "min": $("#FechaI").val()
            });
            //Este metodo le define un maximo y un minimo a la fecha a la hora de editar una fm
            $("#FecFacturaE").attr({
                "max": $("#FechaFinal").val(),
                "min": $("#FechaI").val()
            });
            Date.prototype.addDays = function (days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            }
            $("#NumFacturaI").inputmask({ "mask": "999-999-999999999" });
            $("#NumFacturaE").inputmask({ "mask": "999-999-999999999" });

        });
    });


    $(":input").inputmask();
    $('.mi-selector').select2();

    $("#NomPro").val("");

    $("#PrecUniI").val(0);
    $("#desc").val(0);
    $("#TipoImpuesto").val("0").trigger('change');
    $("#idTipoGasto").val("NULL").trigger('change');
    $("#ImpuestoMonto").val(0);

    $("input:radio[name=idProveedor]:checked").val("01");
    $(".js-example-responsive").select2({
        width: 'resolve',
        height: 'resolve'
    });



    Recuperar();








});
var ProdCadena = [];
var bandera = false;
var idP = 0;
var subtotal = 0;
var impuestos = 0;
var descuentos = 0;
var totalComprobante = 0;
var Pais = $("#pais").val();
var impuesto1 = 0;
var impuesto2 = 0;
var impuesto4 = 0;
var impuesto8 = 0;
var impuesto13 = 0;
var oCargos = 0;


function Recuperar() {
    try {



        var det = JSON.parse($("#Liquidacion").val());
        //var compras = JSON.parse($("#ComprasX").val());
        var idDelCierre = $("#cierre").val();
        $("#idCierre").val(idDelCierre);

        $("#Comentario").val($("#Obser").val());
        var Estado = $("#est").val();
        $("#CodMoneda").val($("#moneda").val());
        console.log("Estado " + Estado);


        for (var i = 0; i < det.length; i++) {


            var detalle = {
                id: det[i].id,
                Proveedor: (det[i].NomProveedor.length > 40 ? det[i].NomProveedor.substr(0, 40) : det[i].NomProveedor),
                CodProveedor: det[i].CodProveedor,
                CHacienda: det[i].ConsecutivoHacienda,
                Fecha: det[i].FecFactura.substr(8, 2) + "/" + det[i].FecFactura.substr(5, 2) + "/" + det[i].FecFactura.substr(0, 4),
                SubTotal: det[i].TotalVenta,
                Descuento: det[i].TotalDescuentos,
                Impuesto: det[i].TotalImpuesto,
                Total: 0,
                TotalOtrosCargos: det[i].TotalOtrosCargos,
                Impuesto1: det[i].Impuesto1,
                Impuesto2: det[i].Impuesto2,
                Impuesto4: det[i].Impuesto4,
                Impuesto8: det[i].Impuesto8,
                Impuesto13: det[i].Impuesto13,
                idTipoGasto: det[i].idTipoGasto,
                Comentario: det[i].Comentario
            };


            var subtotalT = 0;
            var descuentoT = 0;
            var impuestoT = 0;
            var totalT = 0;
            var oCargosT = 0;
            if (Pais == "P" || Pais == "N" || Pais == "E") {
                detalle.SubTotal = parseFloat(det[i].TotalComprobante) - parseFloat(detalle.Impuesto);
            }

            subtotalT = parseFloat(detalle.SubTotal);
            descuentoT = parseFloat(detalle.Descuento);
            impuestoT = parseFloat(detalle.Impuesto);
            oCargosT = parseFloat(detalle.TotalOtrosCargos);
            var Electronica = det[i]; //compras.find(a => a.id == det[i].id);
            if (Electronica.XmlFacturaRecibida == null) {
                detalle.Total = (subtotalT - descuentoT) + impuestoT + oCargosT;
            } else {
                detalle.Total = (subtotalT) + impuestoT + oCargosT;
            }



            ProdCadena.push(detalle);
            totalT = parseFloat(detalle.Total);
            var impuesto1T = parseFloat(detalle.Impuesto1);
            var impuesto2T = parseFloat(detalle.Impuesto2);
            var impuesto4T = parseFloat(detalle.Impuesto4);
            var impuesto8T = parseFloat(detalle.Impuesto8);
            var impuesto13T = parseFloat(detalle.Impuesto13);



            subtotal += subtotalT;
            descuentos += descuentoT;
            impuestos += impuestoT;
            oCargos += oCargosT;
            totalComprobante += totalT;
            impuesto1 += impuesto1T;
            impuesto2 += impuesto2T;
            impuesto4 += impuesto4T;
            impuesto8 += impuesto8T;
            impuesto13 += impuesto13T;

            $("#subtotal").text(formatoDecimal(parseFloat(subtotal).toFixed(2)));
            $("#descuento").text(formatoDecimal(parseFloat(descuentos).toFixed(2)));
            $("#impuesto").text(formatoDecimal(parseFloat(impuestos).toFixed(2)));
            $("#total").text(formatoDecimal(parseFloat(totalComprobante).toFixed(2)));
            $("#tOCargos").text(formatoDecimal(parseFloat(oCargos).toFixed(2)));
            $("#impuesto1").text(formatoDecimal(parseFloat(impuesto1).toFixed(2)));
            $("#impuesto2").text(formatoDecimal(parseFloat(impuesto2).toFixed(2)));
            $("#impuesto4").text(formatoDecimal(parseFloat(impuesto4).toFixed(2)));
            $("#impuesto8").text(formatoDecimal(parseFloat(impuesto8).toFixed(2)));
            $("#impuesto13").text(formatoDecimal(parseFloat(impuesto13).toFixed(2)));
        }

        if (ProdCadena.length > 0) {
            $("#CodMoneda").select2({ disabled: true });
        } else {
            $("#CodMoneda").select2({ disabled: false });
        }
        LimpiarDatos();

        RellenaTabla();

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error

        });

    }


}


///Costa Rica
function onChangeProveedorCR(bit) {
    try {
        var ruc = $("#CodProveedor").val();
        var dv = 0;
        var nombre = $("#NomProveedor").val();

        if (bit == 1) {

            $("#CodProveedor").val("");


        } else {
            $("#NomProveedor").val("");
        }

        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: $("#urlBuscarProveedorCR").val(),
            data: { ids: $("#CodProveedor").val(), dv: "0", nombre: $("#NomProveedor").val(), CR: true },
            success: function (result) {

                console.log(result);

                if (result != null) {


                    $("#NomProveedor").val(result.nombre);

                    $("#CodProveedor").val(result.ruc);

                    switch (result.ruc.replace("-", "").replace("-", "").length) {

                        case 9:
                            {
                                $("#idProveedor1").prop('checked', true)
                                mask2();
                                break;
                            }
                        case 10:

                            {

                                $("#idProveedor2").prop('checked', true)


                                mask2();
                                break;
                            }

                        default:
                            {
                                $("#idProveedor3").prop('checked', true)
                                mask2();
                                break;
                            }


                    }


                } else {

                    $("#CodProveedor").val(ruc);

                    $("#NomProveedor").val(nombre);



                }

            },
            beforeSend: function () {

            },
            complete: function () {

            }
        });
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error ' + e

        })
    }


}


function onChangeFecFactura() {
    try {
        if (new Date($("#FechaFinal").val()).addDays(1) < new Date($("#FecFactura").val()).addDays(1) || new Date($("#FechaI").val()).addDays(1) > new Date($("#FecFactura").val()).addDays(1)) {
            $("#FecFactura").val($("#FechaI").val());

            alert("La fecha de la factura manual no puede ser menor o mayor que la del periodo");
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}


function onChangeProducto() {
    try {

        var button = document.getElementById("idBotonBuscar");
        button.disabled = false;

        $("#spinloader2").removeAttr('hidden');
        button.disabled = true;


        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: $("#urlBuscarFactura").val(),
            data: { idB: $("#idBusqueda").val(), cierre: $("#idCierre").val() },
            success: function (result) {

                console.log(result);
                $("#Existencia").text("");
                if (result != null) {

                    if (result.nomProveedor.length > 40) {
                        $("#Proveedor").val(result.nomProveedor.substr(0, 40));
                    } else {
                        $("#Proveedor").val(result.nomProveedor);
                    }
                    $("#id").val(result.id);
                    $("#CHacienda").val(result.consecutivoHacienda);
                    $("#FechaFac").val(result.fecFactura.substr(8, 2) + "/" + result.fecFactura.substr(5, 2) + "/" + result.fecFactura.substr(0, 4));


                    $("#SubTotal").val(formatoDecimal(parseFloat(result.totalVenta - result.totalImpuesto)));

                    $("#Impuesto").val(formatoDecimal(parseFloat(result.totalImpuesto)));
                    $("#Descuento").val(formatoDecimal(parseFloat(result.totalDescuentos)));
                    $("#tipoGasto").val(result.tipoGasto);


                    $("#adjunto").attr('href', result.pdfFactura);


                    $("#sub").val(result.totalVenta - result.totalImpuesto);
                    $("#desc").val(result.totalDescuentos);
                    $("#imp").val(result.totalImpuesto);


                    $("#imp1").val(result.impuesto1);
                    $("#imp2").val(result.impuesto2);
                    $("#imp4").val(result.impuesto4);
                    $("#imp8").val(result.impuesto8);
                    $("#imp13").val(result.impuesto13);

                    $("#otrosCargos").val(result.totalOtrosCargos);
                    $("#TotalComp").val(formatoDecimal(result.totalComprobante));

                    $("#idTipoGastoEditar").val(result.idTipoGasto).trigger('change.select2');
                    var detalle = {
                        id: $("#id").val(),
                        Proveedor: $("#Proveedor").val(),
                        CHacienda: $("#CHacienda").val(),
                        Fecha: $("#FechaFac").val(),
                        SubTotal: $("#sub").val(),
                        Descuento: $("#desc").val(),
                        Impuesto: $("#imp").val(),
                        Total: 0,
                        Impuesto1: $("#imp1").val(),
                        Impuesto2: $("#imp2").val(),
                        Impuesto4: $("#imp4").val(),
                        Impuesto8: $("#imp8").val(),
                        Impuesto13: $("#imp13").val(),
                        TotalOtrosCargos: $("#otrosCargos").val()

                    };
                    $("#monedaFactura").val(result.codMoneda);
                    console.log("Ya esta asignada: " + detalle);
                    if (ProdCadena.find(a => a.id == parseInt(detalle.id)) != undefined) {
                        var str = "Ya esta asignada";
                        $("#Existencia").text(str);
                        LimpiarDatos();

                    } else if ((result.idCierre != 0 && result.idCierre != parseInt($("#idCierre").val()))) {
                        var str = "La Factura: No ha llegado al correo, No existe, No es de este periodo o Ya está asignada. Puedes intentar colocando más dígitos del consecutivo de hacienda o esperar unos minutos mientras llega.";
                        $("#Existencia").text(str);
                        LimpiarDatos();
                    }
                    $("#spinloader2").attr("hidden", true);
                    button.disabled = false;

                } else {

                    var str = "La Factura: No ha llegado al correo, No existe, No es de este periodo o Ya está asignada. Puedes intentar colocando más dígitos del consecutivo de hacienda o esperar unos minutos mientras llega.";
                    $("#Existencia").text(str);
                    LimpiarDatos();
                    $("#spinloader2").attr("hidden", true);
                    button.disabled = false;



                }
                button.disabled = false;


            },
            beforeSend: function () {

            },
            complete: function () {

            }
        });
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
        $("#spinloader2").attr("hidden", true);
        button.disabled = false;
    }



}

function ValidarAntesTabla() {
    try {
        if ($("#Proveedor").val() == "") {
            return false;
        } else if ($("#idTipoGastoEditar").val() == "0" || $("#idTipoGastoEditar").val() == null) {
            return false;
        } else if ($("#ComenFac").val() == "") {
            return false;
        }

        else {
            return true;
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}

function validarMoneda() {
    try {
        if ($("#CodMoneda").val() != $("#monedaFactura").val()) {
            return false;
        }
        else {
            return true;
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}
function InsertarProductoTabla() {

    try {
        if (ValidarAntesTabla()) {
            if (validarMoneda()) {



                var detalle = {
                    id: $("#id").val(),
                    Proveedor: $("#Proveedor").val(),
                    CHacienda: $("#CHacienda").val(),
                    CodProveedor: $("#Proveedor").val(),
                    Fecha: $("#FechaFac").val(),
                    SubTotal: $("#sub").val(),
                    Descuento: $("#desc").val(),
                    Impuesto: $("#imp").val(),
                    Total: 0,
                    Impuesto1: $("#imp1").val(),
                    Impuesto2: $("#imp2").val(),
                    Impuesto4: $("#imp4").val(),
                    Impuesto8: $("#imp8").val(),
                    Impuesto13: $("#imp13").val(),
                    idTipoGasto: $("#idTipoGastoEditar").val(),
                    TotalOtrosCargos: $("#otrosCargos").val(),
                    Comentario: $("#ComenFac").val()
                };



                var subtotalT = 0;
                var descuentoT = 0;
                var impuestoT = 0;
                var totalT = 0;
                var oCargosT = 0;
                subtotalT = parseFloat(detalle.SubTotal);
                descuentoT = parseFloat(detalle.Descuento);
                impuestoT = parseFloat(detalle.Impuesto);
                oCargosT = parseFloat(detalle.TotalOtrosCargos);

                detalle.Total = (subtotalT - descuentoT) + impuestoT + oCargosT;
                ProdCadena.push(detalle);
                totalT = parseFloat(detalle.Total);
                var impuesto1T = parseFloat(detalle.Impuesto1);
                var impuesto2T = parseFloat(detalle.Impuesto2);
                var impuesto4T = parseFloat(detalle.Impuesto4);
                var impuesto8T = parseFloat(detalle.Impuesto8);
                var impuesto13T = parseFloat(detalle.Impuesto13);



                subtotal += subtotalT;
                descuentos += descuentoT;
                impuestos += impuestoT;
                oCargos += oCargosT;
                totalComprobante += totalT;
                impuesto1 += impuesto1T;
                impuesto2 += impuesto2T;
                impuesto4 += impuesto4T;
                impuesto8 += impuesto8T;
                impuesto13 += impuesto13T;

                $("#subtotal").text(formatoDecimal(parseFloat(subtotal).toFixed(2)));
                $("#descuento").text(formatoDecimal(parseFloat(descuentos).toFixed(2)));
                $("#impuesto").text(formatoDecimal(parseFloat(impuestos).toFixed(2)));
                $("#total").text(formatoDecimal(parseFloat(totalComprobante).toFixed(2)));
                $("#tOCargos").text(formatoDecimal(parseFloat(oCargos).toFixed(2)));
                $("#impuesto1").text(formatoDecimal(parseFloat(impuesto1).toFixed(2)));
                $("#impuesto2").text(formatoDecimal(parseFloat(impuesto2).toFixed(2)));
                $("#impuesto4").text(formatoDecimal(parseFloat(impuesto4).toFixed(2)));
                $("#impuesto8").text(formatoDecimal(parseFloat(impuesto8).toFixed(2)));
                $("#impuesto13").text(formatoDecimal(parseFloat(impuesto13).toFixed(2)));



                LimpiarDatos();

                RellenaTabla();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Pareciera que la moneda especificada no es la misma que la factura.'

                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Pareciera que aún falta un campo por llenar'

            });
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }



}
function LimpiarDatos() {
    try {
        $("#Proveedor").val("");

        $("#monedaFactura").val("");
        $("#CHacienda").val("");
        $("#FechaFac").val("");

        $("#TotalComp").val("");
        $("#SubTotal").val("");

        $("#Impuesto").val("");
        $("#Descuento").val("");


        $("#imp1").val(0);
        $("#imp2").val(0);
        $("#imp4").val(0);
        $("#imp8").val(0);
        $("#imp13").val(0);
        $("#otrosCargos").val(0);
        $("#idBusqueda").val("")
        $("#adjunto").attr('href', '');
        $("#tipoGasto").text("");
        $("#idTipoGastoEditar").val("NULL").trigger('change.select2');
        $("#ComenFac").val("");
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}

function RellenaTabla() {
    try {
        var sOptions = '';

        $("#tbody").html('');

        for (var i = 0; i < ProdCadena.length; i++) {
            sOptions += '<tr>';

            sOptions += '<td align="center" style="padding-top:13px;">    <a style="margin-left: -1%; position: inherit !important;" onclick="javascript: EliminaProducto(' + i + ')" title="Eliminar" class="fa fa-trash icono"></a> ';
            if (ProdCadena[i].CHacienda.trim().length < 20) {
                sOptions += '<td align="center" style="padding-top:15px;">  <a style="font-size:13px; color: blue; text-decoration: underline;" onclick="javascript: AbrirModalEdicion(' + ProdCadena[i].id + ')">' + ProdCadena[i].CHacienda + '</a></td>';
            } else {
                sOptions += '<td align="center" style="padding-top:15px;">  <p style="font-size:13px;" >' + ProdCadena[i].CHacienda + '</p></td>';
            }
            sOptions += '<td align="center" style="padding-top:15px;">  <p style="font-size:13px;">' + ProdCadena[i].Fecha + '</p></td>';
            sOptions += '<td align="left" style="padding-top:15px;">  <p style="font-size:13px;">' + ProdCadena[i].Proveedor + '</p></td>';
            sOptions += '<td align="right" style="padding-top:13px;">  <p style="font-size:13px;">' + formatoDecimal(ProdCadena[i].Total) + '</p></td>';





            sOptions += '</tr>'
        }
        $("#tbody").html(sOptions);
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}
function EliminaProducto(campo) {
    try {
        console.log("campo: " + campo);
        Swal.fire({
            title: '¿Desea eliminar esta factura?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: `Aceptar`,
            denyButtonText: `Cancelar`,
            customClass: {
                confirmButton: 'swalBtnColor',
                denyButton: 'swalDeny'
            },
        }).then((result) => {

            if (result.isConfirmed) {
                console.log(ProdCadena[campo]);
                var subtotalT = 0;
                var descuentoT = 0;
                var impuestoT = 0;
                var oCargosT = 0;
                subtotalT = parseFloat(ProdCadena[campo].SubTotal);
                descuentoT = parseFloat(ProdCadena[campo].Descuento);
                impuestoT = parseFloat(ProdCadena[campo].Impuesto);
                oCargosT = parseFloat(ProdCadena[campo].TotalOtrosCargos);
                totalT = parseFloat(ProdCadena[campo].Total);

                subtotal -= subtotalT;
                descuentos -= descuentoT;
                impuestos -= impuestoT;
                oCargos -= oCargosT;
                totalComprobante -= totalT;
                var impuesto1T = parseFloat(ProdCadena[campo].Impuesto1);
                var impuesto2T = parseFloat(ProdCadena[campo].Impuesto2);
                var impuesto4T = parseFloat(ProdCadena[campo].Impuesto4);
                var impuesto8T = parseFloat(ProdCadena[campo].Impuesto8);
                var impuesto13T = parseFloat(ProdCadena[campo].Impuesto13);


                impuesto1 -= impuesto1T;
                impuesto2 -= impuesto2T;
                impuesto4 -= impuesto4T;
                impuesto8 -= impuesto8T;
                impuesto13 -= impuesto13T;

                $("#subtotal").text(formatoDecimal(subtotal.toFixed(2)));
                $("#descuento").text(formatoDecimal(descuentos.toFixed(2)));
                $("#impuesto").text(formatoDecimal(impuestos.toFixed(2)));
                $("#total").text(formatoDecimal(totalComprobante.toFixed(2)));
                $("#tOCargos").text(formatoDecimal(parseFloat(oCargos).toFixed(2)));
                $("#impuesto1").text(formatoDecimal(parseFloat(impuesto1).toFixed(2)));
                $("#impuesto2").text(formatoDecimal(parseFloat(impuesto2).toFixed(2)));
                $("#impuesto4").text(formatoDecimal(parseFloat(impuesto4).toFixed(2)));
                $("#impuesto8").text(formatoDecimal(parseFloat(impuesto8).toFixed(2)));
                $("#impuesto13").text(formatoDecimal(parseFloat(impuesto13).toFixed(2)));

                ProdCadena.splice(campo, 1);
                if (ProdCadena.length > 0) {
                    $("#CodMoneda").select2({ disabled: true });
                } else {
                    $("#CodMoneda").select2({ disabled: false });
                }
                RellenaTabla();

            }
        })
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }


}



function validar(enc) {
    try {
        console.log(enc);
        if (enc.SubTotal == "" || enc.SubTotal == null) {

            return false;
        } else if (enc.FechaInicial == "" || enc.FechaInicial == null) {
            return false;
        } else if (ProdCadena.length == 0) {
            return false;
        } else if (enc.CodMoneda == "NULL") {
            return false;
        }
        else {
            return true;
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}


function Generar() {
    try {
        var EncCompras =
        {
            idCierre: $("#idCierre").val(),
            Periodo: $("#Periodo").val(),
            CodMoneda: $("#CodMoneda").val(),
            FechaInicial: $("#FechaI").val(),
            FechaFinal: $("#FechaFinal").val(),
            SubTotal: $("#subtotal").text(),
            CodMoneda: $("#CodMoneda").val(),
            Impuestos: $("#impuesto").text(),
            Descuento: $("#descuento").text(),
            Impuesto1: $("#impuesto1").text(),
            Impuesto2: $("#impuesto2").text(),
            Impuesto4: $("#impuesto4").text(),
            Impuesto8: $("#impuesto8").text(),
            Impuesto13: $("#impuesto13").text(),
            TotalOtrosCargos: $("#tOCargos").text(),
            Total: $("#total").text(),
            Observacion: $("#Comentario").val()
        };



        var Cadena = [];

        if (EncCompras.Impuesto4 == "") {
            EncCompras.Impuesto4 = "0";
        }
        if (EncCompras.Impuesto8 == "") {
            EncCompras.Impuesto8 = "0";
        }
        if (EncCompras.Impuesto13 == "") {
            EncCompras.Impuesto13 = "0";
        }

        if (EncCompras.TotalOtrosCargos == "") {
            EncCompras.TotalOtrosCargos = "0";
        }

        for (var i = 0; i < ProdCadena.length; i++) {
            var det = {
                idFactura: ProdCadena[i].id,
                idTipoGasto: ProdCadena[i].idTipoGasto,
                Comentario: ProdCadena[i].Comentario
            };
            Cadena.push(det);
        }


        var DetCompras = Cadena;


        var recibido = {
            EncCompras,
            DetCompras
        }


        console.log(JSON.stringify(recibido));

        if (validar(EncCompras)) {

            Swal.fire({
                title: '¿Desea guardar los cambios de esta liquidación?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: `Aceptar`,
                denyButtonText: `Cancelar`,
                customClass: {
                    confirmButton: 'swalBtnColor',
                    denyButton: 'swalDeny'
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    var recibidos = JSON.stringify(recibido);

                    $.ajax({
                        type: 'POST',

                        url: $("#urlGenerar").val(),
                        dataType: 'json',
                        data: { recibidos: recibidos.toString() },
                        headers: {
                            RequestVerificationToken: $('input:hidden[name="__RequestVerificationToken"]').val()
                        },
                        success: function (json) {

                            $("#divProcesando").hide();

                            if ($('.modal-backdrop').is(':visible')) {

                                $('body').removeClass('modal-open');
                                $('.modal-backdrop').hide();
                            }
                            console.log("resultado " + json.mensaje);
                            if (json.success == true) {
                                Swal.fire({
                                    title: "Ha sido generado con éxito",

                                    icon: 'success',
                                    showCancelButton: false,

                                    confirmButtonText: 'OK',
                                    customClass: {
                                        confirmButton: 'swalBtnColor',

                                    },
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        location.reload();
                                    }
                                })

                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Ha ocurrido un error al intentar guardar ' + json.mensaje

                                })
                            }
                        },

                        beforeSend: function (xhr) {

                            $("#divProcesando").modal("show");
                        },
                        complete: function () {

                        },
                        error: function (error) {
                            $("#divProcesando").hide();

                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Ha ocurrido un error al intentar guardar ' + error

                            })
                        }
                    });
                }
            }
            )

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Pareciera que aún falta un campo por llenar'

            });
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }


}


function EnviarRevision() {
    try {
        Swal.fire({
            title: '¿Desea enviar a revisión esta liquidación?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: `Aceptar`,
            denyButtonText: `Cancelar`,
            customClass: {
                confirmButton: 'swalBtnColor',
                denyButton: 'swalDeny'
            },
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: 'GET',

                    url: $("#urlEnviarRevision").val(),
                    dataType: 'text',
                    data: { idB: $("#idCierre").val() },
                    headers: {
                        RequestVerificationToken: $('input:hidden[name="__RequestVerificationToken"]').val()
                    },
                    success: function (json) {

                        $("#divProcesando").hide();

                        if ($('.modal-backdrop').is(':visible')) {

                            $('body').removeClass('modal-open');
                            $('.modal-backdrop').hide();
                        }
                        console.log("resultado " + json);
                        if (json == "true") {
                            Swal.fire({
                                title: "Ha sido enviado con éxito",

                                icon: 'success',
                                showCancelButton: false,

                                confirmButtonText: 'OK',
                                customClass: {
                                    confirmButton: 'swalBtnColor',

                                },
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.href = window.location.href.split("/EditarE")[0];
                                }
                            })

                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Ha ocurrido un error al intentar enviar'

                            })
                        }
                    },

                    beforeSend: function (xhr) {

                        $("#divProcesando").modal("show");
                    },
                    complete: function () {

                    },
                    error: function (error) {

                    }
                });
            }
        })

    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}


//Generar y Enviar
function GeneraryEnviar() {
    try {
        var EncCompras =
        {
            idCierre: $("#idCierre").val(),
            Periodo: $("#Periodo").val(),

            FechaInicial: $("#FechaI").val(),
            FechaFinal: $("#FechaFinal").val(),
            SubTotal: $("#subtotal").text(),
            CodMoneda: $("#CodMoneda").val(),
            Impuestos: $("#impuesto").text(),
            Descuento: $("#descuento").text(),
            Impuesto1: $("#impuesto1").text(),
            Impuesto2: $("#impuesto2").text(),
            Impuesto4: $("#impuesto4").text(),
            Impuesto8: $("#impuesto8").text(),
            Impuesto13: $("#impuesto13").text(),
            TotalOtrosCargos: $("#tOCargos").text(),
            Total: $("#total").text(),
            Observacion: $("#Comentario").val()
        };

        var Cadena = [];

        if (EncCompras.Impuesto4 == "") {
            EncCompras.Impuesto4 = "0";
        }
        if (EncCompras.Impuesto8 == "") {
            EncCompras.Impuesto8 = "0";
        }
        if (EncCompras.Impuesto13 == "") {
            EncCompras.Impuesto13 = "0";
        }

        if (EncCompras.TotalOtrosCargos == "") {
            EncCompras.TotalOtrosCargos = "0";
        }

        for (var i = 0; i < ProdCadena.length; i++) {
            var det = {
                idFactura: ProdCadena[i].id,
                idTipoGasto: ProdCadena[i].idTipoGasto,
                Comentario: ProdCadena[i].Comentario
            };
            Cadena.push(det);
        }


        var DetCompras = Cadena;


        var recibido = {
            EncCompras,
            DetCompras
        }


        console.log(JSON.stringify(recibido));

        if (validar(EncCompras)) {

            Swal.fire({
                title: '¿Desea guardar y enviar a revisión esta liquidación?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: `Aceptar`,
                denyButtonText: `Cancelar`,
                customClass: {
                    confirmButton: 'swalBtnColor',
                    denyButton: 'swalDeny'
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    var recibidos = JSON.stringify(recibido);

                    $.ajax({
                        type: 'POST',

                        url: $("#urlGeneraryEnviar").val(),
                        dataType: 'json',
                        data: { recibidos: recibidos.toString() },
                        headers: {
                            RequestVerificationToken: $('input:hidden[name="__RequestVerificationToken"]').val()
                        },
                        success: function (json) {

                            $("#divProcesando").hide();

                            if ($('.modal-backdrop').is(':visible')) {

                                $('body').removeClass('modal-open');
                                $('.modal-backdrop').hide();
                            }
                            console.log("resultado " + json);
                            if (json.success == true) {
                                Swal.fire({
                                    title: "Ha sido generado con éxito",

                                    icon: 'success',
                                    showCancelButton: false,

                                    confirmButtonText: 'OK',
                                    customClass: {
                                        confirmButton: 'swalBtnColor',

                                    },
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.href = window.location.href.split("/Editar")[0];
                                    }
                                })

                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Ha ocurrido un error al intentar guardar ' + json.mensaje

                                })
                            }
                        },

                        beforeSend: function (xhr) {

                            $("#divProcesando").modal("show");
                        },
                        complete: function () {
                            $("#divProcesando").hide();

                        },
                        error: function (error) {
                            $("#divProcesando").hide();

                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Ha ocurrido un error al intentar guardar ' + error

                            })
                        }
                    });
                }
            }
            )

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Pareciera que aún falta un campo por llenar'

            });
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }


}


const formatter = new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 0
})


var ImageBae64 = '';
var IMG2 = '';
var Productos = [];
var subtotalI = 0;
var impuestosI = 0;
var descuentosI = 0;
var totalComprobanteI = 0;

var impuestoI1 = 0;
var impuestoI2 = 0;
var impuestoI4 = 0;
var impuestoI8 = 0;
var impuestoI13 = 0;


async function readFilePrincipal(input) {
    try {
        if (input.files && input.files[0]) {

            const maxAllowSize = 5000000;
            if (input.files[0].size > maxAllowSize) {
                alert("Esta imagen es muy pesada");
                input.value = '';
            } else {
                var reader = new FileReader();
                var img = document.createElement("img");
                var canvas = document.createElement('canvas');

                reader.onload = function (e) {
                    img.src = e.target.result;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);

                    var MAX_WIDTH = 800;
                    var MAX_HEIGHT = 600;
                    var width = img.width;
                    var height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);
                    var dataurl = canvas.toDataURL("image/jpg");
                    document.getElementById('imgPrincipalG').src = e.target.result;

                    ImageBae64 = dataurl;
                    IMG2 = e.target.result;

                }

            }

            reader.readAsDataURL(input.files[0]);
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }




}

var fileUploadPrincipal = document.getElementById('imgPrincipalUploadG');
fileUploadPrincipal.onchange = async function (e) {
    await readFilePrincipal(e.srcElement);
    var idF = setInterval(async function () {

        if (ImageBae64 != "data:,") {

            clearInterval(idF);
        } else {
            await readFilePrincipal(e.srcElement);
        }
    }, 1500);

}

function check(i) {
    try {
        var checkbox1 = document.getElementById("simp");
        var checkbox2 = document.getElementById("ext");
        var checkbox3 = document.getElementById("var");
        var checkbox4 = document.getElementById("nrec");
        if (i == "1") {

            checkbox2.checked = false;
            checkbox3.checked = false;
            checkbox1.checked = true;
            $("#CHacienda").removeAttr("readonly");
            $("#ConsHacienda").removeAttr("readonly");

        }
        else if (i == "2") {
            checkbox3.checked = false;
            checkbox2.checked = true;
            checkbox1.checked = false;
            $("#CHacienda").attr("readonly", "readonly");
            $("#ConsHacienda").attr("readonly", "readonly");

            $("#CHacienda").val("");
            $("#ConsHacienda").val("");
        } else if (i == "3") {
            checkbox3.checked = true;
            checkbox2.checked = false;
            checkbox1.checked = false;
            checkbox4.checked = false;
        } else {
            checkbox3.checked = false;
            checkbox2.checked = false;
            checkbox1.checked = false;
            checkbox4.checked = true;
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}
function AbrirModal() {
    try {
        $("#ModalInclusion").modal("show");
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}
function AgregarProductosI() {
    try {


        var detalle = {

            CodPro: "1",
            NomPro: ($("#NomPro").val() == "" ? "Detalle factura" : $("#NomPro").val()),
            idTipoGasto: $("#idTipoGasto").val() == "NULL" ? "0" : $("#idTipoGasto").val(),
            Cantidad: "1",
            PrecioUnitario: $("#PrecUniI").val(),
            MontoDescuento: $("#desc").val(),
            ImpuestoTarifa: $("#TipoImpuesto").val(),
            ImpuestoMonto: $("#ImpuestoMonto").val(),
            MontoTotalLinea: 0,
            Impuesto1: 0,
            Impuesto2: 0,
            Impuesto4: 0,
            Impuesto8: 0,
            Impuesto13: 0
        };
        detalle.ImpuestoMonto = 0;
        detalle.MontoDescuento = 0;

        switch ($("#TipoImpuesto").val()) {
            case "0":
                {
                    if (document.getElementById("md_checkbox_10").checked) {
                        var Precio0 = parseFloat(detalle.PrecioUnitario);
                        var Imp10 = Precio0 * 0.12;
                        detalle.ImpuestoMonto += Precio0 * 0.12;
                        detalle.Impuesto4 += Imp10;
                    } if (document.getElementById("md_checkbox_14").checked) {
                        var Precio0 = parseFloat(detalle.PrecioUnitario);
                        var Imp14 = Precio0 * 0.10;
                        detalle.ImpuestoMonto += Precio0 * 0.10;
                        detalle.Impuesto8 += Imp14;
                    }
                    if (!(document.getElementById("md_checkbox_14").checked) && !(document.getElementById("md_checkbox_10").checked)) {
                        detalle.ImpuestoMonto += parseFloat(detalle.PrecioUnitario) * 0.00;
                    }


                    break;
                }
            case "12":
                {
                    if (document.getElementById("md_checkbox_10").checked) {
                        var Precio16 = parseFloat(detalle.PrecioUnitario / 1.24)
                        var Imp10 = Precio16 * 0.12;
                        detalle.ImpuestoMonto += Precio16 * 0.12;
                        detalle.Impuesto13 += Precio16 * 0.12;
                        detalle.ImpuestoMonto += Precio16 * 0.12;
                        detalle.Impuesto4 += Imp10;


                    }
                    if (document.getElementById("md_checkbox_14").checked) {
                        var Precio16 = parseFloat(detalle.PrecioUnitario / 1.22)
                        var Imp14 = Precio16 * 0.10;
                        detalle.ImpuestoMonto += Precio16 * 0.12;
                        detalle.Impuesto13 += Precio16 * 0.12;
                        detalle.ImpuestoMonto += Precio16 * 0.10;
                        detalle.Impuesto8 += Imp14;


                    }
                    if (!(document.getElementById("md_checkbox_14").checked) && !(document.getElementById("md_checkbox_10").checked)) {
                        var Precio16 = parseFloat(detalle.PrecioUnitario / 1.12)
                        detalle.ImpuestoMonto += Precio16 * 0.12;
                        detalle.Impuesto13 += detalle.ImpuestoMonto;
                    }


                    break;
                }
            case "15":
                {
                    if (document.getElementById("md_checkbox_10").checked) {
                        var Precio16 = parseFloat(detalle.PrecioUnitario / 1.27)
                        var Imp10 = Precio16 * 0.12;
                        detalle.ImpuestoMonto += Precio16 * 0.15;
                        detalle.Impuesto1 += Precio16 * 0.15;
                        detalle.ImpuestoMonto += Precio16 * 0.12;
                        detalle.Impuesto4 += Imp10;


                    }
                    if (document.getElementById("md_checkbox_14").checked) {
                        var Precio16 = parseFloat(detalle.PrecioUnitario / 1.25)
                        var Imp14 = Precio16 * 0.10;
                        detalle.ImpuestoMonto += Precio16 * 0.15;
                        detalle.Impuesto1 += Precio16 * 0.15;
                        detalle.ImpuestoMonto += Precio16 * 0.10;
                        detalle.Impuesto8 += Imp14;


                    }
                    if (!(document.getElementById("md_checkbox_14").checked) && !(document.getElementById("md_checkbox_10").checked)) {
                        var Precio16 = parseFloat(detalle.PrecioUnitario / 1.15)
                        detalle.ImpuestoMonto += Precio16 * 0.15;
                        detalle.Impuesto1 += detalle.ImpuestoMonto;
                    }


                    break;
                }

        }


        detalle.MontoTotalLinea = (detalle.PrecioUnitario);

        var subtotalT = 0;
        var descuentoT = 0;
        var impuestoT = 0;
        var totalT = 0;
        subtotalT = parseFloat(detalle.PrecioUnitario) - detalle.ImpuestoMonto;

        descuentoT = parseFloat(detalle.MontoDescuento);
        impuestoT = parseFloat(detalle.ImpuestoMonto);
        totalT = parseFloat(detalle.MontoTotalLinea);

        subtotalI += subtotalT;
        descuentosI += descuentoT;
        impuestosI += impuestoT;

        totalComprobanteI += totalT;

        var impuesto1T = parseFloat(detalle.Impuesto1);
        var impuesto2T = parseFloat(detalle.Impuesto2);
        var impuesto4T = parseFloat(detalle.Impuesto4);
        var impuesto8T = parseFloat(detalle.Impuesto8);
        var impuesto13T = parseFloat(detalle.Impuesto13);


        impuestoI1 += impuesto1T;
        impuestoI2 += impuesto2T;
        impuestoI4 += impuesto4T;
        impuestoI8 += impuesto8T;
        impuestoI13 += impuesto13T;


        $("#subtotalI").text(formatoDecimal(subtotalI.toFixed(2)));
        $("#descuentoI").text(formatoDecimal(descuentosI.toFixed(2)));
        $("#impuestoI").text(formatoDecimal(impuestosI.toFixed(2)));
        $("#totalI").text(formatoDecimal(totalComprobanteI.toFixed(2)));


        $("#impuesto1I").text(formatoDecimal(parseFloat(impuestoI1).toFixed(2)));
        $("#impuesto2I").text(formatoDecimal(parseFloat(impuestoI2).toFixed(2)));
        $("#impuesto4I").text(formatoDecimal(parseFloat(impuestoI4).toFixed(2)));
        $("#impuesto8I").text(formatoDecimal(parseFloat(impuestoI8).toFixed(2)));
        $("#impuesto13I").text(formatoDecimal(parseFloat(impuestoI13).toFixed(2)));

        detalle.PrecioUnitario = subtotalT;
        Productos.push(detalle);

    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }


}
function LimpiarDatosI() {
    try {
        $("#NomPro").val("");
        $("#ComentarioFactura").val("");
        $("#NumFacturaI").val(0);
        $("#PrecUniI").val(0);
        $("#descI").val(0);
        $("#TipoImpuesto").val("0").trigger('change');
        $("#idTipoGasto").val("NULL").trigger('change');
        $("#ImpuestoMonto").val(0);
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }



}

function RellenaTablaI() {
    try {
        var texto = '';

        $("#tbodyI").html('');

        for (var i = 0; i < Productos.length; i++) {
            texto += '<tr>';

            texto += '<td align="left" style="padding-top:15px;">  <p style="font-size:13px;">' + Productos[i].NomPro + '</p></td>';

            texto += '<td align="right" style="padding-top:15px;">  <p style="font-size:13px;">' + formatoDecimal(Productos[i].PrecioUnitario) + '</p></td>';
            texto += '<td align="right" style="padding-top:15px;">  <p style="font-size:13px;">' + formatoDecimal(Productos[i].MontoDescuento) + '</p></td>';
            texto += '<td align="right" style="padding-top:15px;">  <p style="font-size:13px;">' + formatoDecimal(Productos[i].ImpuestoMonto) + '</p></td>';
            texto += '<td align="right" style="padding-top:13px;">  <p style="font-size:13px;">' + formatoDecimal(Productos[i].MontoTotalLinea) + '</p></td>';
            texto += '<td align="center" style="padding-top:13px;">    <a style="margin-left: -1%; position: inherit !important;" onclick = "javascript: EliminaProductoI(' + i + ')" title="Eliminar" class="fa fa-trash icono"></a> ';
            texto += '</tr>'
        }
        $("#tbodyI").html(texto);
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}

function EliminaProductoI(campo) {
    try {
        var subtotalT = 0;
        var descuentoT = 0;
        var impuestoT = 0;
        var totalT = 0;
        subtotalT = parseFloat(Productos[campo].PrecioUnitario);
        descuentoT = parseFloat(Productos[campo].MontoDescuento);
        impuestoT = parseFloat(Productos[campo].ImpuestoMonto);

        totalT = parseFloat(Productos[campo].MontoTotalLinea);



        subtotalI -= subtotalT;
        descuentosI -= descuentoT;
        impuestosI -= impuestoT;

        totalComprobanteI -= totalT;

        var impuesto1T = parseFloat(Productos[campo].Impuesto1);
        var impuesto2T = parseFloat(Productos[campo].Impuesto2);
        var impuesto4T = parseFloat(Productos[campo].Impuesto4);
        var impuesto8T = parseFloat(Productos[campo].Impuesto8);
        var impuesto13T = parseFloat(Productos[campo].Impuesto13);


        impuestoI1 -= impuesto1T;
        impuestoI2 -= impuesto2T;
        impuestoI4 -= impuesto4T;
        impuestoI8 -= impuesto8T;
        impuestoI13 -= impuesto13T;


        $("#subtotalI").text(formatoDecimal(subtotalI.toFixed(2)));
        $("#descuentoI").text(formatoDecimal(descuentosI.toFixed(2)));
        $("#impuestoI").text(formatoDecimal(impuestosI.toFixed(2)));
        $("#totalI").text(formatoDecimal(totalComprobanteI.toFixed(2)));


        $("#impuesto1I").text(formatoDecimal(parseFloat(impuestoI1).toFixed(2)));
        $("#impuesto2I").text(formatoDecimal(parseFloat(impuestoI2).toFixed(2)));
        $("#impuesto4I").text(formatoDecimal(parseFloat(impuestoI4).toFixed(2)));
        $("#impuesto8I").text(formatoDecimal(parseFloat(impuestoI8).toFixed(2)));
        $("#impuesto13I").text(formatoDecimal(parseFloat(impuestoI13).toFixed(2)));

        Productos.splice(campo, 1);
        RellenaTablaI();

    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }




}



function mask() {
    try {
        switch ($("#idCliente").val()) {
            case "01":
                {
                    $("#CodCliente").inputmask({ "mask": "9-9999-9999" });
                    break;
                }
            case "02":
                {
                    $("#CodCliente").inputmask({ "mask": "9-999-999999" });
                    break;
                }
            case "03":
                {
                    $("#CodCliente").inputmask({ "mask": "999999999999" });
                    break;
                }
            case "04":
                {
                    $("#CodCliente").inputmask({ "mask": "9999999999" });
                    break;
                }
            default:
                {
                    break;
                }
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}
function mask2() {
    try {
        switch ($("input:radio[name=idProveedor]:checked").val()) {
            case "01":
                {
                    $("#CodProveedor").attr('maxlength', 13);


                    break;
                }
            case "02":
                {
                    $("#CodProveedor").attr('maxlength', 13);


                    break;
                }
            case "03":
                {
                    $("#CodProveedor").attr('maxlength', 13);


                    break;
                }
            case "04":
                {
                    $("#CodProveedor").attr('maxlength', 13);


                    break;
                }
            default:
                {
                    break;
                }
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}

function GenerarI() {
    try {
        var button = document.getElementById('buttonSpin');
        if (typeof (button.getAttribute('data-loading')) === 'string') {
            button.removeAttribute('data-loading');
        }
        else {
            button.setAttribute('data-loading', '');
        }

        $("#spinloader").removeAttr('hidden');
        button.disabled = true;


        var selectTP = $("#selectTPF").val();

        var NumFacturaI = $("#NumFacturaI").val();
        NumFacturaI = NumFacturaI.substring(NumFacturaI.length - 4, NumFacturaI.length);

        var EncCompras =
        {
            ClaveHacienda: $("#NumFacturaI").val(),
            ConsecutivoHacienda: $("#NumFacturaI").val(),
            TipoIdentificacionCliente: "0",
            NumFactura: NumFacturaI,
            CodProveedor: $("#CodProveedor").val(),
            NomProveedor: $("#NomProveedor").val(),
            FecFactura: $("#FecFactura").val(),
            Comentario: $("#ComentarioFactura").val(),
            CodigoActividadEconomica: "0",
            CodMoneda: $("#CodMoneda").val(),
            CodCliente: "0",
            NomCliente: "0",
            TotalVenta: $("#subtotalI").text(),
            TotalImpuesto: $("#impuestoI").text(),
            TotalDescuentos: $("#descuentoI").text(),
            Impuesto1: $("#impuesto1I").text(),
            Impuesto2: $("#impuesto2I").text(),
            Impuesto4: $("#impuesto4I").text(),
            Impuesto8: $("#impuesto8I").text(),
            Impuesto13: $("#impuesto13I").text(),
            TotalComprobante: $("#totalI").text(),
            ImagenB64: (ImageBae64 === '' ? '' : ImageBae64.toString().replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '')),

            ImagenBase64: (ImageBae64 === '' ? '' : ImageBae64.toString().replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '')),
            RegimenSimplificado: selectTP == "01",
            FacturaExterior: selectTP == "02",
            GastosVarios: selectTP == "03",
            FacturaNoRecibida: false
        };

        var DetCompras = Productos;
        var recibido = {
            EncCompras,
            DetCompras
        };

        var recibidos = JSON.stringify(recibido);
        if (ValidarFactura()) {
            $("#FaltaDatos").css("display", "none");

            $.ajax({
                type: 'POST',

                url: $("#urlFacturaCR").val(),
                datatype: "application/json",
                data: { recibidos: recibidos.toString() },
                headers: {
                    RequestVerificationToken: $('input:hidden[name="__RequestVerificationToken"]').val()
                },
                success: function (json) {

                    console.log(json.resp + " -> " + json.success);
                    if (json.success == true) {
                        button.removeAttribute('data-loading');
                        $("#spinloader").attr("hidden", true);
                        button.disabled = false;

                        //Aqui se meteria en el detalle
                        var detalle = {
                            id: json.resp,
                            Proveedor: EncCompras.NomProveedor,
                            CHacienda: EncCompras.NumFactura,
                            CodProveedor: EncCompras.CodProveedor,
                            Fecha: EncCompras.FecFactura,
                            SubTotal: parseFloat(EncCompras.TotalVenta.replace(",", "").replace(",", "")),
                            Descuento: parseFloat(EncCompras.TotalDescuentos.replace(",", "").replace(",", "")),
                            Impuesto: parseFloat(EncCompras.TotalImpuesto.replace(",", "").replace(",", "")),
                            Total: 0,
                            Impuesto1: parseFloat(EncCompras.Impuesto1.replace(",", "").replace(",", "")),
                            Impuesto2: parseFloat(EncCompras.Impuesto2.replace(",", "").replace(",", "")),
                            Impuesto4: parseFloat(EncCompras.Impuesto4.replace(",", "").replace(",", "")),
                            Impuesto8: parseFloat(EncCompras.Impuesto8.replace(",", "").replace(",", "")),
                            Impuesto13: parseFloat(EncCompras.Impuesto13.replace(",", "").replace(",", "")),
                            idTipoGasto: Productos[0].idTipoGasto,
                            TotalOtrosCargos: 0,
                            Comentario: EncCompras.Comentario
                        };

                        console.log(EncCompras);
                        console.log(detalle);
                        var subtotalT = 0;
                        var descuentoT = 0;
                        var impuestoT = 0;
                        var totalT = 0;
                        subtotalT = parseFloat(detalle.SubTotal);
                        descuentoT = parseFloat(detalle.Descuento);
                        impuestoT = parseFloat(detalle.Impuesto);
                        detalle.Total = (subtotalT - descuentoT) + impuestoT
                        ProdCadena.push(detalle);
                        totalT = parseFloat(detalle.Total);
                        var impuesto1T = parseFloat(detalle.Impuesto1);
                        var impuesto2T = parseFloat(detalle.Impuesto2);
                        var impuesto4T = parseFloat(detalle.Impuesto4);
                        var impuesto8T = parseFloat(detalle.Impuesto8);
                        var impuesto13T = parseFloat(detalle.Impuesto13);



                        subtotal += subtotalT;
                        descuentos += descuentoT;
                        impuestos += impuestoT;

                        totalComprobante += totalT;
                        impuesto1 += impuesto1T;
                        impuesto2 += impuesto2T;
                        impuesto4 += impuesto4T;
                        impuesto8 += impuesto8T;
                        impuesto13 += impuesto13T;

                        $("#subtotal").text(formatoDecimal(parseFloat(subtotal).toFixed(2)));
                        $("#descuento").text(formatoDecimal(parseFloat(descuentos).toFixed(2)));
                        $("#impuesto").text(formatoDecimal(parseFloat(impuestos).toFixed(2)));
                        $("#total").text(formatoDecimal(parseFloat(totalComprobante).toFixed(2)));

                        $("#impuesto1").text(formatoDecimal(parseFloat(impuesto1).toFixed(2)));
                        $("#impuesto2").text(formatoDecimal(parseFloat(impuesto2).toFixed(2)));
                        $("#impuesto4").text(formatoDecimal(parseFloat(impuesto4).toFixed(2)));
                        $("#impuesto8").text(formatoDecimal(parseFloat(impuesto8).toFixed(2)));
                        $("#impuesto13").text(formatoDecimal(parseFloat(impuesto13).toFixed(2)));
                        LimpiarDatos();

                        RellenaTabla();
                        LimpiarDatosGenerales();
                        $("#ModalInclusion").modal("hide");

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Ha ocurrido un error   ' + json.resp

                        })

                        $("#spinloader").attr("hidden", true);
                        button.disabled = false;

                        button.removeAttribute('data-loading');
                        EliminaProductoI(0);
                    }
                },

                beforeSend: function (xhr) {


                },
                complete: function () {

                },
                error: function (error) {
                    $("#spinloader").attr("hidden", true);
                    button.disabled = false;


                    EliminaProductoI(0);

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ha ocurrido un error al intentar insertar factura manual ' + error.resp

                    })
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que faltan datos por rellenar '

            })
            button.disabled = false;
            $("#spinloader").attr("hidden", true);

            EliminaProductoI(0);
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar insertar factura manual ' + e

        })

        button.disabled = false;
        $("#spinloader").attr("hidden", true);
    }


}

function LimpiarDatosGenerales() {
    try {
        $("#NumFactura").val("");
        $("#CodProveedor").val("");
        $("#NomProveedor").val("");
        $("#FecFactura").val("");
        $("#subtotalI").text("0");
        $("#impuestoI").text("0");
        $("#descuentoI").text("0");
        $("#impuesto1I").text("0");
        $("#impuesto2I").text("0");
        $("#impuesto4I").text("0");
        $("#impuesto8I").text("0");
        $("#impuesto13I").text("0");
        $("#totalI").text("0");
        ImagenBase64 = "";
        Productos = [];

        subtotalT = 0;
        descuentoT = 0;
        impuestoT = 0;
        totalT = 0;

        impuesto1T = 0;
        impuesto2T = 0;
        impuesto4T = 0;
        impuesto8T = 0;
        impuesto13T = 0;

        subtotalI = 0;
        impuestosI = 0;
        descuentosI = 0;
        totalComprobanteI = 0;

        impuestoI1 = 0;
        impuestoI2 = 0;
        impuestoI4 = 0;
        impuestoI8 = 0;
        impuestoI13 = 0;
        document.getElementById('imgPrincipalG').src = "/img/cm.jpg";
        ImageBae64 = "";
        LimpiarDatosI();
        RellenaTablaI();
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}
function ValidarFactura() {
    try {
        if (ProdCadena.find(a => a.CHacienda.trim() == $("#NumFacturaI").val() && a.CodProveedor == $("#CodProveedor").val()) != undefined) {
            return false;
        }

        if ($("#NumFacturaI").val() == "") {
            return false;
        } else if ($("#CodProveedor").val() == "") {
            return false;
        } else if ($("#NomProveedor").val() == "") {
            return false;
        } else if ($("#FecFactura").val() == "") {
            return false;
        } else if (Productos.length == 0) {
            return false;
        } else if (ImageBae64 == "") {
            return false;
        } else if ($("#idTipoGasto").val() == "NULL") {
            return false;
        }
        else {
            return true;
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}

async function EnviarFC() {
    try {
        AgregarProductosI();
        GenerarI();

    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}




var ImageBae64E = '';
var ProductosE = [];
var subtotalE = 0;
var impuestosE = 0;
var descuentosE = 0;
var totalComprobanteE = 0;

var impuestoE1 = 0;
var impuestoE2 = 0;
var impuestoE4 = 0;
var impuestoE8 = 0;
var impuestoE13 = 0;
var resultadoAnterior = [];

function onChangeFecFacturaE() {
    try {
        if (new Date($("#FechaFinal").val()).addDays(1) < new Date($("#FecFacturaE").val()).addDays(1) || new Date($("#FechaI").val()).addDays(1) > new Date($("#FecFacturaE").val()).addDays(1)) {
            $("#FecFacturaE").val($("#FechaI").val());

            alert("La fecha de la factura manual no puede ser menor o mayor que la del periodo");
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}

async function readFilePrincipalE(input) {
    try {
        if (input.files && input.files[0]) {

            const maxAllowSize = 5000000;
            if (input.files[0].size > maxAllowSize) {
                alert("Esta imagen es muy pesada");
                input.value = '';
            } else {
                var reader = new FileReader();
                var img = document.createElement("img");
                var canvas = document.createElement('canvas');

                reader.onload = function (e) {
                    img.src = e.target.result;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);

                    var MAX_WIDTH = 800;
                    var MAX_HEIGHT = 600;
                    var width = img.width;
                    var height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);
                    var dataurl = canvas.toDataURL("image/jpg");
                    document.getElementById('imgPrincipalGE').src = e.target.result;

                    // console.log(dataurl);
                    ImageBae64E = dataurl;//e.target.result;

                    //var idF = setInterval(cancelar, 3000);

                    //function cancelar() {
                    //    console.log("cancelar -> " +ImageBae64);
                    //    if (ImageBae64 != "data:,") {
                    //        clearInterval(idF);
                    //    }
                    //}
                }

            }

            reader.readAsDataURL(input.files[0]);
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }




}

var fileUploadPrincipalE = document.getElementById('imgPrincipalUploadGE');
fileUploadPrincipalE.onchange = async function (e) {
    await readFilePrincipalE(e.srcElement);
    var idF = setInterval(async function () {

        if (ImageBae64E != "data:,") {

            clearInterval(idF);
        } else {
            await readFilePrincipalE(e.srcElement);
        }
    }, 1500);

}

function checkE(i) {
    try {
        if (i == "1") {
            $("#selectTPFE").val("01");

            $("#CHacienda").removeAttr("readonly");
            $("#ConsHacienda").removeAttr("readonly");

        }
        else if (i == "2") {
            $("#selectTPFE").val("02");

            $("#CHacienda").attr("readonly", "readonly");
            $("#ConsHacienda").attr("readonly", "readonly");

            $("#CHacienda").val("");
            $("#ConsHacienda").val("");
        } else if (i == "3") {
            $("#selectTPFE").val("03");

        } else {
            $("#selectTPFE").val("03");

        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }


}
function AbrirModalE() {
    try {
        $("#ModalEdicion").modal("show");
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}
function AgregarProductosE() {
    try {

        var combo = document.getElementById("idTipoGastoE");
        var selected = combo.options[combo.selectedIndex].text;

        var detalle = {

            CodPro: "1",
            NomPro: ($("#NomProE").val() == "" ? "Detalle factura" : (selected.includes("COMB") ? $("#NomProE").val() + " * " + $("#idTipoCombE").val() : $("#NomProE").val())),
            idTipoGasto: $("#idTipoGastoE").val() == "NULL" ? "0" : $("#idTipoGastoE").val(),
            Cantidad: (selected.includes("COMB") && Pais == "P" ? $("#CantLitrosE").val() : "1"),
            PrecioUnitario: $("#PrecUniE").val(),
            MontoDescuento: $("#descE").val(),
            ImpuestoTarifa: $("#TipoImpuestoE").val(),
            ImpuestoMonto: $("#ImpuestoMontoE").val(),
            MontoTotalLinea: 0,
            Impuesto1: 0,
            Impuesto2: 0,
            Impuesto4: 0,
            Impuesto8: 0,
            Impuesto13: 0
        };
        detalle.ImpuestoMonto = 0;
        detalle.MontoDescuento = 0;
        switch ($("#TipoImpuestoE").val()) {
            case "0":
                {
                    if (document.getElementById("md_checkbox_11").checked) {
                        var Precio0 = parseFloat(detalle.PrecioUnitario);
                        var Imp10 = Precio0 * 0.12;
                        detalle.ImpuestoMonto += Precio0 * 0.12;
                        detalle.Impuesto4 += Imp10;
                    } if (document.getElementById("md_checkbox_15").checked) {
                        var Precio0 = parseFloat(detalle.PrecioUnitario);
                        var Imp14 = Precio0 * 0.10;
                        detalle.ImpuestoMonto += Precio0 * 0.10;
                        detalle.Impuesto8 += Imp14;
                    }
                    else {
                        detalle.ImpuestoMonto += parseFloat(detalle.PrecioUnitario) * 0.00;
                    }


                    break;
                }
            case "12":
                {
                    if (document.getElementById("md_checkbox_11").checked) {
                        var Precio16 = parseFloat(detalle.PrecioUnitario / 1.24)
                        var Imp10 = Precio16 * 0.12;
                        detalle.ImpuestoMonto += Precio16 * 0.12;
                        detalle.Impuesto13 += Precio16 * 0.12;
                        detalle.ImpuestoMonto += Precio16 * 0.12;
                        detalle.Impuesto4 += Imp10;


                    }
                    if (document.getElementById("md_checkbox_15").checked) {
                        var Precio16 = parseFloat(detalle.PrecioUnitario / 1.22)
                        var Imp14 = Precio16 * 0.10;
                        detalle.ImpuestoMonto += Precio16 * 0.12;
                        detalle.Impuesto13 += Precio16 * 0.12;
                        detalle.ImpuestoMonto += Precio16 * 0.10;
                        detalle.Impuesto8 += Imp14;


                    }
                    if (!(document.getElementById("md_checkbox_15").checked) && !(document.getElementById("md_checkbox_11").checked)) {
                        var Precio16 = parseFloat(detalle.PrecioUnitario / 1.12)
                        detalle.ImpuestoMonto += Precio16 * 0.12;
                        detalle.Impuesto13 += detalle.ImpuestoMonto;
                    }


                    break;
                }
            case "15":
                {
                    if (document.getElementById("md_checkbox_11").checked) {
                        var Precio16 = parseFloat(detalle.PrecioUnitario / 1.27)
                        var Imp10 = Precio16 * 0.12;
                        detalle.ImpuestoMonto += Precio16 * 0.15;
                        detalle.Impuesto1 += Precio16 * 0.15;
                        detalle.ImpuestoMonto += Precio16 * 0.12;
                        detalle.Impuesto4 += Imp10;


                    }
                    if (document.getElementById("md_checkbox_15").checked) {
                        var Precio16 = parseFloat(detalle.PrecioUnitario / 1.25)
                        var Imp14 = Precio16 * 0.10;
                        detalle.ImpuestoMonto += Precio16 * 0.15;
                        detalle.Impuesto1 += Precio16 * 0.15;
                        detalle.ImpuestoMonto += Precio16 * 0.10;
                        detalle.Impuesto8 += Imp14;


                    }
                    if (!(document.getElementById("md_checkbox_15").checked) && !(document.getElementById("md_checkbox_11").checked)) {
                        var Precio16 = parseFloat(detalle.PrecioUnitario / 1.15)
                        detalle.ImpuestoMonto += Precio16 * 0.15;
                        detalle.Impuesto1 += detalle.ImpuestoMonto;
                    }


                    break;
                }
        }




        detalle.MontoTotalLinea = (detalle.PrecioUnitario);


        var subtotalT = 0;
        var descuentoT = 0;
        var impuestoT = 0;
        var totalT = 0;


        subtotalT = parseFloat(detalle.PrecioUnitario) - detalle.ImpuestoMonto;

        descuentoT = parseFloat(detalle.MontoDescuento);
        impuestoT = parseFloat(detalle.ImpuestoMonto);
        totalT = parseFloat(detalle.MontoTotalLinea);

        subtotalE += subtotalT;
        descuentosE += descuentoT;
        impuestosE += impuestoT;

        totalComprobanteE += totalT;

        var impuesto1T = parseFloat(detalle.Impuesto1);
        var impuesto2T = parseFloat(detalle.Impuesto2);
        var impuesto4T = parseFloat(detalle.Impuesto4);
        var impuesto8T = parseFloat(detalle.Impuesto8);
        var impuesto13T = parseFloat(detalle.Impuesto13);


        impuestoE1 += impuesto1T;
        impuestoE2 += impuesto2T;
        impuestoE4 += impuesto4T;
        impuestoE8 += impuesto8T;
        impuestoE13 += impuesto13T;


        $("#subtotalE").text(formatoDecimal(subtotalE.toFixed(2)));
        $("#descuentoE").text(formatoDecimal(descuentosE.toFixed(2)));
        $("#impuestoE").text(formatoDecimal(impuestosE.toFixed(2)));
        $("#totalE").text(formatoDecimal(totalComprobanteE.toFixed(2)));


        $("#impuesto1E").text(formatoDecimal(parseFloat(impuestoE1).toFixed(2)));
        $("#impuesto2E").text(formatoDecimal(parseFloat(impuestoE2).toFixed(2)));
        $("#impuesto4E").text(formatoDecimal(parseFloat(impuestoE4).toFixed(2)));
        $("#impuesto8E").text(formatoDecimal(parseFloat(impuestoE8).toFixed(2)));
        $("#impuesto13E").text(formatoDecimal(parseFloat(impuestoE13).toFixed(2)));

        detalle.PrecioUnitario = subtotalT;

        ProductosE.push(detalle);

    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}
function LimpiarDatosE() {
    try {
        $("#NomProE").val("");

        $("#PrecUniE").val(0);
        $("#descE").val(0);
        $("#TipoImpuestoE").val("0").trigger('change');
        $("#idTipoGastoE").val("NULL").trigger('change');
        $("#ImpuestoMontoE").val(0);
        $("#idTipoCombE").val("").trigger('change');
        $("#CantLitrosE").val(1);
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }


}

function RellenaTablaE() {
    try {
        var texto = '';

        $("#tbodyE").html('');

        for (var i = 0; i < ProductosE.length; i++) {
            texto += '<tr>';

            texto += '<td align="left" style="padding-top:15px;">  <p style="font-size:13px;">' + ProductosE[i].NomPro + '</p></td>';

            texto += '<td align="right" style="padding-top:15px;">  <p style="font-size:13px;">' + formatoDecimal(ProductosE[i].PrecioUnitario) + '</p></td>';
            texto += '<td align="right" style="padding-top:15px;">  <p style="font-size:13px;">' + formatoDecimal(ProductosE[i].MontoDescuento) + '</p></td>';
            texto += '<td align="right" style="padding-top:15px;">  <p style="font-size:13px;">' + formatoDecimal(ProductosE[i].ImpuestoMonto) + '</p></td>';
            texto += '<td align="right" style="padding-top:13px;">  <p style="font-size:13px;">' + formatoDecimal(ProductosE[i].MontoTotalLinea) + '</p></td>';
            texto += '<td align="center" style="padding-top:13px;">    <a style="margin-left: -1%; position: inherit !important;" onclick="javascript: EliminaProductoE(' + i + ')" title="Eliminar" class="fa fa-trash icono"></a> ';
            texto += '</tr>'
        }
        $("#tbodyE").html(texto);
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}

function EliminaProductoE(campo) {
    try {
        var subtotalT = 0;
        var descuentoT = 0;
        var impuestoT = 0;
        var totalT = 0;
        subtotalT = parseFloat(ProductosE[campo].PrecioUnitario);
        descuentoT = parseFloat(ProductosE[campo].MontoDescuento);
        impuestoT = parseFloat(ProductosE[campo].ImpuestoMonto);

        totalT = parseFloat(ProductosE[campo].MontoTotalLinea);
        if (document.getElementById("md_checkbox_11").checked) {

            subtotalT = parseFloat(ProductosE[campo].PrecioUnitario) - ProductosE[campo].ImpuestoMonto;

        }

        if (document.getElementById("md_checkbox_15").checked) {

            subtotalT = parseFloat(ProductosE[campo].PrecioUnitario) - ProductosE[campo].ImpuestoMonto;

        }

        subtotalE -= subtotalT;
        descuentosE -= descuentoT;
        impuestosE -= impuestoT;

        totalComprobanteE -= totalT;

        var impuesto1T = parseFloat(ProductosE[campo].Impuesto1);
        var impuesto2T = parseFloat(ProductosE[campo].Impuesto2);
        var impuesto4T = parseFloat(ProductosE[campo].Impuesto4);
        var impuesto8T = parseFloat(ProductosE[campo].Impuesto8);
        var impuesto13T = parseFloat(ProductosE[campo].Impuesto13);


        impuestoE1 -= impuesto1T;
        impuestoE2 -= impuesto2T;
        impuestoE4 -= impuesto4T;
        impuestoE8 -= impuesto8T;
        impuestoE13 -= impuesto13T;


        $("#subtotalE").text(formatoDecimal(subtotalE.toFixed(2)));
        $("#descuentoE").text(formatoDecimal(descuentosE.toFixed(2)));
        $("#impuestoE").text(formatoDecimal(impuestosE.toFixed(2)));
        $("#totalE").text(formatoDecimal(totalComprobanteE.toFixed(2)));


        $("#impuesto1E").text(formatoDecimal(parseFloat(impuestoE1).toFixed(2)));
        $("#impuesto2E").text(formatoDecimal(parseFloat(impuestoE2).toFixed(2)));
        $("#impuesto4E").text(formatoDecimal(parseFloat(impuestoE4).toFixed(2)));
        $("#impuesto8E").text(formatoDecimal(parseFloat(impuestoE8).toFixed(2)));
        $("#impuesto13E").text(formatoDecimal(parseFloat(impuestoE13).toFixed(2)));

        ProductosE.splice(campo, 1);
        RellenaTablaE();
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }





}

function onChangeTipoGastoE() {
    try {
        var combo = document.getElementById("idTipoGastoE");
        var selected = combo.options[combo.selectedIndex].text;

        if (selected.includes("COMB") && (Pais == "P" || Pais == "N")) {
            $("#CombustibleE").attr("hidden", false);
        } else {
            $("#CombustibleE").attr("hidden", true);
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}

function AbrirModalEdicion(id) {
    try {
        document.getElementById("md_checkbox_11").checked = false;
        document.getElementById("md_checkbox_15").checked = false;
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: $("#urlModalEdicion").val(),
            data: { idB: id },
            success: function (result) {

                console.log("Resultado de la busqueda en la edicion: " + result.encCompras);

                if (result != null) {
                    resultadoAnterior = result;
                    $("#idFacE").val(id);
                    document.getElementById('imgPrincipalGE').src = result.imagenB64 == null ? result.pdfFactura : "data:image/png;base64," + result.imagenB64;

                    if (Pais == "P" || Pais == "N") {
                        $("#DVE").val(result.codProveedor.split("[")[1]);
                        result.codProveedor = result.codProveedor.split("[")[0];


                    }

                    switch (result.codProveedor.replace("-", "").replace("-", "").length) {
                        case 7:
                        case 8:
                        case 9:
                            {
                                $("#selectTPE").val("01");
                                maskE2();
                                break;
                            }
                        case 10:

                            {
                                if (Pais == "P") {
                                    $("#selectTPE").val("03");
                                } else {
                                    $("#selectTPE").val("02");
                                }

                                maskE2();
                                break;
                            }
                        case 12:
                            {
                                $("#selectTPE").val("03");
                                maskE2();
                                break;
                            }
                        case 13:
                        case 14:
                        case 15:
                            {
                                if (Pais != "N") {
                                    $("#selectTPE").val("02");

                                } else {
                                    if (result.codProveedor.replace("-", "").replace("-", "").includes("J") || result.codProveedor.replace("-", "").replace("-", "").includes("j")) {
                                        $("#selectTPE").val("02");

                                    } else {
                                        $("#selectTPE").val("01");

                                    }
                                }
                                maskE2();
                                break;
                            }

                    }

                    $("#CodProveedorE").val(result.codProveedor.replace("-", "").replace("-", ""));
                    $("#NomProveedorE").val(result.nomProveedor);
                    $("#NumFacturaE").val(result.consecutivoHacienda);
                    $("#ComentarioFacturaE").val(result.comentario);

                    $("#FecFacturaE").val(result.fecFactura.toString().replace("T00:00:00", ""));
                    $("#NomProE").val(result.detCompras[0].nomPro);
                    $("#TipoImpuestoE").val(result.detCompras[0].impuestoTarifa);
                    $("#idTipoGastoE").val(result.detCompras[0].idTipoGasto);


                    $("#PrecUniE").val(Math.round(result.detCompras[0].precioUnitario + result.detCompras[0].impuestoMonto));



                    $("#descE").val(result.detCompras[0].montoDescuento);
                    $("#ImpuestoMontoE").val(result.detCompras[0].impuestoMonto);

                    
                     
                    if (result.impuesto4 > 0) {
                        document.getElementById("md_checkbox_11").checked = true;
                         
                    }


                    if (result.impuesto8 > 0) {
                        document.getElementById("md_checkbox_15").checked = true; 
                    }
                    if (result.regimenSimplificado) {
                        checkE('1');

                    } else if (result.facturaExterior) {
                        checkE('2');
                    } else {
                        checkE('3');
                    }


                    if (Pais == "E") {
                        var combo = document.getElementById("idTipoGastoE");
                        var selected = combo.options[combo.selectedIndex].text;

                        if (selected.includes("Comb")) {
                            $("#CombustibleE").attr("hidden", false);
                            $("#CantLitrosE").val(result.detCompras[0].cantidad);
                            $("#NomProE").val(result.detCompras[0].nomPro.split("*")[0].trim());
                            $("#idTipoCombE").val(result.detCompras[0].nomPro.split("*")[1].trim());
                        } else {
                            $("#CombustibleE").attr("hidden", true);
                        }
                    }


                    AbrirModalE();


                }

            },
            beforeSend: function () {

            },
            complete: function () {

            }
        });
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}

function maskE() {
    try {
        if (Pais == "P") {
            switch ($("#idClienteE").val()) {
                case "01":
                    {
                        $("#CodClienteE").inputmask({ "mask": "99-999-9999" });
                        break;
                    }
                case "02":
                    {
                        $("#CodClienteE").inputmask({ "mask": "9999999-99-999999" });
                        break;
                    }
                case "03":
                    {
                        $("#CodClienteE").inputmask({ "mask": "9999999999" });
                        break;
                    }
                case "04":
                    {
                        $("#CodClienteE").inputmask({ "mask": "9999999999" });
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        } else if (Pais == "C") {

            switch ($("#idClienteE").val()) {
                case "01":
                    {
                        $("#CodClienteE").inputmask({ "mask": "9-9999-9999" });
                        break;
                    }
                case "02":
                    {
                        $("#CodClienteE").inputmask({ "mask": "9-999-999999" });
                        break;
                    }
                case "03":
                    {
                        $("#CodClienteE").inputmask({ "mask": "999999999999" });
                        break;
                    }
                case "04":
                    {
                        $("#CodClienteE").inputmask({ "mask": "9999999999" });
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        } else if (Pais == "N") {
            switch ($("#idClienteE").val()) {
                case "01":
                    {
                        $("#CodClienteE").inputmask({ "mask": "999-999999-99999" });
                        break;
                    }
                case "02":
                    {
                        $("#CodClienteE").inputmask({ "mask": "99999999999999-9" });
                        break;
                    }
                case "03":
                    {
                        $("#CodClienteE").inputmask({ "mask": "999999999999999" });
                        break;
                    }
                case "04":
                    {
                        $("#CodClienteE").inputmask({ "mask": "999999999999999" });
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }



}
function maskE2() {
    try {
        switch ($("#selectTPE").val()) {
            case "01":
                {
                    $("#CodProveedorE").inputmask({ "mask": "9999999999999" });
                    break;
                }
            case "02":
                {
                    $("#CodProveedorE").inputmask({ "mask": "9999999999999" });
                    break;
                }
            case "03":
                {
                    $("#CodProveedorE").inputmask({ "mask": "9999999999999" });
                    break;
                }
            case "04":
                {
                    $("#CodProveedorE").inputmask({ "mask": "9999999999999" });
                    break;
                }
            default:
                {
                    break;
                }
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}

function GenerarE() {
    try {
        var button = document.getElementById('buttonSpinE');
        if (typeof (button.getAttribute('data-loading')) === 'string') {
            button.removeAttribute('data-loading');
        }
        else {
            button.setAttribute('data-loading', '');
        }

        $("#spinloaderE").removeAttr('hidden');
        button.disabled = true;

        var selectTPEE = $("#selectTPFE").val();

        var NumFacturaE = $("#NumFacturaE").val();
        NumFacturaE = NumFacturaE.substring(NumFacturaE.length - 4, NumFacturaE.length);

        var EncCompras =
        {
            id: $("#idFacE").val(),
            ClaveHacienda: $("#NumFacturaE").val(),
            ConsecutivoHacienda: $("#NumFacturaE").val(),
            TipoIdentificacionCliente: "0",
            NumFactura: NumFacturaE,
            CodProveedor: (Pais == "P" || Pais == "N" ? $("#CodProveedorE").val() + "[" + $("#DVE").val() : $("#CodProveedorE").val()),

            Comentario: $("#ComentarioFacturaE").val(),
            NomProveedor: $("#NomProveedorE").val(),
            FecFactura: $("#FecFacturaE").val(),
            CodigoActividadEconomica: "0",
            CodMoneda: $("#CodMoneda").val(),
            CodCliente: "0",
            NomCliente: "0",
            TotalVenta: $("#subtotalE").text(),
            TotalImpuesto: $("#impuestoE").text(),
            TotalDescuentos: $("#descuentoE").text(),
            Impuesto1: $("#impuesto1E").text(),
            Impuesto2: $("#impuesto2E").text(),
            Impuesto4: $("#impuesto4E").text(),
            Impuesto8: $("#impuesto8E").text(),
            Impuesto13: $("#impuesto13E").text(),
            TotalComprobante: $("#totalE").text(),
            ImagenBase64: (ImageBae64E === '' ? '' : ImageBae64E.toString().replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '')),
            RegimenSimplificado: selectTPEE == "01",
            FacturaExterior: selectTPEE == "02",
            GastosVarios: selectTPEE == "03",
            FacturaNoRecibida: false
        };

        var DetCompras = ProductosE;
        var recibido = {
            EncCompras,
            DetCompras
        };

        var recibidos = JSON.stringify(recibido);
        if (ValidarFacturaE()) {
            $("#FaltaDatosE").css("display", "none");
            $.ajax({
                type: 'POST',

                url: $("#urlGenerarE").val(),
                datatype: "application/json",
                data: { recibidos: recibidos.toString() },
                headers: {
                    RequestVerificationToken: $('input:hidden[name="__RequestVerificationToken"]').val()
                },
                success: function (json) {

                    console.log(json);
                    if (json.success == true) {
                        button.removeAttribute('data-loading');
                        $("#spinloaderE").attr("hidden", true);
                        button.disabled = false;
                        //Aqui se meteria en el detalle
                        var detalle = {
                            id: json.resp,
                            Proveedor: EncCompras.NomProveedor,
                            CHacienda: EncCompras.NumFactura,
                            Fecha: EncCompras.FecFactura,
                            SubTotal: parseFloat(EncCompras.TotalVenta.replace(",", "").replace(",", "")),
                            Descuento: parseFloat(EncCompras.TotalDescuentos.replace(",", "").replace(",", "")),
                            Impuesto: parseFloat(EncCompras.TotalImpuesto.replace(",", "").replace(",", "")),
                            Total: 0,
                            Impuesto1: parseFloat(EncCompras.Impuesto1.replace(",", "").replace(",", "")),
                            Impuesto2: parseFloat(EncCompras.Impuesto2.replace(",", "").replace(",", "")),
                            Impuesto4: parseFloat(EncCompras.Impuesto4.replace(",", "").replace(",", "")),
                            Impuesto8: parseFloat(EncCompras.Impuesto8.replace(",", "").replace(",", "")),
                            Impuesto13: parseFloat(EncCompras.Impuesto13.replace(",", "").replace(",", "")),
                            idTipoGasto: ProductosE[0].idTipoGasto,
                            TotalOtrosCargos: 0,
                            Comentario: EncCompras.Comentario
                        };

                        console.log(EncCompras);
                        console.log(detalle);
                        var subtotalT = 0;
                        var descuentoT = 0;
                        var impuestoT = 0;
                        var totalT = 0;
                        subtotalT = parseFloat(detalle.SubTotal);
                        descuentoT = parseFloat(detalle.Descuento);
                        impuestoT = parseFloat(detalle.Impuesto);
                        detalle.Total = (subtotalT - descuentoT) + impuestoT

                        totalT = parseFloat(detalle.Total);
                        var impuesto1T = parseFloat(detalle.Impuesto1);
                        var impuesto2T = parseFloat(detalle.Impuesto2);
                        var impuesto4T = parseFloat(detalle.Impuesto4);
                        var impuesto8T = parseFloat(detalle.Impuesto8);
                        var impuesto13T = parseFloat(detalle.Impuesto13);

                        //Se le resta los totales anteriores al general para despues sumarle los demas
                        if (Pais == "P" || Pais == "N") {
                            subtotal -= parseFloat(resultadoAnterior.totalComprobante) - parseFloat(resultadoAnterior.totalImpuesto);
                        } else {
                            subtotal -= parseFloat(resultadoAnterior.totalVenta);
                        }

                        descuentos -= parseFloat(resultadoAnterior.totalDescuentos);
                        impuestos -= parseFloat(resultadoAnterior.totalImpuesto);
                        if (Pais == "P" || Pais == "N") {
                            totalComprobante -= parseFloat(resultadoAnterior.totalComprobante);
                        } else {
                            totalComprobante -= (parseFloat(resultadoAnterior.totalVenta) - parseFloat(resultadoAnterior.totalDescuentos)) - parseFloat(resultadoAnterior.totalImpuesto);
                        }

                        impuesto1 -= parseFloat(resultadoAnterior.impuesto1);
                        impuesto2 -= parseFloat(resultadoAnterior.impuesto2);
                        impuesto4 -= parseFloat(resultadoAnterior.impuesto4);
                        impuesto8 -= parseFloat(resultadoAnterior.impuesto8);
                        impuesto13 -= parseFloat(resultadoAnterior.impuesto13);





                        subtotal += subtotalT;
                        descuentos += descuentoT;
                        impuestos += impuestoT;

                        totalComprobante += totalT;
                        impuesto1 += impuesto1T;
                        impuesto2 += impuesto2T;
                        impuesto4 += impuesto4T;
                        impuesto8 += impuesto8T;
                        impuesto13 += impuesto13T;

                        $("#subtotal").text(formatoDecimal(parseFloat(subtotal).toFixed(2)));
                        $("#descuento").text(formatoDecimal(parseFloat(descuentos).toFixed(2)));
                        $("#impuesto").text(formatoDecimal(parseFloat(impuestos).toFixed(2)));
                        $("#total").text(formatoDecimal(parseFloat(totalComprobante).toFixed(2)));

                        $("#impuesto1").text(formatoDecimal(parseFloat(impuesto1).toFixed(2)));
                        $("#impuesto2").text(formatoDecimal(parseFloat(impuesto2).toFixed(2)));
                        $("#impuesto4").text(formatoDecimal(parseFloat(impuesto4).toFixed(2)));
                        $("#impuesto8").text(formatoDecimal(parseFloat(impuesto8).toFixed(2)));
                        $("#impuesto13").text(formatoDecimal(parseFloat(impuesto13).toFixed(2)));

                        var objetoNuevo = ProdCadena.find(a => a.id == parseInt(EncCompras.id));
                        var index = ProdCadena.indexOf(ProdCadena.find(a => a.id == parseInt(EncCompras.id)));
                        objetoNuevo.Impuesto = impuestoT;
                        objetoNuevo.SubTotal = subtotalT;
                        objetoNuevo.Descuento = descuentoT;
                        objetoNuevo.Impuesto1 = impuesto1T;
                        objetoNuevo.Impuesto2 = impuesto2T;
                        objetoNuevo.Impuesto4 = impuesto4T;
                        objetoNuevo.Impuesto13 = impuesto13T;
                        objetoNuevo.Total = totalT;
                        objetoNuevo.CHacienda = detalle.CHacienda;
                        objetoNuevo.Fecha = detalle.Fecha.toString().substring(8, 10) + "/" + detalle.Fecha.toString().substring(5, 7) + "/" + detalle.Fecha.toString().substring(0, 4);
                        objetoNuevo.Proveedor = detalle.Proveedor;
                        objetoNuevo.idTipoGasto = detalle.idTipoGasto;
                        objetoNuevo.Comentario = detalle.Comentario;
                        ProdCadena[index] = objetoNuevo;






                        LimpiarDatosE();

                        RellenaTablaE();
                        LimpiarDatosGeneralesE();



                        RellenaTabla();
                        $("#ModalEdicion").modal("hide");
                        Generar();
                    } else {

                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Ha ocurrido un error ' + json.resp

                        });

                        $("#ErrorFacturaE").text(json.resp);
                        $("#ErrorFacturaE").css("display", "block");
                        button.removeAttribute('data-loading');
                        EliminaProductoE(0);
                    }



                },

                beforeSend: function (xhr) {


                },
                complete: function () {

                },
                error: function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ha ocurrido un error ' + error

                    });
                    button.removeAttribute('data-loading');
                    $("#ErrorFacturaE").css("display", "block");

                    EliminaProductoE(0);

                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que faltan datos por rellenar'

            });
            $("#FaltaDatosE").css("display", "block");
            button.removeAttribute('data-loading');
            EliminaProductoE(0);

        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
        EliminaProductoE(0);

    }

}

function LimpiarDatosGeneralesE() {
    try {
        $("#NumFacturaE").val("");
        $("#CodProveedorE").val("");
        $("#DVE").val("");
        $("#NomProveedorE").val("");
        $("#FecFacturaE").val("");
        $("#subtotalE").text("0");
        $("#impuestoE").text("0");
        $("#descuentoE").text("0");
        $("#impuesto1E").text("0");
        $("#impuesto2E").text("0");
        $("#impuesto4E").text("0");
        $("#impuesto8E").text("0");
        $("#impuesto13E").text("0");
        $("#totalE").text("0");
        ImagenBase64E = "";
        ProductosE = [];

        subtotalT = 0;
        descuentoT = 0;
        impuestoT = 0;
        totalT = 0;

        impuesto1T = 0;
        impuesto2T = 0;
        impuesto4T = 0;
        impuesto8T = 0;
        impuesto13T = 0;

        subtotalE = 0;
        impuestosE = 0;
        descuentosE = 0;
        totalComprobanteE = 0;

        impuestoE1 = 0;
        impuestoE2 = 0;
        impuestoE4 = 0;
        impuestoE8 = 0;
        impuestoE13 = 0;
        document.getElementById('imgPrincipalGE').src = "/img/cm.jpg";
        ImageBae64E = "";
        LimpiarDatosE();
        RellenaTablaE();
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}
function ValidarFacturaE() {
    try {
        if ($("#NumFacturaE").val() == "") {
            return false;
        } else if ($("#CodProveedorE").val() == "") {
            return false;
        } else if ($("#NomProveedorE").val() == "") {
            return false;
        } else if ($("#FecFacturaE").val() == "") {
            return false;
        } else if (ProductosE.length == 0) {
            return false;
        } else if (ImageBae64E == "" && document.getElementById('imgPrincipalGE').src == "") {
            return false;
        } else if ($("#idTipoGastoE").val() == "NULL") {
            return false;
        }
        else {
            return true;
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }





}

async function EnviarFCE() {
    try {
        AgregarProductosE();
        GenerarE();
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }


}
function onChangeTipoGasto() {
    try {
        var combo = document.getElementById("idTipoGasto");
        var selected = combo.options[combo.selectedIndex].text;

        if (selected.includes("Comb")) {
            $("#Combustible").attr("hidden", false);
        } else {
            $("#Combustible").attr("hidden", true);
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}
function onChangeTipoGastoN() {
    try {
        var combo = document.getElementById("idTipoGastoN");
        var selected = combo.options[combo.selectedIndex].text;

        if (selected.includes("COMB")) {
            $("#CombustibleN").attr("hidden", false);
        } else {
            $("#CombustibleN").attr("hidden", true);
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}


