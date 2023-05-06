const submitButton = document.getElementById("articleDeleteFormSubmit");
const titleInput = document.getElementById("articleDeleteFormValidator");

// initialize submit button
submitButton.disabled = true;

// check if pattern matched
titleInput.addEventListener("input", function() {
	submitButton.disabled = !(this.value === this.pattern);
})