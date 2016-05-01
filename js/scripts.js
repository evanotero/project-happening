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
});

// Clear Add Event Form when switch nav bar
$("a", '.mainmenu').click(function() {
    $('#event_name').val("");
    $('#event_host').val("");
    $('#event_location').val("");
    $('#event_url').val("");
    $('#event_username').val("");
    $('#event_password').val();
    $('#datetimepicker1input').val("");
    $('#datetimepicker2input').val("");
    $(".eventerrors").text("");
    grecaptcha.reset(recaptcha1);
});

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
                    } else {
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
                        $(".registererrors").append("<li>" + rg_passworderror + "  Must be at least 6 characters, 1 number, 1 lowercase and 1 uppercase letter.</li>");
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
                var e_name = $('#event_name').val();
                var e_organization = $('#event_host').val();
                var e_location = $('#event_location').val();
                var e_url = $('#event_url').val();
                var e_username = $('#event_username').val();
                var e_password = $('#event_password').val();
                var e_startdate = $('#datetimepicker1input').val();
                var e_enddate = $('#datetimepicker2input').val();
                var e_status = "success";

                // Clear any errors
                $(".eventerrors").text("");

                // Form Validation
                var e_nameerrors = validateString(e_name);
                var e_organizationerrors = validateString(e_organization);
                var e_locationerrors = validateString(e_location);
                var e_urlerrors = validateNotEmpty(e_url);
                var e_usernameerrors = validateUsername(e_username);
                var e_passworderrors = validatePassword(e_password);
                var e_startdateerrors = validateNotEmpty(e_startdate);
                var e_enddateerrors = validateNotEmpty(e_enddate);
                var e_captchaerror = "";

                // Insert Form Validation...
                verifyCaptcha(recaptcha1).done(function(result) {
                    if (result['status'] == "success") {
                        // Do nothing
                    } else {
                        // console.log("fail");
                        e_status = "failure";
                        e_captchaerror = "Captcha Failed.";
                    }
                    // Display Errors
                    if (e_nameerrors != "") {
                        e_status = "failure";
                        $(".eventerrors").append("<li>" + e_nameerrors + "name.</li>");
                    }
                    if (e_organizationerrors != "") {
                        e_status = "failure";
                        $(".eventerrors").append("<li>" + e_organizationerrors + "organization.</li>");
                    }
                    if (e_locationerrors != "") {
                        e_status = "failure";
                        $(".eventerrors").append("<li>" + e_locationerrors + "location.</li>");
                    }
                    if (e_startdateerrors != "") {
                        e_status = "failure";
                        $(".eventerrors").append("<li>" + e_startdateerrors + "start date.</li>");
                    }
                    if (e_enddateerrors != "") {
                        e_status = "failure";
                        $(".eventerrors").append("<li>" + e_enddateerrors + "end date.</li>");
                    }
                    if (e_urlerrors != "") {
                        e_status = "failure";
                        $(".eventerrors").append("<li>" + e_urlerrors + "url.</li>");
                    }
                    if (e_usernameerrors != "") {
                        e_status = "failure";
                        $(".eventerrors").append("<li>" + e_usernameerrors + "</li>");
                    }
                    if (e_passworderrors != "") {
                        e_status = "failure";
                        $(".eventerrors").append("<li>" + e_passworderrors + "</li>");
                    }
                    if (e_captchaerror != "") {
                        e_status = "failure";
                        $(".eventerrors").append("<li>" + e_captchaerror + "</li>");
                    }

                    // Register User if no failure occured
                    if (e_status == "failure") {
                        // Do nothing
                    } else {
                        msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Registered!");
                        // Insert AJAX...
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

    function validateNotEmpty(str) {
        var error = "";
        if (str.length < 1)
            error = "Please enter a valid ";
        else
            error = "";
        return error;
    }

    function validateString(str) {
        var error = "";
        var strregex = /^[a-zA-Z\s]*$/;
        if (!strregex.test(str) || str.length < 1)
            error = "Please enter a valid ";
        else
            error = "";
        return error;
    }

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
            error = "Invalid Password.";
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
    //poplating table 
    populateTable();
    function populateTable() {
        var str = "";
        if ($('input#searchtext').val()) {
            str = $('input#searchtext').val();
        }
        $.getJSON("includes/display.php", { q: str }, function(data) {
                $.each(data, function(i, value) {
                    var array = value.startdate.split("-");
                    var startyear = array[0];
                    var startmonth = array[1];
                    var startday = array[2];

                    $("#results").append("<li>"+
                        "<time datetime="+
                        value.startdate + "><span class='day'>"+
                        startday + "</span><span class='month'>"+
                        startmonth + " </span><span class='year'>"+
                        startyear + "</span><span class='time'>ALL DAY</span></time><img alt="+
                        value.name + "src="+
                        value.mediaurl + "/><div class='info'><h2 class='title'>"+
                        value.name + "</h2><p class='desc'>"+
                        value.description + "</p></div"+
                        "<div class='social'>"+
                            "<ul>"+
                                "<li class='facebook'><i class='fa fa-facebook fa-lg' aria-hidden='true'></i></li>"+
                                "<li class='google-plus'><i clas='fa fa-info fa-lg' aria-hidden='true'></i></li>"+
                                "<li class='twitter'><i class='fa fa-link fa-lg' aria-hidden='true'></i></li>"+
                            "</ul>"+
                        "</div></li>");
                });

            })
            .fail(function() {
                console.log("getJSON error");
            });
    }
    //put events into a table 
});
