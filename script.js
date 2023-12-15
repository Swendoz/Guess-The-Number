const successGifs = [ "https://www.ommzi.com/wp-content/uploads/2018/01/success-gif-9.gif", "https://media.tenor.com/acr9jnY9RtMAAAAM/ok-bye.gif", "https://www.icegif.com/wp-content/uploads/icegif-4640.gif" ]
const failGifs = [ "https://i.gifer.com/jU.gif", "https://img.huffingtonpost.com/asset/5b9cf2cf1f00002d00216ca1.gif", "https://i.pinimg.com/originals/83/5c/f1/835cf19a7fc40d519295eeef0283ad59.gif", "https://media.tenor.com/xmWYvFbVM_AAAAAM/crying-sad.gif" ]

var getal = Math.floor(Math.random() * 100) + 1;
var teller = 0;
var limit = 10;
var helpDistance = 10;
var triedNumbers = [];
var isGameOver = false;

console.log(getal);

const checkButton = document.getElementById("checkButton");
const numberInput = document.getElementById("numberInput");
const helpButton = document.getElementById("helpButton");
checkButton.addEventListener("click", () =>
{
    if (numberInput.value == "" || numberInput.value == null)
    {
        SetError("Vul een getal in!");
        return;
    }

    if (numberInput.value < 1 || numberInput.value > 100)
    {
        SetError("Getal moet tussen 1 en 100 zijn!");
        return;
    }

    teller++;
    SetTriedText();
    if (numberInput.value == getal)
    {
        Win();
        return;
    }

    if (teller > limit - 1)
    {
        Lose();
        return;
    }

    if (teller > (limit / 3))
    {
        helpButton.classList.add("active");
    }

    if (numberInput.value > getal)
    {
        SetTriedNumber(numberInput.value, "down");
        SetError("Lager!");
        return;
    }

    if (numberInput.value < getal)
    {
        SetTriedNumber(numberInput.value, "up");
        SetError("Hoger!");
        return;
    }
});

helpButton.addEventListener("click", () =>
{
    if (!helpButton.classList.contains("active")) return;

    helpButton.classList.remove("active");
    helpButton.classList.add("disabled");

    const helpAssist = Math.floor(Math.random() * helpDistance) + 1;

    var helpNumber1 = getal - helpAssist;
    var helpNumber2 = getal + helpAssist;

    if (helpNumber1 < 1)
        helpNumber1 = 1;
    else if (helpNumber2 > 100)
        helpNumber2 = 100;

    helpButton.textContent = `Het getal is tussen ${ helpNumber1 } en ${ helpNumber2 }`;
});

const errorText = document.getElementById("errorText");
let errorTimer;
const SetError = (message) =>
{
    if (!message)
    {
        HideError();
        return;
    }

    ShowError(message);
};

const ShowError = (message) =>
{
    errorText.classList.add("active");
    errorText.innerText = message;

    if (errorTimer)
        clearTimeout(errorTimer);


    // Yeni bir timer başlat
    errorTimer = setTimeout(() =>
    {
        HideError();
    }, 2000);
};

const HideError = () =>
{
    errorText.classList.remove("active");
    errorText.innerText = "";
    errorTimer = null;
};


const triedText = document.getElementById("triedText");
const SetTriedText = () =>
{
    triedText.innerText = teller + " / " + limit;
}
SetTriedText();

const triedNumbersBox = document.getElementById("triedNumbers");
const SetTriedNumber = (number, stats) =>
{
    const triedNumber = document.createElement("div");
    triedNumber.classList.add("triedNumber");
    triedNumber.innerHTML = `${ number } <img class="${ stats }" src="./arrow.png" alt="" />`
    triedNumbersBox.appendChild(triedNumber);
}

const resultBox = document.getElementById("resultBox");
const resultImage = document.getElementById("resultImage");
const resultText = document.getElementById("resultText");
const winnerBox = document.getElementById("winnerBox");
const winningNumber = document.getElementById("winningNumber");
const numberOfTries = document.getElementById("numberOfTries");
const Win = () =>
{
    resultBox.classList.add("active");
    resultImage.src = successGifs[ Math.floor(Math.random() * successGifs.length) ];
    resultText.innerText = "Je hebt gewonnen!";
    winningNumber.innerText = getal;
    numberOfTries.innerText = teller;
    isGameOver = true
}

const Lose = () =>
{
    resultBox.classList.add("active");
    resultImage.src = failGifs[ Math.floor(Math.random() * failGifs.length) ];
    resultText.innerText = "Je hebt verloren!";
    winningNumber.innerText = getal;
    numberOfTries.innerText = "zo veel";
    isGameOver = true
}

const playAgainButton = document.getElementById("playAgainButton");
playAgainButton.addEventListener("click", () =>
{
    window.location.reload();
});

numberInput.addEventListener("keyup", (event) =>
{
    if (teller > limit) return;
    if (isGameOver) return;

    if (event.key === "Enter")
    {
        event.preventDefault();
        checkButton.click();
    }
});