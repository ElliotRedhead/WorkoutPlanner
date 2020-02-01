function fetchParameterInit(inputData) { 
    let fetchParameters = {
        method: 'POST',
        cors: '*same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(inputData)
    }
        return fetchParameters;
}

function displayModal(modalTitle, modalText = ""){
    Swal.fire({
        title: modalTitle,
        text: modalText,
        confirmButtonText: "Ok"
    })
}

$(document).ready(function () {
    $("#registerForm").submit(function (event) {
        event.preventDefault();
        const inputData = {
            inputUsername: ($("#inputUsername")).val().toLowerCase(),
            inputEmail: ($("#inputEmail")).val().toLowerCase(),
            inputPassword: ($("#inputPassword")).val()
        };
        fetch('/register', fetchParameterInit(inputData))
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
        inputData = {
            inputUsername: ($("#inputUsername")).val().toLowerCase(),
            inputPassword: ($("#inputPassword")).val().toLowerCase()
        };
        fetch('/login', fetchParameterInit(inputData))
            .then(response => {
                response.json()
                    .then(
                        responseJSON => {
                            if (responseJSON.hasOwnProperty("url")) {
                                window.location.replace(responseJSON.url);
                            }
                            if (responseJSON.existingUsername == false) { alertMessage = ("Invalid username."); }
                            if (responseJSON.validPassword == false) { alertMessage = ("Invalid password."); }
                            if (responseJSON.existingUsername == false || responseJSON.validPassword == false) {
                                displayModal("Login unsuccessful", alertMessage)
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
        let inputData = {};
        ($("input").each(function () {
            inputData[this.id.toLowerCase()] = this.value.toLowerCase();
        }));
        // Modal required as feedback when creation is complete.
        fetch("/createexercise", fetchParameterInit(inputData))})
    $("#editExerciseForm").submit(function (event) {
        event.preventDefault();
        let inputData = {};
        ($("input").each(function () {
            inputData[this.id.toLowerCase()] = this.value.toLowerCase();
        }));
        fetch(window.location.href, fetchParameterInit(inputData))
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
