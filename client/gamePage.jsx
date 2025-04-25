const { createRoot } = require('react-dom/client');
const React = require('react');
const { useState, useEffect } = require('react');
const { QuestionComponent, AnsweredView, LoadingScreen, LobbyWindow, ResultView } = require('./components');
const { Provider } = require('react-redux');
const store = require('./store');
const { useSelector, useDispatch } = require('react-redux');
const { playerActions } = require('./reducers/playerReducer');
const socket = require('./socket'); // Use CommonJS syntax for socket import

const GameWindow = () => {
    const dispatch = useDispatch(); // Use dispatch to update Redux state
    const myPlayer = useSelector((state) => state.player); // Get the player state directly from Redux
    const [gameState, setGameState] = useState('loading'); // Track the current game state
    const [currentQuestion, setCurrentQuestion] = useState(null);

    useEffect(() => {

        // runs once when component mounts:
        socket.emit('get game state');

        socket.on('server send results', (game) => {
            store.dispatch(playerActions.setAnswered(false));
            console.log(game);
            setGameState('results');
        })

        socket.on('game cancelled', () => {
            store.dispatch(playerActions.setAnswered(false));
            setGameState('lobby');
        });

        socket.on('send game state', (game) => {
            console.log(game.gameStarted);
            console.log(myPlayer);

            if (myPlayer.answered == true) {
                console.log('redux player answered');
                setGameState('answered');

            }
            else if (game.gameStarted == true) {
                // do started thing
                setCurrentQuestion(game.questions[game.currentRound]);
                setGameState('question');
            } else {
                setGameState('lobby');
            }
        });

        // Handle 'server send question' event
        socket.on('server send question', (sentQuestion) => {
            setCurrentQuestion(sentQuestion);
            setGameState('question');
        });

        // Cleanup listeners on unmount
        return () => {
            socket.off('player created');
            socket.off('server send question');
            socket.off('timer update');
            socket.off('update game');
        };
    }, []);

    // Synchronize sessionStorage whenever myPlayer changes
    useEffect(() => {
        sessionStorage.setItem('player', JSON.stringify(myPlayer));
        console.log(myPlayer);
    }, [myPlayer]);

    const sendAnswer = (answer) => {
        console.log('sending answer');
        store.dispatch(playerActions.setAnswered(true));

        socket.emit('player send answer', answer);
        setGameState('answered');
    };

    return (
        <div>
            <div className="baseball-banner">
                {Array.from({ length: 10 }).map((_, index) => (
                    <img key={index} src="assets/img/baseball.png" className="baseball" style={{ animationDelay: `${index * 0.5}s` }} alt="Baseball" />
                ))}
            </div>
            <div id="question-container">
                {gameState === 'loading' && <LoadingScreen />}
                {gameState === 'lobby' && <LobbyWindow myPlayer={myPlayer.name} />}
                {gameState === 'question' && (
                    <QuestionComponent
                        question={currentQuestion}
                        answerHandler={sendAnswer}
                        myPlayer={myPlayer}
                    />
                )}
                {gameState === 'answered' && <AnsweredView />}
                {gameState === 'results' && <ResultView />}
            </div>
        </div>
    )
}

const init = () => {

    const rootElement = document.getElementById('content');
    const root = createRoot(rootElement);

    const savedPlayer = JSON.parse(sessionStorage.getItem('player'));
    console.log(savedPlayer);
    store.dispatch(playerActions.setPlayer(savedPlayer)); // Update the entire player object in Redux
    socket.emit('add player', savedPlayer);

    root.render(
        <Provider store={store}>
            <GameWindow />
        </Provider>
    );
}

window.onload = init;