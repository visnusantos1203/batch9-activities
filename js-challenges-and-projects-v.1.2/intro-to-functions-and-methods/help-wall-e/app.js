const robot = document.querySelector('.robot')

//Challenge: Make Eve move when you click its body.

function moveRobot() {
    //add code here
    var currentLoc = window.getComputedStyle(robot).marginLeft;
    var currentLoc2 = parseInt(currentLoc);
    const additionalSpace = 50;
    var newLoc = currentLoc2 + additionalSpace;

    robot.style.marginLeft= `${newLoc}px`;
    console.log(currentLoc2);}
    
robot.addEventListener('click', moveRobot)

//awit
