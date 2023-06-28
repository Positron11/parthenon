// initialize site settings
toggleDarkMode(localStorage.getItem("dark-mode") == "true");
toggleNavtrayPinned(localStorage.getItem("navtray-pinned") == "true");

// initialize favicon
document.querySelector("link[rel~='icon']").href = `/images/site/favicon-${window.matchMedia('(prefers-color-scheme: dark)').matches ? "light" : "dark"}.svg`;

// change favicon style on change system dark mode preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => { 
	document.querySelector("link[rel~='icon']").href = `/images/site/favicon-${event.matches ? "light" : "dark"}.svg`; 
});

// toggle dark mode
function toggleDarkMode(state) {
	// set local storage value
	localStorage.setItem("dark-mode", state);
	// temporarily disable all transitions
	document.documentElement.classList.add("sChangingColorScheme");
	// toggle dark mode
	document.documentElement.classList.toggle("sDarkMode", state);
	// force reflow and re-enable transitions
	document.documentElement.offsetHeight;
	document.documentElement.classList.remove("sChangingColorScheme");
}

// toggle navtray pinned state
function toggleNavtrayPinned(state) {
	// set local storage value
	localStorage.setItem("navtray-pinned", state);
	// toggle pinned state
	document.documentElement.classList.toggle("sNavtrayPinned", state);
}