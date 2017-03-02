var Keyboard = (function() {

    var scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H' ];  
    
    function getType(tone) {
        if (tone.match(/#/)) {
            type = 'half-tone';
        } else {
            type = 'whole-tone';
        }
        return type;
    };

    function createHtmlContent() {
        container = document.createElement('div');
        tones = getHtmlTones();
        container.appendChild(tones);
        //getTextarea;
        inputFields = getInputFields();
        container.appendChild(inputFields);
        return container;
    };

    function getHtmlTones() {
        var divContainer = document.createElement('div');
        divContainer.id = "container";

        for (var i = 0; i < scale.length; i++) {
            if (scale[i].match(/#/) == null) {
                var toneContainer = document.createElement('div');
                toneContainer.classList.add('tone-container');
                if (scale[i] == 'H') {
                    toneContainer.classList.add('last');
                }
            }

            toneContainer.appendChild(getHtmlTone(scale[i]));

            if (scale[i].match(/#/) || scale[i] == 'E' || scale[i] == 'H') {
                divContainer.appendChild(toneContainer);
            }
        }

        spanLastEl = document.createElement('span');
        spanLastEl.classList.add('clear');
        divContainer.appendChild(spanLastEl);

        return divContainer;
    }

    function getHtmlTone(tone) {
        var divTone = document.createElement('div');
        divTone.classList.add(getType(tone));

        toneTxtEl = document.createElement('span');
        toneTxtEl.appendChild(document.createTextNode(tone));

        divTone.appendChild(toneTxtEl);

        return divTone;
    }

    function getInputFields() {
        inputFieldsContainer = document.createElement('div');
        
        txtPlayed = document.createTextNode('Played: ');
        
        inputTextareaPlayed = document.createElement('textarea');
        inputTextareaPlayed.id = 'tone-played';
        inputTextareaPlayed.cols = 100;
        inputTextareaPlayed.rows = 5;

        inputTextareaUserTones = document.createElement('textarea');
        inputTextareaUserTones.id = 'user-tones';

        inputButton = document.createElement('button');
        inputButton.textContent = "Play";

        inputFieldsContainer.appendChild(txtPlayed);
        inputFieldsContainer.appendChild(inputTextareaPlayed);
        inputFieldsContainer.appendChild(inputTextareaUserTones);
        inputFieldsContainer.appendChild(inputButton);

        return inputFieldsContainer;
    }

    return {
        init: function(selectorElement) {
            //draw HTML, returns htmlcontent
            htmlContent = createHtmlContent();
            document.getElementById(selectorElement).appendChild(htmlContent);
            //append HTML to selectorElement

            //bind events to it
        }
    }
})()

/*
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
*/