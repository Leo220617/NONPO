$(document).ready(function () {
    jQuery(document).ready(function ($) {
        $(document).ready(function () {

        });
    });
    Recuperar();


});

function Recuperar() {
    try {

        $('#correoElectronico').val(localStorage.email);
        Login();
        $('#pwd').val(localStorage.password);
        $('#Compañia').val(localStorage.idCedula);
        if (localStorage.check == "true") {
            $("#basic_checkbox_1").attr('checked', 'checked');

        }
    } catch (e) {
        alert(e);
    }
}
function onClickLogin() {
    try {
        if ($("#basic_checkbox_1").is(':checked')) {
            localStorage.email = $('#correoElectronico').val();
            localStorage.password = $('#pwd').val();
            localStorage.idCedula = $('#Compañia').val();
            localStorage.check = true;
        } else {
            localStorage.email = "";
            localStorage.password = "";
            localStorage.idCedula = "";
            localStorage.check = false;

        }
       
    } catch (e) {
        alert(e);
    }
}

function Guardar() {
    if (Validar()) {
        onClickLogin();
        $("#formTipos").submit();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Parece que faltan datos por llenar'

        });
    }
}
function Validar() {
    if ($("#correoElectronico").val() == "") {
        return false;
    } else if ($("#Compañia").val() == "") {
        return false;
    } else {
        return true;
    }
}
function Login() {



    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: $("#UrlPagina").val(),
        data: { email: $("#correoElectronico").val() },
        success: function (result) {


            console.log(result);

            if (result != null) {
                var t = '';
                $("#Compañia").html('');

                for (var i = 0; i < result.length; i++) {

                    if (i == 0) {
                        t += '<option value="' + result[i].cedulaJuridica + '" selected >' + result[i].nombreEmpresa + '</option>';
                    } else {
                        t += '<option value="' + result[i].cedulaJuridica + '">' + result[i].nombreEmpresa + '</option>';
                    }


                }



                $("#Compañia").html(t);

            }

        },
        beforeSend: function () {

        },
        complete: function () {

        }
    });
}