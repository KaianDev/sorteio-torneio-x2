/*Elements
-----------------------------*/
const form = document.querySelector("form");
const playerNameEl = form.querySelector("#playerName");
const players = [];
const count = document.querySelector("#countPlayer");
const listArea = document.querySelector("#listArea");
const btnGenerateTeams = document.querySelector("#generateTeams");
const teamArea = document.querySelector("#teamArea");
const btnCreateClashes = document.querySelector("#createClashes");
const clashesArea = document.querySelector("#clashesArea");
let oldTeams;
count.innerHTML = players.length;

/*Functions
-----------------------------*/
function insertPlayer(event) {
    event.preventDefault();
    const playerName = playerNameEl.value;

    if (playerName) {
        if (!players.includes(playerName)) {
            let playerEl = renderPlayer(playerName);
            players.push(playerName);
            listArea.appendChild(playerEl);
            count.innerHTML = players.length;
            toggleBtn(players, btnGenerateTeams, 4);
        } else {
            alert("Jogador já cadastrado!");
        }
    }
    playerNameEl.value = "";
    playerNameEl.focus();
    teamArea.innerHTML = "";
    oldTeams = "";
    toggleBtn(oldTeams, btnCreateClashes, 2);
}

function renderPlayer(player) {
    let playerEl = document
        .querySelector(".template .player-list")
        .cloneNode(true);
    playerEl.querySelector("input").value = player;
    playerEl.querySelector("button").addEventListener("click", (e, player) => {
        let target = e.target.closest(".player-list");
        target.remove();
        removePlayerOfList(player);
    });

    return playerEl;
}

function removePlayerOfList(player) {
    let index = players.indexOf(player);
    players.splice(index, 1);
    count.innerHTML = players.length;
    teamArea.innerHTML = "";
    toggleBtn(players, btnGenerateTeams, 4);
}

function toggleBtn(list, element, length) {
    if (list.length >= length && list.length % 2 === 0 && list !== "") {
        element.classList.remove("disabled");
    } else {
        element.classList.add("disabled");
    }
}

function createList(list) {
    let newList = [];
    let halfListLength = list.length / 2;
    for (let i = 0; i < halfListLength; i++) {
        newList.push([]);
    }
    newList.map((item) => {
        while (item.length < 2) {
            let random = Math.floor(Math.random() * list.length);
            item.push(list[random]);
            list.splice(random, 1);
        }
    });
    return newList;
}

function generateTeamsEl() {
    let cloneList = [...players];
    let teams = createList(cloneList);
    oldTeams = [...teams];
    toggleBtn(oldTeams, btnCreateClashes, 2);
    teamArea.innerHTML = "";
    teams.map((player, index) => {
        let li = document.createElement("li");
        let h4 = document.createElement("h4");
        let h6 = document.createElement("h6");

        h6.innerHTML = `Equipe ${index + 1}`;
        h4.innerHTML = `${player[0]} | ${player[1]}`;

        li.appendChild(h6);
        li.appendChild(h4);

        teamArea.appendChild(li);
    });
    clashesArea.innerHTML = "";
}

function createClashes() {
    let cloneList = [...oldTeams];
    let clashes = createList(cloneList);
    clashesArea.innerHTML = "";
    clashes.map((item, index) => {
        let h4 = document.createElement("h4");
        h4.innerHTML = `Partida ${index + 1}`;
        let x = document.createElement("div");
        x.className = "x";
        x.innerHTML = "❌";
        let clash = document.createElement("div");
        clash.className = "clashes";
        let team1 = document.createElement("div");
        team1.className = "team1";
        team1.innerHTML = `${item[0][0]} | ${item[0][1]}`;
        let team2 = document.createElement("div");
        team2.className = "team2";
        team2.innerHTML = `${item[1][0]} | ${item[1][1]}`;

        clash.appendChild(h4);
        clash.appendChild(team1);
        clash.appendChild(x);
        clash.appendChild(team2);

        clashesArea.appendChild(clash);
    });
}

/*Events
-----------------------------*/
form.addEventListener("submit", insertPlayer);
btnGenerateTeams.addEventListener("click", generateTeamsEl);
btnCreateClashes.addEventListener("click", createClashes);
