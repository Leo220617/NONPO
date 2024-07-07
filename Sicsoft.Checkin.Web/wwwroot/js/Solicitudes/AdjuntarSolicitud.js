

$(document).ready(function () {
    jQuery(document).ready(function ($) {

    });



    $(document).ready(function () {

    });


});

var ProdCadena = [];
var total = 0;

function Generar() {
    try {
        var Solicitud = {
            id: $("#id").val(),
            idUsuarioCreador: 0,
            idTipoGasto: $("#Gasto").val(),
            idRango: 0,
            Fecha: $("#Fecha").val(),
            FechaAceptacion: $("#Fecha").val(),
            Monto: $("#Monto").val(),
            Status: "P",
            Moneda: $("#selectMoneda").val(),
            BaseEntry: 0,
            Comentarios: $("#inputComentarios").val(),
            idUsuarioAprobador: 0






        };

        if (validar(Solicitud)) {
            Swal.fire({
                title: '¿Desea guardar la solicitud?',
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
                        type: 'POST',

                        url: $("#urlGenerar").val(),
                        dataType: 'json',
                        data: { recibidos: Solicitud },
                        headers: {
                            RequestVerificationToken: $('input:hidden[name="__RequestVerificationToken"]').val()
                        },
                        success: function (json) {



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
                                        //Despues de insertar, ocupariamos el id del cliente en la bd
                                        //para entonces setearlo en el array de clientes

                                        window.location.href = window.location.href.split("/Editar")[0];


                                    }
                                })

                            } else {

                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Ha ocurrido un error al intentar guardar'

                                })
                            }
                        },

                        beforeSend: function (xhr) {


                        },
                        complete: function () {

                        },
                        error: function (error) {


                        }
                    });
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que faltan datos por rellenar'

            })
        }

    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar agregar ' + e

        })
    }
}

function GenerarP() {
    try {
        var Solicitud = {
            id: $("#id").val(),
            idUsuarioCreador: 0,
            idTipoGasto: $("#Gasto").val(),
            idRango: 0,
            Fecha: $("#Fecha").val(),
            FechaAceptacion: $("#Fecha").val(),
            Monto: $("#Monto").val(),
            Status: "G",
            Moneda: $("#selectMoneda").val(),
            BaseEntry: 0,
            Comentarios: $("#inputComentarios").val(),
            idUsuarioAprobador: 0






        };

        if (validar(Solicitud)) {
            Swal.fire({
                title: '¿Desea guardar la solicitud?',
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
                        type: 'POST',

                        url: $("#urlGenerarP").val(),
                        dataType: 'json',
                        data: { recibidos: Solicitud },
                        headers: {
                            RequestVerificationToken: $('input:hidden[name="__RequestVerificationToken"]').val()
                        },
                        success: function (json) {



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
                                        //Despues de insertar, ocupariamos el id del cliente en la bd
                                        //para entonces setearlo en el array de clientes

                                        window.location.href = window.location.href.split("/Editar")[0];


                                    }
                                })

                            } else {

                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Ha ocurrido un error al intentar guardar'

                                })
                            }
                        },

                        beforeSend: function (xhr) {


                        },
                        complete: function () {

                        },
                        error: function (error) {


                        }
                    });
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que faltan datos por rellenar'

            })
        }

    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar agregar ' + e

        })
    }
}
function validar(e) {
    try {
        if (e.Monto == "" || e.Monto == null || e.Monto == undefined || e.Monto == 0) {
            return false;
        } else if (e.Moneda == "" || e.Moneda == null || e.Moneda == undefined) {
            return false;

        } else if (e.idTipoGasto == "" || e.idTipoGasto == null || e.idTipoGasto == undefined) {
            return false;
        } else {
            return true;
        }
    } catch (e) {
        console.log(e);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar imprimir ' + e

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

            sOptions += '<td align="center" style="padding-top:13px;">    <a style="margin-left: -1%; position: inherit !important;" onclick = "javascript: EliminarProducto(' + i + ')" title="Eliminar" class="fa fa-trash icono"></a> ';
         
            sOptions += '<td align="center" style="padding-top:15px;">  <a style="font-size:13px; color: blue; text-decoration: underline;" onclick="javascript: AbrirModalEdicion(' + ProdCadena[i].NumFactura + ')">' + ProdCadena[i].NumFactura + '</a></td>';
            sOptions += '<td align="center" style="padding-top:15px;">  <p style="font-size:13px;">' + ProdCadena[i].Fecha + '</p></td>';
            sOptions += '<td align="center" style="padding-top:15px;">  <p style="font-size:13px;">' + ProdCadena[i].CedulaProveedor + " - " + ProdCadena[i].NomProveedor + '</p></td>';
            sOptions += '<td align="right" style="padding-top:13px;">  <p style="font-size:13px;">' + formatoDecimal(ProdCadena[i].Monto) + '</p></td>';





            sOptions += '</tr>'
        }
        $("#tbody").html(sOptions);

        $("#ModalInclusion").modal("hide");
        $("#CodProveedor").val("");
        $("#NomProveedor").val("");
        $("#NumFactura").val("");
        $("#FecFactura").val();
        $("#PrecUni").val(0)
        $("#ComentarioFactura").val("");



    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}


function AgregarFacturaTabla() {
    try {
        Duplicado = false;
        var CodProveedor = $("#CodProveedor").val();
        var NomProveedor = $("#NomProveedor").val();
        var NumFactura = $("#NumFactura").val();
        var FecFactura = $("#FecFactura").val();
        var Monto = $("#PrecUni").val()
        var Comentarios = $("#ComentarioFactura").val();

        var Factura =
        {
            idSolicitud: $("#id").val(),
            CedulaProveedor: $("#CodProveedor").val(),
            NomProveedor: $("#NomProveedor").val(),
            NumFactura: $("#NumFactura").val(),
            Comentarios: $("#ComentarioFactura").val(),
            Fecha: $("#FecFactura").val(),
            Monto: parseFloat($("#PrecUni").val())
        };

        if (Factura.CedulaProveedor == "" || Factura.CedulaProveedor == undefined || Factura.CedulaProveedor == null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error, por favor ingresa la Cédula del Provedor '

            })
        }
        if (Factura.NomProveedor == "" || Factura.NomProveedor == undefined || Factura.NomProveedor == null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error, por favor ingresa la Nombre del Provedor '

            })
        }
        if (Factura.NumFactura == "" || Factura.NumFactura == undefined || Factura.NumFactura == null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error, por favor ingresa el número de factura '

            })
        }

        if (Factura.Monto == undefined || Factura.Monto == null || Factura.Monto <= 0 || Factura.Monto == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error, por favor ingresa el monto de la factura'

            })
        }
        if ((Factura.CedulaProveedor != "" && Factura.CedulaProveedor != undefined && Factura.CedulaProveedor != null) && (Factura.NomProveedor != "" && Factura.NomProveedor != undefined && Factura.NomProveedor != null) &&
            (Factura.NumFactura != "" && Factura.NumFactura != undefined && Factura.NumFactura != null) && (Factura.Monto != undefined && Factura.Monto != null && Factura.Monto > 0)) {

            ProdCadena.push(Factura);
            total += Factura.Monto;
            $("#total").text(formatoDecimal(total.toFixed(2)));
            RellenaTabla();
        }


    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}

function ReplaceLetra(palabra) {
    var cantidad = cantidadRepetidos(palabra, ",");
    for (var i = 0; i < cantidad; i++) {
        palabra = palabra.replace(",", "");
    }

    //var cantidad2 = cantidadRepetidos(palabra, ".");
    //for (var i = 0; i < cantidad2; i++) {
    //    palabra = palabra.replace(".", "");
    //}
    return palabra;
}

function formatoDecimal(numero) {
    var number = numero;

    // En el alemán la coma se utiliza como separador decimal y el punto para los millares
    return new Intl.NumberFormat("en-US").format(number);
}

function EliminarProducto(i) {
    try {
        var Factura = ProdCadena[i];

        total -= Factura.Monto;
        $("#total").text(formatoDecimal(total.toFixed(2)));
        ProdCadena.splice(i, 1);

        RellenaTabla();
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error ' + e

        })
    }

}