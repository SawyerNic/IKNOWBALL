const React = require('react');
const { useState, useEffect } = require('react');
const socket = require('../socket'); // Use CommonJS syntax for socket import
const { useDispatch, useSelector } = require('react-redux');
const { playerActions } = require('../reducers/playerReducer');

const LobbyWindow = () => {
    const dispatch = useDispatch();
    const player = useSelector((state) => state.player);

    const [players, setPlayers] = useState([]);

    useEffect(() => {
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
        dispatch(playerActions.setName(newName));
        socket.emit('change name', newName || 'mysterious');
    };

    return (
        <div id="home-content">

            <img src="assets/img/IKNOWBALL-LOGO-T.png" alt="IKNOWBALL" width="640px" height="480px"></img>
            <h3>Welcome {player.name || 'Mysterious'}!</h3>
            <div id='player-profile'>
                <input
                    id='name-input'
                    type="text"
                    placeholder="Enter your name"
                    value={player.name === 'mysterious' ? '' : player.name}
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