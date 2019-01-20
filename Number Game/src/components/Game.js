import React from 'react';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber'
import { View, Text, Button, StyleSheet } from 'react-native';

class Game extends React.Component{

    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
    };

    state = {
        selectedNumbers: [],
    };

    // generate random number array
    randomNumbers = Array.from({length: this.props.randomNumberCount})
                    .map(() => 1 + Math.floor(10 * Math.random()));
    targetSum = this.randomNumbers.slice(0, this.props.randomNumberCount - 2).reduce((acc, curr) => acc + curr, 0);
   
    isNumberSelected = (index) =>{
        return this.state.selectedNumbers.indexOf(index) >= 0;
    };

    selectRandomNumber = (index) => {
        this.setState((prevState)=>({
            selectedNumbers: [...prevState.selectedNumbers, index],
        }));
    };

    render(){
        return(
            <View style = {styles.container}>
                <Text style = {styles.target}> 
                   {this.targetSum}
                </Text>

                <View style = {styles.randomNumContainer}> 
                {
                    this.randomNumbers.
                        map((randomNumber, index) =>
                            <RandomNumber 
                                key = {index}
                                id = {index}
                                number = {randomNumber}
                                isDisabled = {this.isNumberSelected(index)}
                                onPress={this.selectRandomNumber}
                            />
                        )
                }
                </View>

            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 30,
    },
    target: {
        fontSize: 40,
        backgroundColor: '#339980',
        color: 'white',
        textAlign: 'center',
        borderRadius: 4,
        margin: 20,
    },
    randomNumContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
});

export default Game;