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

// Clear Modal on Close
$('#register-modal').on('hidden.bs.modal', function(e) {
    $(".registererrors").text("");
    $(".losterrors").text("");
    $('#register_username').val("");
    $('#register_email').val("");
    $('#register_password').val("");
    $('#register_verifypassword').val("");
    $('#lost_email').val("");
    grecaptcha.reset(recaptcha3);
    grecaptcha.reset(recaptcha2);
})

// Execute when document is ready
$(function() {
    // Modal Window Variables
    var formLost = $('#lost-form');
    var formRegister = $('#register-form');
    var divForms = $('#div-forms');
    var modalAnimateTime = 300;
    var msgAnimateTime = 150;
    var msgShowTime = 2000;


    $("form").submit(function(e) {
        switch (this.id) {
            case "lost-form":
                var ls_email = $('#lost_email').val();
                var ls_status = "success";

                // Clear any errors
                $(".losterrors").text("");

                var ls_emailerror = validateEmail(ls_email);
                var ls_captchaerror = "";

                verifyCaptcha(recaptcha3).done(function(result) {
                    if (result['status'] == "success") {
                        // Do nothing
                    } else {
                        // console.log("fail");
                        ls_status = "failure";
                        ls_captchaerror = "Captcha Failed.";
                    }
                    // Display Errors
                    if (ls_emailerror != "") {
                        ls_status = "failure";
                        $(".losterrors").append("<li>" + ls_emailerror + "</li>");
                    }
                    if (ls_captchaerror != "") {
                        ls_status = "failure";
                        $(".losterrors").append("<li>" + ls_captchaerror + "</li>");
                    }

                    // Proceed if no failure occured
                    if (ls_status == "failure") {
                        msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error!");
                        divForms.css("height", formLost.height() + 10);
                    }
                    else {
                        msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Registered!");
                        // Insert AJAX...
                    }
                }).fail(function() {
                    // console.log("Error in Captcha - Add Event.");
                });

                grecaptcha.reset(recaptcha3);
                return false;
                break;
            case "register-form":
                var rg_username = $('#register_username').val();
                var rg_email = $('#register_email').val();
                var rg_password = $('#register_password').val();
                var rg_verifypassword = $('#register_verifypassword').val();
                var rg_status = "success";

                // Clear any errors
                $(".registererrors").text("");

                // Form Validation
                var rg_emailerror = validateEmail(rg_email);
                var rg_usernameerror = validateUsername(rg_username);
                var rg_passworderror = validatePassword(rg_password);
                var rg_verifypassworderror = validateVerifyPassword(rg_password, rg_verifypassword);
                var rg_captchaerror = "";

                // Captcha Verification
                verifyCaptcha(recaptcha1).done(function(result) {
                    if (result['status'] == "success") {
                        // Do nothing
                    } else {
                        // console.log("fail");
                        rg_status = "failure";
                        rg_captchaerror = "Captcha Failed.";
                    }
                    // Display Errors
                    if (rg_emailerror != "") {
                        rg_status = "failure";
                        $(".registererrors").append("<li>" + rg_emailerror + "</li>");
                    }
                    if (rg_usernameerror != "") {
                        rg_status = "failure";
                        $(".registererrors").append("<li>" + rg_usernameerror + "</li>");
                    }
                    if (rg_passworderror != "") {
                        rg_status = "failure";
                        $(".registererrors").append("<li>" + rg_passworderror + "</li>");
                    }
                    if (rg_verifypassworderror != "") {
                        rg_status = "failure";
                        $(".registererrors").append("<li>" + rg_verifypassworderror + "</li>");
                    }
                    if (rg_captchaerror != "") {
                        rg_status = "failure";
                        $(".registererrors").append("<li>" + rg_captchaerror + "</li>");
                    }

                    // Register User if no failure occured
                    if (rg_status == "failure") {
                        msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error!");
                        divForms.css("height", formRegister.height() + 30);
                    } else {
                        msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Registered!");
                        // Insert AJAX...
                    }
                }).fail(function() {
                    // console.log("Error in Captcha - Add Event.");
                });

                grecaptcha.reset(recaptcha2);
                return false;
                break;
            case "addevent-form":
                // Insert Form Validation...
                verifyCaptcha(recaptcha1).done(function(result) {
                    if (result['status'] == "success") {
                        // Insert AJAX to insert event...
                    }
                }).fail(function() {
                    // console.log("Error in Captcha - Add Event.");
                });
                grecaptcha.reset(recaptcha1);
                return false;
                break;
            default:
                return false;
        }
        return false;
    });

    function validateEmail(email) {
        var error = "";
        var emailregex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailregex.test(email) || email.length < 1)
            error = "The email is invalid.";
        else
            error = "";
        return error;
    }

    function validateUsername(username) {
        var error = "";
        var usernameregex = /\W/; // allow letters, numbers, and underscores
        if (username.length < 1)
            error = "You didn't enter a username.";
        else if ((username.length < 5) || (username.length > 20))
            error = "The username is the wrong length.";
        else if (usernameregex.test(username))
            error = "The username contains illegal characters.";
        else
            error = "";
        return error;
    }

    function validatePassword(password) {
        var error = "";
        var passwordregex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        // at least one number, one lowercase and one uppercase letter
        // at least six characters
        if (!passwordregex.test(password))
            error = "Invalid Password.  Must be at least 6 characters, 1 number, 1 lowercase and 1 uppercase letter.";
        else
            error = "";
        return error;
    }

    function validateVerifyPassword(password, verifypassword) {
        var error = "";
        if (verifypassword.length < 1)
            error = "You didn't verify your password.";
        else if (password != verifypassword)
            error = "Passwords do not match."
        else
            error = "";
        return error;
    }

    function verifyCaptcha(recaptchaid) {
        var response = grecaptcha.getResponse(recaptchaid);
        return $.ajax({
            url: "includes/verifycaptcha.php",
            type: "POST",
            data: "g-recaptcha-response=" + response,
            success: function(data) {
                //console.log(data); // DEBUG
            },
            error: function(xhr, status, error) {
                console.log(xhr + " " + status + " " + error); // DEBUG
            },
            dataType: "json"
        });
    }

    $('#lost_register_btn').click(function() { modalAnimate(formLost, formRegister); });
    $('#register_lost_btn').click(function() { modalAnimate(formRegister, formLost); });

    function modalAnimate(oldForm, newForm) {
        var oldH = oldForm.height();
        var newH = newForm.height();
        divForms.css("height", oldH);
        oldForm.fadeToggle(modalAnimateTime, function() {
            divForms.animate({ height: newH }, modalAnimateTime, function() {
                newForm.fadeToggle(modalAnimateTime);
            });
        });
    }

    function msgFade(msgId, msgText) {
        msgId.fadeOut(msgAnimateTime, function() {
            $(this).text(msgText).fadeIn(msgAnimateTime);
        });
    }

    function msgChange(divTag, iconTag, textTag, divClass, iconClass, msgText) {
        var msgOld = divTag.text();
        msgFade(textTag, msgText);
        divTag.addClass(divClass);
        iconTag.removeClass("glyphicon-chevron-right");
        iconTag.addClass(iconClass + " " + divClass);
        setTimeout(function() {
            msgFade(textTag, msgOld);
            divTag.removeClass(divClass);
            iconTag.addClass("glyphicon-chevron-right");
            iconTag.removeClass(iconClass + " " + divClass);
        }, msgShowTime);
    }

    // Bootstrap 3 Datepicker v4
    $('#datetimepicker1').datetimepicker();
    $('#datetimepicker2').datetimepicker({
        useCurrent: false //Important!
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
    var url = "https://api.orgsync.com/api/v3/communities/510/events.rss?key=8mr8ZuXiuuuyQD9j2QRoyKSY_zw6K3Sw_52uGzgpZ-Q&per_page=100&upcoming=true"
    scrapeRSS(url);

    // Parse RSS Data and Insert into DB
    function scrapeRSS(url) {
        var request = $.ajax({
            url: "includes/fetchevents.php",
            type: "POST",
            data: "url=" + url,
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
