// Screen Dimensions
var viewport = {
    width: $(window).width(),
    height: $(window).height()
};

// Render Google reCaptcha
var recaptcha1;
var recaptcha2;
var recaptcha3;
var onloadCallback = function() {
    // Render the recaptcha1 on the element with ID "recaptcha1"
    recaptcha1 = grecaptcha.render('recaptcha1', {
        'sitekey': '6Lc3aCATAAAAAPqptGd_BjvOLsey1c8wEW9Gbqbw',
        'theme': 'dark'
    });

    // Render the recaptcha2 on the element with ID "recaptcha2"
    recaptcha2 = grecaptcha.render('recaptcha2', {
        'sitekey': '6Lc3aCATAAAAAPqptGd_BjvOLsey1c8wEW9Gbqbw',
        'theme': 'light'
    });

    // Render the recaptcha3 on the element with ID "recaptcha3"
    recaptcha3 = grecaptcha.render('recaptcha3', {
        'sitekey': '6Lc3aCATAAAAAPqptGd_BjvOLsey1c8wEW9Gbqbw',
        'theme': 'light'
    });
};

// Clear Modal on Close
$('#register-modal').on('hidden.bs.modal', function(e) {
    $(".registererrors").text("");
    $(".losterrors").text("");
    $('#register_firstname').val("");
    $('#register_lastname').val("");
    $('#register_username').val("");
    $('#register_email').val("");
    $('#register_password').val("");
    $('#register_verifypassword').val("");
    $('#lost_email').val("");
    grecaptcha.reset(recaptcha3);
    grecaptcha.reset(recaptcha2);
});

// Clear Add Event Form when switching sections via nav bar
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
// Display Event Info Modal
$(document).on('click', '.social .info i', function() {
    $('#event-modal').modal('toggle');
    var el_event = this.parentNode.parentNode.parentNode.parentNode;
    var el_img = el_event.getElementsByTagName("img");
    var day = el_event.getElementsByClassName("day")[0].innerHTML;
    var month = convertMonthToName(el_event.getElementsByClassName("month")[0].innerHTML);
    var year = el_event.getElementsByClassName("year")[0].innerHTML;
    var time = el_event.getElementsByClassName("time")[0].innerHTML;
    var name = el_event.getElementsByClassName("title")[0].innerHTML;
    var organizer = el_event.getElementsByClassName("organizer")[0].innerHTML;
    var timespan = el_event.getElementsByClassName("timespan")[0].innerHTML;
    var location = el_event.getElementsByClassName("location")[0].innerHTML;
    var description = el_event.getElementsByClassName("deschidden")[0].innerHTML;

    var headerhtml = "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" +
        "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>" + "<h2 class='title'>" + name + "</h2>";

    if (description.length > 8)
        description = "<div class='divider'></div><p>" + description + "</p>";
    else
        description = "";

    var bodyhtml;
    if (el_img[0]) {
        var img_src = el_img[0].src;
        var img_alt = el_img[0].alt;
        bodyhtml = "<img alt='" + img_alt + "'src='" + img_src + "'/><br>" +
            "<i class='fa fa-calendar-o' aria-hidden='true'></i><span class='date'> " + month + "  " + day + ",  " + year + "</span><br>" +
            "<i class='fa fa-clock-o' aria-hidden='true'></i><span class='timespan'> " + time + "</span><br>" +
            location +
            "<i class='fa fa-users' aria-hidden='true'></i><span class='organization'> " + organizer + "</span>" +
            description;
    } else
        bodyhtml = "<i class='fa fa-calendar-o' aria-hidden='true'></i><span class='date'> " + month + "  " + day + ",  " + year + "</span><br>" +
        "<i class='fa fa-clock-o' aria-hidden='true'></i><span class='timespan'> " + time + "</span><br>" +
        location +
        "<i class='fa fa-users' aria-hidden='true'></i><span class='organization'> " + organizer + "</span>" +
        description;
    $('#event-modal .modal-header').html(headerhtml);
    $('#event-modal .modal-body').html(bodyhtml);
})

function convertMonthToName(month) {
    // Convert Month
    switch (month) {
        case "JAN":
            month = "January";
            break;
        case "FEB":
            month = "February";
            break;
        case "MAR":
            month = "March";
            break;
        case "APR":
            month = "April";
            break;
        case "MAY":
            month = "May";
            break;
        case "JUN":
            month = "June";
            break;
        case "JUL":
            month = "July";
            break;
        case "AUG":
            month = "August";
            break;
        case "SEP":
            month = "September";
            break;
        case "OCT":
            month = "October";
            break;
        case "NOV":
            month = "November";
            break;
        case "DEC":
            month = "December";
            break;
        default:
            break;
    }
    return month;
}

/*** Execute when document is ready ***/
$(function() {
    /*** Variables ***/
    var formLost = $('#lost-form');
    var formRegister = $('#register-form');
    var divForms = $('#div-forms');
    var modalAnimateTime = 300;
    var msgAnimateTime = 150;
    var msgShowTime = 2000;
    var timeoutID = null;
    var url = "https://api.orgsync.com/api/v3/communities/510/events.rss?key=8mr8ZuXiuuuyQD9j2QRoyKSY_zw6K3Sw_52uGzgpZ-Q&per_page=100&upcoming=true";

    /*** Function Calls when Document is Ready ***/
    displayPopover(); // Help Popover
    // scrapeRSS(url); // Get data from RSS; Now handled by CRON job
    populateWall("", "week"); // Put events on MyWall from THIS WEEK (DEFAULT)
    $('#datetimepicker1').datetimepicker(); // Bootstrap 3 Datepicker v4
    $('#datetimepicker2').datetimepicker({
        useCurrent: false //Important!
    });
    $('#datetimepicker3').datetimepicker({
        format: 'MM/DD/YYYY',
        showTodayButton: true
    });
    $("#datetimepicker3").data("DateTimePicker").clear();

    /*** Event Listeners ***/
    // Listen for Date Picker
    $("#datetimepicker1").on("dp.change", function(e) {
        $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepicker2").on("dp.change", function(e) {
        $('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
    });
    $("#datetimepicker3").on("dp.change", function(e) {
        if ($('#datetimepicker3input').val()) {
            $("#search_input").val("");
            $("#resultslabel").text("Displaying Events for " + e.date.format("LL") + ":");
            populateWall("", e.date.toDate());
        }
    });

    $('#lost_register_btn').click(function() {
        grecaptcha.reset(recaptcha2);
        grecaptcha.reset(recaptcha3);
        modalAnimate(formLost, formRegister);
    });
    $('#register_lost_btn').click(function() {
        grecaptcha.reset(recaptcha2);
        grecaptcha.reset(recaptcha3);
        modalAnimate(formRegister, formLost);
    });

    // Listen for typing in search
    $('input#search_input').keyup(function() {
        clearTimeout(timeoutID);
        var $target = $(this);
        timeoutID = setTimeout(function() { populateWall($target.val(), "week"); }, 500);
        $("#datetimepicker3").data("DateTimePicker").clear();
        if ($target.val() == "")
            $("#resultslabel").text("Displaying Events for This Week:");
        else
            $("#resultslabel").text("Displaying Events from Search:");
    });

    // Listen event filter buttons
    $('.showstudent, .showbc').click(function() {
        if (!$(this).hasClass('active')) {
            if ($(this).hasClass('showstudent') && $('li.student').hasClass('hide'))
                $('li.student').removeClass('hide');
            if ($(this).hasClass('showbc') && $('li.bc').hasClass('hide'))
                $('li.bc').removeClass('hide');
        }
        else {
            if ($(this).hasClass('showstudent') && !$('li.student').hasClass('hide'))
                $('li.student').addClass('hide');
            if ($(this).hasClass('showbc') && !$('li.bc').hasClass('hide'))
                $('li.bc').addClass('hide');
        }
    });

    // Listen for "This Week" button press
    $(".displayweek").click(function() {
        $("#search_input").val("");
        $("#datetimepicker3").data("DateTimePicker").clear();
        populateWall("", "week");
        $("#resultslabel").text("Displaying Events for This Week:");
    });

    // Listen for Form Submission
    $("form").submit(function(e) {
        switch (this.id) {
            case "search-form":
                //populateWall($('input#search_input').val());
                return false;
                break;
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
                    // Email
                    if (ls_emailerror != "") {
                        ls_status = "failure";
                        $(".losterrors").append("<li>" + ls_emailerror + "</li>");
                    }
                    // Captcha
                    if (ls_captchaerror != "") {
                        ls_status = "failure";
                        $(".losterrors").append("<li>" + ls_captchaerror + "</li>");
                    }

                    // Proceed if no failure occured
                    if (ls_status == "failure") {
                        msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Failed to reset password!");
                        divForms.css("height", formLost.height() + 10);
                    } else {
                        resetPassword();

                    }
                }).fail(function() {
                    // console.log("Error in Captcha - Add Event.");
                });

                grecaptcha.reset(recaptcha3);
                return false;
                break;
            case "register-form":
                var rg_firstname = $('#register_firstname').val();
                var rg_lastname = $('#register_lastname').val();
                var rg_username = $('#register_username').val();
                var rg_email = $('#register_email').val();
                var rg_password = $('#register_password').val();
                var rg_verifypassword = $('#register_verifypassword').val();
                var rg_status = "success";

                // Clear any errors
                $(".registererrors").text("");

                // Form Validation
                var rg_firstnameerrors = validateString(rg_firstname);
                var rg_lastnameerrors = validateString(rg_lastname);
                var rg_emailerror = validateEmail(rg_email);
                var rg_usernameerror = validateUsername(rg_username);
                var rg_passworderror = validatePassword(rg_password);
                var rg_verifypassworderror = validateVerifyPassword(rg_password, rg_verifypassword);
                var rg_captchaerror = "";

                // Captcha Verification
                verifyCaptcha(recaptcha2).done(function(result) {
                    if (result['status'] == "success") {
                        // Do nothing
                    } else {
                        // console.log("fail");
                        rg_status = "failure";
                        rg_captchaerror = "Captcha Failed.";
                    }
                    // Display Errors
                    // First Name
                    if (rg_firstnameerrors != "") {
                        rg_status = "failure";
                        $(".registererrors").append("<li>" + rg_firstnameerrors + "first name.</li>");
                    }
                    // Last Name
                    if (rg_lastnameerrors != "") {
                        rg_status = "failure";
                        $(".registererrors").append("<li>" + rg_lastnameerrors + "last name.</li>");
                    }
                    // Email
                    if (rg_emailerror != "") {
                        rg_status = "failure";
                        $(".registererrors").append("<li>" + rg_emailerror + "</li>");
                    }
                    // Username
                    if (rg_usernameerror != "") {
                        rg_status = "failure";
                        $(".registererrors").append("<li>" + rg_usernameerror + "</li>");
                    }
                    // Password
                    if (rg_passworderror != "") {
                        rg_status = "failure";
                        $(".registererrors").append("<li>" + rg_passworderror + "  Must be at least 6 characters, 1 number, 1 lowercase and 1 uppercase letter.</li>");
                    }
                    // Second Password Entry
                    if (rg_verifypassworderror != "") {
                        rg_status = "failure";
                        $(".registererrors").append("<li>" + rg_verifypassworderror + "</li>");
                    }
                    // Captcha
                    if (rg_captchaerror != "") {
                        rg_status = "failure";
                        $(".registererrors").append("<li>" + rg_captchaerror + "</li>");
                    }

                    // Register User if no failure occured
                    if (rg_status == "failure") {
                        msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error!");
                        divForms.css("height", formRegister.height() + 30);
                    } else {
                        registerUser();
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
                var e_nameerrors = validateStringNum(e_name);
                var e_organizationerrors = validateStringNum(e_organization);
                var e_locationerrors = validateStringNum(e_location);
                var e_urlerrors = validateNotEmpty(e_url);
                var e_usernameerrors = validateUsername(e_username);
                var e_passworderrors = validateNotEmpty(e_password);
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
                    // Event Name
                    if (e_nameerrors != "") {
                        e_status = "failure";
                        $(".eventerrors").append("<li>" + e_nameerrors + "name.</li>");
                    }
                    // Event Organizer
                    if (e_organizationerrors != "") {
                        e_status = "failure";
                        $(".eventerrors").append("<li>" + e_organizationerrors + "organization.</li>");
                    }
                    // Location
                    if (e_locationerrors != "") {
                        e_status = "failure";
                        $(".eventerrors").append("<li>" + e_locationerrors + "location.</li>");
                    }
                    // Start Date
                    if (e_startdateerrors != "") {
                        e_status = "failure";
                        $(".eventerrors").append("<li>" + e_startdateerrors + "start date.</li>");
                    }
                    // End Date
                    if (e_enddateerrors != "") {
                        e_status = "failure";
                        $(".eventerrors").append("<li>" + e_enddateerrors + "end date.</li>");
                    }
                    // Event/MEDIA URL
                    if (e_urlerrors != "") {
                        e_status = "failure";
                        $(".eventerrors").append("<li>" + e_urlerrors + "url.</li>");
                    }
                    // Username
                    if (e_usernameerrors != "") {
                        e_status = "failure";
                        $(".eventerrors").append("<li>" + e_usernameerrors + "</li>");
                    }
                    // Password
                    if (e_passworderrors != "") {
                        e_status = "failure";
                        $(".eventerrors").append("<li>" + e_passworderrors + " password.</li>");
                    }
                    // Captcha
                    if (e_captchaerror != "") {
                        e_status = "failure";
                        $(".eventerrors").append("<li>" + e_captchaerror + "</li>");
                    }

                    // Register User if no failure occured
                    if (e_status == "failure") {
                        // Do nothing, display errors
                    } else {
                        addEvent();
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

    /*** Form Validation Functions ***/
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

    function validateStringNum(str) {
        var error = "";
        var strregex = /^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$/;
        if (strregex.test(str) || str.length < 1)
            error = "No special characters.  Please enter a valid ";
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

    /*** Modal Animate & Message Display  ***/
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

    /*** Display Popovers Function ***/
    function displayPopover() {
        var placement = "auto right";

        if (viewport.width < 768) {
            placement = "auto bottom"
        }

        $('#help').popover({
            placement: placement,
            content: "<p>Use this section to add events that are not posted to OrgSync, or are currently not listed.</p>" +
                "<p>In order to add events, you must be a registered user and approved by an administrator." +
                "  After a registered user submits an event, it will be posted to the public page after approval." +
                "  If you would like to register to post events, please click on the button at the bottom of the page.</p>",
            viewport: { 'selector': 'body', 'padding': '5px 5px 5px 5px' }
        });
    }

    /*** Parse RSS Data and Insert into DB ***/
    function scrapeRSS(url) {
        var request = $.ajax({
            url: "includes/fetchorgsync.php",
            type: "POST",
            data: "url=" + url,
            success: function(data) {
                // console.log(data); // DEBUG
                return true;
            },
            error: function(xhr, status, error) {
                console.log(xhr + " " + status + " " + error); // DEBUG
                return false;
            }
        });
    }

    /*** Insert DB data on to MyWall ***/
    function populateWall(search, date) {
        var str = "";
        var start_day = "";
        var end_day = "";
        // Check to see if user is searching for events
        if (search) {
            str = search;
        }
        // Check to see if user is searching by date
        if (date) {
            if (date == "week") {
                d = new Date();
                var day = d.getDay(),
                    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
                d.setHours(0);
                d.setMinutes(0);
                d.setSeconds(0);
                start_day = new Date(d.setDate(diff));
                start_day = moment(start_day).format();
                end_day = moment(start_day).add(7, 'day').subtract(1, 'minute').format();
            } else {
                start_day = date;
                start_day = moment(start_day).format();
                end_day = moment(start_day).add(1, 'day').subtract(1, 'minute').format();
            }
        }
        $(".event-list").empty(); // Clear all listed events

        $.getJSON("includes/display.php", { q: str, start: start_day, end: end_day }, function(data) {
                $.each(data, function(i, value) {
                    // Current Dates
                    // var currentdate = new Date();
                    // var currentday = currentdate.getDate();
                    // var currentmonth = currentdate.getMonth() + 1;
                    // var currentyear = currentdate.getFullYear();

                    // Start Dates
                    var start = value.STARTDATE.split("-");
                    var startdaytime = start[2].split(" ");
                    var startyear = start[0];
                    var startmonth = convertMonth(start[1]);
                    var startday = startdaytime[0];
                    var starttime = convertTime(startdaytime[1], true);

                    // End Dates
                    var end = value.ENDDATE.split("-");
                    var enddaytime = end[2].split(" ");
                    var endyear = end[0];
                    var endmonth = convertMonth(end[1]);
                    var endday = enddaytime[0];
                    var endtime = convertTime(enddaytime[1], false);

                    // Determine time information to display
                    var displaytime = starttime;
                    if (starttime == "All Day") {
                        starttime = "";
                        endtime = "";
                    } else if (starttime == endtime || value.HIDDENINFO != null) {
                        starttime = "<i class='fa fa-clock-o' aria-hidden='true'></i> " + starttime;
                        endtime = "<br>";
                    } else {
                        starttime = "<i class='fa fa-clock-o' aria-hidden='true'></i> " + starttime;
                        endtime = " - " + endtime + "<br>";
                    }

                    // Determine type of event
                    var cls = "";
                    switch (value.U_ID) {
                        case "1":
                            // Orgsync Events
                            if ($('.showstudent').hasClass('active'))
                                cls = "student";
                            else
                                cls = "student hide";
                            break;
                        case "2":
                            // BC Event Calendar Events
                            if ($('.showbc').hasClass('active'))
                                cls = "bc";
                            else
                                cls = "bc hide";
                            break;
                        default:
                            cls = "student"; // Custom Events
                            break;
                    }

                    // Determine location information to display
                    var location = value.LOCATION;
                    if (location == "")
                        location = "";
                    else
                        location = "<i class='fa fa-map-marker' aria-hidden='true'></i> " + location + "<br>";

                    if (value.MEDIAURL == "" || value.MEDIAURL == null)
                        $(".event-list").append("<li class='" + cls + "'>" +
                            "<time datetime=" + startyear + "-" + startmonth + "-" + startday + ">" +
                            "<span class='day'>" + startday + "</span>" +
                            "<span class='month'>" + startmonth + "</span>" +
                            "<span class='year'>" + startyear + "</span>" +
                            "<span class='time'>" + displaytime + "</span></time>" +
                            "<div class='info'><h2 class='title'>" + value.NAME + "</h2>" +
                            "<p class='desc'>" +
                            "<i class='fa fa-users' aria-hidden='true'></i> <span class='organizer'>" + value.ORGANIZER + "</span><br>" +
                            "<span class='timespan'>" + starttime + endtime + "</span>" +
                            "<span class='location'>" + location + "</span></p>" +
                            "<div class='deschidden'>" + value.DESCRIPTION +
                            "</div></div>" +
                            "<div class='social'><ul>" +
                            "<li class='info'><i class='fa fa-info fa-lg' aria-hidden='true'></i></li>" +
                            "<li class='link'><i class='fa fa-link fa-lg' aria-hidden='true'>" +
                            "<a target='_blank' href='" + value.LINK + "'></a></i></li>" +
                            "<li class='facebook'><i class='fa fa-facebook fa-lg' aria-hidden='true'>" +
                            "<a href='http://facebook.com/sharer.php?u=" + value.LINK + "' target='_new'></a></i></li>" +
                            "</ul></div></li>");
                    else
                        $(".event-list").append("<li class='" + cls + "'>" +
                            "<time datetime=" + startyear + "-" + startmonth + "-" + startday + ">" +
                            "<span class='day'>" + startday + "</span>" +
                            "<span class='month'>" + startmonth + "</span>" +
                            "<span class='year'>" + startyear + "</span>" +
                            "<span class='time'>" + displaytime + "</span></time>" +
                            "<img alt='" + value.E_ID + "' src='" + value.MEDIAURL + "' width='120' height='120'/>" +
                            "<div class='info'><h2 class='title'>" + value.NAME + "</h2>" +
                            "<p class='desc'>" +
                            "<i class='fa fa-users' aria-hidden='true'></i> <span class='organizer'>" + value.ORGANIZER + "</span><br>" +
                            "<span class='timespan'>" + starttime + endtime + "</span>" +
                            "<span class='location'>" + location + "</span></p>" +
                            "<div class='deschidden'>" + value.DESCRIPTION +
                            "</div></div>" +
                            "<div class='social'><ul>" +
                            "<li class='info'><i class='fa fa-info fa-lg' aria-hidden='true'></i></li>" +
                            "<li class='link'><i class='fa fa-link fa-lg' aria-hidden='true'>" +
                            "<a target='_blank' href='" + value.LINK + "'></a></i></li>" +
                            "<li class='facebook'><i class='fa fa-facebook fa-lg' aria-hidden='true'>" +
                            "<a href='http://facebook.com/sharer.php?u=" + value.LINK + "' target='_new'></a></i></li>" +
                            "</ul></div></li>");
                });
            })
            .fail(function(xhr, status, error) {
                console.log("getJSON error");
                console.log(xhr + " " + status + " " + error); // DEBUG
            }
        );
    }

    /*** Convert numbered month to abbreviation ***/
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

    /*** Convert time to format hh:mm AM/PM ***/
    function convertTime(time, isStart) {
        var times = time.split(":");
        var hour = times[0];
        var min = times[1];
        var ampm = " AM";

        if (hour == 00 && isStart) {
            hour = "All";
            min = " Day";
            ampm = "";
        } else if (hour >= 12) {
            ampm = " PM";
            if (hour != 12)
                hour -= 12;
            hour += ":";
        } else {
            if (hour == 00)
                hour = 12;
            else
                hour -= 0;
            hour += ":";
        }
        return hour + min + ampm;
    }

    /*** Add Event ***/
    function addEvent() {
        //var dataString = $("#addevent-form").serialize();
        var datestart = new Date($('#datetimepicker1input').val());
        var dateend = new Date($('#datetimepicker2input').val());
        datestart = datestart.toISOString();
        dateend = dateend.toISOString();
        var name = $('#event_name').val();
        var host = $('#event_host').val();
        var location = $('#event_location').val();
        var url = $('#event_url').val();
        var mediaurl = $('#event_mediaurl').val();
        var desc = $('#event_description').val();
        var username = $('#event_username').val();
        var password = $('#event_password').val();

        if (mediaurl == "")
            mediaurl = null;

        var request = $.ajax({
            url: "includes/addevent.php",
            type: "POST",
            data: "name=" + name + "&group=" + host + "&location=" + location +
                "&link=" + url + "&media=" + mediaurl + "&datestart=" + datestart +
                "&dateend=" + dateend + "&description=" + desc + "&username=" +
                username + "&password=" + password,
            success: function(data) {
                //console.log(data);
                switch (data) {
                    case "success":
                        $('#event_name').val("");
                        $('#event_host').val("");
                        $('#event_location').val("");
                        $('#event_url').val("");
                        $('#event_mediaurl').val("");
                        $('#datetimepicker1input').val("");
                        $('#datetimepicker2input').val("");
                        $('#event_description').val("");
                        $('#event_username').val("");
                        $('#event_password').val("");
                        $(".eventerrors").append("<li>Event added! An administrator will now review the event.</li>");
                        break;
                    case "unverified":
                        $(".eventerrors").append("<li>You have not been approved for adding events!</li>");
                        break;
                    case "exists":
                        $(".eventerrors").append("<li>This event already exists!</li>");
                        break;
                    case "notuser":
                        $(".eventerrors").append("<li>You are not a registered user!  Register above.</li>");
                        break;
                    default:
                        break;
                }
            },
            error: function(xhr, status, error) {
                console.log(xhr + " " + status + " " + error); // DEBUG
            }
        });
    }

    /**** Register User ***/
    function registerUser() {
        var dataString = $("#register-form").serialize();

        var request = $.ajax({
            url: "includes/registeruser.php",
            type: "POST",
            data: dataString,
            success: function(data) {
                //console.log(data); // DEBUG
                switch (data) {
                    case "exists":
                        msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'),
                            "error", "glyphicon-remove", "Username/Email already exists!");
                        break;
                    case "success":
                        msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'),
                            "success", "glyphicon-ok", "User Registered!");
                        $('#register_firstname').val("");
                        $('#register_lastname').val("");
                        $('#register_username').val("");
                        $('#register_email').val("");
                        $('#register_password').val("");
                        $('#register_verifypassword').val("");
                        break;
                    default:
                        break;
                }
            },
            error: function(xhr, status, error) {
                console.log(xhr + " " + status + " " + error); // DEBUG
            }
        });
    }

    /*** Reset User Password ***/
    function resetPassword() {
        var dataString = $("#lost-form").serialize();

        var request = $.ajax({
            url: "includes/resetpassword.php",
            type: "POST",
            data: dataString,
            success: function(data) {
                //console.log(data); // DEBUG
                switch (data) {
                    case "reset":
                        msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'),
                            "success", "glyphicon-ok", "Password reset!  Email sent (check spam).");
                        $('#lost_email').val("");
                        break;
                    case "nouser":
                        msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'),
                            "error", "glyphicon-remove", "Failed!  Email not recognized.");
                        break;
                    case "emailfail":
                        msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'),
                            "success", "glyphicon-ok", "Password reset! No email sent. Contact us.");
                        $('#lost_email').val("");
                        break;
                    case "resetfail":
                        msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'),
                            "error", "glyphicon-remove", "Failed!  Unexpected error.");
                        break;
                    default:
                        msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'),
                            "error", "glyphicon-remove", "Failed!  Unexpected error.");
                        break;
                }
            },
            error: function(xhr, status, error) {
                //console.log(xhr + " " + status + " " + error); // DEBUG
                msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Failed to reset password!");
            }
        });
    }
});