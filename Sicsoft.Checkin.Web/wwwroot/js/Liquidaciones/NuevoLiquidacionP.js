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

            $(":input").inputmask();
            $('.mi-selector').select2();
            $("#TipoImpuestoP").val("0");
            $("#NomProP").val("");

            $("#PrecUniI").val(0);
            $("#descI").val(0);
            $("#TipoImpuestoP").val("0").trigger('change');
            $("#idTipoGastoP").val("NULL").trigger('change');
            $("#ImpuestoMonto").val(0);
            $("#selectTPF").val("01").trigger('change');
            $("#FecFacturaP").val($("#FechaI").val());
            $("#FecFacturaP").attr({
                "max": $("#FechaFinal").val(),
                "min": $("#FechaI").val()
            });

            Date.prototype.addDays = function (days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            }
        });
    });
    $(".js-example-responsive").select2({
        width: 'resolve',// need to override the changed default
        height: 'resolve'
    });

});

function onChangeFecFacturaP() {
    try {
        if (new Date($("#FechaFinal").val()).addDays(1) < new Date($("#FecFacturaP").val()).addDays(1) || new Date($("#FechaI").val()).addDays(1) > new Date($("#FecFacturaP").val()).addDays(1)) {
            $("#FecFacturaP").val($("#FechaI").val());

            alert("La fecha de la factura manual no puede ser menor o mayor que la del periodo");
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}

function checkP(i) {
    try {
        var checkbox1 = document.getElementById("simpP");
        var checkbox2 = document.getElementById("extP");
        var checkbox3 = document.getElementById("varP");
        var checkbox4 = document.getElementById("nrecP");
        if (i == "1") {

            checkbox2.checked = false;
            checkbox3.checked = false;
            checkbox4.checked = false;
            checkbox1.checked = true;
            $("#CHaciendaP").removeAttr("readonly");
            $("#ConsHaciendaP").removeAttr("readonly");

        }
        else if (i == "2") {
            checkbox3.checked = false;
            checkbox2.checked = true;
            checkbox1.checked = false;
            checkbox4.checked = false;
            $("#CHaciendaP").attr("readonly", "readonly");
            $("#ConsHaciendaP").attr("readonly", "readonly");

            $("#CHaciendaP").val("");
            $("#ConsHaciendaP").val("");
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
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}

function AgregarProductosIP() {
    try {
        var combo = document.getElementById("idTipoGastoP");
        var selected = combo.options[combo.selectedIndex].text;
        var detalle = {

            CodPro: "1",
            NomPro: ($("#NomProP").val() == "" ? "Detalle factura" : (selected.toUpperCase().includes("Comb".toUpperCase()) ? $("#NomProP").val() + " * " + $("#idTipoCombP").val() : $("#NomProP").val())),
            idTipoGasto: $("#idTipoGastoP").val() == "NULL" ? "0" : $("#idTipoGastoP").val(),
            Cantidad: (selected.toUpperCase().includes("Comb".toUpperCase()) ? $("#CantLitrosP").val() : "1"),
            PrecioUnitario: $("#PrecUniP").val(),
            MontoDescuento: $("#descIP").val(),
            ImpuestoTarifa: $("#TipoImpuestoP").val(),
            ImpuestoMonto: $("#ImpuestoMontoP").val(),
            MontoTotalLinea: 0,
            Impuesto1: 0,
            Impuesto2: 0,
            Impuesto4: 0,
            Impuesto8: 0,
            Impuesto13: 0
        };
        detalle.ImpuestoMonto = 0;
        detalle.MontoDescuento = 0;
        switch ($("#TipoImpuestoP").val()) {
            case "0":
                {

                    detalle.ImpuestoMonto += parseFloat(detalle.PrecioUnitario) * 0.00;

                    break;
                }
            case "18":
                {

                    detalle.ImpuestoMonto += parseFloat(detalle.PrecioUnitario) * 0.18;
                    detalle.Impuesto1 += detalle.ImpuestoMonto;
                    break;
                }


        }

        //detalle.MontoTotalLinea = ((detalle.PrecioUnitario) - detalle.MontoDescuento) + parseFloat(detalle.ImpuestoMonto);
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


        $("#subtotalIP").text(formatoDecimal(subtotalI.toFixed(2)));
        $("#descuentoIP").text(formatoDecimal(descuentosI.toFixed(2)));
        $("#impuestoIP").text(formatoDecimal(impuestosI.toFixed(2)));
        $("#totalIP").text(formatoDecimal(totalComprobanteI.toFixed(2)));


        $("#impuesto1IP").text(formatoDecimal(parseFloat(impuestoI1).toFixed(2)));
        $("#impuesto2IP").text(formatoDecimal(parseFloat(impuestoI2).toFixed(2)));
        $("#impuesto4IP").text(formatoDecimal(parseFloat(impuestoI4).toFixed(2)));
        $("#impuesto8IP").text(formatoDecimal(parseFloat(impuestoI8).toFixed(2)));
        $("#impuesto13IP").text(formatoDecimal(parseFloat(impuestoI13).toFixed(2)));


        Productos.push(detalle);
        // LimpiarDatosI();
        //   RellenaTablaI();
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }


}
function LimpiarDatosIP() {
    try {
        $("#NomProP").val("");

        $("#PrecUniP").val(0);
        $("#descIP").val(0);
        $("#TipoImpuestoP").val("7").trigger('change');
        $("#idTipoGastoP").val("NULL").trigger('change');
        $("#ImpuestoMontoP").val(0);
        $("#idTipoCombP").val("").trigger('change');
        $("#CantLitrosP").val(1);
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}

function RellenaTablaIP() {
    try {
        var texto = '';

        $("#tbodyIP").html('');

        for (var i = 0; i < Productos.length; i++) {
            texto += '<tr>';

            texto += '<td align="left" style="padding-top:15px;">  <p style="font-size:13px;">' + Productos[i].NomPro + '</p></td>';

            texto += '<td align="right" style="padding-top:15px;">  <p style="font-size:13px;">' + formatoDecimal(Productos[i].PrecioUnitario) + '</p></td>';
            texto += '<td align="right" style="padding-top:15px;">  <p style="font-size:13px;">' + formatoDecimal(Productos[i].MontoDescuento) + '</p></td>';
            texto += '<td align="right" style="padding-top:15px;">  <p style="font-size:13px;">' + formatoDecimal(Productos[i].ImpuestoMonto) + '</p></td>';
            texto += '<td align="right" style="padding-top:13px;">  <p style="font-size:13px;">' + formatoDecimal(Productos[i].MontoTotalLinea) + '</p></td>';
            texto += '<td align="center" style="padding-top:13px;">    <a style="margin-left: -1%; position: inherit !important;" onclick="javascript: EliminaProductoIP(' + i + ')" title="Eliminar" class="fa fa-trash icono"></a> ';
            texto += '</tr>'
        }


        $("#tbodyIP").html(texto);
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}

function EliminaProductoIP(campo) {
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


        $("#subtotalIP").text(formatoDecimal(subtotalI.toFixed(2)));
        $("#descuentoIP").text(formatoDecimal(descuentosI.toFixed(2)));
        $("#impuestoIP").text(formatoDecimal(impuestosI.toFixed(2)));
        $("#totalIP").text(formatoDecimal(totalComprobanteI.toFixed(2)));


        $("#impuesto1IP").text(formatoDecimal(parseFloat(impuestoI1).toFixed(2)));
        $("#impuesto2IP").text(formatoDecimal(parseFloat(impuestoI2).toFixed(2)));
        $("#impuesto4IP").text(formatoDecimal(parseFloat(impuestoI4).toFixed(2)));
        $("#impuesto8IP").text(formatoDecimal(parseFloat(impuestoI8).toFixed(2)));
        $("#impuesto13IP").text(formatoDecimal(parseFloat(impuestoI13).toFixed(2)));

        Productos.splice(campo, 1);
        RellenaTablaI();

    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }



}

function onChangeTipoGasto() {
    try {
        var combo = document.getElementById("idTipoGastoP");
        var selected = combo.options[combo.selectedIndex].text;

        if (selected.toUpperCase().includes("Comb".toUpperCase())) {
            $("#Combustible").attr("hidden", false);
        } else {
            $("#Combustible").attr("hidden", true);
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}


function maskP() {
    try {
        switch ($("#idClienteP").val()) {
            case "01":
                {
                    $("#CodProveedorP").inputmask({ "mask": "99-999-9999" });
                    break;
                }
            case "02":
                {
                    $("#CodProveedorP").inputmask({ "mask": "9999999-99-999999" });

                    break;
                }
            case "03":
                {
                    $("#CodProveedorP").inputmask({ "mask": "9999999999" });
                    break;
                }
            case "04":
                {
                    $("#CodProveedorP").inputmask({ "mask": "9999999999" });
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
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}
function mask2P() {
    try {
        $("#CodProveedorP").attr("readonly", false);
        $("#DVP").attr("readonly", false);
        switch ($("#selectTP").val()) {
            case "01":
                {

                    $("#CodProveedorP").attr('maxlength', 11);
                    break;
                }
            case "02":
                {

                    $("#CodProveedorP").attr('maxlength', 17);
                    break;
                }
            case "03":
                {

                    $("#CodProveedorP").attr('maxlength', 10);
                    break;
                }
            case "04":
                {

                    $("#CodProveedorP").attr('maxlength', 10);
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
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}

function GenerarIP() {
    try {
        var button = document.getElementById('buttonSpinP');
        if (typeof (button.getAttribute('data-loading')) === 'string') {
            button.removeAttribute('data-loading');
        }
        else {
            button.setAttribute('data-loading', '');
        }
        $("#spinloader").removeAttr('hidden');
        button.disabled = true;



        var selectTP = $("#selectTPF").val();



        var EncCompras =
        {
            ClaveHacienda: $("#NumFacturaP").val(),
            ConsecutivoHacienda: $("#NumFacturaP").val(),
            TipoIdentificacionCliente: "0",
            NumFactura: $("#NumFacturaP").val(),
            Comentario: $("#ComentarioFacturaP").val(),
            CodProveedor: $("#CodProveedorP").val() + "[" + $("#DVP").val(),
            NomProveedor: $("#NomProveedorP").val(),
            FecFactura: $("#FecFacturaP").val(),
            CodigoActividadEconomica: "0",
            CodMoneda: $("#CodMoneda").val(),
            CodCliente: "0",
            NomCliente: "0",
            TotalVenta: $("#subtotalIP").text(),
            TotalImpuesto: $("#impuestoIP").text(),
            TotalDescuentos: $("#descuentoIP").text(),
            Impuesto1: $("#impuesto1IP").text(),
            Impuesto2: $("#impuesto2IP").text(),
            Impuesto4: $("#impuesto4IP").text(),
            Impuesto8: $("#impuesto8IP").text(),
            Impuesto13: $("#impuesto13IP").text(),
            TotalComprobante: $("#totalIP").text(),
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
        if (ValidarFacturaP()) {
            $("#FaltaDatosP").css("display", "none");

            $.ajax({
                type: 'POST',

                url: $("#urlGenerarI").val(),
                datatype: "application/json",
                data: { recibidos: recibidos.toString() },
                headers: {
                    RequestVerificationToken: $('input:hidden[name="__RequestVerificationToken"]').val()
                },
                success: function (json) {

                    console.log(json.resp + " -> " + json.success);
                    if (json.success == true) {



                        $("#ErrorFacturaP").css("display", "none");
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
                            Comentario: $("#ComentarioFacturaP").val()
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



                        RellenaTabla();
                        LimpiarDatosGeneralesP();
                        $("#spinloader").attr("hidden", true);
                        button.disabled = false;
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Ha ocurrido un error   ' + json.resp

                        })
                        $("#spinloader").attr("hidden", true);
                        button.disabled = false;
                        EliminaProductoIP(0);


                    }

                },

                beforeSend: function (xhr) {


                },
                complete: function () {

                },
                error: function (error) {
                    $("#spinloader").attr("hidden", true);
                    button.disabled = false;
                    $("#ErrorFactura").css("display", "block");


                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que faltan datos por rellenar '

            })
            button.removeAttribute('data-loading');
            $("#spinloader").attr("hidden", true);
            button.disabled = false;

            Productos = [];
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
        $("#spinloader").attr("hidden", true);
    }


}

function LimpiarDatosGeneralesP() {
    try {
        $("#NumFacturaP").val("");
        $("#CodProveedorP").val("");
        $("#DVP").val("");
        $("#NomProveedorP").val("");
        $("#FecFacturaP").val("");
        $("#subtotalIP").text("0");
        $("#impuestoIP").text("0");
        $("#descuentoIP").text("0");
        $("#impuesto1IP").text("0");
        $("#impuesto2IP").text("0");
        $("#impuesto4IP").text("0");
        $("#impuesto8IP").text("0");
        $("#impuesto13IP").text("0");
        $("#totalIP").text("0");
        $("#ComentarioFacturaP").val("");
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
        document.getElementById('imgPrincipalGP').src = "/adjunto.png";
        ImageBae64 = "";
        LimpiarDatosIP();
        RellenaTablaIP();
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}
function ValidarFacturaP() {
    try {
        if (ProdCadena.find(a => a.CHacienda.trim() == $("#NumFacturaP").val() && a.CodProveedor == $("#CodProveedorP").val()) != undefined) {
            return false;
        }

        if ($("#NumFacturaP").val() == "") {
            return false;
        } else if ($("#DVP").val() == "" || $("#DVP").val().length < 2 || $("#DVP").val().length > 2) {
            return false;
        }
        else if ($("#CodProveedorP").val() == "") {
            return false;
        } else if ($("#NomProveedorP").val() == "") {
            return false;
        } else if ($("#FecFacturaP").val() == "") {
            return false;
        } else if (Productos.length == 0) {
            return false;
        } else if (ImageBae64 == "") {
            return false;
        } else if ($("#idTipoGastoP").val() == "NULL") {
            return false;
        } else if ($("#ComentarioFacturaP").val() == "") {
            return false;
        }
        else {
            return true;
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}

async function EnviarFCP() {
    try {
        AgregarProductosIP();
        GenerarIP();

    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}
function onChangeProveedorP(bit) {
    try {
        var ruc = $("#CodProveedorP").val();
        var dv = $("#DVP").val();
        var nombre = $("#NomProveedorP").val();

        if (bit == 1) {

            $("#CodProveedorP").val("");
            $("#DVP").val("");

        } else {
            $("#NomProveedorP").val("");
        }

        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: $("#urlBuscarProveedorP").val(),
            data: { id: $("#CodProveedorP").val(), dv: $("#DVP").val(), nombre: $("#NomProveedorP").val() },
            success: function (result) {

                console.log(result);

                if (result != null) {

                    // if ($("#NomProveedorP").val() == "") {
                    $("#NomProveedorP").val(result.nombre);
                    $("#DVP").val(result.dv);
                    $("#CodProveedorP").val(result.ruc);
                    switch (result.ruc.replace("-", "").replace("-", "").length) {
                        case 7:
                        case 8:
                        case 9:
                            {
                                $("#selectTP").val("01");

                                mask2P();
                                break;
                            }
                        case 10:

                            {

                                $("#selectTP").val("02");



                                mask2P();
                                break;
                            }
                        case 12:
                            {
                                $("#selectTP").val("03");

                                mask2P();
                                break;
                            }
                        case 13:
                        case 14:
                        case 15:
                            {
                                $("#selectTP").val("02");

                                mask2P();
                                break;
                            }
                        default:
                            {
                                $("#selectTP").val("03");

                                mask2P();
                                break;
                            }


                    }



                } else {

                    $("#CodProveedorP").val(ruc);
                    $("#DVP").val(dv);
                    $("#NomProveedorP").val(nombre);



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
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}

function RellenaTabla() {
    try {
        if (ProdCadena.length > 0) {
            $("#CodMoneda").select2({ disabled: true });
        } else {
            $("#CodMoneda").select2({ disabled: false });
        }
        var sOptions = '';

        $("#tbody").html('');

        for (var i = 0; i < ProdCadena.length; i++) {
            sOptions += '<tr>';

            sOptions += '<td align="center" style="padding-top:13px;">    <a style="margin-left: -1%; position: inherit !important;" onclick = "javascript: EliminaProducto(' + i + ')" title="Eliminar" class="fa fa-trash icono"></a> ';
            sOptions += '<td align="center" style="padding-top:15px;">  <p style="font-size:13px;">' + ProdCadena[i].CHacienda + '</p></td>';
            sOptions += '<td align="center" style="padding-top:15px;">  <p style="font-size:13px;">' + ProdCadena[i].Fecha + '</p></td>';
            sOptions += '<td align="center" style="padding-top:15px;">  <p style="font-size:13px;">' + ProdCadena[i].Proveedor + '</p></td>';
            sOptions += '<td align="center" style="padding-top:13px;">  <p style="font-size:13px;">' + formatoDecimal(ProdCadena[i].Total) + '</p></td>';





            sOptions += '</tr>'
        }
        $("#tbody").html(sOptions);
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

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
            /* Read more about isConfirmed, isDenied below */
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
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }


}
function Generar() {
    try {
        let button = document.getElementById("GuardarCambios");
        var EncCompras =
        {
            idCierre: 0,
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
                    button.disabled = true;
                    var recibidos = JSON.stringify(recibido);

                    $.ajax({
                        type: 'POST',

                        url: $("#urlGenerar").val(),
                        dataType: 'text',
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
                            if (json == "true") {
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
                                        window.location.href = window.location.href.split("/Nuevo")[0];
                                    }
                                })

                            } else {
                                button.disabled = false;
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Ha ocurrido un error al intentar guardar ' + json

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
                            button.disabled = false;
                            $("#divProcesando").hide();
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Ha ocurrido un error al intentar guardar ' + error

                            })
                        }
                    });
                }
            })
        } else {
            button.disabled = false;
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
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

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
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}

function GeneraryEnviar() {
    try {
        let button = document.getElementById("GuardarAprobar");
        var EncCompras =
        {
            idCierre: 0,
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
                    button.disabled = true;
                    $.ajax({
                        type: 'POST',

                        url: $("#urlGeneraryEnviar").val(),
                        dataType: 'text',
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
                            if (json == "true") {
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
                                        window.location.href = window.location.href.split("/Nuevo")[0];
                                    }
                                })

                            } else {
                                button.disabled = false;
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Ha ocurrido un error al intentar guardar ' + json

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
                            button.disabled = false;
                            $("#divProcesando").hide();
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Ha ocurrido un error al intentar guardar ' + error

                            })
                        }
                    });
                }
            })
        } else {
            button.disabled = false;
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
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }


}