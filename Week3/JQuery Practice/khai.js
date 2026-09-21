$(document).ready(function() {

$("#show-name").click(function() {
    let name = $("#student-name").text();
    $("#output").text(name);
});
$("#change-name").click(function() {
    $("#student-name").text("Professional jQuery Developer");
});
$("#show-bio").click(function() {
    let bio = $("#student-bio").text();
    $("#output").text(bio);
});
$("#get-input").click(function() {
    let nickname = $("#nickname-input").val();
    $("#output").text(nickname);
});
$("#set-input").click(function() {
    $("#nickname-input").val("jQuery Pro");
});
$("#highlight-card").click(function() {
    $("#profile-card").addClass("highlight");
});
$("#remove-highlight").click(function() {
    $("#profile-card").removeClass("highlight");
});
$("#toggle-dark").click(function() {
    $("#profile-card").toggleClass("dark");
});
$("#toggle-rounded").click(function() {
    $("#profile-photo").toggleClass("round");
});
$("#red-background").click(function() {
    $("#profile-card").css("background-color", "red");
});
$("#reset-background").click(function() {
    $("#profile-card").css("background-color", "white");
});
$("#hide-photo").click(function() {
    $("#profile-photo").hide();
});
$("#show-photo").click(function() {
    $("#profile-photo").show();
});
$("#toggle-bio").click(function() {
    $("#student-bio").toggle();
});
$("#fade-out").click(function() {
    $("#profile-card").fadeOut();
});
$("#fade-in").click(function() {
    $("#profile-card").fadeIn();
});
$("#fade-50").click(function() {
    $("#profile-card").fadeTo("slow", 0.5);
});
$("#slide-up").click(function() {
    $("#skills-list").slideUp();
});
$("#slide-down").click(function() {
    $("#skills-list").slideDown();
});
$("#slide-toggle").click(function() {
    $("#skills-list").slideToggle();
});
$("#animate-card").click(function() {
    $("#profile-card")
        .animate({marginLeft: "200px"}, 1000)
        .animate({marginLeft: "0px"}, 1000);
});
$("#profile-photo").mouseenter(function() {
    $("#profile-photo").css("border", "5px solid blue");
});
$("#profile-photo").mouseleave(function() {
    $("#profile-photo").css("border", "none");
});
$("#nickname-input").keyup(function() {
    let text = $("#nickname-input").val();
    $("#output").text(text);
});
});
