var justiceLeague = [
    {name: "Superman", superpower: "Super strength"}, 
    {name: "Batman", superpower: "Super rich"},
    {name: "Wonder Woman", superpower: "Super lasso"}, 
    {name: "The Flash", superpower: "Super speed"}, 
    {name: "Green Lantern", superpower: "Super ring"}
]


for(let i = 0; i < justiceLeague.length; i++){
    var league = document.getElementById("league");
    var superHero = document.createElement("li");
    superHero.innerText = `Name: ${justiceLeague[i].name} Superpower: ${justiceLeague[i].superpower}`
    league.append(superHero);
    console.log(superHero);
}

document.getElementById("h1").addEventListener("keypress", onKeyPress);

function onKeyPress(e){
    console.log(`You pressed ${e.key}`)
}
