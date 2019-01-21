import React from 'react';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber'
import shuffle from 'lodash.shuffle';
import { View, Text, Button, StyleSheet } from 'react-native';

class Game extends React.Component{

    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds: PropTypes.number.isRequired,
        onPlayAgain: PropTypes.func.isRequired,
    };
    
    state = {
        selectedNumberIndexes: [],
        remainingSeconds: this.props.initialSeconds,
    };

    // instance
    gameStatus = 'PLAYING';

    // generate random number array
    randomNumbers = Array.from({length: this.props.randomNumberCount})
                    .map(() => 1 + Math.floor(10 * Math.random()));
    targetSum = this.randomNumbers.slice(0, this.props.randomNumberCount - 2).reduce((acc, curr) => acc + curr, 0);
    
    shuffledRandomNumbers = shuffle(this.randomNumbers);

    isNumberSelected = (index) =>{
        return this.state.selectedNumberIndexes.indexOf(index) >= 0;
    };

    selectRandomNumber = (index) => {
        console.log(index);
        this.setState((prevState)=>({
            selectedNumberIndexes: [...prevState.selectedNumberIndexes, index],
        }));
    };

    updateGameStatus = (nextState) => {
        const sumOfSelectNums = nextState.selectedNumberIndexes.reduce((acc, curr) => {
            return acc + this.shuffledRandomNumbers[curr];
        }, 0);
        
        if(nextState.remainingSeconds === 0)
            return "LOST";

        if(sumOfSelectNums < this.targetSum)
            return "PLAYING";
        
        if(sumOfSelectNums === this.targetSum)
            return "WON";
        
        return "LOST";
    };

    componentDidMount(){
        this.intervalId = setInterval(() => {
            this.setState((prevState) => {
                return {remainingSeconds : prevState.remainingSeconds - 1};
            }, () => {
            if(this.state.remainingSeconds === 0)
                clearInterval(this.intervalId);
            });
        },1000);
    };

    componentWillUpdate(nextProps, nextState){
        console.log(nextState.remainingSeconds);
        if(this.state.selectedNumberIndexes !== nextState.selectedNumberIndexes ||  nextState.remainingSeconds === 0){
            this.gameStatus = this.updateGameStatus(nextState);
            
            if(this.gameStatus !== 'PLAYING')
                clearInterval(this.intervalId);
        }
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    };

    render(){
        return(
            <View style = {styles.container}>
                <Text style = {[styles.target, styles[`STATUS_${this.gameStatus}`]]}> 
                   {this.targetSum}
                </Text>

                <View style = {styles.randomNumContainer}> 
                {
                    this.shuffledRandomNumbers.
                        map((randomNumber, index) =>
                            <RandomNumber 
                                key = {index}
                                id = {index}
                                number = {randomNumber}
                                isDisabled = {
                                    this.isNumberSelected(index) || this.gameStatus !==  'PLAYING'
                                }
                                onPress={this.selectRandomNumber}
                            />
                        )
                }
                </View>

                <Text style = {[styles.target, { backgroundColor: '#e01421'}]}>
                    {this.state.remainingSeconds}
                </Text>

                { 
                    this.gameStatus !== 'PLAYING' && (
                        <Button 
                            title = 'Play Again'
                            onPress = {this.props.onPlayAgain}
                        />
                    )
                }
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 20,
    },
    target: {
        fontSize: 40,
        color: 'white',
        textAlign: 'center',
        borderRadius: 4,
        margin: 40,
    },
    randomNumContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    play:{
        width: 40,
        margin: 20,
    },
    STATUS_PLAYING: {
        backgroundColor: '#07c1ff',
    },
    STATUS_WON: {
        backgroundColor: '#077a52',
    },
    STATUS_LOST: {
        backgroundColor: '#e01421',
    }

});

export default Game;