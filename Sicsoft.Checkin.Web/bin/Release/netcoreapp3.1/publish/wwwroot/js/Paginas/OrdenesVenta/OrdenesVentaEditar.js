$(document).ready(function () {
    jQuery(document).ready(function ($) {
        $(document).ready(function () {
            $(".select2").select2({ width: '200px' })
        });
    });
    Recuperar();


});
var Detalle = [];
var LotesCadena = [];
var EstadosLotes = [];
var ids = '';
var LotesArticulos = [];
function Recuperar() {
    try {
        var det = JSON.parse($("#Detalle").val());
        var lot = JSON.parse($("#Lotes").val());
        EstadosLotes = JSON.parse($("#EstadosLotes").val());
        LotesArticulos = JSON.parse($("#LotesArticulos").val());



        for (var i = 0; i < det.length; i++) {

            var detalle =
            {
                id: det[i].id,
                idEncabezado: det[i].idEncabezado,
                NumLinea: det[i].NumLinea,
                CodigoProducto: det[i].CodigoProducto,
                NombreProducto: det[i].NombreProducto,
                Cantidad: det[i].Cantidad,
                CantidadListado: det[i].CantidadListado,
                Ubicacion: det[i].Ubicacion,
                CantidadFaltante: det[i].CantidadFaltante,
                CantidadRecibidoAE: det[i].CantidadRecibidoAE


            }
            Detalle.push(detalle);
            onChangeCantidadListado(i)
        }

        for (var i = 0; i < lot.length; i++) {
            var lote = {
                id: i,
                idEncabezado: 0,
                Lote: lot[i].Lote,
                ItemCode: lot[i].ItemCode,
                Cantidad: lot[i].Cantidad,
                FechaVencimiento: lot[i].FechaVencimiento.split("T")[0],
                idEstado: lot[i].idEstado,
                Procesado: false
            }
            LotesCadena.push(lote);
        }


    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: e

        });
    }
}


function onClickModal(id) {
    $("#plusButton").show();
    ids = id;
    var LotesArray = LotesCadena.filter(a => a.ItemCode == id);
    var sOptions = '';
    $("#rowLotes").html('');
    for (var i = 0; i < LotesArray.length; i++) {
        sOptions += "<div class='col-3' hidden> <div class='form-group'> <h5>ItemCode</h5> <div class='controls'> <input type='text' readonly id='producto" + i + "' class='form-control' value='" + LotesArray[i].ItemCode + "'> </div></div> </div> ";

        sOptions += "<div class='col-4'> <div class='form-group'> <h5>Lote</h5> <div class='controls'> <input type='text' readonly class='form-control' value='" + LotesArray[i].Lote + "' id='lote" + i + "'> </div></div> </div>";
        sOptions += "<div class='col-3' > <div class='form-group'> <h5>F.Vencimiento</h5> <div class='controls'> <input type='date' readonly id='fechavencimiento" + i + "' class='form-control' value='" + LotesArray[i].FechaVencimiento.split("T")[0] + "'> </div></div> </div> ";
        sOptions += "<div class='col-3' hidden > <div class='form-group'> <h5>Estado</h5> <div class='controls'> <input type='text' readonly id='estado" + i + "' class='form-control' value='" + EstadosLotes.filter(a => a.id == LotesArray[i].idEstado)[0].Estado + "'> </div></div> </div> ";

        sOptions += "<div class='col-2'> <div class='form-group'> <h5>Cantidad</h5> <div class='controls'> <input type='number' readonly  id='cantidad" + i + "' class='form-control' value='" + LotesArray[i].Cantidad + "'> </div></div> </div> ";
        sOptions += "<div class='col-2'> <a style='margin-top: 35%; style='cursor: pointer;' ' onclick='javascript: EliminarLinea(" + LotesArray[i].id + ") ' class='fa fa-trash icono'> </a> </div>"

    }
    $("#rowLotes").html(sOptions);
}

function rellenaRowLotes() {
    $("#plusButton").hide();
    var LotesArray = LotesCadena.filter(a => a.ItemCode == ids);

    var LotesArticulos2 = LotesArticulos.filter(a => a.ItemCode == ids);

    var sOptions = '';
    $("#rowLotes").html('');
    $("#rowLotes").html('');
    var z = 0;
    for (var i = 0; i < LotesArray.length; i++) {
        sOptions += "<div class='col-4'> <div class='form-group'> <h5>Lote</h5> <div class='controls'> <input type='text' readonly class='form-control' value='" + LotesArray[i].Lote + "' id='lote" + i + "'> </div></div> </div>";
        sOptions += "<div class='col-3' hidden> <div class='form-group'> <h5>ItemCode</h5> <div class='controls'> <input type='text' readonly id='producto" + i + "' class='form-control' value='" + LotesArray[i].ItemCode + "'> </div></div> </div> ";
        sOptions += "<div class='col-3' > <div class='form-group'> <h5>F.Vencimiento</h5> <div class='controls'> <input type='date' readonly id='fechavencimiento" + i + "' class='form-control' value='" + LotesArray[i].FechaVencimiento + "' > </div></div> </div> ";
        sOptions += "<div class='col-3'hidden > <div class='form-group'> <h5>Estado</h5> <div class='controls'> <input type='text' readonly  id='estado" + i + "' class='form-control' value='" + EstadosLotes.filter(a => a.id == LotesArray[i].idEstado)[0].Estado + "'> </div></div> </div> ";

        sOptions += "<div class='col-2'> <div class='form-group'> <h5>Cantidad</h5> <div class='controls'> <input type='number' readonly id='cantidad" + i + "' class='form-control' value='" + LotesArray[i].Cantidad + "'> </div></div> </div> ";
        sOptions += "<div class='col-2'> <a style='margin-top: 35%; style='cursor: pointer;' ' onclick='javascript: EliminarLinea(" + LotesArray[i].id + ") ' class='fa fa-trash icono'> </a> </div>"

        z++;
    }

    sOptions += "<div class='col-4'> <div class='form-group'> <h5>Lote</h5> <div class='controls'> <select class='form-control' id='lote" + z + "' onchange='javascript: onChangeLote(" + z + ")'>  <option value='0' selected> Seleccione </option>";
    for (var zi = 0; zi < LotesArticulos2.length; zi++) {
        sOptions += " <option value= '" + LotesArticulos2[zi].Numero + "' >" + LotesArticulos2[zi].Numero + " | " + LotesArticulos2[i].InDate.split("T")[0] +"</option>";
    }
    sOptions += " </select>  </div></div> </div> ";
    sOptions += "<div class='col-3' hidden> <div class='form-group'> <h5>ItemCode</h5> <div class='controls'> <input type='text' readonly id='producto" + z + "' class='form-control' value='" + ids + "'  > </div></div> </div> ";
    sOptions += "<div class='col-3'> <div class='form-group'> <h5>F.Vencimiento</h5> <div class='controls'> <input readonly type='date'  id='fechavencimiento" + z + "' class='form-control'  > </div>  </div> </div> ";
    sOptions += "<div class='col-3' hidden> <div class='form-group'> <h5>Estado</h5> <div class='controls'> <select class='form-control' id='estado" + i + "'>  ";
    for (var zo = 0; zo < EstadosLotes.length; zo++) {
        sOptions += " <option value= '" + EstadosLotes[zo].id + "' >" + EstadosLotes[zo].Estado + "</option>";
    }
    sOptions += " </select>  </div></div> </div> ";

    sOptions += "<div class='col-2'> <div class='form-group'> <h5>Cantidad</h5> <div class='controls'> <input type='number'  id='cantidad" + z + "' onchange='javascript: onChangeCantidad(" + z + ")' class='form-control'  > </div>  </div> </div> ";
    sOptions += "<div class='col-2'> <a style='margin-top: 35%; style='cursor: pointer;' ' onclick='javascript: GuardadoLinea(" + z + ") ' class='fa fa-check-square-o icono'> </a> </div>"
    $("#rowLotes").html(sOptions);
}

function onChangeCantidad(z) {
    try {
        var Lote = LotesArticulos.find(a => a.Numero == $("#lote" + z).val() && a.ItemCode == ids);

        var CantidadDigitada = parseFloat($("#cantidad" + z).val());
        var CantidadLote = Lote.Cantidad;

        if (CantidadDigitada > CantidadLote) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No puede ser mayor a la cantidad real del lote, el maximo a elegir por este lote es:  ' + Lote.Cantidad

            });

            $("#cantidad" + z).val(Lote.Cantidad);
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar cambiar la cantidad ' + e

        })
    }
}

function onChangeLote(z) {
    try {
        var Lote = LotesArticulos.find(a => a.Numero == $("#lote" + z).val() && a.ItemCode == ids);

        $("#fechavencimiento" + z).val(Lote.FechaVen.split("T")[0]);

        $("#cantidad" + z).prop('max', Lote.Cantidad);

    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al intentar cambiar el lote ' + e

        })
    }
}

function GuardadoLinea(z) {

    var lote = {
        id: LotesCadena.length,
        idEncabezado: 0,
        Lote: $("#lote" + z).val(),
        ItemCode: ids,
        Cantidad: $("#cantidad" + z).val(),
        FechaVencimiento: $("#fechavencimiento" + z).val(),
        Procesado: false,
        idEstado: $("#estado" + z).val()
    }
    if (ValidarLinea(z)) {
        LotesCadena.push(lote);
        onClickModal(ids);
    }

}

function EliminarLinea(z) {
    LotesCadena.splice(z, 1);
    for (var i = 0; i < LotesCadena.length; i++) {
        LotesCadena[i].id = i;
    }
    onClickModal(ids);
}


function ValidarLinea(z) {
    try {
        var LotesArray = LotesCadena.filter(a => a.ItemCode == ids);
        var cantidades = 0;
        for (var i = 0; i < LotesArray.length; i++) {
            cantidades += parseInt(LotesArray[i].Cantidad);
        }
        var prod = Detalle.filter(a => a.CodigoProducto == ids)[0];
        if ($("#lote" + z).val() == "") {
            return false;
        } else if ($("#cantidad" + z).val() == undefined || $("#cantidad" + z).val() <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Digite una cantidad valida'

            });
            return false;
        } else if (parseInt($("#cantidad" + z).val()) + cantidades > parseInt(prod.CantidadListado + prod.CantidadRecibidoAE)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La cantidad digita es mayor a la cantidad restante'

            });
            return false;
        } else {
            return true;
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: e

        });
        return false;
    }

}


function onChangeCantidadListado(i) {
    if (parseInt($("#Cantidad_" + i).val()) > Detalle[i].CantidadFaltante) {
        $("#Cantidad_" + i).val(Detalle[i].CantidadFaltante);
    }
    if (parseInt($("#Cantidad_" + i).val()) < 0) {
        $("#Cantidad_" + i).val(0);
    }

    Detalle[i].CantidadListado = parseInt($("#Cantidad_" + i).val());

    if (parseInt($("#Cantidad_" + i).val()) == Detalle[i].CantidadFaltante) {
        $("#td_" + i).html("");
        $("#td_" + i).html("<a class='ti ti-check icono' style='color: #28a745;'> </a>");

    } else {
        $("#td_" + i).html("");
        $("#td_" + i).html("<a class='ti ti-alert icono' style='color: #ffc107;'> </a>");

    }
}

function Generar() {




    Swal.fire({
        title: '¿Desea guardar los cambios de esta orden de venta?',
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

            if ($("#Firma").val() != "" && $("#Firma").val() != undefined) {
                var detalle = {
                    id: 0,
                    idEncabezado: 0,
                    Tipo: '',
                    Base64: '',
                    base64Img: $("#Firma").val(),
                    Firma: true
                }
                documentosbase64.push(detalle);
            }
            for (var i = 0; i < documentosbase64.length; i++) {
                documentosbase64[i].id = 0;
            }
            var enviar = {
                id: $("#idGeneral").val(),
                idUsuarioAsignado: 0,
                idRuta: $("#Ruta").val(),
                CodigoCliente: "",
                NombreCliente: "",
                Fecha: $("#fechaEnviado").val(),
                FechaEnvio: $("#fechaEnviado").val(),
                FechaEnviado: $("#fechaEnviado").val(),
                Series: "",
                DocNum: "",
                Estado: "",
                Status: "",
                CantidadLineas: 0,
                Comentarios: $("#Comentarios").val(),
                Generar: false,
                procesadaSAP: false,
                DocNumEntrega: "",
                Moneda: "",
                Detalle: Detalle,
                Adjuntos: documentosbase64,
                Lotes: LotesCadena,
                Logs: []
            };


            $.ajax({
                type: 'POST',

                url: $("#urlGenerar").val(),
                dataType: 'json',
                data: { enviados: enviar },
                headers: {
                    RequestVerificationToken: $('input:hidden[name="__RequestVerificationToken"]').val()
                },
                success: function (json) {

                    $("#divProcesando").hide();

                    if ($('.modal-backdrop').is(':visible')) {

                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').hide();
                    }

                    if (json.success == true) {
                        Swal.fire({
                            title: "Ha sido guardado con éxito",

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
                            text: 'Ha ocurrido un error al intentar guardar -> ' + json.error

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
                        text: 'Ha ocurrido un error al intentar guardar ' + e

                    })
                }
            });


        }
    })


}

function GeneraryEnviar() {




    Swal.fire({
        title: '¿Desea guardar los cambios y enviar a SAP esta orden de venta?',
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
            var Bandera = '@(Model.Orden.Adjuntos.Where(a => a.Firma == true).FirstOrDefault() == null)';

            if ($("#Firma").val() != "" && $("#Firma").val() != undefined) {
                var detalle = {
                    id: 0,
                    idEncabezado: 0,
                    Tipo: '',
                    Base64: '',
                    base64Img: $("#Firma").val(),
                    Firma: true
                }
                documentosbase64.push(detalle);
            } else if (Bandera == 'False') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Parece que falta la firma '

                });
                throw "Error";
            }
            for (var i = 0; i < documentosbase64.length; i++) {
                documentosbase64[i].id = 0;
            }
            var enviar = {
                id: $("#idGeneral").val(),
                idUsuarioAsignado: 0,
                idRuta: $("#Ruta").val(),
                CodigoCliente: "",
                NombreCliente: "",
                Fecha: $("#fechaEnviado").val(),
                FechaEnvio: $("#fechaEnviado").val(),
                FechaEnviado: $("#fechaEnviado").val(),
                Series: "",
                DocNum: "",
                Estado: "",
                Status: "",
                CantidadLineas: 0,
                Comentarios: $("#Comentarios").val(),
                Generar: true,
                procesadaSAP: false,
                DocNumEntrega: "",
                Moneda: "",
                Detalle: Detalle,
                Adjuntos: documentosbase64,
                Lotes: LotesCadena,
                Logs: []
            };


            $.ajax({
                type: 'POST',

                url: $("#urlGenerar").val(),
                dataType: 'json',
                data: { enviados: enviar },
                headers: {
                    RequestVerificationToken: $('input:hidden[name="__RequestVerificationToken"]').val()
                },
                success: function (json) {

                    $("#divProcesando").hide();

                    if ($('.modal-backdrop').is(':visible')) {

                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').hide();
                    }

                    if (json.success == true) {
                        Swal.fire({
                            title: "Ha sido guardado con éxito",

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
                            text: 'Ha ocurrido un error al intentar guardar -> ' + json.error

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
                        text: 'Ha ocurrido un error al intentar guardar ' + e

                    })
                }
            });


        }
    })


}

///Adjuntos

var file = document.getElementById('file');
var preload = document.querySelector('.preload');

var formData = new FormData();
var documentosbase64 = [];

function getBase64(file, id) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {

        var detalle = {
            id: id,
            idEncabezado: 0,
            Tipo: '',
            Base64: '',
            base64Img: reader.result,
            Firma: false
        }
        documentosbase64.push(detalle);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

function getBase642(event, id) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function () {
        var dataURL = reader.result;

        var detalle = {
            id: id,
            idEncabezado: 0,
            Tipo: '',
            Base64: '',
            base64Img: dataURL,
            Firma: false
        }

        documentosbase64.push(detalle);
    };
    reader.readAsDataURL(input.files[0]);
}

function eliminar(id) {
    documentosbase64.splice(documentosbase64.indexOf(documentosbase64.find(a => a.id == id)), 1)
}

file.addEventListener('change', function (e) {

    for (var i = 0; i < file.files.length; i++) {
        var thumbnail_id = Math.floor(Math.random() * 30000) + '_' + Date.now();
        createThumbnail(file, i, thumbnail_id);
        formData.append(thumbnail_id, file.files[i]);
    }
    getBase642(e, thumbnail_id);
    e.target.value = '';

});



var createThumbnail = function (file, iterator, thumbnail_id) {
    var thumbnail = document.createElement('div');
    thumbnail.classList.add('thumbnail', thumbnail_id);
    thumbnail.dataset.id = thumbnail_id;

    thumbnail.setAttribute('style', `background-image: url(${URL.createObjectURL(file.files[iterator])})`);
    document.getElementById('preview-images').appendChild(thumbnail);
    createCloseButton(thumbnail_id);
}

var createCloseButton = function (thumbnail_id) {
    var closeButton = document.createElement('div');
    closeButton.classList.add('close-button');
    closeButton.innerText = 'x';
    document.getElementsByClassName(thumbnail_id)[0].appendChild(closeButton);
}

var clearFormDataAndThumbnails = function () {
    for (var key of formData.keys()) {
        formData.delete(key);
    }

    document.querySelectorAll('.thumbnail').forEach(function (thumbnail) {
        thumbnail.remove();
    });
}


document.body.addEventListener('click', function (e) {
    if (e.target.classList.contains('close-button')) {
        e.target.parentNode.remove();
        formData.delete(e.target.parentNode.dataset.id);
        eliminar(e.target.parentNode.dataset.id);

    }
});

////Firma
(function () { // Comenzamos una funcion auto-ejecutable

    // Obtenenemos un intervalo regular(Tiempo) en la pamtalla
    window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimaitonFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
                // Retrasa la ejecucion de la funcion para mejorar la experiencia
            };
    })();

    // Traemos el canvas mediante el id del elemento html
    var canvas = document.getElementById("draw-canvas");
    var ctx = canvas.getContext("2d");


    // Mandamos llamar a los Elemetos interactivos de la Interfaz HTML
    //var drawText = document.getElementById("draw-dataUrl");
    //var drawImage = document.getElementById("draw-image");
    var clearBtn = document.getElementById("draw-clearBtn");
    /*  *//*  var submitBtn = document.getElementById("draw-submitBtn");*/
    clearBtn.addEventListener("click", function (e) {
        // Definimos que pasa cuando el boton draw-clearBtn es pulsado
        clearCanvas();
        // drawImage.setAttribute("src", "");
    }, false);
    // Definimos que pasa cuando el boton draw-submitBtn es pulsado
    //submitBtn.addEventListener("click", function (e) {
    //    var dataUrl = canvas.toDataURL();
    //    drawText.innerHTML = dataUrl;
    //    drawImage.setAttribute("src", dataUrl);
    //}, false);

    // Activamos MouseEvent para nuestra pagina
    var drawing = false;
    var mousePos = { x: 0, y: 0 };
    var lastPos = mousePos;
    canvas.addEventListener("mousedown", function (e) {
        /*
          Mas alla de solo llamar a una funcion, usamos function (e){...}
          para mas versatilidad cuando ocurre un evento
        */
        var tint = document.getElementById("color");
        var punta = document.getElementById("puntero");
        console.log(e);
        drawing = true;
        lastPos = getMousePos(canvas, e);
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        drawing = false;
        $("#Firma").val(canvas.toDataURL());

    }, false);
    canvas.addEventListener("mousemove", function (e) {
        mousePos = getMousePos(canvas, e);
    }, false);

    // Activamos touchEvent para nuestra pagina
    canvas.addEventListener("touchstart", function (e) {
        mousePos = getTouchPos(canvas, e);
        console.log(mousePos);
        e.preventDefault(); // Prevent scrolling when touching the canvas
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }, false);
    canvas.addEventListener("touchend", function (e) {
        e.preventDefault(); // Prevent scrolling when touching the canvas
        var mouseEvent = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(mouseEvent);
        $("#Firma").val(canvas.toDataURL());

    }, false);
    canvas.addEventListener("touchleave", function (e) {
        // Realiza el mismo proceso que touchend en caso de que el dedo se deslice fuera del canvas
        e.preventDefault(); // Prevent scrolling when touching the canvas
        var mouseEvent = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(mouseEvent);
        $("#Firma").val(canvas.toDataURL());

    }, false);
    canvas.addEventListener("touchmove", function (e) {
        e.preventDefault(); // Prevent scrolling when touching the canvas
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
        $("#Firma").val(canvas.toDataURL());
    }, false);

    // Get the position of the mouse relative to the canvas
    function getMousePos(canvasDom, mouseEvent) {
        var rect = canvasDom.getBoundingClientRect();
        /*
          Devuelve el tamaño de un elemento y su posición relativa respecto
          a la ventana de visualización (viewport).
        */
        return {
            x: mouseEvent.clientX - rect.left,
            y: mouseEvent.clientY - rect.top
        };
    }

    // Get the position of a touch relative to the canvas
    function getTouchPos(canvasDom, touchEvent) {
        var rect = canvasDom.getBoundingClientRect();
        console.log(touchEvent);
        /*
          Devuelve el tamaño de un elemento y su posición relativa respecto
          a la ventana de visualización (viewport).
        */
        return {
            x: touchEvent.touches[0].clientX - rect.left, // Popiedad de todo evento Touch
            y: touchEvent.touches[0].clientY - rect.top
        };
    }

    // Draw to the canvas
    function renderCanvas() {
        if (drawing) {
            var tint = document.getElementById("color");
            var punta = document.getElementById("puntero");
            ctx.strokeStyle = tint.value;
            ctx.beginPath();
            ctx.moveTo(lastPos.x, lastPos.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            console.log(punta.value);
            ctx.lineWidth = punta.value;
            ctx.stroke();
            ctx.closePath();
            lastPos = mousePos;
        }
    }

    function clearCanvas() {
        canvas.width = canvas.width;
    }

    // Allow for animation
    (function drawLoop() {
        requestAnimFrame(drawLoop);
        renderCanvas();
    })();

})();
