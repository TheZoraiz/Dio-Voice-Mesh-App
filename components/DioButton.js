import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';

var size = 0;

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const setSize = (newSize) => {
    size = newSize;
}

export default function DioButton( {textSize, text, pressed} ) {
    let bttHeight = screenHeight/24;
    let bttWidth = screenWidth/11;

    return (
        <TouchableOpacity delayPressIn={0} onPress={async() => pressed(text)}>
            <View style={[styles.btt, {paddingVertical: bttHeight, paddingHorizontal: bttWidth}]}>
                <Text style={styles.text}>{ text }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btt: {
        borderRadius: 25,
        // paddingVertical: 30,
        // paddingHorizontal: 40,
        backgroundColor: 'blue',
        marginLeft: 5,
        marginRight: 5,
        elevation: 5,
        opacity: 0.7,
    },

    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    }
});