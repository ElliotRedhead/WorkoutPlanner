$(document).ready(function () {
    $("#registerForm").submit(function (event) {
        event.preventDefault();
        const inputUsername = ($("#inputUsername")).val();
        const inputPassword = ($("#inputPassword")).val();
        const inputEmail = ($("inputEmail")).val();
        const data = {
            inputUsername: inputUsername,
            inputEmail: inputEmail,
            inputPassword: inputPassword
        };
        console.log(data);
        fetch('/register', {
            method: 'POST',
            cors: '*same-origin',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(data => {
                console.log(data)
            })
        alert("button");
    })
})