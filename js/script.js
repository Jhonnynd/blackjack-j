//button, input and output
const submit = document.querySelector("#submit-button");
const inputField = document.querySelector("#input-field");
const output = document.querySelector("#output-div");

//global variables
let deck = [];
let playerSum = 0;
let dealerSum = 0;
let start = false;


checkGameStatus = () => { // check the game constantly, everytime it's called
    if (playerSum >= 21) {
        output.innerHTML += `<p>you lost! </p>`;
        restartGame();
    } else if (dealerSum >= 21) {
        output.innerHTML += `<p>Dealer lost!</p>`;
        restartGame();
    }
}

const buildDeck = () => { //Building the deck
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
    for (let i = 0; i < suits.length; i++) { // fill deck with the cards
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + suits[i]);
        }
    }
}

const shuffleDeck = () => { // shuffle the deck
    for (let i = 0; i < deck.length; i++) { // randomize deck with Math.random
        let randomNumber = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[randomNumber];
        deck[randomNumber] = temp;
    }
}

const grabACard = () => { // grab a card, whether it is for the player or the dealer
    let randomCard = Math.floor(Math.random() * deck.length);
    let card = deck[randomCard].split("-");
    if (card[0] === "J" || card[0] === "Q" || card[0] === "K") { // puts value to suits
        card[0] = 10;
    } else if (card[0] === "A") { // puts value to ace
        card[0] = 11;
    }
    deck.splice(randomCard, 1);
    return card; // returns the card
}

const dealerLogic = () => { // Logic of the dealer
    if (start === true) { // checks if the game is still ongoing
        let random = Math.floor(Math.random() * 2); // to ramdomize its move
        if (random === 0 || dealerSum < 17) {
            output.innerHTML += `<p>Dealer chose to hit.</p>`;
            let dealerCard = grabACard();
            output.innerHTML += `<p>Dealer was handed a ${dealerCard[0]} of ${dealerCard[1]}</p>`;
            dealerSum += Number(dealerCard[0]);
            checkGameStatus();
        } else {
            output.innerHTML += `<p>Dealer chose to stand.</p>`;
        }
    }
}

const restartGame = () => { // used to restart the game
    output.innerHTML += `<p>Write "start" to restart the game!</p>`;
    start = false;
    playerSum = 0;
    dealerSum = 0;
    inputField.value = "";
}

const startGame = () => { // function called when the game starts
    output.innerHTML += `<p>the game starts!</p>`
    output.innerHTML = "";
    start = true;
    inputField.value = "";
    let playerCard1 = grabACard(); // first card the player gets
    output.innerHTML += `<p>you were handed a ${playerCard1[0]} of ${playerCard1[1]}</p>`;
    playerSum += Number(playerCard1[0]);
    let playerCard2 = grabACard(); // second card the player gets
    output.innerHTML += `<p>you were handed a ${playerCard2[0]} of ${playerCard2[1]}</p>`;
    playerSum += Number(playerCard2[0]);
    let dealerCard1 = grabACard(); // first card the dealer gets
    output.innerHTML += `<p>Dealer was handed a ${dealerCard1[0]} of ${dealerCard1[1]}</p>`;
    dealerSum += Number(dealerCard1[0]);
    let dealerCard2 = grabACard(); // second card the dealer gets
    output.innerHTML += `<p>Dealer was handed a ${dealerCard2[0]} of ${dealerCard2[1]}</p>`;
    dealerSum += Number(dealerCard2[0]);
    checkGameStatus();
}

const stand = () => { // Player choose to stand
    output.innerHTML += `<p>You chose to stand </p>`;
    dealerLogic();
    checkGameStatus();
}

submit.addEventListener("click", function () { // check input
    if (inputField.value.toLowerCase() === "start") {
        startGame();
    }
    else if (inputField.value.toLowerCase() === "hit") { // if the player chooses to hit
        if (!start) { // checks if the game started
            alert("you need to write start in order to start the game!")
        } else {
            if (playerSum < 21) { 
                let playerCard = grabACard();
                output.innerHTML += `<p>you chose to hit </p>`;
                output.innerHTML += `<p>you were handed a ${playerCard[0]} of ${playerCard[1]} </p>`;
                playerSum += Number(playerCard[0]);
                inputField.value = "";
                checkGameStatus();
                dealerLogic();
            }
        }
    }
    else if (inputField.value.toLowerCase() === "stand") { // if the player chooses to stand
        if (!start) { // checks if the game started
            alert("you need to write start in order to start the game!")
        } else {
            stand();
        }
    }
     else {
        alert("You entered a wrong command.")
     }
});


buildDeck();
shuffleDeck();