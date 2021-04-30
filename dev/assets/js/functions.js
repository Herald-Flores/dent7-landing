var breakpoint;

// Get the current breakpoint
var getBreakpoint = function () {
	return window.getComputedStyle(document.body, ':before').content.replace(/\"/g, '');
};

// Calculate breakpoint on page load
breakpoint = getBreakpoint();

// Recalculate breakpoint on resize
window.addEventListener('resize', function () {
	breakpoint = getBreakpoint();
}, false);

if (breakpoint === 'lg' || breakpoint === 'xl') {
	console.log('lg, xl');
} else {
    console.log('sm , md');
}


(function() {
	'use strict';
	window.addEventListener('load', function() {
	  	// Fetch all the forms we want to apply custom Bootstrap validation styles to
		var forms = document.getElementsByClassName('needs-validation');
		// Loop over them and prevent submission
		var validation = Array.prototype.filter.call(forms, function(form) {
			form.addEventListener('submit', function(event) {
			if (form.checkValidity() === false) {
				event.preventDefault();
				event.stopPropagation();
			}
			form.classList.add('was-validated');
			}, false);
		});
	}, false);
})();