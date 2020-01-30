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
                    window.location.replace("/myexercises")
                }
            })
            .catch(error => {
                console.log(error);
            })
        })
    $("#loginForm").submit(function (event) {
        console.log("Login form triggered.")
        event.preventDefault();
        const inputUsername = ($("#inputUsername")).val();
        const inputPassword = ($("#inputPassword")).val();
        const data = {
            inputUsername: inputUsername.toLowerCase(),
            inputPassword: inputPassword.toLowerCase()
        };
        console.log("form submitted!")
        console.log("fetch incoming!")
        fetch('/login', {
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
                                if (responseJSON.existingUsername == false) { alertMessage = alertMessage.concat("Invalid username.<br>"); }
                                else if (responseJSON.validPassword == false) { alertMessage = alertMessage.concat("Invalid password."); }
                                Swal.fire({
                                    title: "Login unsuccessful",
                                    html: alertMessage,
                                    confirmButtonText: 'Ok'
                                })
                            }
                        )
                }
                if (response.redirected) {
                    console.log(response);
                    let targetUrl = response.url.replace("http","https");
                    console.log(targetUrl);
                    window.location = targetUrl
                }
            })
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
