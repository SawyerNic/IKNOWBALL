document.querySelector("#guessButton").addEventListener("click", function() {
    // Get the player's input
    let playerName = document.querySelector('#playerInput').value.trim();

    // Check if the name is correct
    if (playerName.toLowerCase() === "shohei ohtani") {
        document.querySelector("#result").textContent = "Correct!";
    } else {
        document.querySelector("#result").textContent = "Incorrect!";
    }
});
