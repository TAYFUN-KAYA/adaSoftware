

var btnSelam = document.getElementById("priceStat");
btnSelam.onclick = function () {
    var phpScriptPath = "path/to/your/php/script.php";
    var argsString = "value1,value2,value3";
    runner.exec("php " + phpScriptPath + " " + argsString, function (err, phpResponse, stderr) {
        if (err) console.log(err); /* log error */
        console.log(phpResponse);
    });
}