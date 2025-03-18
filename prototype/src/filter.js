

const teamAbbreviations = [
    "CHW", "NYY", "LAD", "BOS", "HOU", "SF", "STL", "ATL", "SD", "TOR", "MIN", "PHI", "SEA", "MIL", "CIN", "TB", "BAL", "OAK", "DET", "CLE", "MIA", "KC", "PIT", "TEX", "NYM", "COL", "LAA", "WAS", "CHC", "ARI"
];

let allPlayers = [];  // Store all players for suggestions
let topPlayers = {};  // Store highest AVG players for each team

// Fetch players and highest AVG player for a team
const fetchHighestAvgForTeam = (teamAbv) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.onload = (e) => {
            try {
                const json = JSON.parse(e.target.responseText);

                if (json.statusCode === 200 && json.body && json.body["roster"]) {
                    const roster = json.body["roster"];
                    let highestAvg = 0;
                    let bestPlayer = null;

                    for (const key in roster) {
                        const player = roster[key];

                        if (player["stats"] && player["stats"]["Hitting"] && player["stats"]["Hitting"]["avg"] !== undefined) {
                            const avg = parseFloat(player["stats"]["Hitting"]["avg"]);
                            if (avg > highestAvg) {
                                highestAvg = avg;
                                bestPlayer = player;
                            }
                        }

                        // Store all player names for suggestions
                        if (player.longName) {
                            allPlayers.push(player.longName);
                        }
                    }

                    if (bestPlayer) {
                        topPlayers[teamAbv] = {
                            name: bestPlayer.longName.toLowerCase(),
                            displayName: bestPlayer.longName,
                            avg: highestAvg.toFixed(3),
                            team: teamAbv
                        };
                    }
                }
                resolve(); // Mark this team as processed
            } catch (error) {
                console.error(`Error fetching stats for team ${teamAbv}:`, error);
                reject(error);
            }
        };

        xhr.open('GET', `https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBTeamRoster?teamAbv=${teamAbv}&getStats=true`);
        xhr.setRequestHeader('x-rapidapi-key', '7ae8c5cc74mshe21e4edb293a826p10e2b7jsna7716cc92e34');
        xhr.setRequestHeader('x-rapidapi-host', 'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com');
        xhr.send();
    });
};

// Fetch all teams' data
const fetchHighestAvgForAllTeams = async () => {
    try {
        await Promise.all(teamAbbreviations.map(team => fetchHighestAvgForTeam(team)));
        console.log("All teams' data loaded.");
    } catch (error) {
        console.error("Error fetching team data:", error);
    }
};

// Suggestion box functionality
function fetchPlayers() {
    let inputElement = document.getElementById("playerInput");
    let input = inputElement.value.toLowerCase();
    let suggestionsBox = document.getElementById("suggestions");
    
    // Clear previous suggestions
    suggestionsBox.innerHTML = "";

    if (input.length === 0) {
        suggestionsBox.style.display = "none";  
        return;
    }

    // Position the suggestions box right below the input box
    let rect = inputElement.getBoundingClientRect();
    suggestionsBox.style.top = `${rect.bottom + window.scrollY}px`;
    suggestionsBox.style.left = `${rect.left + window.scrollX}px`;
    suggestionsBox.style.width = `${rect.width}px`;
    suggestionsBox.style.display = "block";

    // Filter allPlayers based on user input
    const filteredPlayers = allPlayers.filter(name => name.toLowerCase().includes(input));

    if (filteredPlayers.length > 0) {
        const suggestionsToShow = filteredPlayers;

        suggestionsToShow.forEach(name => {
            let div = document.createElement("div");
            div.textContent = name;
            div.onclick = function () {
                inputElement.value = name;

                // Hide suggestions when a player is selected
                suggestionsBox.style.display = "none";
            };
            suggestionsBox.appendChild(div);
        });
    } else {
        suggestionsBox.style.display = "none";  
    }
}

// Check if user guessed the correct player
const checkGuess = () => {
    const teamInput = document.querySelector("#teamInput").textContent.trim().toUpperCase();
    const playerInput = document.querySelector("#playerInput").value.trim().toLowerCase();
    const resultBox = document.querySelector("#result");

    if (!teamAbbreviations.includes(teamInput)) {
        resultBox.innerHTML = "Invalid team abbreviation. Please enter a valid team code.";
        return;
    }

    if (topPlayers[teamInput]) {
        const bestPlayer = topPlayers[teamInput];

        if (playerInput === bestPlayer.name) {
            resultBox.innerHTML = `Correct! ${bestPlayer.displayName} has the highest batting AVG for ${bestPlayer.team}: <strong>${bestPlayer.avg}</strong>`;
        } else {
            resultBox.innerHTML = `Incorrect!`;
        }
    } else {
        resultBox.innerHTML = "Data is still loading... Please try again in a few seconds.";
    }
};

// Add event listeners
document.querySelector("#guessButton").addEventListener("click", checkGuess);
document.querySelector("#playerInput").addEventListener("input", fetchPlayers);

// Fetch data when the page loads
window.onload = () => {
    fetchHighestAvgForAllTeams();
    countdown();
};

let timeLeft = 60;

const countdown = () => {
    if (timeLeft <= 0) {
        document.querySelector("#timer").innerHTML = "0:00";
        return; 
    }

    if (timeLeft <= 15){
        document.querySelector("#timer").style.color = "red";
    }

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds; // Format as "0X"

    document.querySelector("#timer").innerHTML = `${minutes}:${seconds}`;
    timeLeft--;

    setTimeout(countdown, 1000);
};

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

