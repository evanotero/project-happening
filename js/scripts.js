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

// Listen for clicks on social buttons
$(document).on('click', '.social .facebook i', function() {
    $(this).children()[0].click();
});
$(document).on('click', '.social .link i', function() {
    $(this).children()[0].click();
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

    // Call scrapeRSS with BC OrgSync URL and populate MyWall
    var url = "https://api.orgsync.com/api/v3/communities/510/events.rss?key=8mr8ZuXiuuuyQD9j2QRoyKSY_zw6K3Sw_52uGzgpZ-Q&per_page=100&upcoming=true"
    scrapeRSS(url);
    populateWall();

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

    function populateWall() {
        var str = "";
        // if ($('input#searchtext').val()) {
        //     str = $('input#searchtext').val();
        // }
        $.getJSON("includes/display.php", { q: str }, function(data) {
                $.each(data, function(i, value) {
                    // Current Dates
                    var currentdate = new Date();
                    var currentday = currentdate.getDate();
                    var currentmonth = currentdate.getMonth() + 1;
                    var currentyear = currentdate.getFullYear();

                    // Start Dates
                    var start = value.STARTDATE.split("-");
                    var startdaytime = start[2].split(" ");
                    var startyear = start[0];
                    var startmonth = convertMonth(start[1]);
                    var startday = startdaytime[0];
                    var starttime = convertTime(startdaytime[1]);

                    // End Dates
                    var end = value.ENDDATE.split("-");
                    var enddaytime = end[2].split(" ");
                    var endyear = end[0];
                    var endmonth = convertMonth(end[1]);
                    var endday = enddaytime[0];
                    var endtime = convertTime(enddaytime[1]);

                    // Determine time information to display
                    var displaytime = starttime;
                    if (starttime == "All Day") {
                        starttime = "";
                        endtime = "";
                    } else {
                        starttime = "<span class='descriptionlabel'>Time</span>: " + starttime;
                        endtime = " - " + endtime + "<br>";
                    }

                    // Determine location information to display
                    var location = value.LOCATION;
                    if (location == "")
                        location = "";
                    else
                        location = "<span class='descriptionlabel'>Location</span>: " + location + "<br>";


                    if ((startyear > currentyear) || (startyear == currentyear && start[1] > currentmonth) || (startyear == currentyear && start[1] == currentmonth && startday >= currentday)) {
                        if (value.MEDIAURL == "" || value.MEDIAURL == null)
                            $(".event-list").append("<li>" +
                                "<time datetime=" + startyear + "-" + startmonth + "-" + startday + ">" +
                                "<span class='day'>" + startday + "</span>" +
                                "<span class='month'>" + startmonth + "</span>" +
                                "<span class='year'>" + startyear + "</span>" +
                                "<span class='time'>" + displaytime + "</span></time>" +
                                "<div class='info'><h2 class='title'>" + value.NAME + "</h2>" +
                                "<p class='desc'>" +
                                "<span class='descriptionlabel'>Organizer</span>: " + value.ORGANIZER + "<br>" +
                                starttime + endtime +
                                location + "</p>" +
                                "<p class='deschidden'>" + value.DESCRIPTION +
                                "</p></div>" +
                                "<div class='social'><ul>" +
                                "<li class='info'><i class='fa fa-info fa-lg' aria-hidden='true'></i></li>" +
                                "<li class='link'><i class='fa fa-link fa-lg' aria-hidden='true'>" +
                                "<a target='_blank' href='" + value.LINK + "'></a></i></li>" +
                                "<li class='facebook'><i class='fa fa-facebook fa-lg' aria-hidden='true'>" +
                                "<a href='http://facebook.com/sharer.php?u=" + value.LINK + "' target='_new'></a></i></li>" +
                                "</ul></div></li>");
                        else
                            $(".event-list").append("<li>" +
                                "<time datetime=" + startyear + "-" + startmonth + "-" + startday + ">" +
                                "<span class='day'>" + startday + "</span>" +
                                "<span class='month'>" + startmonth + "</span>" +
                                "<span class='year'>" + startyear + "</span>" +
                                "<span class='time'>" + displaytime + "</span></time>" +
                                "<img alt='" + value.E_ID + "'src='" + value.MEDIAURL + "'/>" +
                                "<div class='info'><h2 class='title'>" + value.NAME + "</h2>" +
                                "<p class='desc'>" +
                                "<span class='descriptionlabel'>Organizer</span>: " + value.ORGANIZER + "<br>" +
                                starttime + endtime +
                                location + "</p>" +
                                "<p class='deschidden'>" + value.DESCRIPTION +
                                "</p></div>" +
                                "<div class='social'><ul>" +
                                "<li class='info'><i class='fa fa-info fa-lg' aria-hidden='true'></i></li>" +
                                "<li class='link'><i class='fa fa-link fa-lg' aria-hidden='true'>" +
                                "<a target='_blank' href='" + value.LINK + "'></a></i></li>" +
                                "<li class='facebook'><i class='fa fa-facebook fa-lg' aria-hidden='true'>" +
                                "<a href='http://facebook.com/sharer.php?u=" + value.LINK + "' target='_new'></a></i></li>" +
                                "</ul></div></li>");
                    }
                });
            })
            .fail(function(xhr, status, error) {
                console.log("getJSON error");
                console.log(xhr + " " + status + " " + error); // DEBUG
            });
    }

    function convertMonth(month) {
        // Convert Month
        switch (month) {
            case "01":
                month = "JAN";
                break;
            case "02":
                month = "FEB";
                break;
            case "03":
                month = "MAR";
                break;
            case "04":
                month = "APR";
                break;
            case "05":
                month = "MAY";
                break;
            case "06":
                month = "JUN";
                break;
            case "07":
                month = "JUL";
                break;
            case "08":
                month = "AUG";
                break;
            case "09":
                month = "SEP";
                break;
            case "10":
                month = "OCT";
                break;
            case "11":
                month = "NOV";
                break;
            case "12":
                month = "DEC";
                break;
            default:
                break;
        }
        return month;
    }

    function convertTime(time) {
        var times = time.split(":");
        var hour = times[0];
        var min = times[1];
        var ampm = " AM";

        if (hour == 00) {
            hour = "All";
            min = " Day";
            ampm = "";
        } else if (hour >= 12) {
            ampm = " PM";
            if (hour != 12)
                hour -= 12;
            hour += ":";
        } else {
            hour -= 0;
            hour += ":";
        }
        return hour + min + ampm;
    }
});
