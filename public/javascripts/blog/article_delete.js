const submitButton = document.getElementById("form_submit_button");
const titleInput = document.getElementById("form_title_field");

// initialize submit button
submitButton.disabled = true;

// check if pattern matched
titleInput.addEventListener("input", function() {
	submitButton.disabled = !(this.value === this.pattern);
})