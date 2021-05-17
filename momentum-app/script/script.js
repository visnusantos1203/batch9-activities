var today = new Date();
var h = today.getHours();
var m = today.getMinutes();
var timeContainer =  document.getElementById('time-container');

var ifAmOrPm = function(){
    if(h > 11){
        return "pm"
    } else{
        return"am"
    };
}
if(m < 10){
    m = `0${m}`
}

function startTime() {
   // m = checkTime(m);
 
    timeContainer.innerHTML = `${h}:${m} ${ifAmOrPm()}`;
    var t = setTimeout(startTime, 500);
}

// Adds greeting text and event listener
var greetingsText = document.getElementById("greetings-text");
var input = document.getElementById("greetings")

input.addEventListener("keypress", userName)
function userName(e){
    if(e.which === 13){
    greetingsText.innerText = `Good ${ifMorningOrEvening()}, ${e.target.value}!`
    return input.remove();
    }
}

var ifMorningOrEvening = function(){
    if(ifAmOrPm() === "am"){
        return "morning"
    } else{
        return "evening"
    }
}
greetingsText.innerText = `Good ${ifMorningOrEvening()}!`

// Main focus codes here
var displayMainFocus = document.getElementById("main-focus-display");
var inputMainFocus = document.getElementById("main-focus");
var question = document.getElementById("main-focus-question");
var mainFocusContainer = document.getElementById("main-focus-container");

inputMainFocus.addEventListener("keypress", mainFocus);
function mainFocus(e){
    if(e.which === 13){
        displayMainFocus.innerHTML = e.target.value;
        displayMainFocus.style.fontSize = "3em";
        inputMainFocus.remove();
        question.innerHTML = "Today's main focus";
    }
}

//quote codes here
var arrayOfQuotes = [
    {
    author: "Walt Disney",
    quote: "The Best Way To Get Started Is To Quit Talking And Begin Doing."
    },
    {
    author: "Winston Churchill",
    quote: "The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees Opportunity In Every Difficulty."
    },
    {
    author: "Will Rogers",
    quote: "Don’t Let Yesterday Take Up Too Much Of Today."
    },
    {
    author: "Unknown",
    quote: "You Learn More From Failure Than From Success. Don’t Let It Stop You. Failure Builds Character."
    },
    {
    author: "Vince Lombardi",
    quote: "It’s Not Whether You Get Knocked Down, It’s Whether You Get Up"
    },
    {
    author: "Steve Jobs",
    quote: "If You Are Working On Something That You Really Care About, You Don’t Have To Be Pushed. The Vision Pulls You."
    },
    {
    author: "Rob Siltanen",
    quote: "People Who Are Crazy Enough To Think They Can Change The World, Are The Ones Who Do."
    },
    {
    author: "Og Mandino",
    quote: "Failure Will Never Overtake Me If My Determination To Succeed Is Strong Enough."
    }
]


function randomQuote(){
    var quoteContainer = document.getElementById("quote-container");
    var quoteRandomizer = arrayOfQuotes[Math.floor(Math.random()* arrayOfQuotes.length)];
    var randomizedQuote = `"${quoteRandomizer.quote}" - ${quoteRandomizer.author}`;
    console.log(randomizedQuote);

    quoteContainer.innerText = randomizedQuote;
    quoteContainer.style.fontSize = "3.5em";
    quoteContainer.style.fontFamily = "monoscape";
    quoteContainer.style.textAlign = "center";
};

//modal codes
var modalContainer = document.getElementById("modal-container");
var addQuoteBtn = document.getElementById("add-quote");
var cancelBtn = document.getElementById("quote-cancel");
var submitBtn = document.getElementById("quote-submit");
var quoteAuthor = document.getElementById("quote-author");
var quoteText = document.getElementById("quote-text");

addQuoteBtn.onclick = function(){
    addQuoteBtn.style.display = "none";
    modalContainer.style.display = "block";
};

cancelBtn.onclick = function(){
    addQuoteBtn.style.display = "block";
    modalContainer.style.display = "none";
}

var authorInput;
var quoteInput;

quoteAuthor.addEventListener("input", addAuthor);
    function addAuthor(e){
        authorInput = e.target.value;
    }
quoteText.addEventListener("input", addQuote);
    function addQuote(e){
        quoteInput = e.target.value;
    }

submitBtn.addEventListener("click", onSubmit);
    function onSubmit(){
        var newQuote = {
        author: authorInput,
        quote: quoteInput
        };
        arrayOfQuotes.push(newQuote);
        modalContainer.style.display = "none";
        addQuoteBtn.style.display = "block";
    }
console.log(arrayOfQuotes);