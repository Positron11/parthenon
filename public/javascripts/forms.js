// initialize submit buttons that require pattern match
Array.from(document.querySelectorAll(".jPatternMatchRequired")).forEach(function(element) {	element.disabled = true; });

// form submission confirmation
Array.from(document.querySelectorAll(".jPatternInput")).forEach(function(element) {
	element.addEventListener("input", function() { 
		document.getElementById(element.dataset.for).disabled = !(element.value === element.pattern); 
	});
});

// prevent form double submission on multiple submit button clicks
document.addEventListener("submit", function(e) {
	e.target.submit(function() { return false; })
	e.target.querySelector("button[type='submit']").disabled = true; 
}, true);