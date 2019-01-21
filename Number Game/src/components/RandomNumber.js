import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

class RandomNumber extends React.Component{

    static propTypes = {
        id: PropTypes.number.isRequired,
        number: PropTypes.number.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    handleNumberClick= () =>{
        if(!this.props.isDisabled)
            this.props.onPress(this.props.id);
    };

    render(){
        return(
            <TouchableOpacity onPress={this.handleNumberClick}>
                <Text style = {[styles.number, this.props.isDisabled && styles.disabled]}>
                 {this.props.number} 
                </Text>
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    number: {
        fontSize: 35,
        borderRadius: 50,
        width: 120,
        marginHorizontal: 35,
        marginVertical: 20,
        backgroundColor: '#669933',
        color: 'white',
        textAlign: 'center',
        padding: 4,
    },
    disabled: {
        opacity: 0.4,
    }
});

export default RandomNumber;