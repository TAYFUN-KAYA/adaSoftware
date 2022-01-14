

function handleLoginBtn(){
    $("#loginBtn").on("click",function(event){
        event.preventDefault();
        let email = $("#email").val();
        let password = $("#password").val();

        var buton_langu = document.getElementById("loginBtn").innerHTML;
        document.getElementById("loginBtn").disabled = true;
        var mesaj;
        var url_redic;
        switch(buton_langu){
            case "Login":
                mesaj = "Your email or password entered is incorrect. Please try again!";
                url_redic = '/'
                break;
            case "Anmeldung":
                mesaj = "Ihre eingegebene E-Mail-Adresse oder Ihr Passwort ist falsch. Bitte versuchen Sie es erneut!";
                url_redic = '/homepageALM'
                break;
            case "تسجيل الدخول":
                mesaj = "بريدك الإلكتروني أو كلمة المرور التي تم إدخالها غير صحيحة. يرجى المحاولة مرة أخرى!";
                url_redic = '/homepageAR'
                break;
            case "Авторизоваться":
                mesaj = "Ваш адрес электронной почты или пароль введены неверно. Повторите попытку!";
                url_redic = '/homepageRUS'
                break;
            case "Griş Yap":
                mesaj = "Girilen e-posta veya şifreniz yanlış. Lütfen tekrar deneyin!";
                url_redic = '/homepageTR'
                break;
        }

        $.ajax({
            url:`${window.location.origin}/login`,
            method:"POST",
            data:{email:email,password:password},
            success:function(data){
                window.location.href=url_redic
            },
            error:function(error){
                alert(mesaj);
                window.location.reload()
            }
        })
    })
}


$(document).ready(function(){
    handleLoginBtn();
})