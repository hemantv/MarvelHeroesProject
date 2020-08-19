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

const data = [
  { id: 'spider', color: '#c51926', title: 'Spider Man', name: 'Peter Parker', image: require('./assets/spiderman.png') },
  { key: 'iron', color: '#e08f04', title: 'Iron Man', name: 'Tony Stark', image: require('./assets/ironman.png') },
  { key: 'iron2', color: 'blue', title: 'Iron Man 2', name: 'Tony Stark', image: require('./assets/ironman.png') },
  { key: 'iron3', color: 'aqua', title: 'Iron Man 3', name: 'Tony Stark', image: require('./assets/ironman.png') },
  { key: 'iron4', color: 'green', title: 'Iron Man 4', name: 'Tony Stark', image: require('./assets/ironman.png') },
  { key: 'iron5', color: 'yellow', title: 'Iron Man 5', name: 'Tony Stark', image: require('./assets/ironman.png') }
]

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const App = () => {

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const index = React.useRef(0);
  const setActiveIndex = React.useCallback((activeIndex) => {
    console.log(activeIndex);
    scrollXIndex.setValue(activeIndex);
    index.current = activeIndex;
  });

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: scrollX }
        ],
        {
          useNativeDriver: false
        }
      ),
      onPanResponderRelease: (e, gestureState) => {
        if (index.current == data.length - 1) {
          setActiveIndex(0);
        } else {
          setActiveIndex(index.current + 1);
        }
      }
    })
  ).current;

  /* React.useEffect(() => {
    setInterval(() => {
      setActiveIndex(index.current + 1);
    }, 2000);
  }, []); */

  return (
    <>
      <StatusBar hidden />
      <Animated.View
        style={{ flex: 1 }}
        {...panResponder.panHandlers}
      >
        <FlatList
          data={data}
          bounces={false}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            marginTop: 50,
          }}
          scrollEnabled={false}
          removeClippedSubviews={false}
          keyExtractor={(item, index) => index.toString()}
          CellRendererComponent={({
            item,
            index,
            children,
            style,
            ...props
          }) => {
            const newStyle = [style, { zIndex: index + 1 }];
            return (
              <View style={newStyle} index={index} {...props}>
                {children}
              </View>
            );
          }}
          renderItem={({ item, index }) => {
            const inputRange = [index - 1, index, index + 1];
            const translateX = scrollX.interpolate({
              inputRange,
              outputRange: [-WINDOW_WIDTH, 0, WINDOW_WIDTH]
            })

            return (
              <Animated.View style={{
                position: 'absolute',
                left: -WINDOW_WIDTH / 2,
                transform: [
                  {
                    translateX,
                  }
                ],
              }}>
                <Hero {...item} />
              </Animated.View>
            )
          }}
        />
      </Animated.View>
    </>
  );
};

export default App;
