const { createRoot } = require('react-dom/client');
const React = require('react');
const { useState, useEffect } = require('react');
const { QuestionComponent, AnsweredView, LoadingScreen, LobbyWindow } = require('./components');
const { Provider } = require('react-redux');
const store = require('./store');
const { useSelector, useDispatch } = require('react-redux');
const { playerActions } = require('./reducers/playerReducer');
const socket = require('./socket'); // Use CommonJS syntax for socket import

const sendAnswer = (answer) => {
    socket.emit('player send answer', answer);
}

const GameWindow = () => {
    const dispatch = useDispatch(); // Use dispatch to update Redux state
    const myPlayer = useSelector((state) => state.player); // Access player state from Redux
    const [gameWindow, updateGameWindow] = useState(<LoadingScreen />);
    const [timer, updateTimer] = useState(15);


    useEffect(() => {
        socket.on('send game state', (started) => {
            console.log(started);

            if (started == true) {
                // do started thing
                updateGameWindow(<AnsweredView />);

            } else {
                console.log('asdfa');
                updateGameWindow(<LobbyWindow myPlayer={myPlayer.name} />);
            }
        });

    }, [myPlayer])

    useEffect(() => {

        const savedPlayer = JSON.parse(sessionStorage.getItem('player'));
        socket.emit('add player', savedPlayer);

        // Handle 'player created' event
        socket.on('player created', (player) => {

            console.log('Player created' + player);
            store.dispatch(playerActions.setPlayer(player)); // Update the entire player object in Redux
            sessionStorage.setItem('player', JSON.stringify(player)); // Save to session storage

            socket.emit('get game state');

        });

        // Handle 'server send question' event
        socket.on('server send question', (sentQuestion) => {
            console.log("sentQuestion: " + JSON.stringify(sentQuestion));
            updateGameWindow(<QuestionComponent question={sentQuestion} answerHandler={sendAnswer} myPlayer={myPlayer} />);
        });

        socket.on('server send results', () => {

        })

        socket.on('game cancelled', () => {
            console.log('game cancelled');
            updateGameWindow(<LobbyWindow myPlayer={myPlayer.name} />);
        });

        socket.on('name change confirm', (player) => {
            sessionStorage.setItem('player', JSON.stringify(player));
            dispatch(playerActions.setPlayer(player));
            console.log(myPlayer.name);
        });

        // Cleanup listeners on unmount
        return () => {
            socket.off('player created');
            socket.off('server send question');
            socket.off('timer update');
            socket.off('update game');
        };
    }, []);

    return (
        <div>
            <div className="baseball-banner">
                {Array.from({ length: 10 }).map((_, index) => (
                    <img key={index} src="assets/img/baseball.png" className="baseball" style={{ animationDelay: `${index * 0.5}s` }} alt="Baseball" />
                ))}
            </div>
            <div id='question-container'>
                {gameWindow}
            </div>
        </div>
    )
}

const init = () => {

    const rootElement = document.getElementById('content');
    const root = createRoot(rootElement);

    root.render(
        <Provider store={store}>
            <GameWindow />
        </Provider>
    );
}

window.onload = init;