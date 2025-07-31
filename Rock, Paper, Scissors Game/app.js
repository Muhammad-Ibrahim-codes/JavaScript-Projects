let userScore = 0;
let compScore = 0;

const msgPara = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const choices = document.querySelectorAll(".choice");

const genComputerChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randomIdx = Math.floor(Math.random() * 3);
    return options[randomIdx];
};

const draw = () => {
    msgPara.innerText = "Game was Draw.";
    msgPara.style.backgroundColor = "#081b31"
};

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msgPara.innerText = `You win!. Your ${userChoice} beats ${compChoice}.`;
        msgPara.style.backgroundColor = "green";
    }else {
        compScore++;
        compScorePara.innerText = compScore;
        msgPara.innerText = `You lost. ${compChoice} beats your ${userChoice}.`;
        msgPara.style.backgroundColor = "red";
    }
};

const playGame = (userChoice) => {
    // Computer Choice
    const compChoice = genComputerChoice();

    if(userChoice === compChoice) {
      draw();
    }else {
        let userWin = true;
        if(userChoice === "rock") {
           userWin = compChoice === "paper"? false: true;
        }else if(userChoice === "paper") {
            userWin = compChoice === "scissors"? false: true;
        }else {
            userWin = compChoice === "rock"? false: true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});