

class Event {
    constructor(question, person, option1, option2, result_event1, result_event2) {
        this.question = question;
        this.person = person;
        this.option1 = option1;
        this.option2 = option2;
        this.result_event1 = result_event1;
        this.result_event2 = result_event2;


    }
}

const QUESTION = document.getElementsByTagName("p");
const BUTTONS = document.getElementsByTagName("input");
const IMG = document.getElementsByTagName("img");
const H1 = document.getElementsByTagName('h1');
const EVENT_DICT = {};
var i = 0;



const CSVToArray = (data, delimiter = ',', omitFirstRow = false) =>
    data
        .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
        .split('\n')
        .map(v => v.split(delimiter));

function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }
    return result;
}

function createEvents(array) {
    array.slice(1).forEach(element => {
        EVENT_DICT[element[0]] = new Event(element[1], element[2], element[3], element[4], element[5], element[6], element[7])
    });
}

var currentEvent = "";
var text = "";
var nameText = "";

function setQuestion(eventText = 'ceoEvent1') {
    currentEvent = EVENT_DICT[eventText];
    console.log(currentEvent);
    text = currentEvent.question;
    nameText = currentEvent.person;
    typeName();
    BUTTONS[0].value = currentEvent.option1;
    BUTTONS[1].value = currentEvent.option2;
}

function typeQuestion() {
    
    let question = QUESTION[0];
    if (i == 0) {
        question.innerHTML = " ";
    }
    if (i < text.length) {
        question.innerHTML = question.innerHTML + text.charAt(i);
        i = i + 1;
        setTimeout(typeQuestion, 70);
    } else {
        i = 0
    BUTTONS[0].style.pointerEvents = 'auto';
    BUTTONS[1].style.pointerEvents = 'auto';

    }
}

function typeName() {
    let personName = H1[0];
    BUTTONS[0].style.pointerEvents = 'none';
    BUTTONS[1].style.pointerEvents = 'none';
    if (i == 0) {
        personName.innerHTML = " ";
    }
    if (i < nameText.length) {
        personName.innerHTML = personName.innerHTML + nameText.charAt(i);
        i = i + 1;
        setTimeout(typeName, 70);
    } else {
        i = 0
        setTimeout(typeQuestion, 100);
    }
}

function buttonClick(choice) {
    // choice = parseInt(choice);
    BUTTONS[1].style.opacity = 1;
    if (currentEvent.result_event1 == "endEvent1" || currentEvent.result_event2 == "endEvent1") {
        gameEnd(1);
    }
    if (currentEvent.result_event1 == "endEvent2" || currentEvent.result_event2 == "endEvent2") {
        gameEnd(1);
    }
    if (currentEvent.result_event1 == "endEvent3" || currentEvent.result_event2 == "endEvent3") {
        gameEnd(0);
    }

    if (choice == 0) {
        console.log(currentEvent.result_event1);
        setQuestion(currentEvent.result_event1);

    } else {
        console.log(currentEvent.result_event2.toString());

        let eventText = currentEvent.result_event2.substr(0, currentEvent.result_event2.length).trim();
        console.log(eventText.toString());
        setQuestion(eventText.toString());
    }
}


function gameEnd(situation) { // make defualt one and get rid of extra if statment
    BUTTONS[0].style.opacity = 0;
    BUTTONS[1].style.opacity = 0;
    body = document.getElementsByTagName('body');
    H1[0].style.color = "white";
    QUESTION[0].style.color = "white";
    H1[0].innerHTML = "Game Over"

    if (situation == 0) {
        body[0].style.backgroundColor = "red";
    } else {
        body[0].style.backgroundColor = "green";

    }
}

function main() {
    BUTTONS[1].style.opacity = 0;
    csv = loadFile("events5.csv");
    array = CSVToArray(csv);
    createEvents(array);
    console.log(array);
}

window.addEventListener('load', (event) => {
    main()
});