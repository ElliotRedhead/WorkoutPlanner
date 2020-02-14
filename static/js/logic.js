/**
 * Once DOM creation is complete the contained functions are called if
 * their triggering form is submitted.
 */
$(document).ready(function () {
	$("#registerForm").submit(function () {
		registerFormHandling();
	});
	$("#loginForm").submit(function () {
		loginFormHandling();
	});
	$("#createExerciseForm").submit(function () {
		event.preventDefault();
		fetch("/createexercise", fetchParameterInit(createExerciseObject())).then(
			displayModal("Exercise created", undefined, true)
		);
	});
	$("#editExerciseForm").submit(function () {
		event.preventDefault();
		fetch(
			window.location.href,
			fetchParameterInit(createExerciseObject())
		).then(displayModal("Exercise created", undefined, true));
	});
	$("#manage-follow-toggle").click(manageFollowToggle)
})

/**
 * Checks the state of the toggle switch, if toggled the appropriate label is attached.
 */
function manageFollowToggle(){
	const toggleState = ($("#manage-follow-toggle")[0].checked);
	const toggleLabel = $("label[for='manage-follow-toggle']");
	toggleState ? toggleLabel.text("Add User") : toggleLabel.text("Remove User")
}

/**
 * Retrieves form values, standardises text into required formats.
 * @param {boolean} emailInputRequired - Determines if email value is retrieved.
 * @return {object} Form values, dictated by user input.
 */
function getInputData(emailInputRequired = false) {
	const inputData = {
		inputUsername: $("#inputUsername")
			.val()
			.toLowerCase(),
		inputPassword: $("#inputPassword").val()
	};
	if (emailInputRequired) {
		inputData["inputEmail"] = $("#inputEmail")
			.val()
			.toLowerCase();
	}
	return inputData;
}

/**
 * The fields from the registration form are added to an object, if the field's
 * case is not required it is set to lowercase for standardisation.
 * A fetch request is formed containing the submitted data for verification.
 * If submitted credentials are valid: user is redirected to their exercise list.
 * If credentials aren't valid: the invalid input is isolated and passed to a
 * modal that states the failed input to the user.
 */
function registerFormHandling() {
	event.preventDefault();
	const inputData = getInputData(true);
	fetch("/register", fetchParameterInit(inputData))
		.then(response => {
			responseToModal(response, inputData, "register");
		})
		.catch(error => {
			console.log(error);
		});
}

/**
 * Sets string "cutting" position based on whether submission is login or register.
 * Displays invalid key to user in a modal.
 * @param {object} resultJson The invalid input's key.
 * @param {string} responseHandlingType States whether info handled is login or register.
 */
function invalidResponseHandling(resultJson, responseHandlingType) {
	let isolationNumber = undefined;
	responseHandlingType == "register"
		? (isolationNumber = 3)
		: (isolationNumber = 5);
	const invalidInput = authBooleanCheck(resultJson, isolationNumber);
	if (responseHandlingType == "register") {
		let alertMessage = "";
		Object.keys(invalidInput).forEach(key => {
			alertMessage = alertMessage + `${invalidInput[key]} already exists.</br>`;
		});
		displayModal("Registration unsuccessful", alertMessage, false);
	} else if (responseHandlingType == "login") {
		if (invalidInput.length > 0) {
			displayModal("Login unsuccessful", `Invalid ${invalidInput}`);
		}
	}
}

/**
 * Submitted form data is added to an object, if the field's case is
 * not required it is set to lowercase for standardisation.
 * A fetch request is formed containing the submitted data for verification.
 * If submitted credentials are valid: user is redirected to their exercise list.
 * If credentials aren't valid: the invalid input is isolated and passed to a
 * modal that states the failed input to the user.
 * @param {object} inputData - Object created from submitted form data.
 */
function loginFormHandling(inputData) {
	event.preventDefault();
	inputData = getInputData();
	fetch("/login", fetchParameterInit(inputData))
		.then(response => {
			responseToModal(response, inputData, "login");
		})
		.catch(error => {
			console.log(error);
		});
}

/**
 * Takes the database response and converts to JSON.
 * Calls the appropriate modal dependent on route and success.
 * @param {promise} fetchResult Validity of user submission & auth approval.
 * @param {object} inputData User input from auth form.
 * @param {string} responseHandlingType States whether info handled is login or register.
 */
function responseToModal(fetchResult, inputData, responseHandlingType) {
	fetchResult.json().then(resultJson => {
		switch (responseHandlingType) {
		case "register":
			if (resultJson["authApproved"]) {
				displayModal(
					"Registration successful",
					`Welcome ${inputData.inputUsername}!`,
					"Global Exercises"
				);
			} else {
				invalidResponseHandling(resultJson, "register");
			}
			break;
		case "login":
			if (resultJson["authApproved"])
				displayModal(
					"Login successful",
					`Welcome back ${inputData.inputUsername}!`,
					"Global Exercises",
					true,
					"My Exercises"
				);
			else {
				invalidResponseHandling(resultJson, "login");
			}
			break;
		}
	});
}

/**
 * Submitted form data is placed into body of fetch parameters.
 * The fetch parameters provide detail of the request options.
 * These request options are constant for all requests made in this project.
 * @param {object} inputData - Object created from submitted form data.
 * @returns {object} Defines settings for the fetch method.
 */
function fetchParameterInit(inputData) {
	const fetchParameters = {
		method: "POST",
		cors: "*same-origin",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(inputData)
	};
	return fetchParameters;
}

/**
 * Receives invalid inputs, removes start of the string and turns to lowercase.
 * e.g. invalidPassword => Password => password
 * Result is pushed to an array and final array is returned.
 * @param {object} responseJSON - Response from backend, failed input strings.
 * @param {integer} isolationNumber - Number of letters to remove from string.
 * @returns {array} Invalid component keys.
 */
function authBooleanCheck(responseJSON, isolationNumber) {
	const invalidKeys = [];
	Object.keys(responseJSON).forEach(key => {
		if (!responseJSON[key]) {
			invalidKeys.push(key.substr(isolationNumber).toLowerCase());
		}
	});
	return invalidKeys;
}

/**
 * Uses jQuery to capture value of input data for workout spec.
 * Each value is converted to lowercase for standardised database data.
 * @returns {object} Each exercise form input standardised in object.
 */
function createExerciseObject() {
	const inputData = {};
	$("input").each(function () {
		inputData[this.id.toLowerCase()] = this.value.toLowerCase();
	});
	return inputData;
}

/**
 * Displays modal with customised content based on passed arguments.
 * If page redirect true: user is redirected to their exercise list.
 * @param {string} modalTitle The header text displayed in the modal.
 * @param {string} modalText The body text displayed in the modal.
 * @param {string} confirmButtonTextString Text to be displayed in left button.
 * @param {boolean} showCancelButton Used as toggle for right button display.
 * @param {string} cancelButtonTextString Text to be displayed in right button.
 */
function displayModal(
	modalTitle,
	modalText = "",
	confirmButtonTextString = "Ok",
	showCancelButton,
	cancelButtonTextString = ""
) {
	Swal.fire({
		title: modalTitle,
		html: modalText,
		confirmButtonText: confirmButtonTextString,
		showCancelButton: showCancelButton,
		cancelButtonText: cancelButtonTextString
	}).then(result => {
		if (result.value) {
			window.location.replace("/globalexercises");
		} else if (result.dismiss) {
			window.location.replace("/myexercises");
		}
	});
}
