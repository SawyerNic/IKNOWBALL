const socket = io();

const showJoinedPlayers = () => {

    const playerList = document.querySelector('#players-list');

}

const init = () => {
    socket.on('test', () => {
        console.log('hello');
    });
}

window.onload = init;