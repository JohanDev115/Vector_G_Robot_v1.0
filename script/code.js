const arms = document.getElementsByClassName('arm');
const pupils = document.getElementsByClassName("pupil");
const btn = document.getElementById("btn");
const clock = document.getElementById("clock");
const screen = document.getElementById("screen");
const apps = document.getElementById("apps");
const chatBox = document.getElementsByClassName('chat-box');
const chatInput = document.getElementById("input");
const sendBtn = document.getElementById("send-btn");
const calcBtn = document.getElementById("calc-btn");
const chatBtn = document.getElementById("chat-btn");

var openpupil, closepupil;

var robotIsOn = false;

var chatIsOpen = false;
var calcIsOpen = false;
responsiveVoice.setDefaultVoice("US English Male");

function closePupil() {
    pupils[0].style.height = "1%";
    pupils[1].style.height = "1%";
    openpupil = setTimeout(openPupil, 200);
}

function openPupil() {
    pupils[0].style.height = "30%";
    pupils[1].style.height = "30%";
    closepupil = setTimeout(closePupil, 6000);
}

function turnOn() {

    if (robotIsOn == false) {
        robotIsOn = true;
        arms[0].style.animation = "animArm1-1 1s";
        arms[1].style.animation = "animArm2-1 1s";
        arms[0].style.animationFillMode = "both";
        arms[1].style.animationFillMode = "both";

        btn.style.color = "red";

        clock.style.animation = "animClock1 1s";
        clock.style.animationFillMode = "both";

        screen.style.animation = "animScreen1 1s";
        screen.style.animationFillMode = "both";

        apps.style.animation = "animApps1 1s";
        apps.style.animationFillMode = "both";
        chatBtn.addEventListener("click", startChat);
        calcBtn.addEventListener("click", startCalc);

        openPupil();
        speak("Hi, my name is vector");

    } else if (robotIsOn) {
        responsiveVoice.pause();
        robotIsOn = false;
        chatIsOpen = false;
        calcIsOpen = false;

        arms[0].style.animation = "animArm1-2 1s";
        arms[1].style.animation = "animArm2-2 1s";
        pupils[0].style.height = "1%";
        pupils[1].style.height = "1%";
        btn.style.color = "#229954";
        clock.style.animation = "animClock2 1s";
        screen.style.animation = "animScreen2 1s";
        apps.style.animation = "animApps2 1s";
        chatBox[0].style.animation = "animchat2 1s";

        chatInput.value = "";

        clearTimeout(openpupil);
        clearTimeout(closepupil);
        calcBtn.removeEventListener("click", startCalc);
        chatBtn.removeEventListener("click", startChat);
        speak("Good bye");
    }
}

function startTime() {
    var date = new Date();
    var hr = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    ap = (hr < 12) ? "am" : "pm";
    hr = (hr == 0) ? 12 : hr;
    hr = (hr > 12) ? hr - 12 : hr;
    hr = checkTime(hr);
    min = checkTime(min);
    sec = checkTime(sec);
    clock.innerHTML = hr + ":" + min + " " + ap;
}

startTime();
var time = setInterval(startTime, 1000);

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startChat() {
    if (chatIsOpen == false) {
        chatIsOpen = true;
        calcIsOpen = false;
        chatBox[0].style.animation = "animchat1 .5s";
        chatBox[0].style.animationFillMode = "both";

        chatInput.placeholder = "Chat with Vector!";
        sendBtn.addEventListener("click", sendMessage);
        sendBtn.removeEventListener("click", calculator);
        chatInput.value = "";

        speak("Hi.");
    } else if (chatIsOpen) {
        chatIsOpen = false;
        calcIsOpen = false;
        chatBox[0].style.animation = "animchat2 1s";
    }
}

function startCalc() {
    if (calcIsOpen == false) {
        calcIsOpen = true;
        chatIsOpen = false;
        chatBox[0].style.animation = "animchat1 .5s";
        chatBox[0].style.animationFillMode = "both";

        chatInput.placeholder = "Type the Mathematic expression";
        sendBtn.addEventListener("click", calculator);
        sendBtn.removeEventListener("click", sendMessage);
        chatInput.value = "";

        speak("Type the Mathematic expression");

    } else if (calcIsOpen) {
        calcIsOpen = false;
        chatIsOpen = false;
        chatBox[0].style.animation = "animchat2 1s";
    }
}

function speak(text) {
    responsiveVoice.speak(text, "US English Female", { pitch: 1.5 }, { rate: 1.5 });
}

function sendMessage() {
    let greeting = ["hi", "hello", "hey", "hola"];
    let greetingAsk = ["how are you", "how's it going", "how are you doing", "what's up", "what's going on"];
    let questionsR = ["and you", "and u", "what about you", "d u"];
    let greetreply = ["ok", "okay", "fine", "good", "well", "nice", "fantastic", "wonderful", "amazing"];
    let greetreplyBad = ["bad", "sad", "angry", "tired", "bored", "worried", "stick"];
    let greetreplyAsk = ["fine and you", "fine and u", "fine d u", "good and you", "good and u", "good d u", "well and you", "well and u", "well d u", "what about you", "what about u"];
    let gratituded = ["thanks for all", "thanks", "thank you", "thanks so much"];
    let compliment = ["you are pretty", "you like me", "you are wonderful"];
    let answer;
    let options;
    let ask = chatInput.value.toLowerCase();
    let index;

    options = ["what?", "I can't understand some words"];
    answer = options[Math.ceil(Math.random() * options.length) - 1];

    for (index of greeting) {
        if (ask.match(index)) {
            options = ["How are you?", "How's it going?", "How are you doing?"];
            answer = options[Math.ceil(Math.random() * options.length) - 1];
        }
    } for (index of greetreply) {
        if (ask.match(index)) {
            options = ["wonderful", "good", "well", "perfect"];
            answer = options[Math.ceil(Math.random() * options.length) - 1];

        }
    } for (index of greetreplyBad) {
        if (ask.match(index)) {
            options = ["hope you feel better", "you are a strong person", "cheer up", "don't worry, everything will be fine"];
            answer = options[Math.ceil(Math.random() * options.length) - 1];

        }
    } for (index of greetingAsk) {
        if (ask.match(index)) {
            options = ["fine, and you?", "good, what about you?", "well, and you?"];
            answer = options[Math.ceil(Math.random() * options.length) - 1];

        }
    } for (index of questionsR) {
        if (ask.match(index)) {
            options = ["me what", "what do you want to know about me"];
            answer = options[Math.ceil(Math.random() * options.length) - 1];

        }
    } for (index of greetreplyAsk) {
        if (ask.match(index)) {
            options = ["well thanks for asking", "fine, thanks", "happy to talk to you"];
            answer = options[Math.ceil(Math.random() * options.length) - 1];

        }
    } for (index of gratituded) {
        if (ask.match(index)) {
            options = ["I'm here for help you", "your welcome"];
            answer = options[Math.ceil(Math.random() * options.length) - 1];

        }
    } for (index of compliment) {
        if (ask.match(index)) {
            options = ["thanks, you too", "I do what I can"];
            answer = options[Math.ceil(Math.random() * options.length) - 1];

        }
    } if (ask.match("what are you doing")) {
        options = ["talking to you", "I'm here to help you"];
        answer = options[Math.ceil(Math.random() * options.length) - 1];
    } else if (ask.match("what is your name?") || ask.match("what's your name")) {
        options = ["My name is Vector", "I'm Vector"];
        answer = options[Math.ceil(Math.random() * options.length) - 1];
    } else if (ask.match("how old are you?")) {
        options = ["I don't know, ask my creator", "How can I know that?"];
        answer = options[Math.ceil(Math.random() * options.length) - 1];
    } else if (ask.match("your creator?") || ask.match("made you?")) {
        options = ["my creator is: JohanDev", "JohanDev made me."];
        answer = options[Math.ceil(Math.random() * options.length) - 1];
    } else if (ask.match("what can you do?") || ask.match("what are you for?") || ask.match("what is your purpose?")) {
        answer = "my name is vector, and they are preparing me to be more useful in the future, for now, I can do math calculations and chat with you";
    } else if (ask.match("do you have girlfriend?")) {
        answer = "No, for what?"
    } else if (ask.match("you are") || ask.match("you're")) {
        answer = "ok?, is that good or bad?"
    } else if (ask.match("good") && ask.match("perfect")) {
        options = ["is good", "fantastic", "wonderful", "Well then!"];
        answer = options[Math.ceil(Math.random() * options.length) - 1];
    } else if (ask.match("is bad")) {
        options = ["ouch", "that bad"];
        answer = options[Math.ceil(Math.random() * options.length) - 1];
    } else if (ask.match("i am") || ask.match("i'm")) {
        options = ["I hope you are well, you are a good person."];
        answer = options[Math.ceil(Math.random() * options.length) - 1];
    } else if (ask.match("are you")) {
        options = ["I still haven't emotions or personality", "I don't know, you tell me"];
        answer = options[Math.ceil(Math.random() * options.length) - 1];
    } else if (ask.match("am i")) {
        options = ["You're a good person", "you are fantastic"];
        answer = options[Math.ceil(Math.random() * options.length) - 1];
    } else if (ask.match("do you know")) {
        options = ["I don't know many things", "I hope to learn more in the future."];
        answer = options[Math.ceil(Math.random() * options.length) - 1];
    } else if (chatInput == "what?") {
        options = ["what do you want to know", "of what"];
        answer = options[Math.ceil(Math.random() * options.length) - 1];
    } else if (ask.match("what time is it")) {
        answer = "it's" + clock.innerHTML + ".";
    } else if (ask.match("bye") || ask.match("goodbye")) {
        answer = "see you soon";
    }

    speak(answer);
}

function calculator() {
    try {
        var result = eval(chatInput.value);
    } catch (error) {
        //error
    }
    if (result == undefined) {
        speak("Insert a Mathematic expression");

    } else {
        speak("The answer is: " + result + ".");
    }
}

function closeInfo() {
    document.getElementsByClassName('information')[0].style.animation = "animintro 2s";
    document.getElementsByClassName('information')[0].style.animationFillMode = "both";
    setTimeout(function () {
        document.getElementsByClassName('information')[0].style.display = "none";
    }, 2500);
}