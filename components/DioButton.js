import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function DioButton( {flexValue, text, pressed} ) {
    let bttHeight = screenHeight/18;
    let bttWidth = screenWidth/11;

    return (
        <TouchableOpacity style={styles.btt, {flex: flexValue}} delayPressIn={0} onPress={() => pressed(text)}>
            <View style={[styles.btt, {paddingVertical: bttHeight, paddingHorizontal: bttWidth}]}>
                <Text style={styles.text}>{ text }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btt: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: 'blue',
        marginLeft: 5,
        marginRight: 5,
        elevation: 5,
        opacity: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textAlign: 'center',
    }
});