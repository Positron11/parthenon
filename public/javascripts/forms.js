document.addEventListener("submit", function(e) {
	e.target.submit(function() { return false; })
	e.target.querySelector("button[type='submit']").disabled = true; 
}, true);

document.addEventListener("invalid", function(e) {
	e.target.classList.add("invalid");
}, true);

document.addEventListener("input", function(e) {
	e.target.classList.remove("invalid");
}, true);