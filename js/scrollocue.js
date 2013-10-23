

(function(window, $) {

	$.fn.scrollocue = function(options) {

		// Handle given options and default settings.
		var settings = $.extend({
			lineSelector: 'h1, p',
			scrollDuration: 1000,
			scrollEasing: 'easeOutQuad'
		}, options);


		var container = this;
		var cursor = -1;
		var lines = $(settings.lineSelector, container);

		// Set the cursor to the given line.
		function setCursor(index) {
			// Clear old cursor position
			if (lines[cursor]) {
				var oldElement = $(lines[cursor]);
				oldElement.removeClass('cursor');
			}
			// Update new cursor position
			cursor = (index >= 0) ? ((index < lines.length) ? index: lines.length - 1) : 0;

			if (lines[cursor]) {
				var newElement = $(lines[cursor]);
				newElement.addClass('cursor');
				// Scroll container
				var desired_cursor_top = ($(window).height() - newElement.height()) / 2;
				var target_container_top = container.offset().top - (newElement.offset().top - desired_cursor_top);
				container.stop(true).animate(
					{top: target_container_top},
					{duration: settings.scrollDuration, easing: settings.scrollEasing}
				);
			}
		}

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
				case 49: // "1": jump to first.
					setCursor(0);
					break;
				case 82: // "r": quick reset.
					container.css('top', 0);
					setCursor(0);
					break;
				case 74: // "j": jump 10 ahead.
					increaseCursor(10);
					break;
				case 75: // "k": jump 10 back.
					decreaseCursor(10);
					break;
				default:
					if (window.console) {
						window.console.info('Unhandled key down event ' + event.which, event);
					}
					break;
			}
		}


		// Set cursor at first line
		setCursor(0);
		// Set up key press handling.
		$(window.document).keydown(handleKeyDown);
		container.click(function(){
			increaseCursor();
		});

	};


	// Define easeOutQuad easing function if not available yet.
	$.easing.easeOutQuad = $.easing.easeOutQuad || function(x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	};




})(window, $);

