
function validateInputControl(email){
    const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;
    if (email.match(EMAIL_REG)) {
        $("#email").removeClass("is-invalid");
    } else {//empty email input or invalid email
        $("#email").addClass("is-invalid");
    }

    if(!email.match(EMAIL_REG) ){
        return false;
    }else{
        return true;
    }
}

var dolar = 0;
const userAction = async () => {
    const response = await fetch('https://freecurrencyapi.net/api/v2/latest?apikey=672efd20-4d1f-11ec-8e50-2b20354d3092');
    const myJson = await response.json(); //extract JSON from the http response
    //alert(myJson["data"]["TRY"]);
    dolar = myJson["data"]["TRY"];
    
    // do something with myJson
}

window.onload = function () {
    
    userAction();
    console.log(dolar)
}


function handleClickPayForms(){
    $("#paynext").on("click", function (event){
        console.log("TIKLANDI");
        event.preventDefault();

        let name = $("#name").val();
        let surname = $("#surname").val();
        let identitynumber = $("#identitynumber").val();
        let email = $("#email").val();
        let inputAddress = $("#inputAddress").val();
        let inputAddress2 = $("#inputAddress2").val();
        let country = $("#country").val();
        let inputCity = $("#inputCity").val();
        let inputZip = $("#inputZip").val();
        let phone = $("#phone").val();
        let packageStatus = 2;
        var price = dolar;

        var mont_year = 2;
        var mont_year_other = "Yıllık"

        var pay_button = document.getElementById("paynext").innerHTML;
        // var checkPage = document.getElementById("checkPage");
        // var checkPage_status = checkPage.checked;

        var mesaj;
        var mesaj_other;
        var mesaj_check;
        switch(pay_button){
            case "Next":
                mesaj = "Going to the payment screen";
                mesaj_other = "Enter the information completely and correctly !";
                mesaj_check = "Please accept the contract"
                break;
            case "nächste":
                mesaj = "zum Zahlungsbildschirm gehen";
                mesaj_other = "Geben Sie die Daten vollständig und richtig ein!"
                mesaj_check = "Bitte akzeptiere den Vertrag"
                break;
            case "التالي":
                mesaj = "الذهاب إلى شاشة الدفع";
                mesaj_other = "أدخل المعلومات بشكل كامل وصحيح!";
                mesaj_check = "الرجاء قبول العقد"
                break;
            case "Следующий":
                mesaj = "переход к экрану оплаты";
                mesaj_other = "Введите информацию полностью и правильно!";
                mesaj_check = "Пожалуйста, примите договор"
                break;
            case "ileri":
                mesaj = "Ödemeye geçiliyor";
                mesaj_other = "Bilgileri eksiksiz ve doğru giriniz!";
                mesaj_check = "Sözleşmeyi lütfen kabul edin"
                break;
        }

        let check = validateInputControl(email);
        if(name.length < 3 || surname.length < 2 || identitynumber.length < 5 ||inputAddress.length < 5 || inputCity.length<3 || country.length <3 || inputZip.length < 3 || phone.length < 5){
            alert(mesaj_other);
        }else{
            if(check){
                $.ajax({
                    url: `${window.location.origin}/priceBuy`,
                    method: "POST",
                    data: { name: name, email: email, surname: surname, identitynumber: identitynumber ,inputAddress:inputAddress,inputAddress2:inputAddress2,country:country,inputCity:inputCity,inputZip:inputZip,phone:phone,packageStatus:packageStatus,price:price,dolar:dolar,mont_year:mont_year,mont_year_other:mont_year_other},
                    success: function (data) {
                        console.log("ajax gönderiyor");
                        alert(mesaj);
                        window.location.href = "/priceLookForm";
                        //console.log(data);
                    },
                    error: function (err) {
                        alert(err.responseText);
                        //console.log(err.responseText);
                    }
                })
            }
        }
        

    });
}

$(document).ready(function () {
    handleClickPayForms();
});