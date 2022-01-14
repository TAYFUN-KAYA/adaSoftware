document.addEventListener('DOMContentLoaded', function () {
    var check_one_state = document.getElementById('checkPageone')
    var check_two_state = document.getElementById('checkPageTwo')

    var next_button = document.getElementById("paynext");
    var one = false;
    var two = false;

    check_one_state.addEventListener('change', function () {
        if (check_one_state.checked) {
            // do this
            one = true;
            if(two){
                next_button.disabled = false;
            }
            


        } else {
            // do that
            one = false;
            next_button.disabled = true;
        }
    }
    );

    check_two_state.addEventListener('change', function () {
        if (check_two_state.checked) {
            two = true;
            if(one){
                next_button.disabled = false;
            }
        } else {
            two = false;
            next_button.disabled = true;
        }
    }
    );
});