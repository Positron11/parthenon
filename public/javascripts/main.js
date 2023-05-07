// initialize favicon
document.querySelector("link[rel~='icon']").href = `/images/site/favicon-${window.matchMedia('(prefers-color-scheme: dark)').matches ? "light" : "dark"}.svg`;

// on change dark mode preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => { 
	document.querySelector("link[rel~='icon']").href = `/images/site/favicon-${event.matches ? "light" : "dark"}.svg`; 
});

// computed dimensions class function
Array.from(document.getElementsByClassName("uCalcDimensions")).forEach(function(element) {
	calcDimensions(element);
});

// compute element dimensions and store in css variable
function calcDimensions(element) {
	// get element dimensions
	element.style.setProperty("--height", `${element.clientHeight}px`)
	element.style.setProperty("--width", `${element.clientWidth}px`)

	// get content dimensions
	var childHeightSum = 0;
	var childWidthSum = 0;
	Array.from(element.children).forEach(function(child) {
		childHeightSum += child.clientHeight;
		childWidthSum += child.clientWidth;
	});
	element.style.setProperty("--content-height", `${childHeightSum}px`)
	element.style.setProperty("--content-width", `${childWidthSum}px`)
}