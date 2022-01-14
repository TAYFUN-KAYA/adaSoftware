

function handleLoginBtn(){
    $("#loginBtn").on("click",function(event){
        event.preventDefault();
        let email = $("#email").val();
        let password = $("#password").val();

        $.ajax({
            url:`${window.location.origin}/admin-panel-00810012300321`,
            method:"POST",
            data:{email:email,password:password},
            success:function(data){
                window.location.href="/list-admin-data-12213443566578878998ax0"
            },
            error:function(error){
                alert("Your email or password entered is incorrect. Please try again!");
            }
        })
    })
}


$(document).ready(function(){
    handleLoginBtn();
})