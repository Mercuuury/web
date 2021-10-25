let mailCheckbox = document.getElementById('send');
let sendCheckbox = document.getElementById('agreement');
let submitButton = document.getElementById('submit');
let email = document.getElementById('email');

mailCheckbox.onchange = function(e) {
    if (mailCheckbox.checked){
        document.querySelector('.e-mail').style.display = 'flex';
        email.required = true;
    } else {
        document.querySelector('.e-mail').style.display = 'none';
        email.required = false;
    }
}

sendCheckbox.onchange = function(e) {
    if (sendCheckbox.checked)
        submitButton.disabled = false;
    else
        submitButton.disabled = true;
}

if (email.value.length > 0) mailCheckbox.click();

