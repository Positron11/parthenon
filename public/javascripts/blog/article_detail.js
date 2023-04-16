// toggle comment action form
function toggleCommentForm(button, action) {
	// get comment element and assess state
	const comment = button.closest(".comment-wrapper");
	const already_active = comment.classList.contains(`${action}-mode`);
	
	// reset all comments and toggle current comment
	resetComments();
	if (!already_active) { comment.classList.toggle(`${action}-mode`); };

	// autosize and focus input
	const input = comment.querySelector(`.${action}-form textarea`);
	input.selectionStart = input.selectionEnd = input.value.length;
	autosize.update(input);
	input.focus();
}

// hide all comment forms
function resetComments() {
	Array.from(document.getElementsByClassName("comment-wrapper")).forEach(element => {
		element.classList.remove("reply-mode", "edit-mode");
	});
}