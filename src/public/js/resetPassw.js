
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

function resetPassword() {
    $("#resetpass").on("click", function (event) {
        event.preventDefault();
        document.getElementById("resetForm").style.display = "block";
        console.log("hellooo")
    })
}
var control_code;
var its_okey;
var email_data;
function getpasswordCode() {
    $("#passControl").on("click", function (event) {
        event.preventDefault();
        console.log("selamlar");
        let email = $('#email2').val();
        let check = validateEmail(email);
        var btn = document.getElementById("passControl");
        if (check) {
            email_data = email;
            if (btn.innerHTML == "Get email code" || btn.innerHTML == "Bestätigungscode erhalten" || btn.innerHTML == "احصل على رمز التحقق" || btn.innerHTML == "получить код" || btn.innerHTML == "onay kodu al") {
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
                var datas1 = window.location.href;
                var datas2 = datas1.split('/');
                var real_url = datas2[3];
                var mesaj;
                
                switch (real_url) {
                    case "login":
                        mesaj = "Email sent, please check";
                        
                        break;
                    case "loginALM":
                        mesaj = "E-Mail gesendet, bitte überprüfen"
                        
                        break;
                    case "loginAR":
                        mesaj = "تم إرسال البريد الإلكتروني ، يرجى التحقق"
                       
                        break;
                    case "loginRUS":
                        mesaj = "Электронное письмо отправлено, пожалуйста, проверьте"
                  
                        break;
                    case "loginTR":
                        mesaj = "mail gönderildi lütfen kontrol ediniz"
                 
                        break;
                }
                alert(mesaj);
                control_code = generate_token(32);
                $.ajax({
                    url: `${window.location.origin}/resetCheck`,
                    method: "POST",
                    data: { email: email, token: control_code },
                    success: function (data) {
                        alert("başarılı")
                        console.log("reset");
                    },
                    error: function (err) {
                        alert(err.responseText);
                    }
                })
            } else {
                let get_code = $("#emailcode2").val();
                if (get_code.length != 0) {
                    if (control_code == get_code) {
                        its_okey = true;
                        btn.style.display = "none";
                        document.getElementById("checkmail2").style.display = "block";
                        document.getElementById("passwordinputplace").style.display = "block";
                        document.getElementById("resettButton").style.display = "block";
                    }
                }
            }
        }


    })
}

function resetPasswordDb() {
    $("#passwordnowchange").on("click", function (event) {
        let password = $("#password2").val();
        if (password.length < 7) {
            $("#password2").addClass("is-invalid");
        } else {
            $.ajax({
                url: `${window.location.origin}/resetPasswordConfirm`,
                method: "POST",
                data: { email: email_data, password: password },
                success: function (data) {
                    console.log(data);
                    document.getElementById("resetForm").style.display = "none";
                },
                error: function (err) {
                    alert(err.responseText);
                }
            })
        }

    })
}


$(document).ready(function () {
    resetPassword();
    getpasswordCode();
    resetPasswordDb();
});


