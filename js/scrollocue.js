

(function(window, $) {

	var container = $('#container');
	var cursor = -1;
	var lines = $('h1, p');

	$.easing.easeOutQuad = function(x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	};


	// Set cursor at first line
	function setCursor(index) {
		// Clear old cursor position
		if (lines[cursor]) {
			var old_el = $(lines[cursor]);
			old_el.removeClass('cursor');
		}
		// Update new cursor position
		cursor = (index >= 0) ? ((index < lines.length) ? index: lines.length - 1) : 0;

		if (lines[cursor]) {
			var new_el = $(lines[cursor]);
			new_el.addClass('cursor');
			// Scroll container
			var desired_cursor_top = ($(window).height() - new_el.height()) / 2;
			var target_container_top = container.offset().top - (new_el.offset().top - desired_cursor_top);
			container.stop(true).animate(
				{top: target_container_top},
				{duration: 1500, easing: 'easeOutQuad'}
			);
		}
	}

	setCursor(0);

	function increaseCursor(amount) {
		amount = amount || 1;
		setCursor(cursor + amount);
	}
	function decreaseCursor(amount) {
		amount = amount || 1;
		setCursor(cursor - amount);
	}



	// Key press handling
	function handleKeyDown(event) {
		switch (event.which)
		{
			case 40: // Arrow down
			case 32: // Space
				increaseCursor();
				event.preventDefault();
				break;
			case 38: // Arrow up
				decreaseCursor();
				event.preventDefault();
				break;
			case 49: // "1"
				setCursor(0);
				break;
			case 82: // "r"
				container.css('top', 0);
				break;
			case 74: // "j"
				increaseCursor(10);
				break;
			case 75: // "k"
				decreaseCursor(10);
				break;
			default:
				console.info('Unhandled key down event ' + event.which, event);
				break;
		}
	}

	$(window.document).keydown(handleKeyDown);


})(window, $);

