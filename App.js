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
} from 'react-native';
import Hero from './Hero';

const data = [
  { key: 'spider', color: '#c51926', title: 'Spider Man', name: 'Peter Parker' },
  { key: 'iron', color: '#e08f04', title: 'Iron Man', name: 'Tony Stark' },
  { key: 'iron2', color: '#e08f04', title: 'Iron Man', name: 'Tony Stark' },
]

const App = () => {

  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;

  const [flag, setFlag] = React.useState(true);

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true
    }).start();
  });

  return (
    <>
      <StatusBar hidden />
      {/* <FlatList
        data={data}
        horizontal={true}
        keyExtractor={(item) => item.key}
        scrollEnabled={false}
        removeClippedSubviews={false}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center'
        }}
        CellRendererComponent={({ item, index, children, style, ...props }) => {
          const newStyle = [style, { zIndex: data.length - index }];
          return (
            <View style={newStyle} index={index} {...props}>
              {children}
            </View>
          )
        }}
        renderItem={({ item, index }) => {
          const inputRange = [index - 1, index, index + 1];
          const translateX = scrollXAnimated.interpolate({
            inputRange,
            outputRange: [50, 0, -50]
          });

          return (
            <Animated.View style={{
              position: "absolute", left: -200,
              transform: [{ translateX }]
            }}>
              <Hero />
            </Animated.View>
          )
        }}
      /> */}
      <FlatList
        data={data}
        horizontal={true}
        style={{ width: 500 }}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          return (
            <Hero />
          )
        }}
      />
    </>
  );
};

export default App;
