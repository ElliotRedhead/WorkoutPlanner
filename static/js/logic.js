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
			displayModal("Exercise created", undefined, "Ok", "/myexercises")
		);
	});
	$("#editExerciseForm").submit(function () {
		event.preventDefault();
		fetch(
			window.location.href,
			fetchParameterInit(createExerciseObject())
		).then(displayModal("Exercise created", undefined, "Ok", "/myexercises"));
	});
	if ((window.location.pathname).includes("following")){
		followToggleWidth()
		manageFollowToggle()
		getFollowedUsers()
	}
	$("#manage-follow-toggle").change(manageFollowToggle);
	hideBurgerIcon();
})

/**
 * Hides the navigation burger icon if no links present.
 */
function hideBurgerIcon() {
	const navListItemNumber = $(".navbar-nav li").length;
	if (navListItemNumber < 1){
		$(".navbar-toggler").hide();
	} 
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
					"Global Exercises",
					"/globalexercises",
					true,
					"My Exercises",
					"/myexercises"
				);
			} else {
				invalidResponseHandling(resultJson, "register");
			}
			break;
		case "login":
			if (resultJson["authApproved"]){
				displayModal(
					"Login successful",
					`Welcome back ${inputData.inputUsername}!`,
					"Global Exercises",
					"/globalexercises",
					true,
					"My Exercises",
					"/myexercises"
				);}
			else {
				invalidResponseHandling(resultJson, "login");
			}
			break;
		case "addFollow":
			if (resultJson["followExisting"]){
				displayModal(
					"User already followed",
					`${inputData["addFollowUsername"]} already in follow list.`,
					"Ok",
					"/following"
				)}
			else {
				displayModal(
					"User Added",
					`${inputData["addFollowUsername"]} added to followed list.`,
					"Ok",
					"/following"
				)
			}
			break;
		case "removeFollow":
			displayModal(
				"User Removed",
				`${inputData["removeFollowUsername"]} removed from follow list.`,
				"Ok",
				"/following"
			)
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
		displayModal("Registration unsuccessful", alertMessage, "Ok", "/register");
	} else if (responseHandlingType == "login") {
		if (invalidInput.length > 0) {
			displayModal("Login unsuccessful", `Invalid ${invalidInput}`, "Ok", "/login");
		}
	}
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
 * Displays modal with customised content based on arguments passed.
 * Rediect locations also dictated by arguments passed.
 * @param {string} modalTitle The header text displayed in the modal.
 * @param {string} modalText The body text displayed in the modal.
 * @param {string} confirmButtonTextString Text to be displayed in left button.
 * @param {string} confirmRedirect Window location to redirect to on left button click.
 * @param {boolean} showCancelButton Used as toggle for right button display.
 * @param {string} cancelButtonTextString Text to be displayed in right button.
 * @param {string} cancelRedirect Window location to redirect to on right button click.
 */
function displayModal(
	modalTitle,
	modalText = "",
	confirmButtonTextString = "",
	confirmRedirect,
	showCancelButton,
	cancelButtonTextString = "",
	cancelRedirect
) {
	Swal.fire({
		title: modalTitle,
		html: modalText,
		confirmButtonText: confirmButtonTextString,
		showCancelButton: showCancelButton,
		cancelButtonText: cancelButtonTextString
	}).then(result => {
		if (result.value) {
			window.location.replace(confirmRedirect);
		} else if (result.dismiss) {
			window.location.replace(cancelRedirect);
		}
	});
}

/**
 * Fetches list of followed users, sorts alphabetically and displays in dropdown.
 */
function getFollowedUsers(){
	const inputData = "followedUserRequest"
	fetch("/following",fetchParameterInit(inputData))
		.then(response => {
			response.json()
				.then(
					responseJson => {
						let data = (responseJson.sort((a, b) => (a.name > b.name) ? -1 : 1));
						data.forEach(currentValue => {
							$("#current-follow-dropdown")[0].innerHTML +=
							`<option>${currentValue}</option>`
						})
					}
				)
		})}

$("#remove-follow-submit").click(function() {
	followedUserManagement("remove", "#current-follow-dropdown")
})

$("#add-follow-submit").click(function() {
	followedUserManagement("add", "#add-follow-input")
})

/**
 * Retrieves input based on operation type then runs associated fetch & modal.
 * @param {string} operationType States if function is to add or remove user.
 * @param {string} userInputElement Defines element to retrieve user input.
 */
function followedUserManagement(operationType, userInputElement){
	const inputData = {}
	const inputFollowUsername = $(`${userInputElement}`)[0].value.toLowerCase()
	inputData[`${operationType}FollowUsername`]= inputFollowUsername
	fetch("/following", fetchParameterInit(inputData))
		.then(response => {
			responseToModal(response, inputData, `${operationType}Follow`)
		})
}

/**
 * Checks the state of the toggle switch.
 * Upon toggling: the input option available to the user is modified. 
 */
function manageFollowToggle(){
	const toggleState = ($("#manage-follow-toggle")[0].checked)
	if(toggleState){
		$("#remove-follow-partition").hide()
		$("#add-follow-partition").show()
	} else {
		$("#remove-follow-partition").show()
		$("#add-follow-partition").hide()
	}
}

/**
 * Adjusts width and padding of Bootstrap in-built classes used in "follow" toggle.
 */
function followToggleWidth() {
	($(".custom-control").css("padding-left",0));
	($(".toggle").width("100%"));
	($(".toggle").css("padding-left",0))
}
