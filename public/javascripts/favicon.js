// initialize favicon
document.querySelector("link[rel~='icon']").href = `/images/site/favicon-${window.matchMedia('(prefers-color-scheme: dark)').matches ? "light" : "dark"}.svg`;

// on change dark mode preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => { 
	document.querySelector("link[rel~='icon']").href = `/images/site/favicon-${event.matches ? "light" : "dark"}.svg`; 
});