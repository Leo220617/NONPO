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
var Pais = $("#pais").val();

$(document).ready(function () {
    jQuery(document).ready(function ($) {
        $(document).ready(function () {

            $(":input").inputmask();
            $('.mi-selector').select2();
            $("#NomProN").val("");

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
  var idF;
var fileUploadPrincipal = document.getElementById('imgPrincipalUploadGD');


Recuperar();
function Recuperar() {
    try {



        var det = JSON.parse($("#Liquidacion").val());

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
            if (Pais == "P" || Pais == "N" || Pais == "D") {
                detalle.SubTotal = parseFloat(det[i].TotalComprobante) - parseFloat(detalle.Impuesto);
            }

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
        }

        if (ProdCadena.length > 0) {
            $("#CodMoneda").select2({ disabled: true });
        } else {
            $("#CodMoneda").select2({ disabled: false });
        }
        LimpiarDatosGeneralesD();

        RellenaTabla();

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error

        });

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

function maskFDE() {
    try {

        $("#NumFacturaE").inputmask({ "mask": "99999999" });


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
                            //    idTipoGasto: $("#idTipoGasto").val(),
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

                        //
                        $("#impuesto1").text(formatoDecimal(parseFloat(impuesto1).toFixed(2)));
                        $("#impuesto2").text(formatoDecimal(parseFloat(impuesto2).toFixed(2)));
                        $("#impuesto4").text(formatoDecimal(parseFloat(impuesto4).toFixed(2)));
                        //Modificar por ser de panama


                        RellenaTabla();
                        LimpiarDatosGeneralesD();
                        LimpiarDatosID();
                        $("#spinloader").attr("hidden", true);
                        button.disabled = false;
                        //$("#ModalInclusion").modal("hide");

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
                data: { ids: $("#CodProveedorD").val(), dv: dv, nombre: $("#NomProveedorD").val() },
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
            if (ProdCadena[i].CHacienda.trim().length < 20) {
                sOptions += '<td align="center" style="padding-top:15px;">  <a style="font-size:13px; color: blue; text-decoration: underline;" onclick="javascript: AbrirModalEdicion(' + ProdCadena[i].id + ')">' + ProdCadena[i].CHacienda + '</a></td>';
            } else {
                sOptions += '<td align="center" style="padding-top:15px;">  <p style="font-size:13px;" >' + ProdCadena[i].CHacienda + '</p></td>';
            }
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
                    button.disabled = true;
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
                                        window.location.href = window.location.href.split("/EditarD")[0];
                                    }
                                })

                            } else {
                                button.disabled = false;
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Ha ocurrido un error al intentar guardar' + json.mensaje

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



//Funciones del Modal
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
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

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
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}
function AgregarProductosE() {
    try {
        var combo = document.getElementById("idTipoGastoE");
        var selected = combo.options[combo.selectedIndex].text;

        var detalle = {

            CodPro: "1",
            NomPro: ($("#NomProE").val() == "" ? "Detalle factura" : (selected.toUpperCase().includes("COMB".toUpperCase()) ? $("#NomProE").val() + " * " + $("#idTipoCombE").val() : $("#NomProE").val())),
            idTipoGasto: $("#idTipoGastoE").val() == "NULL" ? "0" : $("#idTipoGastoE").val(),
            Cantidad: (selected.toUpperCase().includes("COMB".toUpperCase()) && Pais == "P" ? $("#CantLitrosE").val() : "1"),
            PrecioUnitario: $("#PrecUniE").val(),
            MontoDescuento: $("#descE").val(),
            ImpuestoTarifa: $("#TipoImpuestoE").val(),
            ImpuestoMonto: parseFloat($("#ImpuestoMontoE").val()),
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
                    if (document.getElementById("md_checkbox_11").checked) {
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
                    if (document.getElementById("md_checkbox_11").checked) {
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



        if (Pais == "C") {
            detalle.MontoTotalLinea = ((detalle.PrecioUnitario) - detalle.MontoDescuento) + parseFloat(detalle.ImpuestoMonto);

        } else {
            detalle.MontoTotalLinea = (detalle.PrecioUnitario);
        }

        var subtotalT = 0;
        var descuentoT = 0;
        var impuestoT = 0;
        var totalT = 0;

        

        if (Pais == "D"  ) {
            subtotalT = parseFloat(detalle.PrecioUnitario) - detalle.ImpuestoMonto;
        } else {
            subtotalT = parseFloat(detalle.PrecioUnitario);
        }

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


        ProductosE.push(detalle);
        //LimpiarDatosI();
        // RellenaTablaI();
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

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
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

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
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}

function EliminaProductoE(campo) {
    try {
        var subtotalT = 0;
        var descuentoT = 0;
        var impuestoT = 0;
        var totalT = 0;
        subtotalT = parseFloat(ProductosE[campo].PrecioUnitario) - ProductosE[campo].ImpuestoMonto;
        descuentoT = parseFloat(ProductosE[campo].MontoDescuento);
        impuestoT = parseFloat(ProductosE[campo].ImpuestoMonto);

        totalT = parseFloat(ProductosE[campo].MontoTotalLinea);

        if (document.getElementById("md_checkbox_11").checked) {
       
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
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }





}

function onChangeTipoGastoE() {
    try {
        var combo = document.getElementById("idTipoGastoE");
        var selected = combo.options[combo.selectedIndex].text;

        if (selected.toUpperCase().includes("Comb".toUpperCase()) && (Pais == "P" || Pais == "N" || Pais == "D")) {
            $("#CombustibleE").attr("hidden", false);
        } else {
            $("#CombustibleE").attr("hidden", true);
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}

function AbrirModalEdicion(id) {
    try {
        document.getElementById("md_checkbox_11").checked = false;
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

                    if (Pais == "D" ) {
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
                    $("#NumFacturaE").val(result.numFactura);
                    $("#ComentarioFacturaE").val(result.comentario);

                    $("#FecFacturaE").val(result.fecFactura.toString().replace("T00:00:00", ""));
                    $("#NomProE").val(result.detCompras[0].nomPro);
                    $("#TipoImpuestoE").val(result.detCompras[0].impuestoTarifa);
                    $("#idTipoGastoE").val(result.detCompras[0].idTipoGasto);


                    $("#PrecUniE").val(result.detCompras[0].precioUnitario);



                    $("#descE").val(result.detCompras[0].montoDescuento);
                    $("#ImpuestoMontoE").val(result.detCompras[0].impuestoMonto);

                    var bandera10por = result.detCompras[0].subTotal * (result.detCompras[0].impuestoTarifa / 100);

                    

                    if (bandera10por < result.detCompras[0].impuestoMonto) {
                        document.getElementById("md_checkbox_11").checked = true
                    }

                    if (result.regimenSimplificado) {
                        checkE('1');

                    } else if (result.facturaExterior) {
                        checkE('2');
                    } else {
                        checkE('3');
                    }


                    if (Pais == "D") {
                        var combo = document.getElementById("idTipoGastoE");
                        var selected = combo.options[combo.selectedIndex].text;

                        if (selected.toUpperCase().includes("Comb".toUpperCase())) {
                            $("#CombustibleE").attr("hidden", false);
                            $("#CantLitrosE").val(result.detCompras[0].cantidad);
                            $("#NomProE").val(result.detCompras[0].nomPro.split("*")[0].trim());
                            $("#idTipoCombE").val(result.detCompras[0].nomPro.split("*")[1].trim());
                        } else {
                            $("#CombustibleE").attr("hidden", true);
                        }
                    }

                    maskFDE();
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
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

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
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }



}
function maskE2() {
    try {
        switch ($("#selectTPE").val()) {
            case "01":
                {
                    $("#CodProveedorE").inputmask({ "mask": "9-9999-9999" });
                    break;
                }
            case "02":
                {
                    $("#CodProveedorE").inputmask({ "mask": "9-999-999999" });
                    break;
                }
            case "03":
                {
                    $("#CodProveedorE").inputmask({ "mask": "999999999999" });
                    break;
                }
            case "04":
                {
                    $("#CodProveedorE").inputmask({ "mask": "9999999999" });
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

function GenerarE() {
    try {
        var button = document.getElementById('buttonSpinE');
         

        $("#spinloaderE").removeAttr('hidden');
        button.disabled = true;

        var selectTPEE = $("#selectTPFE").val();

        var EncCompras =
        {
            id: $("#idFacE").val(),
            ClaveHacienda: $("#NumFacturaE").val(),
            ConsecutivoHacienda: $("#selectNCFE").val() + $("#NumFacturaE").val(),
            TipoIdentificacionCliente: "0",
            NumFactura: $("#NumFacturaE").val(),
            CodProveedor: (Pais == "P" || Pais == "N" || Pais == "D" ? $("#CodProveedorE").val() + "[" + $("#DVE").val() : $("#CodProveedorE").val()),

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
                        if (Pais == "D"  ) {
                            subtotal -= parseFloat(resultadoAnterior.totalComprobante) - parseFloat(resultadoAnterior.totalImpuesto);
                        } else {
                            subtotal -= parseFloat(resultadoAnterior.totalVenta);
                        }

                        descuentos -= parseFloat(resultadoAnterior.totalDescuentos);
                        impuestos -= parseFloat(resultadoAnterior.totalImpuesto);
                        if (Pais == "D"  ) {
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

                        $("#spinloaderE").attr("hidden", true);
                        button.disabled = false;

                        RellenaTabla();
                        $("#ModalEdicion").modal("hide");
                        Generar();
                    } else {

                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Ha ocurrido un error ' + json.resp

                        });
                        $("#spinloaderE").attr("hidden", true);
                        button.disabled = false;

                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Ha ocurrido un error ' + json.resp

                        });
                        
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
                    $("#spinloaderE").attr("hidden", true);
                    button.disabled = false;
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
            $("#spinloaderE").attr("hidden", true);
            button.disabled = false;
     
            EliminaProductoE(0);

        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
        $("#spinloaderE").attr("hidden", true);
        button.disabled = false;
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
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

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
        } else if ($("#NumFacturaE").val().includes("_")) {
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

async function EnviarFCE() {
    try {
        AgregarProductosE();
        GenerarE();
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }
  

}

function onChangeFecFacturaE() {
    try {
        if (new Date($("#FechaFinal").val()).addDays(1) < new Date($("#FecFacturaE").val()).addDays(1) || new Date($("#FechaI").val()).addDays(1) > new Date($("#FecFacturaE").val()).addDays(1)) {
            $("#FecFacturaE").val($("#FechaI").val());

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La fecha de la factura manual no puede ser menor o mayor que la del periodo '

            })
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e.stack

        })
    }

}