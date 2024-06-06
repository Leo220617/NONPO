

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
            $("#NomProD").val("");

            $("#PrecUniI").val(0);
            $("#descI").val(0);
            $("#TipoImpuestoD").val("18").trigger('change');
            $("#idTipoGastoD").val("NULL").trigger('change');
            $("#ImpuestoMonto").val(0);
            $("#selectTPF").val("01").trigger('change');
            $("#FecFacturaD").val($("#FechaI").val());
            $("#FecFacturaD").attr({
                "max": $("#FechaFinal").val(),
                "min": $("#FechaI").val()
            });
            maskFD();
            Date.prototype.addDays = function (days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            }
        });
    });
    $(".js-example-responsive").select2({
        width: 'resolve',
        height: 'resolve'
    });

});


async function readFilePrincipalD(input) {
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
                    document.getElementById('imgPrincipalGD').src = e.target.result;


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

// NO se usa
function checkD(i) {
    try {
        var checkbox1 = document.getElementById("simpD");
        var checkbox2 = document.getElementById("extD");
        var checkbox3 = document.getElementById("varD");
        var checkbox4 = document.getElementById("nrecD");
        if (i == "1") {

            checkbox2.checked = false;
            checkbox3.checked = false;
            checkbox4.checked = false;
            checkbox1.checked = true;
            $("#CHaciendaD").removeAttr("readonly");
            $("#ConsHaciendaD").removeAttr("readonly");

        }
        else if (i == "2") {
            checkbox3.checked = false;
            checkbox2.checked = true;
            checkbox1.checked = false;
            checkbox4.checked = false;
            $("#CHaciendaD").attr("readonly", "readonly");
            $("#ConsHaciendaD").attr("readonly", "readonly");

            $("#CHaciendaD").val("");
            $("#ConsHaciendaD").val("");
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

function AgregarProductosID() {
    try {
        var combo = document.getElementById("idTipoGastoD");
        var selected = combo.options[combo.selectedIndex].text;
        var detalle = {

            CodPro: "1",
            NomPro: ($("#NomProD").val() == "" ? "Detalle factura" : (selected.toUpperCase().includes("Comb".toUpperCase()) ? $("#NomProD").val() + " * " + $("#idTipoCombD").val() : $("#NomProD").val())),
            idTipoGasto: $("#idTipoGastoD").val() == "NULL" ? "0" : $("#idTipoGastoD").val(),
            Cantidad: (selected.toUpperCase().includes("Comb".toUpperCase()) ? $("#CantLitrosD").val() : "1"),
            PrecioUnitario: $("#PrecUniD").val(),
            MontoDescuento: $("#descID").val(),
            ImpuestoTarifa: $("#TipoImpuestoD").val(),
            ImpuestoMonto: $("#ImpuestoMontoN").val(),
            MontoTotalLinea: 0,
            Impuesto1: 0,
            Impuesto2: 0,
            Impuesto4: 0,
            Impuesto8: 0,
            Impuesto13: 0
        };
        detalle.ImpuestoMonto = 0;
        detalle.MontoDescuento = 0;
        switch ($("#TipoImpuestoD").val()) {
            case "0":
                {
                    if (document.getElementById("md_checkbox_10").checked) {
                        var Precio0 = parseFloat(detalle.PrecioUnitario);
                        var Imp10 = Precio0 * 0.10;
                        detalle.ImpuestoMonto += Precio0 * 0.10;
                        detalle.Impuesto4 += Imp10;
                    } else {
                        detalle.ImpuestoMonto += parseFloat(detalle.PrecioUnitario) * 0.00;
                    }


                    break;
                }
            case "16":
                {
                    if (document.getElementById("md_checkbox_10").checked) {
                        var Precio16 = parseFloat(detalle.PrecioUnitario / 1.26)
                        var Imp10 = Precio16 * 0.10;
                        detalle.ImpuestoMonto += Precio16 * 0.16;
                        detalle.Impuesto2 += Precio16 * 0.16;
                        detalle.ImpuestoMonto += Precio16 * 0.10;
                        detalle.Impuesto4 += Imp10;


                    } else {
                        var Precio16 = parseFloat(detalle.PrecioUnitario / 1.16)
                        detalle.ImpuestoMonto += Precio16 * 0.16;
                        detalle.Impuesto2 += detalle.ImpuestoMonto;
                    }


                    break;
                }
            case "18":
                {
                    if (document.getElementById("md_checkbox_10").checked) {
                        var Precio18 = parseFloat(detalle.PrecioUnitario / 1.28)
                        var Imp10 = Precio18 * 0.10;
                        detalle.ImpuestoMonto += Precio18 * 0.18;
                        detalle.Impuesto1 += Precio18 * 0.18;
                        detalle.ImpuestoMonto += Precio18 * 0.10;
                        detalle.Impuesto4 += Imp10;

                    } else {
                        var Precio18 = parseFloat(detalle.PrecioUnitario / 1.18)
                        detalle.ImpuestoMonto += Precio18 * 0.18;
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


        $("#subtotalID").text(formatoDecimal(subtotalI.toFixed(2)));
        $("#descuentoID").text(formatoDecimal(descuentosI.toFixed(2)));
        $("#impuestoID").text(formatoDecimal(impuestosI.toFixed(2)));
        $("#totalID").text(formatoDecimal(totalComprobanteI.toFixed(2)));


        $("#impuesto1ID").text(formatoDecimal(parseFloat(impuestoI1).toFixed(2)));
        $("#impuesto2ID").text(formatoDecimal(parseFloat(impuestoI2).toFixed(2)));
        $("#impuesto4ID").text(formatoDecimal(parseFloat(impuestoI4).toFixed(2)));
        $("#impuesto8ID").text(formatoDecimal(parseFloat(impuestoI8).toFixed(2)));
        $("#impuesto13ID").text(formatoDecimal(parseFloat(impuestoI13).toFixed(2)));


        Productos.push(detalle);
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}
function LimpiarDatosID() {
    try {
        $("#NomProD").val("");

        $("#PrecUniD").val(0);
        $("#descID").val(0);
        $("#TipoImpuestoD").val("0").trigger('change');
        $("#idTipoGastoD").val("NULL").trigger('change');
        $("#ImpuestoMontoD").val(0);
        $("#idTipoCombD").val("").trigger('change');
        $("#CantLitrosD").val(1);
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }


}

//Relleno
function RellenaTablaID() {
    try {
        var texto = '';

        $("#tbodyID").html('');

        for (var i = 0; i < Productos.length; i++) {
            texto += '<tr>';

            texto += '<td align="left" style="padding-top:15px;">  <p style="font-size:13px;">' + Productos[i].NomPro + '</p></td>';

            texto += '<td align="right" style="padding-top:15px;">  <p style="font-size:13px;">' + formatoDecimal(Productos[i].PrecioUnitario) + '</p></td>';
            texto += '<td align="right" style="padding-top:15px;">  <p style="font-size:13px;">' + formatoDecimal(Productos[i].MontoDescuento) + '</p></td>';
            texto += '<td align="right" style="padding-top:15px;">  <p style="font-size:13px;">' + formatoDecimal(Productos[i].ImpuestoMonto) + '</p></td>';
            texto += '<td align="right" style="padding-top:13px;">  <p style="font-size:13px;">' + formatoDecimal(Productos[i].MontoTotalLinea) + '</p></td>';
            texto += '<td align="center" style="padding-top:13px;">    <a style="margin-left: -1%; position: inherit !important;" onclick="javascript: EliminaProductoD(' + i + ')" title="Eliminar" class="fa fa-trash icono"></a> ';
            texto += '</tr>'
        }


        $("#tbodyID").html(texto);
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}

function EliminaProductoID(campo) {
    try {
        var subtotalT = 0;
        var descuentoT = 0;
        var impuestoT = 0;
        var totalT = 0;
        subtotalT = parseFloat(Productos[campo].PrecioUnitario) - Productos[campo].ImpuestoMonto;

        descuentoT = parseFloat(Productos[campo].MontoDescuento);
        impuestoT = parseFloat(Productos[campo].ImpuestoMonto);

        totalT = parseFloat(Productos[campo].MontoTotalLinea);

        if (document.getElementById("md_checkbox_10").checked) {

            subtotalT = parseFloat(Productos[campo].PrecioUnitario) - Productos[campo].ImpuestoMonto;

        }

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


        $("#subtotalID").text(formatoDecimal(subtotalI.toFixed(2)));
        $("#descuentoID").text(formatoDecimal(descuentosI.toFixed(2)));
        $("#impuestoID").text(formatoDecimal(impuestosI.toFixed(2)));
        $("#totalID").text(formatoDecimal(totalComprobanteI.toFixed(2)));


        $("#impuesto1ID").text(formatoDecimal(parseFloat(impuestoI1).toFixed(2)));
        $("#impuesto2ID").text(formatoDecimal(parseFloat(impuestoI2).toFixed(2)));
        $("#impuesto4ID").text(formatoDecimal(parseFloat(impuestoI4).toFixed(2)));
        $("#impuesto8ID").text(formatoDecimal(parseFloat(impuestoI8).toFixed(2)));
        $("#impuesto13ID").text(formatoDecimal(parseFloat(impuestoI13).toFixed(2)));

        Productos.splice(campo, 1);
        RellenaTablaID();
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}

function onChangeTipoGastoD() {
    try {
        var combo = document.getElementById("idTipoGastoD");
        var selected = combo.options[combo.selectedIndex].text;

        if (selected.toUpperCase().includes("Comb".toUpperCase())) {
            $("#CombustibleD").attr("hidden", false);
        } else {
            $("#CombustibleD").attr("hidden", true);
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}



function maskD() {
    try {
        switch ($("#idClienteD").val()) {
            case "01":
                {
                    $("#CodProveedorD").inputmask({ "mask": "999-999999-99999" });
                    break;
                }
            case "02":
                {
                    $("#CodProveedorD").inputmask({ "mask": "99999999999999-9" });

                    break;
                }
            case "03":
                {
                    $("#CodProveedorD").inputmask({ "mask": "9999999999" });
                    break;
                }
            case "04":
                {
                    $("#CodProveedorD").inputmask({ "mask": "9999999999" });
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
function mask2D() {
    try {
        $("#CodProveedorD").attr("readonly", false);
        $("#DVD").attr("readonly", false);
        switch ($("#selectTP").val()) {
            case "01":
                {

                    $("#CodProveedorD").attr('maxlength', 18);
                    break;
                }
            case "02":
                {
                    $("#CodProveedorD").attr('maxlength', 18);
                    break;
                }
            case "03":
                {
                    $("#CodProveedorD").attr('maxlength', 15);
                    break;
                }
            case "04":
                {

                    $("#CodProveedorD").attr('maxlength', 15);
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

function maskFD() {
    try {

        $("#NumFacturaD").inputmask({ "mask": "99999999" });


    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }


}


function GenerarID() {
    try {
        var button = document.getElementById('buttonSpinD');

        $("#spinloader").removeAttr('hidden');
        button.disabled = true;


        var selectTP = $("#selectTPF").val();

        var EncCompras =
        {
            ClaveHacienda: $("#NumFacturaD").val(),
            ConsecutivoHacienda: $("#selectNCF").val() + $("#NumFacturaD").val(),
            TipoIdentificacionCliente: "0",
            NumFactura: $("#NumFacturaD").val(),
            Comentario: $("#ComentarioFacturaD").val(),
            CodProveedor: $("#CodProveedorD").val() + "[" + $("#DVD").val(),
            NomProveedor: $("#NomProveedorD").val(),
            FecFactura: $("#FecFacturaD").val(),
            CodigoActividadEconomica: "0",
            CodMoneda: $("#CodMoneda").val(),
            CodCliente: "0",
            NomCliente: "0",
            TotalVenta: $("#subtotalID").text(),
            TotalImpuesto: $("#impuestoID").text(),
            TotalDescuentos: $("#descuentoID").text(),
            Impuesto1: $("#impuesto1ID").text(),
            Impuesto2: $("#impuesto2ID").text(),
            Impuesto4: $("#impuesto4ID").text(),
            Impuesto8: $("#impuesto8ID").text(),
            Impuesto13: $("#impuesto13ID").text(),
            TotalComprobante: $("#totalID").text(),
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
        if (ValidarFacturaD()) {
            $("#FaltaDatosD").css("display", "none");

            $.ajax({
                type: 'POST',

                url: $("#urlGenerarI").val(),
                datatype: "application/json",
                data: { recibidos: recibidos.toString() },
                headers: {
                    RequestVerificationToken: $('input:hidden[name="__RequestVerificationToken"]').val()
                },
                success: function (json) {


                    if (json.success == true) {


                        //Aqui se meteria en el detalle
                        var detalle = {
                            id: json.resp,
                            Proveedor: EncCompras.NomProveedor,
                            CHacienda: EncCompras.ConsecutivoHacienda,
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
                            Comentario: $("#ComentarioFacturaD").val()
                        };


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





                        RellenaTabla();
                        LimpiarDatosGeneralesD();
                        LimpiarDatosID();
                        $("#spinloader").attr("hidden", true);
                        button.disabled = false;


                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Ha ocurrido un error   ' + json.resp

                        })

                        button.disabled = false;
                        $("#spinloader").attr("hidden", true);


                        EliminaProductoID(0);
                    }
                },

                beforeSend: function (xhr) {


                },
                complete: function () {

                },
                error: function (error) {
                    $("#spinloader").attr("hidden", true);
                    button.disabled = false;
                    EliminaProductoID(0);


                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que faltan datos por rellenar '

            })

            $("#spinloader").attr("hidden", true);
            button.disabled = false;

            EliminaProductoID(0);
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

function LimpiarDatosGeneralesD() {
    try {
        $("#NumFacturaD").val("");
        $("#CodProveedorD").val("");
        $("#DVD").val("");
        $("#NomProveedorD").val("");
        $("#ComentarioFacturaD").val("");
        $("#FecFacturaD").val("");
        $("#subtotalID").text("0");
        $("#impuestoID").text("0");
        $("#descuentoID").text("0");
        $("#impuesto1ID").text("0");
        $("#impuesto2ID").text("0");
        $("#impuesto4ID").text("0");
        $("#impuesto8ID").text("0");
        $("#impuesto13ID").text("0");
        $("#totalID").text("0");
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
        document.getElementById('imgPrincipalGD').src = "/adjunto.png";
        ImageBae64 = "";
        document.getElementById("md_checkbox_10").checked = false;
        LimpiarDatosID();
        RellenaTablaID();
        maskFD();
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}
function ValidarFacturaD() {
    try {
        if (ProdCadena.find(a => a.CHacienda.trim() == $("#NumFacturaD").val() && a.CodProveedor == $("#CodProveedorD").val()) != undefined) {
            return false;
        }

        if ($("#NumFacturaD").val() == "") {
            return false;
        } else if ($("#CodProveedorD").val() == "") {
            return false;
        } else if ($("#NomProveedorD").val() == "") {
            return false;
        } else if ($("#FecFacturaD").val() == "") {
            return false;
        } else if (Productos.length == 0) {
            return false;
        } else if (ImageBae64 == "") {
            return false;
        } else if ($("#idTipoGastoD").val() == "NULL") {
            return false;
        } else if ($("#NumFacturaD").val().includes("_")) {
            return false;
        } else if ($("#ComentarioFacturaD").val() == "") {
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

async function EnviarFCD() {
    try {
        AgregarProductosID();
        GenerarID();
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }


}

function onChangeProveedorD(bit) {
    try {
        var ruc = $("#CodProveedorD").val();
        var dv = "undefined";
        var nombre = $("#NomProveedorD").val();

        if (bit == 1) {

            $("#CodProveedorD").val("");
            $("#DVD").val("");

        } else {
            $("#NomProveedorD").val("");
        }

        if ($("#CodProveedorD").val() == "" && ($("#DVD").val() == "" || $("#DVD").val() == undefined) && $("#NomProveedorD").val() == "") {

        } else {
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: $("#urlBuscarProveedorD").val(),
                data: { id: $("#CodProveedorD").val(), dv: dv, nombre: $("#NomProveedorD").val() },
                success: function (result) {

                    console.log(result);

                    if (result != null) {


                        $("#NomProveedorD").val(result.nombre);
                        $("#DVD").val(result.dv);
                        $("#CodProveedorD").val(result.ruc);
                        switch (result.ruc.replace("-", "").replace("-", "").length) {
                            case 9:
                                {
                                    if (result.ruc.replace("-", "").replace("-", "").length) {
                                        $("#selectTP").val("02");
                                        mask2D();
                                        break;
                                    }

                                }

                            case 11:
                                {
                                    $("#selectTP").val("01");

                                    mask2P();
                                    break;
                                }

                            default:
                                {
                                    $("#selectTP").val("01");
                                    mask2D();
                                    break;
                                }


                        }


                    } else {

                        $("#CodProveedorD").val(ruc);
                        $("#DVD").val(dv);
                        $("#NomProveedorD").val(nombre);



                    }

                },
                beforeSend: function () {

                },
                complete: function () {

                }
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

function onChangeFecFacturaD() {
    try {
        if (new Date($("#FechaFinal").val()).addDays(1) < new Date($("#FecFacturaD").val()).addDays(1) || new Date($("#FechaI").val()).addDays(1) > new Date($("#FecFacturaD").val()).addDays(1)) {
            $("#FecFacturaD").val($("#FechaI").val());

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

//Funciones que estan en todas
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
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }


}
