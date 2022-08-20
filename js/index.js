$(document).ready(function () {
    //Toggle fullscreen
    $(".chat-bot-icon").click(function (e) {
        $(this).children('svg').toggleClass('animate');
        $('.chat-screen').toggleClass('show-chat');
    });
    $('.chat-mail button').click(function () {
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let status = document.getElementById('select2_el').value;
        if(name != '' && email != '') {
            localStorage.setItem('user-name',name);
            localStorage.setItem('user-email',email);
            localStorage.setItem('user-status',status);
            $('.chat-mail').addClass('hide');
            $('.chat-body').removeClass('hide');
            $('.chat-input').removeClass('hide');
            $('.chat-header-option').removeClass('hide');
            document.getElementById('username').innerHTML=name;
        }
        else {
            alert('Please complete the required details');
        }
    });
    $('.end-chat').click(function () {
        $('.chat-body').addClass('hide');
        $('.chat-input').addClass('hide');
        $('.chat-session-end').removeClass('hide');
        $('.chat-header-option').addClass('hide');
    });
    $('.transcript-chat').click(function () {
        $('.chat-body').removeClass('hide');
        $('.chat-mail').addClass('hide');
        $('.chat-input').removeClass('hide');
        $('.chat-session-end').addClass('hide');
        $('.chat-header-option').removeClass('hide');
    });
    $(".select2_el").select2({
    });
    $('.start-chat').click(function () {
        if(localStorage.getItem('session_date') !== null) {
    let session_date = localStorage.getItem('session_date');
    document.getElementsByClassName('chat-start')[0].innerHTML=session_date;
}
else {
    function format(date) {
        var day = date.getDay();
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var meridian = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = days[day] + ', ' + hours + ':' + minutes + ' ' + meridian;
        return strTime;
    }
    console.log(format(new Date));
    let session_date = format(new Date);
    localStorage.setItem('session_date',session_date);
    document.getElementsByClassName('chat-start')[0].innerHTML=session_date;
}
    });
});

const inputField = document.getElementById("input");
inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
    let input = inputField.value;
    inputField.value = "";
    output(input);
    }
});
const btn = document.getElementById("btn");
btn.addEventListener('click', () => {
    let input = inputField.value;
    inputField.value = "";
    output(input);
});

function output(input) {
let product;
let orgint = input;

let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
text = text
  .replace(/ a /g, " ")
  .replace(/i feel /g, "")
  .replace(/whats/g, "what is")
  .replace(/please /g, "")
  .replace(/ please/g, "")
  .replace(/r u/g, "are you");

let result = compare(prompts, replies, text);
if (result) { 
  // Search for exact match in `prompts`
  product = result;
} else if (text.match(/thank/gi)) {
  product = "You're welcome!"
} else if (text.match(/(corona|covid|virus)/gi)) {
  // If no match, check if message contains `coronavirus`
  product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
} else {
  // If all else fails: random alternative
  product = alternative[Math.floor(Math.random() * alternative.length)];
}

// Update DOM
addChat(input, orgint, product);
}

function compare(promptsArray, repliesArray, string) {
let reply;
let replyFound = false;
for (let x = 0; x < promptsArray.length; x++) {
  for (let y = 0; y < promptsArray[x].length; y++) {
    if (promptsArray[x][y] === string) {
      let replies = repliesArray[x];
      reply = replies[Math.floor(Math.random() * replies.length)];
      replyFound = true;
      break;
    }
  }
  if (replyFound) {
    break;
  }
}
return reply;
}

function addChat(input, orgint, product) {
const messagesContainer = document.getElementsByClassName("chat-body")[0];

let userDiv = document.createElement("div");
userDiv.id = "user";
userDiv.className = "chat-bubble me";
userDiv.innerHTML = `${input}`;
// textToSpeech(orgint);

messagesContainer.appendChild(userDiv);

let botDiv = document.createElement("div");
botDiv.id = "bot";
botDiv.className = "chat-bubble you";
botDiv.innerText = "Typing...";
messagesContainer.appendChild(botDiv);

messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

setTimeout(() => {
  botDiv.innerText = `${product}`;
  // textToSpeech(product)
}, 1000
)

}

const synth = window.speechSynthesis;

const textToSpeech = (string) => {
let voice = new SpeechSynthesisUtterance(string);
voice.text = string;
voice.lang = "en-IN";
voice.volume = 1;
voice.rate = 1;
voice.pitch = 2;
synth.speak(voice);
}

const prompts = [
["hi", "hey", "hello", "good morning", "good afternoon"],
["how are you", "how is life", "how are things"],
["what are you doing", "what is going on", "what is up"],
["how old are you"],
["who are you", "are you human", "are you bot", "are you human or bot"],
["who created you", "who made you"],
[
  "your name please",
  "your name",
  "name",
  "may i know your name",
  "what is your name",
  "what call yourself"
],
["i love you"],
["valimai"],
["happy", "good", "fun", "wonderful", "fantastic", "cool"],
["bad", "bored", "tired"],
["help me", "tell me story", "tell me joke"],
["ah", "yes", "ok", "okay", "nice"],
["bye", "good bye", "goodbye", "see you later"],
["what should i eat today"],
["bro"],
["what", "why", "how", "where", "when"],
["no","not sure","maybe","no thanks"],
[""],
["haha","ha","lol","hehe","funny","joke"]
]

const replies = [
["Hello!", "Hi!", "Hey!", "Hi there!","Howdy"],
[
  "Fine... how are you?",
  "Pretty well, how are you?",
  "Fantastic, how are you?"
],
[
  "Nothing much",
  "About to go to sleep",
  "Can you guess?",
  "I don't know actually"
],
["I am infinite"],
["I am just a bot", "I am a bot. What are you?"],
["The one true God, JavaScript"],
["I am Bot","Your Personal Assistant"],
["I love you too", "Me too"],
["Valimai Rocks on Theatres","May be a Boring film","An Amazing Stunt Film"],
["Have you ever felt bad?", "Glad to hear it"],
["Why?", "Why? You shouldn't!", "Try watching TV"],
["What about?", "Once upon a time..."],
["Tell me a story", "Tell me a joke", "Tell me about yourself"],
["Bye", "Goodbye", "See you later"],
["Sushi", "Pizza"],
["Bro!"],
["Great question"],
["That's ok","I understand","What do you want to talk about?"],
["Please say something :("],
["Haha!","Good one!"]
]

const alternative = [
"Same",
"Go on...",
"Bro...",
"Try again",
"I'm listening...",
"I don't understand :("
]

const coronavirus = ["Please stay home", "Wear a mask", "Fortunately, I don't have COVID", "These are uncertain times"]
