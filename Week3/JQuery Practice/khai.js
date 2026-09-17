$(document).ready(function() {

    // 1. GET & SET

    $("#show-name").click(function() {
        let name = $("#student-name").text();
        $("#output").text(name);
    });

    $("#change-name").click(function() {
        $("#student-name").text("Professional jQuery Developer");
    });

    $("#show-bio").click(function() {
        let bio = $("#student-bio").html();
        $("#output").text(bio);
    });

    $("#get-input").click(function() {
        let nickname = $("#nickname-input").val();
        $("#output").text(nickname);
    });

    $("#set-input").click(function() {
        $("#nickname-input").val("jQuery Pro");
    });


    // 2. CSS CLASSES

    $("#highlight-card").click(function() {
        $("#profile-card").addClass("highlighted");
    });

    $("#remove-highlight").click(function() {
        $("#profile-card").removeClass("highlighted");
    });

    $("#toggle-dark").click(function() {
        $("#profile-card").toggleClass("dark-mode");
    });

    $("#toggle-rounded").click(function() {
        $("#profile-photo").toggleClass("rounded");
    });


    // 3. CSS METHOD

    $("#red-background").click(function() {
        $("#profile-card").css("background-color", "#e74c3c");
    });

    $("#reset-background").click(function() {
        $("#profile-card").css("background-color", "white");
    });


    // 4. HIDE & SHOW

    $("#hide-photo").click(function() {
        $("#profile-photo").hide("slow");
    });

    $("#show-photo").click(function() {
        $("#profile-photo").show("slow");
    });

    $("#toggle-bio").click(function() {
        $("#student-bio").toggle();
    });


    // 5. FADE

    $("#fade-out").click(function() {
        $("#profile-card").fadeOut();
    });

    $("#fade-in").click(function() {
        $("#profile-card").fadeIn();
    });

    $("#fade-50").click(function() {
        $("#profile-card").fadeTo("slow", 0.5);
    });


    // 6. SLIDE

    $("#slide-up").click(function() {
        $("#skills-list").slideUp();
    });

    $("#slide-down").click(function() {
        $("#skills-list").slideDown();
    });

    $("#slide-toggle").click(function() {
        $("#skills-list").slideToggle();
    });


    // 7. ANIMATE WITH CHAINING

    $("#animate-card").click(function() {
        $("#profile-card")
            .animate({ marginLeft: "200px" }, 1000)
            .animate({ marginLeft: "0px" }, 1000);
    });


    // 8. EVENTS

    $("#profile-photo").mouseenter(function() {
        $("#profile-photo").addClass("shadow");
    });

    $("#profile-photo").mouseleave(function() {
        $("#profile-photo").removeClass("shadow");
    });

    $("#nickname-input").keypress(function(event) {
        $("#output").text(event.key);
    });

});