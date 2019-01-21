import React from 'react';
import Game from './Game';

class App extends React.Component{

    state = {
        gameId: 1,
    };

    reset = () =>{
        this.setState((prevState) =>{
            return {gameId : prevState.gameId + 1};
        });
    };

    render(){
        return(
            <Game 
                key = {this.state.gameId} 
                randomNumberCount = {6} 
                initialSeconds = {10}
                onPlayAgain = {this.reset}
            />
        );
    }
}

export default App;