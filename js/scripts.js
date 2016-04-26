// Render Google reCaptcha
var recaptcha1;
var recaptcha2;
var recaptcha3;
var onloadCallback = function() {
    // Render the recaptcha1 on the element with ID "recaptcha1"
    recaptcha1 = grecaptcha.render('recaptcha1', {
        'sitekey': '6LciMB4TAAAAACRFghDmLuY4esS0kG6W0va6M9B0',
        'theme': 'dark'
    });

    // Render the recaptcha2 on the element with ID "recaptcha2"
    recaptcha2 = grecaptcha.render('recaptcha2', {
        'sitekey': '6LciMB4TAAAAACRFghDmLuY4esS0kG6W0va6M9B0',
        'theme': 'light'
    });

    // Render the recaptcha3 on the element with ID "recaptcha3"
    recaptcha3 = grecaptcha.render('recaptcha3', {
        'sitekey': '6LciMB4TAAAAACRFghDmLuY4esS0kG6W0va6M9B0',
        'theme': 'light'
    });
};

// Execute when document is ready
$(function() {
    // Modal Window Variables
    var $formLost = $('#lost-form');
    var $formRegister = $('#register-form');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;

    $("form").submit(function() {
        switch (this.id) {
            case "lost-form":
                var $ls_email = $('#lost_email').val();
                // Place holder validation
                if ($ls_email == "ERROR") {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
                } else {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Password Reset & Sent!");
                    // Insert AJAX...
                }
                return false;
                break;
            case "register-form":
                var $rg_username = $('#register_username').val();
                var $rg_email = $('#register_email').val();
                var $rg_password = $('#register_password').val();
                // Place holder validation
                if ($rg_username == "ERROR") {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
                } else {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Registered!");
                    // Insert AJAX...
                }
                return false;
                break;
            default:
                return false;
        }
        return false;
    });

    $('#lost_register_btn').click(function() { modalAnimate($formLost, $formRegister); });
    $('#register_lost_btn').click(function() { modalAnimate($formRegister, $formLost); });

    function modalAnimate($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height", $oldH);
        $oldForm.fadeToggle($modalAnimateTime, function() {
            $divForms.animate({ height: $newH }, $modalAnimateTime, function() {
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }

    function msgFade($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function() {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }

    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function() {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
        }, $msgShowTime);
    }

    // Bootstrap 3 Datepicker v4
    $('#datetimepicker1').datetimepicker();
    $('#datetimepicker2').datetimepicker({
        useCurrent: false //Important! See issue #1075
    });
    $("#datetimepicker1").on("dp.change", function(e) {
        $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepicker7").on("dp.change", function(e) {
        $('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
    });

    // Help Popover
    $('#help').popover();

    // Call scrapeRSS with BC OrgSync URL
    $url = "https://api.orgsync.com/api/v3/communities/510/events.rss?key=8mr8ZuXiuuuyQD9j2QRoyKSY_zw6K3Sw_52uGzgpZ-Q&per_page=100&upcoming=true"
    scrapeRSS($url);

    // Parse RSS Data and Insert into DB
    function scrapeRSS($url) {
        var request = $.ajax({
            url: "includes/fetchevents.php",
            type: "POST",
            data: "url=" + $url,
            success: function(data) {
                //console.log(data); // DEBUG
                return true;
            },
            error: function(xhr, status, error) {
                console.log(xhr + " " + status + " " + error); // DEBUG
                return false;
            }
        });
    }
});
