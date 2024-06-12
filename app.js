let boxes = document.querySelectorAll(".box");  //Accessing our all boxes
let resetBtn = document.querySelector("#resetBtn"); //Accessing our reset button
let newGameBtn = document.querySelector("#new-btn"); //Accessing New Game button
let msgContainer = document.querySelector(".msg-container"); //Accessing our whole msg container div
let msg = document.querySelector("#msg"); //Accessing our winner msg

let turnO = true; //if this value is true then 'O' will print otherwise if it is false then 'X' will print

const winPatterns = [      //Creating matrix of our winning patterns This our positions
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => { //Creating function for reset game it will trigger when we click on reset button or newGame Button
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    resetMsgColor();  //Reset message color when the game is reset
    removeHighlighting();
}

const removeHighlighting = () => {
    for (let box of boxes) {
        box.classList.remove("winning-box", "non-winning-box");
    }
};

const resetMsgColor = () => {
    msg.style.color = ""; //Reset the color property
}

/*  toggleTurn function is used to switch between the players "O" and "X". It works by negating the current value of the turnO
 variable. If turnO is true, it becomes false, and if it's false, it becomes true.  */

const toggleTurn = () => { // Toggle the turn between 'O' and 'X'
    turnO = !turnO;
};

boxes.forEach((box) => { 
    box.addEventListener("click", () => {  //AddEventListener(click) on our all boxes
        console.log("box was cliked");
        toggleTurn();

        if(turnO === true) {    //if cond is true then innerText will be print O, then turnO set to false for nxtTime X will print 
            box.innerText = "O";
            box.classList.add("o-color");
            box.classList.remove("x-color");
        }
        else {                  //otherwise if cond is false then innerText will be print X, then turnO set to true for nxtTime O will print
            box.innerText = 'X';
            box.classList.add("x-color");
            box.classList.remove("o-color");
            
        }
        box.disabled = true; //It is used to if we click on any box then we cannot click one more time thats why it is disable

        checkWinner();
    });
});

const enableBoxes = () => { //this function is creating for After we click on reset btn then all boxes are enable to click(empty).
    for(let box of boxes){
        box.disabled = false; //all boxes are able to click
        box.innerText = ""; //innerTextof boxes are set to empty 
    }
}

const disableBoxes = () => { //creating a function for After winner was declare then no need click other boxes 
    for(let box of boxes){
        box.disabled = true;
    }
}

const showWinner = (winner) => { //creating a winner function to declare our winner and that function will calling in checkwinnr funtion
    const winningPattern = findWinningPattern();
    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        if (winningPattern.includes(i)) {
            box.classList.add("winning-box");
        } else {
            box.classList.add("non-winning-box");
        }
    }
    
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msg.style.color = "yellow";
    msgContainer.classList.remove("hide");
    disableBoxes(); //disableBoxes function is call in our showwinner function
}

const findWinningPattern = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val === pos2val && pos2val === pos3val && pos1val !== "") {
            return pattern;
        }
    }
    return null;
};

const showDrawMessage = () => {
    msg.innerText = "Game is a draw. Try again!";
    msg.style.color = "#085a49";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {  //Creating a function for findout the winner 
    let draw = true; // Assume it's a draw
    for(let pattern of winPatterns) {  //using loop we are checking all patterns from winPatterns array
        let pos1val = boxes[pattern[0]].innerText;  //get position 1 innerText
        let pos2val = boxes[pattern[1]].innerText;  //get position 2 innerText
        let pos3val = boxes[pattern[2]].innerText;  //get position 3 innerText 

        //if we are checking here our positions is always fullfill with our value & all three positions value are same
        if(pos1val != "" && pos2val != "" && pos3val != "") {
            if(pos1val === pos2val && pos2val === pos3val){
                console.log("winner", pos1val);
                showWinner(pos1val);  //showWinner function calling
                return;
            }
        }
    }
    //Check for draw
    for (let box of boxes) {
        if (box.innerText === "") {
            draw = false; // If any box is empty, it's not a draw
            break;
        }
    }

    if (draw) {
        console.log("Game is a draw");
        showDrawMessage();
    }
};

newGameBtn.addEventListener("click", resetGame); //if we will click on newGame Button then game will be reset or newGame start
resetBtn.addEventListener("click", resetGame); //if we will click on reset Button then game will be reset or newGame start