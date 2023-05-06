// computed dimensions class function
Array.from(document.getElementsByClassName("uCalcDimensions")).forEach(function(element) {
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
});