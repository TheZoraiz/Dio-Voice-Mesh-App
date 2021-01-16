import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Audio } from 'expo-av';
import DioButton from './components/DioButton';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

let titleWidth = Math.floor(screenWidth/8);

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

let soundObjects = [];

let interval = setInterval(() => {}, 500);

const App = () => {
  const [ randomColor, setRandomColor ] = useState('red');
  const [ randomText, setRandomText ] = useState('Play Randomly');

  const pressed = async(text) => {
    var track = connections.filter(connection => connection.text === text);
    let trackID = track[0].id;

    let soundObject = new Audio.Sound();

    try {

      await soundObject.loadAsync(sounds[trackID].uri);
      await playSound(soundObject);

      soundObjects.push(soundObject);

    } catch (e) {
      stopAll();
      alert('Sound component overloaded.' +
      '\n\n(Note: If the keys don\'t work, please restart the app)');
      console.log(e);
    }
  }

  const playSound = async(soundObject) => {
    await soundObject.playAsync();
  }

  const random = () => {
    stopAll()
    if(randomText === 'Playing...')
      return;

    setRandomColor('green');
    setRandomText('Playing...');

    let song = connections[Math.floor(Math.random() * connections.length)].text;
    pressed(song);
    interval = setInterval(() => {
      let song = connections[Math.floor(Math.random() * connections.length)].text;
      pressed(song);
    }, 1500);
  }

  const stopAll = async() => {
    clearInterval(interval);
    setRandomColor('red');
    setRandomText('Play Randomly');
    setTimeout(() => soundObjects.forEach(async(object) => await object.stopAsync()), 300)
  }

  useEffect(() => {
    const firstLoad = async() => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: false,
        playThroughEarpieceAndroid: false
      })
    }
    firstLoad();
  }, []);
  
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./sources/It_Was_Me__Dio!.jpg')} style={styles.image} resizeMode='cover'>
        {/* <View style={styles.header}>  
          <Text style={[styles.title, {fontSize: titleWidth}]}>Dio Voice Mesh</Text>
        </View> */}
        <Image
          style={styles.titleImage}
          source={require('./assets/title.png')}
        />
        <View style={styles.stopAndRandom}>
          <TouchableOpacity delayPressIn={0} style={[styles.random, { flex: 1, marginRight: 3, backgroundColor: randomColor }]} onPress={random}>
            <Text style={styles.randomText}>{ randomText }</Text>
          </TouchableOpacity>

          <TouchableOpacity delayPressIn={0} style={[styles.random, { flex: 1, marginLeft: 3, backgroundColor: 'black' }]} onPress={stopAll}>
            <Text style={styles.randomText}>Stop</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.breaker}></View>
        <View style={styles.buttons}>
          <View style={styles.row}>
            <DioButton text='Kono Dio Da~!' flexValue={1.3} pressed={pressed}/>
            <DioButton text='Dio Scream' flexValue={1} pressed={pressed}/>
          </View>
          <View style={styles.row}>
            <DioButton text='  Muda  ' flexValue={1} pressed={pressed}/>
            <DioButton text='Wryyyyy' flexValue={1} pressed={pressed}/>
          </View>
          <View style={styles.row}>
            <DioButton text='JoJo' flexValue={1} pressed={pressed}/>
            <DioButton text='ZA WARUDO~!' flexValue={1.5} pressed={pressed}/>
          </View>
          <View style={styles.row}>
            <DioButton text='Stando~Pawa' flexValue={1.2} pressed={pressed}/>
            <DioButton text='Counting' flexValue={1} pressed={pressed}/>
          </View>
          <View style={styles.row}>
            <DioButton text='The Approach' flexValue={1} pressed={pressed}/>
            <DioButton text='Road~Roller~Da' flexValue={1.35} pressed={pressed}/>
          </View>
        </View>
      </ImageBackground>
    
      <StatusBar style='light' backgroundColor='black'/>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titlesmall: {
    color: 'white',
    elevation: 3,
  },

  titleImage: {
    height: '8%',
    width: '95%',
    marginTop: 25,
    resizeMode: 'stretch',
  },

  btt: {
    padding: 30,
    marginLeft: 20,
  },

  image: {
    marginTop: Constants.statusBarHeight,
    width: screenWidth,
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: 'center',
  },

  row: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '95%',
    padding: 3,
    marginTop: 10,
    // backgroundColor: 'red',
  },

  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: 'white',
    fontWeight: 'bold',
    elevation: 3,
  },

  buttons: {
    flex: 6,
    width: 400,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: screenWidth,
    // backgroundColor: 'red',
  },
  
  stopAndRandom: {
    width: '95%',
    margin: 10,
    flexDirection: 'row',
  },

  random: {
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    elevation: 5,
    opacity: 0.7,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  randomText: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
  },

  breaker: {
    borderWidth: 0.3,
    borderColor: 'white',
    width: '95%',
  },
});