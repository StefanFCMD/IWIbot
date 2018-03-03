$(document).ready(function () {
    //Require Watson Modules
    var stt = require("./speechToText");
    var conversation = require("./conversation");
    var tts = require("./textToSpeech");
    var chat = require("./chat.js");
    var login = require("./login");
    var map = require("./map.js");
    var locationEventHandler = require("./locationEventHandler.js");

    var $chatForm = $('#chatForm');
    var $recordingButton = $(".btn-circle");
    var $historyToggle = $(".historyToggle");
    var $modalTrigger = $("#modal_trigger");
    
    var notificationNumber = 0;

    map.initMap();
    
    conversation.sendMessage(true, {}).then(function () {
        notificationNumber++;
        $(".notification").show().text(notificationNumber.toString());
    });

    //Recording
    $(document).on('click', '.notRecording', function () {
        $recordingButton.removeClass("notRecording").addClass("recording");

        stt().then(function (result) {
        	return conversation.sendMessage(false ,result);
        }).then(function (result) {
            //Add new notification, stop loader animation and show recording button again
            notificationNumber++;
            $("#mainDiv").removeClass("loader");
            $recordingButton.show();
            $(".notification").show().text(notificationNumber.toString());

            return tts.tts(result);
        });
    });

    //Toggle between chat and voice view
    $historyToggle.click(function () {
        notificationNumber = 0;
        chat.chatToggle();
    });
    //Chat Submit
    $chatForm.submit(function (event) {
        event.preventDefault();
        conversation.sendMessage(false ,chat.chatSubmit()); 
    });
    //Open Login Window
    $modalTrigger.leanModal({
        top: 100,
        overlay: 0.6,
        closeButton: ".modal_close"
    });
    //Login Submit
    $(".btn_red").on('click', function () {
        login.loginSubmit();
    });

    //Hide collapsed navbar when link is clicked
    $(document).on('click', '.navbar-collapse.in', function (e) {
        if ($(e.target).is('a')) {
            $(this).collapse('hide');
        }
    });


});
