var exports = module.exports = {};
var lastScrollPosition;

var map = require("./map.js");

exports.appendSendMessage = function appendSendMessage(msg) {
    if (msg === "showMap") {
        map.showMap();
    }
    if (msg === "hideMap") {
        map.hideMap();
    }

    var msgSend = '<div class="row msg "><div class="col-lg-5">' +
        '</div><div class="col-lg-4"><div class="msg-send">' +
        msg + '</div></div><div class="col-lg-3"></div></div>';
    $(msgSend).appendTo("#chat div.container").hide().fadeIn();
    $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });};
    $(".chatcontainer").animate({scrollTop: $(".chatcontainer").prop('scrollHeight')});
    
exports.appendReceivedMessage = function appendReceivedMessage(msg) {
    var isMsgWithHtml = msg.indexOf('<ul>') !== -1;
    var textAlignValue = isMsgWithHtml ? 'left' : 'center';
    var msgReceived = '<div class="row msg "><div class="col-lg-3">' +
        '</div><div class="col-lg-4"><div class="msg-recived" style="text-align:' + textAlignValue + '">' +
        msg + '</div></div><div class="col-lg-5"></div></div>';

    $(msgReceived).appendTo("#chat div.container").hide().fadeIn();
    $(".chatcontainer").animate({scrollTop: $(".chatcontainer").prop('scrollHeight')});
};

exports.chatSubmit = function chatSubmit() {

    var $messageField = $('#messageField');
    var value = $messageField.val().toString();
    exports.appendSendMessage(value);
    window.scrollTo(0, document.body.scrollHeight);
    return value;
};
exports.chatToggle = function chatToggle() {

    var $notification = $(".notification");
    var $toggleIcon = $("i.toggleIcon");
    var $voiceChatToggle = $(".voice , .history");
    var $chatForm = $('#chatForm');

    $notification.hide().text();
    $toggleIcon.toggleClass(".fa fa-microphone");

    if($('.history').css('display') === 'block') {
        exports.setLastScrollPosition(window.scrollY);
    }

    var options = {};
    /*options.duration = 200;*/
    options.start = function () {

    };
    options.complete = function () {
        $(window).scrollTop(exports.getLastScrollPosition());
        $(".chatcontainer").animate({scrollTop: $(".chatcontainer").prop('scrollHeight')});
    };
    $voiceChatToggle.toggle(options);
    $chatForm.toggle();

};
exports.getLastScrollPosition = function getLastScrollPosition() {
    return lastScrollPosition;
};
exports.setLastScrollPosition = function setLastScrollPosition(value) {
     lastScrollPosition = value;
     //console.log(lastScrollPosition);
 };


