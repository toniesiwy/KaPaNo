document.addEventListener('DOMContentLoaded', () => {
    const playerScoreElem = document.getElementById('player-score');
    const computerScoreElem = document.getElementById('computer-score');
    const messageElem = document.getElementById('message');
    const restartButton = document.getElementById('restart');
    const choices = document.querySelectorAll('.choice');
    
    let playerScore = 0;
    let computerScore = 0;
    const winLimit = 3;

    const getComputerChoice = () => {
        const choices = ['rock', 'paper', 'scissors'];
        return choices[Math.floor(Math.random() * choices.length)];
    };

    const determineWinner = (playerChoice, computerChoice) => {
        if (playerChoice === computerChoice) return 'draw';
        if ((playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'scissors' && computerChoice === 'paper') ||
            (playerChoice === 'paper' && computerChoice === 'rock')) {
            return 'win';
        } else {
            return 'lose';
        }
    };

    const playGame = (playerChoice) => {
        const computerChoice = getComputerChoice();
        const result = determineWinner(playerChoice, computerChoice);
        
        if (result === 'win') {
            playerScore++;
            messageElem.textContent = `Wygrałeś! Komputer wybrał ${computerChoice}.`;
            messageElem.style.color = '#2ecc71';
        } else if (result === 'lose') {
            computerScore++;
            messageElem.textContent = `Przegrałeś! Komputer wybrał ${computerChoice}.`;
            messageElem.style.color = '#e74c3c';
        } else {
            messageElem.textContent = `Remis! Komputer wybrał również ${computerChoice}.`;
            messageElem.style.color = '#f1c40f';
        }

        playerScoreElem.textContent = playerScore;
        computerScoreElem.textContent = computerScore;

        if (playerScore === winLimit || computerScore === winLimit) {
            endGame();
        }
    };

    const endGame = () => {
        choices.forEach(choice => choice.disabled = true);
        restartButton.classList.remove('hidden');
        messageElem.textContent += playerScore === winLimit ? ' Gratulacje, wygrałeś grę!' : ' Niestety, przegrałeś grę.';
    };

    const resetGame = () => {
        playerScore = 0;
        computerScore = 0;
        playerScoreElem.textContent = playerScore;
        computerScoreElem.textContent = computerScore;
        messageElem.textContent = '';
        choices.forEach(choice => choice.disabled = false);
        restartButton.classList.add('hidden');
    };

    choices.forEach(choice => {
        choice.addEventListener('click', () => playGame(choice.dataset.choice));
    });

    restartButton.addEventListener('click', resetGame);
});
