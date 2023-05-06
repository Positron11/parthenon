// toggle comment action form
function toggleCommentForm(button, action) {
	// get comment element and assess state
	const comment = button.closest(".Comment");
	const already_active = comment.classList.contains(`s${action}Mode`);
	
	// reset all comments and toggle current comment
	resetComments();
	if (!already_active) { comment.classList.toggle(`s${action}Mode`); };

	// autosize and focus input
	const input = comment.querySelector(`.${action.toLowerCase()}Form textarea`);
	input.selectionStart = input.selectionEnd = input.value.length;
	autosize.update(input);
	input.focus();
}

// hide all comment forms
function resetComments() {
	Array.from(document.getElementsByClassName("Comment")).forEach(element => {
		element.classList.remove("sReplyMode", "sEditMode");
	});
}