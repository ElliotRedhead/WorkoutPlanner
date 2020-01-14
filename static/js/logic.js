$(document).ready(function () {
    $("#registerForm").submit(function (event) {
        event.preventDefault();
        const inputUsername = ($("#inputUsername")).val();
        const inputPassword = ($("#inputPassword")).val();
        const inputEmail = ($("#inputEmail")).val();
        const data = {
            inputUsername: inputUsername,
            inputEmail: inputEmail,
            inputPassword: inputPassword
        };
        fetch('/register', {
            method: 'POST',
            cors: '*same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.redirected == false) {
                    response.json()
                        .then(
                            responseJSON => {
                                let alertMessage = "";
                                if (responseJSON.newUsername == false) { alertMessage = alertMessage.concat("Username already exists.<br>"); }
                                if (responseJSON.newEmail == false) { alertMessage = alertMessage.concat("Email address already registered."); }
                                Swal.fire({
                                    title: "Registration unsuccessful",
                                    html: alertMessage,
                                    confirmButtonText: 'Ok'
                                })
                            }
                        )
                }
                if (response.redirected) {
                    window.location.href = response.url
                }
            })
            .catch(error => {
                console.log(error);
            })
    })
    $("#loginForm").submit(function (event) {
        event.preventDefault();
        const inputUsername = ($("#inputUsername")).val();
        const inputPassword = ($("#inputPassword")).val();
        const data = {
            inputUsername: inputUsername,
            inputPassword: inputPassword
        };
        fetch('/register', {
            method: 'POST',
            cors: '*same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.redirected == false) {
                    response.json()
                        .then(
                            responseJSON => {
                                let alertMessage = "";
                                if (responseJSON.newUsername == false) { alertMessage = alertMessage.concat("Username already exists.<br>"); }
                                if (responseJSON.newEmail == false) { alertMessage = alertMessage.concat("Email address already registered."); }
                                Swal.fire({
                                    title: "Registration unsuccessful",
                                    html: alertMessage,
                                    confirmButtonText: 'Ok'
                                })
                            }
                        )
                }
                if (response.redirected) {
                    window.location.href = response.url
                }
            })
            .catch(error => {
                console.log(error);
            })
    })
})