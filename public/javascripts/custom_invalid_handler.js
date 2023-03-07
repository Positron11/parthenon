document.addEventListener("invalid", function(e) {
	e.target.classList.add("invalid");
}, true);

document.addEventListener("input", function(e) {
	e.target.classList.remove("invalid");
}, true);