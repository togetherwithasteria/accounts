

var passwordInput = $('#password-input')[0];
var passwordErrorBox = $('#password-error')[0];
var emailInput = $('#email-input')[0];
var emailErrorBox = $('#email-error')[0];
var usernameInput = $('#username-input')[0];
var usernameErrorBox = $("#username-error")[0];
var captchaErrorBox = $("#captcha-error")[0];
var agreeErrorBox("#agree-error")[0];
var captchaDone = false;
function validateUsername(settings){
	var isError = false;
	
	if(usernameInput.value){
	try {
		if(settings.isSubmit){
  ( async () => {
	let { data } =	await axios.get(`/api/userExist?user=${usernameInput.value}`);
	
	if(data.data.userExisted) throw data;
  })();
		} 
	} catch(data){
		isError = true;
		usernameErrorBox.innerHTML = "A user already exist with that name.";
		
	}
 	} else if(settings.isSubmit) {
 	
 		isError = true;
 		usernameErrorBox.innerHTML = "Please insert a username you want to use";
 	} else {
 		
 	};
 	
 	
 	if(isError){
usernameErrorBox.style.display = 'unset';
 	} else {
 usernameErrorBox.style.display = 'none';
 	}
 	
}

function validatePassword(settings = {}) {
	var passwordRate = passwordStrength.passwordStrength(passwordInput.value);

	var isWrong = false;
	var empty = false;
	if (passwordRate.length < 8) {
		if (passwordRate.length <= 0) {
			empty = true;

			if (settings.isSubmit) {
				passwordErrorBox.innerHTML =
					'Please insert a password you want to use.';

				isWrong = true;
			}
		} else {
			passwordErrorBox.innerHTML = `Your password is ${
				passwordRate.length
			} characters in length. Make it a little bit longer.`;

			isWrong = true;
		}
	}

	if (isWrong && (empty ? (settings.isSubmit)  : true)) {
		passwordErrorBox.style.display = 'unset';
		passwordErrorBox.style.color = 'red';
		return false;
		
	} else if (passwordRate.length >= 8) {
		passwordErrorBox.innerHTML = `Your password strength: ${
			passwordRate.value
		}`;

		passwordErrorBox.style.color = 'black';
		
		if(passwordRate.id === 0){
			passwordErrorBox.style.color = 'red';
		return false;
		}
		
		
		return true;
	} else {
		
		passwordErrorBox.style.display = 'none';
		return true;
	}
}

function regexEmail(email) {
	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return regex.test(email);
}
function validateEmail(settings = {}) {
	if (
		regexEmail(emailInput.value) || ((!emailInput.value ? (!settings.isSubmit) : false) )
	) {
		emailErrorBox.style.display = 'none';
		return true;
	} else {
		emailErrorBox.innerHTML = 'Please insert a valid email address';
		emailErrorBox.style.display = 'unset';

		return false;
	}
}

function validateCaptcha(){
	
	if(hcaptcha.getResponse()){
		
		captchaErrorBox.style.display = 'none';
		return true;
	} else {
		captchaErrorBox.innerHTML = 'Please complete the Captcha';
		captchaErrorBox.style.display = 'unset';
		return false;
	}
	
}




function validateAgreement(){
	
	if()
	
}



function onFormSubmit(e) {
var usernameAllowed = validateUsername({isSubmit: true});
var	 emailAllowed = validateEmail({ isSubmit: true });
var	passwordAllowed = validatePassword({ isSubmit: true });
var captchaAllowed = validateCaptcha();

var allowrd = usernameAllowed && emailAllowed && passwordAllowed && captchaAllowed;


	
	
	if (!allowed) {
		return e.preventDefault();
	}
}

function captchaCallback(){

captchaDone = true;

validateCaptcha();

	
}




$(document).ready(() => {
	$('#signup-box form')[0].addEventListener('submit', onFormSubmit);

	passwordInput.addEventListener('input', validatePassword);
	
	usernameInput.addEventListener('input', validateUsername);

	emailInput.addEventListener('input', validateEmail);
});

const log = document.querySelector('.event-log-contents');

