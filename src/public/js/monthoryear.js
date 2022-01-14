document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.querySelector('input[type="checkbox"]');

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      // do this
      document.getElementById("yearly").style.display = 'block';
      document.getElementById("monthly").style.display = 'none';
    } else {
      // do that
      document.getElementById("monthly").style.display = 'block';
      document.getElementById("yearly").style.display = 'none';
    }
  });
});

window.onload = function editCheck(){
  var checkbox = document.querySelector('input[type="checkbox"]');
  if (checkbox.checked) {
    // do this
    document.getElementById("yearly").style.display = 'block';
    document.getElementById("monthly").style.display = 'none';
  } else {
    // do that
    document.getElementById("monthly").style.display = 'block';
    document.getElementById("yearly").style.display = 'none';
  }
}