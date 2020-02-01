$(document).ready(function () {
    $("#registerForm").submit(function (event) {
        event.preventDefault();
        let inputUsername = ($("#inputUsername")).val();
        let inputPassword = ($("#inputPassword")).val();
        let inputEmail = ($("#inputEmail")).val();
        const data = {
            inputUsername: inputUsername.toLowerCase(),
            inputEmail: inputEmail.toLowerCase(),
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
                response.json()
                    .then(
                        responseJSON => {
                            console.log(responseJSON)
                            if (responseJSON.hasOwnProperty("url")) {
                                window.location.replace(responseJSON.url);
                            }
                            let alertMessage = "";
                            if (responseJSON.newUsername == false) { alertMessage = alertMessage.concat("Username already exists.<br>"); }
                            if (responseJSON.newEmail == false) { alertMessage = alertMessage.concat("Email address already registered."); }
                            if (responseJSON.newUsername == false || responseJSON.newEmail == false) {
                                Swal.fire({
                                    title: "Registration unsuccessful",
                                    html: alertMessage,
                                    confirmButtonText: 'Ok'
                                })
                            }
                        }
                    )
                    .catch(error => {
                        console.log(error);
                    })
            })
    })
    $("#loginForm").submit(function (event) {
        event.preventDefault();
        const inputUsername = ($("#inputUsername")).val();
        const inputPassword = ($("#inputPassword")).val();
        const data = {
            inputUsername: inputUsername.toLowerCase(),
            inputPassword: inputPassword.toLowerCase()
        };
        fetch('/login', {
            method: 'POST',
            cors: '*same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                response.json()
                    .then(
                        responseJSON => {
                            if (responseJSON.hasOwnProperty("url")) {
                                window.location.replace(responseJSON.url);
                            }
                            let alertMessage = "";
                            if (responseJSON.existingUsername == false) { alertMessage = alertMessage.concat("Invalid username.<br>"); }
                            else if (responseJSON.validPassword == false) { alertMessage = alertMessage.concat("Invalid password."); }
                            if (responseJSON.existingUsername == false || responseJSON.validPassword == false) {
                                Swal.fire({
                                    title: "Login unsuccessful",
                                    html: alertMessage,
                                    confirmButtonText: 'Ok'
                                })
                            }
                        })
            }
            )
            .catch(error => {
                console.log(error);
            })
    })
    $("#createExerciseForm").submit(function (event) {
        event.preventDefault();
        let data = {};
        ($("input").each(function () {
            data[this.id.toLowerCase()] = this.value.toLowerCase();
        }));
        // This section is uses repeated components, avoid duplication by isolating from each function.
        // Modal required as feedback when creation is complete.
        fetch("/createexercise", {
            method: 'POST',
            cors: '*same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }
    )
    $("#editExerciseForm").submit(function (event) {
        event.preventDefault();
        let data = {};
        ($("input").each(function () {
            data[this.id.toLowerCase()] = this.value.toLowerCase();
        }));
        fetch(window.location.href, {
            method: 'POST',
            cors: '*same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(
                Swal.fire({
                    title: "Exercise created",
                    confirmButtonText: "Ok"
                }).then(function () {
                    window.location.replace("/myexercises");
                })
            )
    }
    )
})
