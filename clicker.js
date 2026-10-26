const money = document.getElementById("money");
const stocks = document.getElementById("stocks");
const crypto = document.getElementById("crypto");
const ponzi = document.getElementById("ponzi");

let currentMoney = 0;
let clickPower = 1;
let unlockedStocks = false;
let unlockedCrypto = false;
let unlockedPonzi = false;

money.innerText = currentMoney + "$";

document.querySelector(".main-button button").addEventListener("click", () => {
    currentMoney += clickPower;
    money.innerText = currentMoney + "$";
    saveGame();

    if (currentMoney >= 100 && unlockedStocks === false) {
        alert("You have reached 100$! You can now invest in stocks!");
        stocks.innerText = "Invest in Stocks ($100)";
        unlockedStocks = true; 
    }

    if (currentMoney >= 200 && unlockedCrypto === false) {
        alert("You have reached 200$! You can now buy crypto!")
        crypto.innerText = "Buy Crypto ($200)";
        unlockedCrypto = true;
    }

    if (currentMoney >= 500 && unlockedPonzi === false) {
        alert("You have reached 500$! You can now invest in a Ponzi scheme!")
        ponzi.innerText = "Start a Ponzi Scheme ($500)";
        unlockedPonzi = true;
    }
});

stocks.addEventListener("click", () => {
    if (currentMoney >= 100 && unlockedStocks === true) {
        currentMoney -= 100;
        money.innerText = currentMoney + "$";
        clickPower += 5;
        stocks.innerText = "Stocks Owned (+5$/click)";
        saveGame();
    }
});

crypto.addEventListener("click", () => {
    if (currentMoney >= 200 && unlockedCrypto === true) {
        currentMoney -= 200;
        money.innerText = currentMoney + "$";
        clickPower += 10;
        crypto.innerText = "Crypto Bought (+10$/click)";
        saveGame();
    }
});

ponzi.addEventListener("click", () => {
    if (currentMoney >= 500 && unlockedPonzi === true) {
        currentMoney -= 500;
        money.innerText = currentMoney + "$";
        clickPower += 20;
        ponzi.innerText = "Ponzi Scheme Started (+20$/click)";
        saveGame();
    }
});

function saveGame() {
    const gameState = {
        money: currentMoney,
        power: clickPower,
        hasStocks: unlockedStocks,
        hasCrypto: unlockedCrypto,
        hasPonzi: unlockedPonzi
    };
    
    localStorage.setItem("millionaireSave", JSON.stringify(gameState));
    console.log("Game Saved!");
}

function loadGame() {
    const savedData = localStorage.getItem("millionaireSave");

if (savedData) {
    const gameState = JSON.parse(savedData);

    currentMoney = gameState.money;
    clickPower = gameState.power;
    unlockedStocks = gameState.hasStocks;
    unlockedCrypto = gameState.hasCrypto;
    unlockedPonzi = gameState.hasPonzi;
    money.innerText = currentMoney + "$";

        if (unlockedStocks) {
            stocks.innerText = "✅ Stocks Owned (+$1/click)";
        }

        if (unlockedCrypto) {
            crypto.innerText = "✅ Crypto Owned (+$1/click)";
        }

        if (unlockedPonzi) {
            ponzi.innerText = "✅ Ponzi Scheme Owned (+$1/click)";
        }
    }   
}

loadGame();
