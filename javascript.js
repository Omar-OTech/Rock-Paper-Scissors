const CHOICES = ["rock", "paper", "scissors"];
const choiceElements = document.querySelectorAll('.choice');
const resultElement = document.querySelector('.result');
const scoreElement = document.querySelector('.score');
const historyElement = document.querySelector('.history');

let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomIndex];
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "It's a tie!";
    } else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "scissors" && computerChoice === "paper") ||
        (userChoice === "paper" && computerChoice === "rock")
    ) {
        playerScore++;
        return "You win!";
    } else {
        computerScore++;
        return "Computer wins!";
    }
}

function updateScore() {
    scoreElement.textContent = `Score: Player ${playerScore} - ${computerScore} Computer`;
}

function addToHistory(userChoice, computerChoice, result) {
    const historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    historyItem.innerHTML = `
        <i class="fas fa-hand-${userChoice}"></i> vs 
        <i class="fas fa-hand-${computerChoice}"></i> - ${result}
    `;
    historyElement.insertBefore(historyItem, historyElement.firstChild);
}

function playRound(userChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(userChoice, computerChoice);

    resultElement.innerHTML = `
        You chose <i class="fas fa-hand-${userChoice}"></i>
        Computer chose <i class="fas fa-hand-${computerChoice}"></i>
        <br>${result}
    `;

    updateScore();
    addToHistory(userChoice, computerChoice, result);

    // Animate the chosen icons
    choiceElements.forEach(element => {
        if (element.dataset.choice === userChoice || element.dataset.choice === computerChoice) {
            element.classList.add('chosen');
            setTimeout(() => element.classList.remove('chosen'), 500);
        }
    });
}

choiceElements.forEach(element => {
    element.addEventListener('click', () => {
        playRound(element.dataset.choice);
    });
});

// Add some initial styling
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .chosen {
            background-color: #f0f0f0;
            transform: scale(1.1);
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        .choice:active {
            animation: pulse 0.3s ease-in-out;
        }
    </style>
`);