import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import DioButton from './components/DioButton'
import { Audio } from 'expo-av'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

let choice = 0;
let firstRun = false;

const connections = [
  {id: 0, text: 'Kono Dio Da~!'},
  {id: 1, text: 'Dio Scream'},
  {id: 2, text: '  Muda  '},
  {id: 3, text: 'Wryyyyy'},
  {id: 4, text: 'JoJo'},
  {id: 5, text: 'ZA WARUDO~!'},
  {id: 6, text: 'Stando~Pawa'},
  {id: 7, text: 'The Approach'},
  {id: 8, text: 'Counting'},
  {id: 9, text: 'Road~Roller~Da'},
];

const sounds = [
  {uri: require('./sounds/konodioda.mp3')},
  {uri: require('./sounds/dioscream.mp3')},
  {uri: require('./sounds/mudamuda.mp3')},
  {uri: require('./sounds/wryyyy.mp3')},
  {uri: require('./sounds/jooojo.mp3')},
  {uri: require('./sounds/zawarudo.mp3')},
  {uri: require('./sounds/standopawa.mp3')},
  {uri: require('./sounds/approach.mp3')},
  {uri: require('./sounds/counting.mp3')},
  {uri: require('./sounds/roller.mp3')},
];

export default class App extends React.Component {

  pressed = async(text) => {
    var track = connections.filter(connection => connection.text === text);
    choice = track[0].id;

    // alert(screenWidth + ", " + screenHeight);

    await this.componentDidMount();
  }

  async componentDidMount() {

    this.sound = new Audio.Sound();
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: false
      })

      const status = {
        shouldPlay: false
      };

      await this.sound.loadAsync(sounds[choice].uri, status, false);

      if(firstRun)
        await this.playSound();

      firstRun = true;

    } catch (e) {
      alert('Sound component overloaded. Please slow down!!' +
      '\n\n(Note: If the keys don\'t work, please restart this glorious app)');
    }
  }

  async playSound() {
    await this.sound.playAsync();
    // await this.sound.setPositionAsync(4);
  }
  
  render() {
    let titleWidth = Math.floor(screenWidth/8);
    let theManWidth = Math.floor(screenWidth/12);
    let note = Math.floor(screenWidth/24);

    return (
      <View style={styles.container}>
      <ImageBackground source={require('./sources/It_Was_Me__Dio!.jpg')} style={styles.image} resizeMode='cover'>
        <View style={styles.header}>  
            <Text style={[styles.title, {fontSize: titleWidth}]}>Dio Voice Mesh</Text>
            <Text style={[styles.theman, {fontSize: theManWidth}]}>By Zoraiz</Text>
            <Text style={[styles.titlesmall, {fontSize: note}]}>(Note: Press buttons simultaneously)</Text>
            <Text style={[styles.titlesmall, {fontSize: note}]}>v3.0</Text>
          </View>
          <View style={styles.controls}>
            <View style={styles.row}>
              <DioButton text='Kono Dio Da~!' pressed={this.pressed}/>
              <DioButton text='Dio Scream' pressed={this.pressed}/>
            </View>
            <View style={styles.row}>
              <DioButton text='  Muda  ' pressed={this.pressed}/>
              <DioButton text='Wryyyyy' pressed={this.pressed}/>
            </View>
            <View style={styles.row}>
              <DioButton text='JoJo' pressed={this.pressed}/>
              <DioButton text='ZA WARUDO~!' pressed={this.pressed}/>
            </View>
            <View style={styles.row}>
              <DioButton text='Stando~Pawa' pressed={this.pressed}/>
              <DioButton text='Counting' pressed={this.pressed}/>
            </View>
            <View style={styles.row}>
              <DioButton text='The Approach' pressed={this.pressed}/>
              <DioButton text='Road~Roller~Da' pressed={this.pressed}/>
            </View>
          </View>
      </ImageBackground>
      
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titlesmall: {
    color: 'white',
    elevation: 3
  },

  theman: {
    color: 'white',
    elevation: 3
  },

  btt: {
    padding: 30,
    marginLeft: 20,
  },

  image: {
    width: screenWidth,
    height: screenHeight,
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  row: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 3,
  },

  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    // backgroundColor: 'blue',
  },

  controls: {
    flex: 3,
    width: 400,
    justifyContent: 'center',
    width: screenWidth,
    // backgroundColor: 'red',
  },

  title: {
    marginBottom: -5,
    color: 'white',
    fontWeight: 'bold',
    elevation: 3,
  },

  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    height: screenHeight,
    width: screenWidth,
  },
});