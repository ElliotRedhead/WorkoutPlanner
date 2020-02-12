/**
* Once DOM creation is complete the contained functions are called if
* their triggering form is submitted.
*/
$(document).ready(function () {
    $("#registerForm").submit(function () {
        registerFormHandling()
    })
    $("#loginForm").submit(function () {
        loginFormHandling()
    })
    $("#createExerciseForm").submit(function () {
        event.preventDefault()
        fetch("/createexercise", fetchParameterInit(createExerciseObject()))
            .then(
                displayModal("Exercise created", undefined, true)
            )
    })
    $("#editExerciseForm").submit(function () {
        event.preventDefault()

        fetch(window.location.href, fetchParameterInit(createExerciseObject()))
            .then(
                displayModal("Exercise created", undefined, true)
            )
    }
    )
})
/**
* The fields from the registration form are added to an object, if the field's
* case is not required it is set to lowercase for standardisation.
* A fetch request is formed containing the submitted data for verification.
* If submitted credentials are valid: user is redirected to their exercise list.
* If credentials aren't valid: the invalid input is isolated and passed to a 
* modal that states the failed input to the user.
*/
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
                        const invalidInput = authBooleanCheck(responseJSON, 3)
                        let alertMessage = "";
                        Object.keys(invalidInput).forEach((key => {
                            alertMessage = alertMessage + `${invalidInput[key]} already exists.</br>`
                        }))
                        if (invalidInput.length > 0) {
                            displayModal("Registration unsuccessful", alertMessage, false)
                        }
                    }
                )
                .catch(error => {
                    console.log(error)
                })
        })
}
/**
* Submitted form data is added to an object, if the field's case is 
* not required it is set to lowercase for standardisation.
* A fetch request is formed containing the submitted data for verification.
* If submitted credentials are valid: user is redirected to their exercise list.
* If credentials aren't valid: the invalid input is isolated and passed to a 
* modal that states the failed input to the user.
 */
function loginFormHandling() {
    event.preventDefault()
    const inputData = {
        inputUsername: ($("#inputUsername")).val().toLowerCase(),
        inputPassword: ($("#inputPassword")).val()
    }
    fetch('/login', fetchParameterInit(inputData))
        .then(response => {
            response.json()
                .then(
                    responseJSON => {
                        if (responseJSON.hasOwnProperty("url")) {
                            window.location.replace(responseJSON.url)
                        }
                        const invalidInput = authBooleanCheck(responseJSON, 5)
                        if (invalidInput.length > 0) {
                            displayModal("Login unsuccessful", `Invalid ${invalidInput}`, false)
                        }
                    })
        }
        )
        .catch(error => {
            console.log(error)
        })
}
/**
 * Submitted form data is placed into body of fetch parameters.
 * The fetch parameters provide detail of the request options.
 * These request options are constant for all requests made in this project.
 * @param {object} inputData - Object created from submitted form data.
 */
function fetchParameterInit(inputData) {
    const fetchParameters = {
        method: 'POST',
        cors: '*same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputData)
    }
    return fetchParameters
}
/**
 * Receives invalid inputs, removes start of the string and turns to lowercase.
 * e.g. invalidPassword => Password => password
 * Result is pushed to an array and final array is returned.
 * @param {object} responseJSON - Response from backend, failed input strings.
 * @param {integer} isolationNumber - Number of letters to remove from string.
 */
function authBooleanCheck(responseJSON, isolationNumber) {
    invalidKeys = []
    Object.keys(responseJSON).forEach((key) => {
        if (!responseJSON[key]) {
            invalidKeys.push((key.substr(isolationNumber)).toLowerCase())
        }
    })
    return invalidKeys
}
/**
 * Uses jQuery to capture value of input data for workout spec.
 * Each value converted to lowercase for standardised database data.
 */
function createExerciseObject() {
    const inputData = {};
    ($("input").each(function () {
        inputData[this.id.toLowerCase()] = this.value.toLowerCase()
    }))
    return inputData
}
/**
 * Displays modal with customised content based on passed arguments.
 * If page redirect true: user is redirected to their exercise list.
 * @param {string} modalTitle The header text displayed in the modal.
 * @param {string} modalText The body text displayed in the modal.
 * @param {boolean} pageRedirect Determines if window redirect occurs.
 */
function displayModal(modalTitle, modalText = "", pageRedirect = false) {
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

