



function handleLoginBtn(){
    $("#trFlag").on("click",function(event){
        event.preventDefault();
        
        console.log("trClik");

    })
}


$(document).ready(function(){
    handleLoginBtn();
})