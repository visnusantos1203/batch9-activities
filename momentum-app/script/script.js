window.onload= function() {
    displayTime();
}
var timeContainer =  document.getElementById('time-container');

function displayTime(){
    var time = new Date();
    var h = time.getHours();
    var m = time.getMinutes();
    m = checkTime(m);
    var ifAmOrPm = function(){
        if(h > 11){
            return "pm"
        } else{
            return"am"
        };
    };    
    
    timeContainer.textContent = `${h}:${m} ${ifAmOrPm()}`;
    var t = setTimeout(displayTime, 1000);

    function checkTime(i) {
        // add zero in front of numbers < 10
    
        if (i < 10) {i = "0" + i};
        return i;
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

}


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
/*var randomQuoteBtn = document.getElementById("button");
randomQuoteBtn.addEventListener("click", randomQuote);*/

function randomQuote(){
    var quoteContainer = document.querySelector("#quote-container");
    var quoteRandomizer = arrayOfQuotes[Math.floor(Math.random()* arrayOfQuotes.length)];
    var randomizedQuote = `"${quoteRandomizer.quote}" - ${quoteRandomizer.author}`;
    console.log(quoteRandomizer);
    quoteContainer.innerText = randomizedQuote;
    quoteContainer.style.fontSize = "3.5em";
    quoteContainer.style.fontFamily = "monoscape";
    quoteContainer.style.textAlign = "center";
};
    console.log(randomQuote);

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
//console.log(arrayOfQuotes);

// code for todo list
var ul = document.querySelector(".list-container");
var addBtn = document.getElementById("add-toDo");
var toDoInput = document.getElementById("toDo-input");

//adds event listener to add button

addBtn.onclick = function(){
    var createLi = document.createElement("li");
    createLi.innerText = toDoInput.value;
    console.log(toDoInput.value.length)
   
    if(toDoInput.value.length > 0){
        ul.append(createLi);
    } else{
        alert("Oops! You can not submit an empty to do")
    }
     toDoInput.value = "";	
};