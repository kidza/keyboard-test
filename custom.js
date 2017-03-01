//C1 D1 C#1 D1 E1 D1 C#1 D1 C1/2 D1/2 C1/2 D1/2 E1 E1/2 D1/2 C1/2 D1/2 C1/2 D1/2 E1 E1/2 D1/2 C1/2 D1/2 C1/2 D1/2 C#2

var mouseDownHandler = function(event) {
    element = event.target;
    if (element.tagName == 'SPAN') {
        element = element.parentElement;
    }
    element.classList.add('pressedTone');
    matches = element.querySelectorAll("span");
    if (matches.length > 0) {
        tone = matches[0].innerHTML;
        playAudioTone(tone);
        playedTones = document.getElementById('tone-played').value;
        if (playedTones == "") {
            playedTones = tone;
        } else {
            playedTones = playedTones + " " + tone;
        }
        document.getElementById('tone-played').value = playedTones;
    }
};

var mouseUpHandler = function(event) {
    element = event.target;
    if (element.tagName == 'SPAN') {
        element = element.parentElement;
    }
    element.classList.remove('pressedTone');
};

bindClickEvents(document.getElementsByClassName("whole-tone"));
bindClickEvents(document.getElementsByClassName("half-tone"));

function bindClickEvents(elements) {
    for (var i = 0; i < elements.length; i++) {
        var current = elements[i];
        current.addEventListener('mousedown', mouseDownHandler, false);
        current.addEventListener('mouseup', mouseUpHandler, false);
    }
};

function playAudioTone(tone) {
    if (tone.match(/#/)) {
        var toneName = tone.replace("#", "p");
    } else {
        var toneName = tone;
    }
    
    var tone = new Audio('tones/' + toneName + '.wav');
    tone.play();
}

function playUserTones() {
    var keyboardTones = getKeyboardTones();
    var userTones = getUserTones();

    i = 0;
    duration = 0;

    function playTone() {
        setTimeout(function() {
            if (i < userTones.length) {
                duration = userTones[i].duration * 400;
                for (var j = 0; j < keyboardTones.length; j++) {
                    if (keyboardTones[j].tone == userTones[i].tone) {
                        triggerSynchedMouseEvent(keyboardTones[j].element, duration);
                    }
                }
                i++;

                playTone();
            }
        }, duration)
    }

    playTone();
};

function getUserTones() {
    var tones = [];
    userText = document.getElementById('user-tones').value;
    var tonesWithDuration = userText.split(/[ ,]+/);

    for (var i = 0; i < tonesWithDuration.length; i++) {
        if (tonesWithDuration[i].match(/#/)) {
            toneNumberOfCharacters = 2;
        } else {
            toneNumberOfCharacters = 1;
        }
        var tone = tonesWithDuration[i].substr(0, toneNumberOfCharacters);
        var duration = tonesWithDuration[i].substr(toneNumberOfCharacters, tonesWithDuration[i].length);

        if (tonesWithDuration[i].match(/\//)) {
            duration = parseFloat(eval(duration));
        }

        tones.push({ tone: tone, duration: duration });
    }

    return tones
}

function triggerSynchedMouseEvent(elem, duration) {
    triggerMouseEvent(elem, 'mousedown');
    setTimeout(function() {
        triggerMouseEvent(elem, 'mouseup');
    }, duration);
}

function getKeyboardTones() {
    var keyboardTones;
    var halfTones = getKeyboardTonesWithElements("half-tone");
    var wholeTones = getKeyboardTonesWithElements("whole-tone");

    return keyboardTones = halfTones.concat(wholeTones);
};

function getKeyboardTonesWithElements(className) {
    var formatedTones = [];
    elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        matches = element.querySelectorAll("span");
        if (matches.length > 0) {
            tone = matches[0].innerHTML;
            formatedTones.push({
                tone: tone,
                element: element
            });
        }
    }
    return formatedTones;
};

function triggerMouseEvent(node, eventType) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent(eventType, true, true);
    node.dispatchEvent(clickEvent);
}
