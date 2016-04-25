// Default Active Menu Item
var current_item = 0;

// Timers
var section_hide_time = 500;
var section_show_time = 500;

jQuery(document).ready(function($) {

    // Switch section
    $("a", '.mainmenu, #circle-wrap').click(function() {
        if (!$(this).hasClass('active')) {
            current_item = this;
            // Close all visible divs with the class of .section
            $('.section:visible').fadeOut(section_hide_time, function() {
                $('a', '.mainmenu, #circle-wrap').removeClass('active');
                if ($(current_item).hasClass("circle-btn"))
                    $("#navmywall").addClass('active');
                $(current_item).addClass('active');
                var new_section = $($(current_item).attr('href'));
                new_section.fadeIn(section_show_time);
            });
        }
        return false;
    });
});
