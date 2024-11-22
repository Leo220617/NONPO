

$(document).ready(function () {
    jQuery(document).ready(function ($) {
        Recuperar();
    });



    $(document).ready(function () {
        $('#pdf-upload').on('change', function (event) {
            var fileInput = $(this)[0];
            if (fileInput.files.length === 0) {
                alert('Por favor, seleccione un archivo PDF.');
                return;
            }

            var file = fileInput.files[0];
            var reader = new FileReader();

            reader.onload = function (e) {
                var base64 = e.target.result.split(',')[1];
                PDFBASE = base64;
            };

            reader.onerror = function (e) {
                console.error('Error leyendo el archivo', e);
                alert('Hubo un error al leer el archivo.');
            };

            reader.readAsDataURL(file);
        });
    });


});

var ProdCadena = [];

var PDFBASE = "";

var Solicitud = [];
var Proveedores = [];


function Recuperar() {
    try {
        Solicitud = JSON.parse($("#Solicitud").val());
        Proveedores = JSON.parse($("#Proveedores").val());

        for (var i = 0; i < Solicitud.Facturas.length; i++) {
       
            var Factura =
            {   
                idSolicitud: $("#id").val(),
                CedulaProveedor: Solicitud.Facturas[i].CedulaProveedor,
                NomProveedor: Solicitud.Facturas[i].NomProveedor,
                NumFactura: Solicitud.Facturas[i].NumFactura,
                Comentarios: Solicitud.Facturas[i].Comentarios,
                CardCode: Solicitud.Facturas[i].CardCode,
                Fecha: Solicitud.Facturas[i].Fecha.substr(0, 4) + "-" + Solicitud.Facturas[i].Fecha.substr(5, 2) + "-" + Solicitud.Facturas[i].Fecha.substr(8, 2),
                Monto: parseFloat(Solicitud.Facturas[i].Monto),
                PDF: Solicitud.Facturas[i].PDF
            };
        




            ProdCadena.push(Factura);
        
            RellenaTabla();
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar agregar ' + e

        })
    }
}


function onChangeProveedor(bit) {
    try {
        if (bit == 2) {

            $("#CodProveedor").val("");


        } else {
            $("#NomProveedor").val("");
        }
        var idProveedor = $("#CodProveedor").val();
        var Nombre = $("#NomProveedor").val();

       

        var Proveedor = Proveedores.find(a => a.Nombre == Nombre || a.Cedula == idProveedor);


        if (Proveedor != undefined) {
            $("#NomProveedor").val(Proveedor.Nombre);
            $("#CodProveedor").val(Proveedor.Cedula);
            $("#CardCode").val(Proveedor.CardCode);
        } else {
            $("#NomProveedor").val("");
            $("#CodProveedor").val("");
            $("#CardCode").val("");
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar agregar ' + e

        })
    }
}
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
            Status: "A",
            Moneda: $("#selectMoneda").val(),
            BaseEntry: 0,
            Comentarios: $("#inputComentarios").val(),
            idUsuarioAprobador: 0,
            Facturas: ProdCadena






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

                                        window.location.href = window.location.href.split("/Adjuntar")[0];


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
            idUsuarioAprobador: 0,
            Facturas: ProdCadena






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

                                        window.location.href = window.location.href.split("/Adjuntar")[0];


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
        var total = 0;
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

            sOptions += '<td align="center" style="padding-top:15px;">  <a style="font-size:13px; color: blue; text-decoration: underline;" onclick="javascript: AbrirModalEdicion(' + i + ')">' + ProdCadena[i].NumFactura + '</a></td>';
            sOptions += '<td align="center" style="padding-top:15px;">  <p style="font-size:13px;">' + ProdCadena[i].Fecha + '</p></td>';
            sOptions += '<td align="center" style="padding-top:15px;">  <p style="font-size:13px;">' + ProdCadena[i].CedulaProveedor + " - " + ProdCadena[i].NomProveedor + '</p></td>';
            sOptions += '<td align="right" style="padding-top:13px;">  <p style="font-size:13px;">' + formatoDecimal(ProdCadena[i].Monto) + '</p></td>';





            sOptions += '</tr>'
            total += ProdCadena[i].Monto;
        }
        $("#tbody").html(sOptions);

        $("#ModalInclusion").modal("hide");
        $("#ModalEdicion").modal("hide");
        $("#CodProveedor").val("");
        $("#NomProveedor").val("");
        $("#NumFactura").val("");
        $("#FecFactura").val();
        $("#PrecUni").val(0)
        $("#ComentarioFactura").val("");

    
        $("#total").text(formatoDecimal(total.toFixed(2)));

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
            Monto: parseFloat($("#PrecUni").val()),
            CardCode: $("#CardCode").val(),
            PDF: PDFBASE
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

        if (Factura.CardCode == "" || Factura.CardCode == undefined || Factura.CardCode == null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error, CardCode del Provedor invalido '

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
            (Factura.CardCode != "" && Factura.CardCode != undefined && Factura.CardCode != null) &&
            (Factura.NumFactura != "" && Factura.NumFactura != undefined && Factura.NumFactura != null) && (Factura.Monto != undefined && Factura.Monto != null && Factura.Monto > 0)) {

            ProdCadena.push(Factura);
         
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

function AbrirModalEdicion(i) {
    try {
        var factura = ProdCadena[i];
        if (factura != undefined) {

            $("#CodProveedorE").val(factura.CedulaProveedor);
            $("#NomProveedorE").val(factura.NomProveedor);
            $("#NumFacturaE").val(factura.NumFactura);
            $("#FecFacturaE").val(factura.Fecha);
            $("#PrecUniE").val(factura.Monto);
            $("#ComentarioFacturaE").val(factura.Comentarios);

            AbrirModalE();
        }

    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }

}
function EditarFactura() {
    try {
        var Consecutivo = $("#NumFacturaE").val();
        var Cedula = $("#CodProveedorE").val();
        var i = ProdCadena.findIndex(a => a.NumFactura == Consecutivo && a.CedulaProveedor == Cedula);
        var factura = ProdCadena[i];
        if (factura != undefined) {

            ProdCadena[i].CedulaProveedor = $("#CodProveedorE").val();
            ProdCadena[i].NomProveedor = $("#NomProveedorE").val();
            ProdCadena[i].NumFactura = $("#NumFacturaE").val();
            ProdCadena[i].Fecha = $("#FecFacturaE").val();
            ProdCadena[i].Monto = parseFloat($("#PrecUniE").val()),
            ProdCadena[i].Comentarios = $("#ComentarioFacturaE").val();
       

        }
        RellenaTabla();
  

    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar recuperar ' + e

        })
    }
}
