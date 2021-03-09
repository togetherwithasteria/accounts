var passwordInput = document.getElementById("password-input");
var passwordErrorBox = document.getElementById('password-error');
var emailInput =  document.getElementById("email-input");
var emailErrorBox = document.getElementById("email-error");


passwordInput.oninput = function(settings = {}){
      var passwordRate = passwordStrength.passwordStrength(passwordInput.value);
      
      var isWrong = false;
      var empty = false;
      	if(passwordRate.length < 8) {
      		if(passwordRate.length <= 0){
      			empty = true;
      			
      		} else {
      		passwordErrorBox.innerHTML = `Your password is ${passwordRate.length} characters in length. Make it a little bit longer.`;
      		}
      		isWrong = true;
      	} 
      	
      	if(isWrong && ((settings.isSubmit && settings.isSubmit === true)? true : !empty)){
    	passwordErrorBox.style.display = "unset";
      		passwordErrorBox.style.color = "red";
      	} else if(passwordRate.length >= 8){
      	        passwordErrorBox.innerHTML = `Your password strength: ${passwordRate.value}`;
      	        passwordErrorBox.style.color = "black";
      	} else {
      		passwordErrorBox.style.display = "none";
      	}
}

function validateEmail(email){
	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
return	regex.test(email);
}

emailInput.oninput = function(settings = {}){
	if(validateEmail(emailInput.value) || ((settings.isSubmit && settings.isSubmit === true)? false : !emailInput.value)){
		emailErrorBox.style.display = "none";
	} else {
		console.log(emailInput.value.length)
		emailErrorBox.innerHTML = "Please insert a valid email address";
		emailErrorBox.style.display = "unset";
	}
	
	
}