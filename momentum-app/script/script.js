window.onload= function() {
    displayTime();
}
var timeContainer =  document.getElementById('time-container');

function displayTime(){
    var time = new Date();
    var h = time.getHours();
    var m = time.getMinutes();
    m = checkTime(m);
    h = checkTime(h)
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
        greetingsText.style.fontSize = "3.5em"
        greetingsText.style.fontFamily = "monospace"

        greetingsText.style.paddingLeft = "15px"
        
        if(e.target.value.length > 0){
            mainFocusContainer.style.display = "block"
        }
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
        displayMainFocus.style.textDecoration = "underline";
        inputMainFocus.remove();
        question.innerHTML = "Your main focus for today is";
        toDoListContainer.style.display = "block";
    }
}


//quote codes here
var arrayOfQuotes = [
    {
    author: "Walt Disney",
    quote: "The best way to get started is to quit talking and begin doing."
    },
    {
    author: "Winston Churchill",
    quote: "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty."
    },
    {
    author: "Will Rogers",
    quote: "Don’t let yesterday take up too much of today."
    },
    {
    author: "Unknown",
    quote: "You learn more from failure than from success. Don’t let it stop you. Failure builds character."
    },
    {
    author: "Vince Lombardi",
    quote: "It’s not whether you get knocked down, It’s whether you get up"
    },
    {
    author: "Steve Jobs",
    quote: "If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you."
    },
    {
    author: "Rob Siltanen",
    quote: "People who are crazy enough to think they can change the world, are the ones who do."
    },
    {
    author: "Og Mandino",
    quote: "Failure will wever overtake me if my determination to succeed is strong enough."
    }
]
/*var randomQuoteBtn = document.getElementById("button");
randomQuoteBtn.addEventListener("click", randomQuote);*/

function randomQuote(){
    var quoteContainer = document.querySelector("#quote");
    var quoteMainDiv = document.getElementById("quote-container");
    var quoteRandomizer = arrayOfQuotes[Math.floor(Math.random()* arrayOfQuotes.length)];
    var randomizedQuote = `"${quoteRandomizer.quote}" - ${quoteRandomizer.author}`;
    console.log(quoteRandomizer);

    quoteMainDiv.onclick = function(){
        quoteMainDiv.style.display = "none";
        toDoListContainer.style.display = "block"
    }
    quoteMainDiv.style.display = "flex";
    quoteContainer.innerHTML = randomizedQuote;
    quoteContainer.style.fontSize = "1em";
    quoteContainer.style.fontFamily = "monoscape";
    quoteContainer.style.textAlign = "center";
    quoteContainer.style.padding = "0";
    quoteContainer.style.margin = "0";
    quoteContainer.style.maxWidth = "1000px";
    quoteContainer.style.color = "black";
    
    toDoListContainer.style.display = "none";
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
    modalContainer.style.display = "grid";
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
var toDoListContainer = document.getElementById("toDoList-container")
var ul = document.querySelector(".list-container");
var addBtn = document.getElementById("add-toDo");
var toDoInput = document.getElementById("toDo-input");

//adds event listener to add button

addBtn.onclick = function(){
    var createLi = document.createElement("li");
    createLi.innerText = toDoInput.value;
    console.log(toDoInput.value.length)
   
    if(toDoInput.value.length > 0){
        createLi.style.listStyle = "none";
        createLi.setAttribute("class", "li")
        createLi.style.backgroundColor = "transparent";
        createLi.style.margin = "0"; 
        createLi.style.padding = "0"; 
        createLi.style.textAlign = "center"; 
        createLi.style.fontFamily = "monospace"
        ul.style.paddingInlineStart = "0px";
    //added event listener that removes the list element
        var removeBtn = document.createElement("button");
        removeBtn.innerText = "X";
        removeBtn.style.border = "none";
        removeBtn.style.backgroundColor = "transparent";
        removeBtn.onclick = function(){
            var p = removeBtn.parentElement;
                p.remove();
            };
        createLi.append(removeBtn);
    // added line through decoration
        createLi.onclick = function(){
            createLi.style.textDecoration = "line-through";
        }


        ul.append(createLi);
    } else{
        alert("Oops! You can not submit an empty to do")
    }
     toDoInput.value = "";	
};