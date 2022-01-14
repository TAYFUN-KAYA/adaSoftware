





// function trFlag(){
//     $("#trFlag").on("click", function (event){

//             $.ajax({
//                 url:`${window.location.origin}/homepageTR`,
//                 method:"GET",
//                 data:{},
//                 success:function(data){
//                     console.log('');

//                 },
//                 error:function(err){
//                     alert(err.responseText);
//                 }
//             })


//     })
// }

// function almFlag(){
//     $("#almFlag").on("click", function (event){

//             $.ajax({
//                 url:`${window.location.origin}/homepageALM`,
//                 method:"GET",
//                 data:{},
//                 success:function(data){
//                     console.log('');

//                 },
//                 error:function(err){
//                     alert(err.responseText);
//                 }
//             })


//     })
// }
// function rusFlag(){
//     $("#rusFlag").on("click", function (event){

//             $.ajax({
//                 url:`${window.location.origin}/homepageRUS`,
//                 method:"GET",
//                 data:{},
//                 success:function(data){
//                     console.log('');

//                 },
//                 error:function(err){
//                     alert(err.responseText);
//                 }
//             })


//     })
// }
// function ukFlag(){
//     $("#ukFlag").on("click", function (event){

//             $.ajax({
//                 url:`${window.location.origin}/homepageUK`,
//                 method:"GET",
//                 data:{},
//                 success:function(data){
//                     console.log('');

//                 },
//                 error:function(err){
//                     alert(err.responseText);
//                 }
//             })


//     })
// }

// function arFlag(){
//     $("#arFlag").on("click", function (event){

//             $.ajax({
//                 url:`${window.location.origin}/homepageAR`,
//                 method:"GET",
//                 data:{},
//                 success:function(data){
//                     console.log('');

//                 },
//                 error:function(err){
//                     alert(err.responseText);
//                 }
//             })


//     })
// }


// $(document).ready(function () {
//     trFlag();
//     arFlag();
//     ukFlag();
//     almFlag();
//     rusFlag();
// });

// function logoutClickButton() {
//     $("#logoutbutton").on("click", function (event) {
//         var datas1 = window.location.href;
//         var datas2 = datas1.split('/');
//         var real_url = datas2[3];
//         console.log(real_url);
//         $.ajax({
//             url: `${window.location.origin}/homepageAR`,
//             method: "GET",
//             data: {},
//             success: function (data) {
//                 console.log('');

//             },
//             error: function (err) {
//                 alert(err.responseText);
//             }
//         })
//     })
// }

// $(document).ready(function () {
// logoutClickButton
// //window.location.href = "http://stackoverflow.com";
// });