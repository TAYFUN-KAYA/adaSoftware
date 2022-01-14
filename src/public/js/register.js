

function validateInput(email, password, passwordConfirmation) {
    // check email
    const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;
    if (email.match(EMAIL_REG)) {
        $("#email").removeClass("is-invalid");
    } else {//empty email input or invalid email
        $("#email").addClass("is-invalid");
    }


    // check password
    if (password.length > 6) {
        $("#password").removeClass("is-invalid");
        document.getElementById("password").style.border = "none";
        document.getElementById("passwordlength").style.display = "none"
    } else {
        $("#password").addClass("is-invalid");
    }

    // check passwordConfirmation
    if (passwordConfirmation == password) {
        $("#passwordConfirmation").removeClass("is-invalid");

    } else {
        $("#passwordConfirmation").addClass("is-invalid");
    }
    if (!email.match(EMAIL_REG) || password.length <= 6 || password !== passwordConfirmation)
        return true; // errors
    return false;
}

function generate_token(length) {
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];
    for (var i = 0; i < length; i++) {
        var j = (Math.random() * (a.length - 1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

function validateEmail(email) {
    // check email
    const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;
    if (email.match(EMAIL_REG)) {
        $("#email").removeClass("is-invalid");
    } else {//empty email input or invalid email
        $("#email").addClass("is-invalid");
    }

    if (!email.match(EMAIL_REG))
        return false; // errors
    return true;
}



var control_code;
var control_code_other;
var its_okey;
var statuss = 1;
function handleClickEmailBtn() {
    $("#emailcontrol").on("click", function (event) {
        event.preventDefault();


        let email = $("#email").val();
        let check = validateEmail(email)
        if (check) {
            var btn = document.getElementById("emailcontrol");
            var textt = document.getElementById("checktextemail");
            if (btn.innerHTML == "Get email code" || btn.innerHTML == "Bestätigungscode erhalten" || btn.innerHTML == "احصل على رمز التحقق" || btn.innerHTML == "получить код" || btn.innerHTML == "onay kodu al") {
                $("#emailcode").removeClass("is-invalid");
                $("#email").removeClass("is-invalid");
             
                if (btn.innerHTML == "Get email code") {
                    btn.innerHTML = 'verify';
                } else if (btn.innerHTML == "Bestätigungscode erhalten") {
                    btn.innerHTML = 'verifizieren';
                } else if (btn.innerHTML == "احصل على رمز التحقق") {
                    btn.innerHTML = 'تحقق';
                } else if (btn.innerHTML == "получить код") {
                    btn.innerHTML = 'проверять';
                } else if (btn.innerHTML == "onay kodu al") {
                    btn.innerHTML = 'Doğrula';
                }

                statuss = 2;

                var btn_langu = document.getElementById("registerBtn").innerHTML;
                document.getElementById("registerBtn").disabled = true;
                var mesaj;

                var other_mesaj;
                switch (btn_langu) {
                    case "Register":
                        mesaj = "Email sent, please check";
                        other_mesaj = 'You are already registered please login'
                        break;
                    case "Registrieren":
                        mesaj = "E-Mail gesendet, bitte überprüfen"
                        other_mesaj = "Sie sind bereits registriert bitte einloggen"
                        break;
                    case "يسجل":
                        mesaj = "تم إرسال البريد الإلكتروني ، يرجى التحقق"
                        other_mesaj = "أنت مسجل بالفعل الرجاء تسجيل الدخول"
                        break;
                    case "регистр":
                        mesaj = "Электронное письмо отправлено, пожалуйста, проверьте"
                        other_mesaj = "Вы уже зарегистрированы пожалуйста авторизуйтесь"
                        break;
                    case "Kayıt ol":
                        mesaj = "mail gönderildi lütfen kontrol ediniz"
                        other_mesaj = "Zaten kayıtlısınız lütfen giriş yapın"
                        break;
                }



                textt.style.display = "block";
                document.getElementById("warningconfirm").style.border = "1px solid red";

                control_code = generate_token(32);
                console.log("CODE : ", control_code);

                $.ajax({
                    url: `${window.location.origin}/emailCheck`,
                    method: "POST",
                    data: { email: email, token: control_code },
                    success: function (data) {
                        // alert("Create a new account success");
                        // window.location.href = "/login";



                        if (data['success'] == false) {
                            if (btn.innerHTML == "verify") {
                                btn.innerHTML = 'Get email code';
                            } else if (btn.innerHTML == "verifizieren") {
                                btn.innerHTML = 'Bestätigungscode erhalten';
                            } else if (btn.innerHTML == 'تحقق') {
                                btn.innerHTML =  "احصل على رمز التحقق";
                            } else if (btn.innerHTML == "проверять") {
                                btn.innerHTML = 'получить код';
                            } else if (btn.innerHTML == "Doğrula") {
                                btn.innerHTML = 'onay kodu al';
                            }
                            textt.style.display = "none";
                            document.getElementById("registerBtn").disabled = false;
                            alert(other_mesaj);
                        } else {
                            alert(mesaj)
                        }
                        console.log(data);
                    },
                    error: function (err) {
                        alert(err.responseText);
                        //console.log(err.responseText);
                    }
                })
            } else {



                let get_code = $("#emailcode").val();
                if (get_code.length != 0) {
                    $("#emailcode").removeClass("is-invalid");
                    $("#email").removeClass("is-invalid");
                    if (get_code == control_code) {
                        its_okey = true;
                        btn.innerHTML = "confirmed";
                        btn.style.display = "none";
                        document.getElementById("warningconfirm").style.border = "none";
                        var check_icon = document.getElementById("checkmail");
                        check_icon.style.display = "block";
                        textt.style.display = "none";
                        document.getElementById("registerBtn").disabled = false;
                    } else {
                        $("#emailcode").addClass("is-invalid");

                    }
                } else {
                    document.getElementById("warningconfirm").style.border = "1px solid red";
                    $("#emailcode").addClass("is-invalid");
                    $("#email").addClass("is-invalid");
                }


            }




        } else {
            console.log("durum belirsizz");
            $("#emailcode").addClass("is-invalid");
            $("#email").addClass("is-invalid");
        }


    });
}


function handleClickRegisterBtn() {
    $("#registerBtn").on("click", function (event) {

        event.preventDefault();

        let email = $("#email").val();
        let password = $("#password").val();
        let passwordConfirmation = $("#passwordConfirmation").val();
        let fullName = $("#fullName").val();
        var btn_langu = document.getElementById("registerBtn").innerHTML;

        var mesaj;
        var url_redic = ''

        var mesaj_register;

        switch (btn_langu) {
            case "Register":
                mesaj = "create a new user successfully";
                mesaj_register = "Send code to your e-mail"
                url_redic = '/login'
                break;
            case "Registrieren":
                mesaj = "Neuen Benutzer erfolgreich erstellen"
                mesaj_register = "Code an Ihre E-Mail senden"
                url_redic = '/loginALM'
                break;
            case "يسجل":
                mesaj = "إنشاء مستخدم جديد بنجاح"
                mesaj_register = "أرسل الرمز إلى بريدك الإلكتروني"
                url_redic = '/loginAR'
                break;
            case "регистр":
                mesaj = "успешно создать нового пользователя"
                mesaj_register = "Отправить код на вашу электронную почту"
                url_redic = '/loginRUS'
                break;
            case "Kayıt ol":
                mesaj = "başarıyla yeni bir kullanıcı oluştu"
                mesaj_register = "Mailinize kod gönderiniz"
                url_redic = '/loginTR'
                break;
        }

        // validate 
        let check = validateInput(email, password, passwordConfirmation);
        console.log(check);

        if (statuss == 1) {
            alert(mesaj_register);
        }

        if (password.length < 6 || password.length == 6) {
            document.getElementById("password").style.border = "1px solid red";
            document.getElementById("passwordlength").style.display = "block"

        }

        if (!check) {
            // send data to node server with ajax
            // http localhost/register-new-user
            if (its_okey) {
                $.ajax({
                    url: `${window.location.origin}/register-new-user`,
                    method: "POST",
                    data: { fullName: fullName, email: email, password: password, passwordConfirmation: passwordConfirmation, register_token: control_code, btn_langu: btn_langu },
                    success: function (data) {
                        alert(mesaj);
                        window.location.href = url_redic;
                        //console.log(data);
                    },
                    error: function (err) {
                        alert(err.responseText);
                        //console.log(err.responseText);
                    }
                })
            } else {
                $("#emailcode").addClass("is-invalid");
            }


        }



    })
}



$(document).ready(function () {
    handleClickRegisterBtn();
    handleClickEmailBtn();

});