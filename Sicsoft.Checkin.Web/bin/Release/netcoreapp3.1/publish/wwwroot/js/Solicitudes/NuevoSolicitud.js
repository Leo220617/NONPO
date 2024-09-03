

    $(document).ready(function () {
        jQuery(document).ready(function ($) {

        });



        $(document).ready(function () {

        });


    });



function Generar() {
    try {
        var Solicitud = {
            id: 0,
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

                                        window.location.href = window.location.href.split("/Nuevo")[0];


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
            id: 0,
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

                                        window.location.href = window.location.href.split("/Nuevo")[0];


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
var ImageBase64 = '';

var fileUploadPrincipal = document.getElementById('fileUploadG');
fileUploadPrincipal.onchange = async function (e) {
    await readFilePrincipalP(e.target);

    var idF = setInterval(async function () {
        if (ImageBase64 != "data:," && $("#ArchivoBase64").val() != "data:,") {
            clearInterval(idF);
        } else {
            await readFilePrincipalP(e.target);
        }
    }, 1500);
}

async function readFilePrincipalP(input) {
    if (input.files && input.files[0]) {
        const maxAllowSize = 5000000;
        if (input.files[0].size > maxAllowSize) {
            alert("Este archivo es muy pesado");
            input.value = '';
        } else {
            var reader = new FileReader();
            var file = input.files[0];
            var mimeType = file.type;

            reader.onload = function (e) {
                var result = e.target.result;

                // Si es una imagen, redimensionarla y mostrarla
                if (mimeType.startsWith("image/")) {
                    var img = document.createElement("img");
                    var canvas = document.createElement('canvas');
                    img.onload = function () {
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
                        ctx.drawImage(img, 0, 0, width, height);
                        var dataurl = canvas.toDataURL("image/jpg");
                        document.getElementById('fileIcon').src = result;
                        document.getElementById('fileIcon').style.display = 'block';

                        ImageBase64 = dataurl;
                        $("#ArchivoBase64").val(ImageBase64);
                        $("#fileInfo").text(`Archivo seleccionado: ${file.name}`);
                    }
                    img.src = result;
                } else {
                    // Mostrar icono adecuado según el tipo de archivo
                    var iconSrc;
                    if (mimeType === 'application/pdf') {
                        iconSrc = '~/logoPDF.png';
                    } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                        iconSrc = '~/logoWord.png';
                    } else if (mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                        iconSrc = '~/logoExcel.png';
                    } else {
                        iconSrc = '~/adjunto.png';
                    }
                    document.getElementById('fileIcon').src = iconSrc;
                    document.getElementById('fileIcon').style.display = 'block';

                    ImageBase64 = result;
                    $("#ArchivoBase64").val(ImageBase64);
                    $("#fileInfo").text(`Archivo seleccionado: ${file.name}`);
                }
            }

            reader.readAsDataURL(file);
        }
    }
}
