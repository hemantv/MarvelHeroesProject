/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Animated,
  Dimensions,
  PanResponder,
  TouchableOpacity
} from 'react-native';
import Hero from './Hero';

const DATA = [
  { key: 'spider_man', color: '#C51926', title: 'Spider Man', name: 'Peter Parker', description: 'Peter Benjamin Parker is a high school student and a superhero with spider-like abilities, fighting crime as his alter ego Spider-Man.', image: require('./assets/spider_man.png') },
  { key: 'iron_man', color: '#E08F04', title: 'Iron Man', name: 'Tony Stark', description: 'Tony Stark is a genius, billionaire, philanthropist and the former head of Stark Industries. Using his own great wealth and exceptional technical knowledge.', image: require('./assets/iron_man.png') },
  { key: 'captain_america', color: '#204CC3', title: 'Captain America', name: 'Steve Rogers', description: 'Steven Grant "Steve" Rogers was a World War II veteran, and is known as the world\'s first superhero. Born within Brooklyn, New York City.', image: require('./assets/captain_america.png') },
  /* { key: 'black_widow', color: '#e08f04', title: 'Black Widow', name: 'Natalia Alianovna Romanoff', description: 'Natalia Alianovna "Natasha" Romanoff was one of the most talented spies and assassins in the entire world and a founding member of the Avengers.', image: require('./assets/black_widow.png') },
  { key: 'thor', color: '#e08f04', title: 'Thor Odinson', name: 'Thor Odinson', description: 'Thor Odinson is the current king of Asgard, a founding member of the Avengers, and the God of Thunder.', image: require('./assets/thor.png') }, */
  { key: 'doctor_strange', color: '#ab0c0c', title: 'Doctor Strange', name: 'Stephen Vincent Strange', description: 'Stephen Vincent Strange M.D., Ph.D is a powerful sorcerer and Master of the Mystic Arts.', image: require('./assets/doctor_strange.png') },
  { key: 'hulk', color: '#875094', title: 'Hulk', name: 'Robert Bruce Banner', description: 'Robert Bruce Banner, M.D., Ph.D., is a renowned scientist and a founding member of the Avengers. .', image: require('./assets/hulk.png') },
]

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const VISIBLE_ITEMS = 3;

const App = () => {

  const [data, setData] = React.useState(DATA);

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollXItem = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const currentIndexRef = React.useRef(0);
  const setCurrentIndexRef = (newCurrentIndex) => {
    currentIndexRef.current = newCurrentIndex;
    setCurrentIndex(newCurrentIndex);
  }

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dx < 0) {
          scrollX.setValue(gestureState.dx);
          scrollXItem.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx < -120) {
          Animated.timing(scrollX, {
            toValue: -WINDOW_WIDTH - 100,
            useNativeDriver: true
          }).start(() => {
            scrollX.setValue(0);
            Animated.timing(scrollXItem, {
              toValue: 0,
              useNativeDriver: true
            }).start();
            setCurrentIndexRef(currentIndexRef.current + 1);
          });
        } else {
          Animated.timing(scrollX, {
            toValue: 0,
            useNativeDriver: true
          }).start();
          Animated.timing(scrollXItem, {
            toValue: 0,
            useNativeDriver: true
          }).start();
        }
      }
    })
  ).current;

  React.useEffect(() => {
    if (currentIndex == data.length - VISIBLE_ITEMS) {
      const newData = [...data.slice(currentIndex, data.length), ...data.slice(0, currentIndex)];
      setData(newData);
      setCurrentIndexRef(0);
    }
  }, [currentIndex]);

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: currentIndex,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  return (
    <>
      <StatusBar hidden />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}>
        {data.map((item, index) => {
          if (index < currentIndexRef.current) {
            return null;
          }

          if (index === currentIndexRef.current) {
            const rotate = scrollX.interpolate({
              inputRange: [-WINDOW_WIDTH / 2, 0],
              outputRange: ['-10deg', '0deg'],
              extrapolate: "clamp"
            });

            return (
              <Animated.View
                key={item.key}
                {...panResponder.panHandlers}
                style={{
                  position: 'absolute',
                  zIndex: data.length - index,
                  transform: [
                    {
                      translateX: scrollX
                    },
                    {
                      rotate: rotate
                    },
                  ],
                }}>
                <Hero {...item} scrollX={scrollXItem} />
              </Animated.View>
            );
          } else {
            const inputRange = [index - 2, index - 1, index];
            const scaleX = scrollXAnimated.interpolate({
              inputRange,
              outputRange: [0.9, 1, 1],
            });

            const translateY = scrollXAnimated.interpolate({
              inputRange,
              outputRange: [-20, 0, 0],
            });

            const opacity = scrollXAnimated.interpolate({
              inputRange,
              outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
            });

            return (
              <Animated.View
                key={item.key}
                style={{
                  position: 'absolute',
                  zIndex: data.length - index,
                  opacity,
                  transform: [
                    { scaleX },
                    { translateY }
                  ]
                }}>
                <Hero {...item} />
              </Animated.View>
            );
          }
        })}
      </ScrollView>
    </>
  );
};

export default App;
