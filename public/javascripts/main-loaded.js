// apply computed dimensions class function
Array.from(document.getElementsByClassName("uCalcDimensions")).forEach(function(element) {
	calcDimensions(element);
});

// blur overflow box event handler
Array.from(document.querySelectorAll(".BlurOverflowScrollbox")).forEach(function(element) {
	blurOverflowBox(element);
	element.addEventListener("scroll", () => { blurOverflowBox(element) });
	new ResizeObserver(() => { blurOverflowBox(element) }).observe(element);
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

// handle blur overflow elements
function blurOverflowBox(element) {
	element.classList.toggle("sScrollLeft", element.scrollLeft > 5);
	element.classList.toggle("sScrollRight", (element.scrollWidth - 5) - element.scrollLeft > element.clientWidth);
}

// copy text to clipboard
function copyToClipboard(text) {
	// create dummy textarea and add required text
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    
    // select text and copy
    dummy.select();
    document.execCommand("copy");
    
    // remove dummy textarea
	document.body.removeChild(dummy);
}