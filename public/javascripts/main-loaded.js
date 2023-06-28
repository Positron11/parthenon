// apply computed dimensions class function
Array.from(document.getElementsByClassName("uCalcDimensions")).forEach(function(element) {
	calcDimensions(element);
});

// compute element dimensions and store in css variable
function calcDimensions(element) {
	// get element dimensions
	element.style.setProperty("--height", `${element.clientHeight}px`)
	element.style.setProperty("--width", `${element.clientWidth}px`)

	// get child element count
	const childContainer = element.querySelector(".uChildContainer") || element;
	element.style.setProperty("--child-count", childContainer.childElementCount);
}