
 
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
const H1 = document.getElementsByTagName('h1')

const EVENT_DICT = {};
const PERSON_DICT = {};

PERSON_DICT["CEO"] = "Chief Executive Officer"; /// for name add the full name later
PERSON_DICT["CCO"] = "Chief Communications Officer";
PERSON_DICT["CTO"] = "CTO";
PERSON_DICT["HRM"] = "HRM";

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
        console.log(PERSON_DICT[element[2]]);
       EVENT_DICT[element[0]] = new Event(element[1], element[2], element[3], element[4], element[5], element[6], element[7])
    });
}

var currentEvent = "";
// var nextEvent = currentEvent
var text = "";
var nameText = "";

function setQuestion(eventText = 'ceoEvent1') {
    currentEvent = EVENT_DICT[eventText];
    console.log(currentEvent);
    text = currentEvent.question;
    nameText = currentEvent.person;
    // alert(currentEvent.person);
    typeName();
    // console.log(eventObject)
    BUTTONS[0].value = currentEvent.option1;
    BUTTONS[1].value = currentEvent.option2;
    // IMG[0].src = event.person.photo;
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


function typeQuestion() {

    let question = QUESTION[0];

    if (i == 0) {
        question.innerHTML = " ";
    }
    if (i < text.length) {
        question.innerHTML = question.innerHTML + text.charAt(i);
        i = i + 1;
        setTimeout(typeQuestion, 80);
    } else {
        i = 0
    }
}

function typeName() {

    let personName = H1[0];

    if (i == 0) {
        personName.innerHTML = " ";
    }
    if (i < nameText.length) {
        personName.innerHTML = personName.innerHTML + nameText.charAt(i);
        i = i + 1;
        setTimeout(typeName, 80);
    } else {
        i = 0
        setTimeout(typeQuestion, 100);
    }
}

function buttonClick(choice) {
    BUTTONS[1].style.opacity = 1;
    if (choice == 0) {
        console.log(currentEvent.result_event1);
        setQuestion(currentEvent.result_event1);

    } else {
        let eventText = currentEvent.result_event2.substr(0, currentEvent.result_event2.length - 1);
        console.log(eventText.toString());
        setQuestion(eventText.toString());
    }
}


function gameEnd(situation) {
    BUTTONS[0].style.opacity = 0;
    BUTTONS[1].style.opacity = 0;
    body = document.getElementsByTagName('body');
    H1[0].style.color = "white";
    H1[0].innerHTML = "Game Over"

    if(situation == 0){
        body[0].style.backgroundColor = "red";
    }else{
        body[0].style.backgroundColor = "white";

    }



}

function main() {
    // console.log(loadFile("events2.csv"));
    // console.log(CSVToArray(loadFile("events3.csv")));
    BUTTONS[1].style.opacity = 0;

    csv = loadFile("events4.csv");
    array = CSVToArray(csv);
    createEvents(array);
    console.log(array);
    // console.log(EVENT_DICT);
    // typeWriter("HELLO", QUESTION[0]);


}

window.addEventListener('load', (event) => {
    main()
});