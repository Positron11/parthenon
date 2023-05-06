// prevent form double submission on multiple submit button clicks
document.addEventListener("submit", function(e) {
	e.target.submit(function() { return false; })
	e.target.querySelector("button[type='submit']").disabled = true; 
}, true);