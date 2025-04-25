const React = require('react');
const { useState, useEffect } = require('react');
const socket = require('../socket'); // Use CommonJS syntax for socket import
const store = require('../store');
const { useDispatch, useSelector } = require('react-redux');
const { playerActions } = require('../reducers/playerReducer');

const LobbyWindow = () => {
    const dispatch = useDispatch();
    const player = useSelector((state) => state.player);

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        if(!player.name){
            player.name = 'Stranger';
        }

        socket.emit('game request');
        
        socket.on('update game', (game) => {
            setPlayers(game.players);
        });

        return () => {
            socket.off('update game');
        };
    }, []);

    const handleNameChange = (event) => {
        const newName = event.target.value;
        store.dispatch(playerActions.setName(newName));
        socket.emit('change name', newName || 'Stranger');
    };

    return (
        <div id="home-content">

            <img src="assets/img/IKNOWBALL-LOGO-T.png" alt="IKNOWBALL" width="640px" height="480px"></img>
            <h3>Welcome {player.name || 'Stranger'}!</h3>
            <div id='player-profile'>
                <input
                    id='name-input'
                    type="text"
                    placeholder="Enter your name"
                    value={player.name === 'Mysterious' ? '' : player.name}
                    onChange={handleNameChange}
                />
            </div>

            <ul id='player-list'>
                {Object.values(players || {'empty':'empty'}).map((player) => (
                    <li key={player.id}>{player.name}</li>
                ))}
            </ul>
        </div>
    )

}

module.exports = LobbyWindow;