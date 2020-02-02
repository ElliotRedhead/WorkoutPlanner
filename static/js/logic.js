$(document).ready(function () {
    $("#registerForm").submit(function (event) {
        registerFormHandling()
    })
    $("#loginForm").submit(function (event) {
        loginFormHandling()
    })
    $("#createExerciseForm").submit(function (event) {
        event.preventDefault()
        createExerciseObject()
        fetch("/createexercise", fetchParameterInit(inputData))
            .then(
                displayModal("Exercise created", undefined, true)
            )
    })
    $("#editExerciseForm").submit(function (event) {
        event.preventDefault()
        createExerciseObject()
        fetch(window.location.href, fetchParameterInit(inputData))
            .then(
                displayModal("Exercise created", undefined, true)
            )
    }
    )
})

function registerFormHandling() {
    event.preventDefault()
    const inputData = {
        inputUsername: ($("#inputUsername")).val().toLowerCase(),
        inputEmail: ($("#inputEmail")).val().toLowerCase(),
        inputPassword: ($("#inputPassword")).val()
    }
    fetch('/register', fetchParameterInit(inputData))
        .then(response => {
            response.json()
                .then(
                    responseJSON => {
                        if (responseJSON.hasOwnProperty("url")) {
                            window.location.replace(responseJSON.url)
                        }
                        const invalidInput = authBooleanCheck (responseJSON, 3)
                        let alertMessage = "";
                        Object.keys(invalidInput).forEach((key => {
                            alertMessage = alertMessage + `${invalidInput[key]} already exists.</br>`
                        }))
                            displayModal("Registration unsuccessful", alertMessage, false)
                        }
                )
                .catch(error => {
                    console.log(error)
                })
        })
}

function loginFormHandling() {
    event.preventDefault()
    const inputData = {
        inputUsername: ($("#inputUsername")).val().toLowerCase(),
        inputPassword: ($("#inputPassword")).val().toLowerCase()
    }
    fetch('/login', fetchParameterInit(inputData))
        .then(response => {
            response.json()
                .then(
                    responseJSON => {
                        if (responseJSON.hasOwnProperty("url")) {
                            window.location.replace(responseJSON.url)
                        }
                        invalidInput = authBooleanCheck(responseJSON, 5)
                        if (invalidInput.length > 0){
                            displayModal("Login unsuccessful", `Invalid ${invalidInput}`, false)
                        }
                    })
        }
        )
        .catch(error => {
            console.log(error)
        })
}

function fetchParameterInit (inputData) {
    const fetchParameters = {
        method: 'POST',
        cors: '*same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputData)
    }
    return fetchParameters
}

function authBooleanCheck (responseJSON, isolationNumber) {
    invalidKeys = []
    Object.keys(responseJSON).forEach((key) => {
        if (!responseJSON[key]) {
            invalidKeys.push((key.substr(isolationNumber)).toLowerCase())
        }
    })
    return invalidKeys
}

function createExerciseObject(){
    const inputData = {};
    ($("input").each(function () {
        inputData[this.id.toLowerCase()] = this.value.toLowerCase()
    }))
    return inputData
}

function displayModal (modalTitle, modalText = "", pageRedirect = false) {
    Swal.fire({
        title: modalTitle,
        html: modalText,
        confirmButtonText: "Ok"
    })
        .then(function () {
            if (pageRedirect) {
                window.location.replace("/myexercises");
            }
        })
}

