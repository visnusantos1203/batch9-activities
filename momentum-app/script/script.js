var today = new Date();
var h = today.getHours();
var m = today.getMinutes();
var timeContainer =  document.getElementById('time-container');

var ifAmOrPm = function(){
    if((h >= 0 && m === 0) || (h <= 11 && m <= 59)){
        return "am"
    } else{
        return"pm"
    };
}

function startTime() {
    m = checkTime(m);
    console.log(m);

    timeContainer.innerHTML = `${h}:${m} ${ifAmOrPm()}`;
    setTimeout(startTime, 1000);
  }

  function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
  }
// Adds greeting text and event listener
var greetingsText = document.getElementById("greetings-text");
var input = document.getElementById("greetings")

input.addEventListener("input", userName)
function userName(e){
    input = "";
    return greetingsText.innerText = `Good ${ifMorningOrEvening()}, ${e.target.value}!`
}

var ifMorningOrEvening = function(){
    if(ifAmOrPm() === "am"){
        return "morning"
    } else{
        return "evening"
    }
}
greetingsText.innerText = `Good ${ifMorningOrEvening()}!`


