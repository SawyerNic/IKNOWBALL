
// testing hard code
document.querySelector("#teamInput").innerHTML = "BOS";

const teamAbbreviations = [
    "CHW", "NYY", "LAD", "BOS", "HOU", "SF", "STL", "ATL", "SD", "TOR", "MIN", "PHI", "SEA", "MIL", "CIN", "TB", "BAL", "OAK", "DET", "CLE", "MIA", "KC", "PIT", "TEX", "NYM", "COL", "LAA", "WAS", "CHC", "ARI"
];

const topPlayers = {}; // Store highest AVG players for each team

const fetchHighestAvgForTeam = (teamAbv) => {
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
                        const avg = parseFloat(player["stats"]["Hitting"]["avg"]); // Convert to number
                        if (avg > highestAvg) {
                            highestAvg = avg;
                            bestPlayer = player;
                        }
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
        } catch (error) {
            console.error(`Error fetching stats for team ${teamAbv}:`, error);
        }
    };

    xhr.open('GET', `https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBTeamRoster?teamAbv=${teamAbv}&getStats=true`);

    xhr.setRequestHeader('x-rapidapi-key', 'fabbf68c61msh3a75043a4c9f7b1p182df7jsn5f14b335f8ae');
    xhr.setRequestHeader('x-rapidapi-host', 'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com');

    xhr.send();
};

const fetchHighestAvgForAllTeams = () => {
    teamAbbreviations.forEach(teamAbv => {
        fetchHighestAvgForTeam(teamAbv);
    });
};

// Check if the user guessed the correct player
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

// Add event listener to search button
document.querySelector("#guessButton").addEventListener("click", checkGuess);

// Fetch data when the page loads
window.onload = () => {
    fetchHighestAvgForAllTeams();
};