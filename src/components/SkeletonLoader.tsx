import { View, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { ViewStyle, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface SkeletonLoaderProps {
  height: number;
  width?: number;
  style?: ViewStyle;
}

const defaultWidth = Dimensions.get('window').width - 30;

const SkeletonLoader = ({ width, height, style }: SkeletonLoaderProps) => {
  const translateX = useRef(new Animated.Value(-(width || defaultWidth))).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width || defaultWidth,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [width || defaultWidth]);

  return (
    <View
      style={StyleSheet.flatten([
        {
          width: width || defaultWidth,
          height,
          backgroundColor: '#23272e',
          overflow: 'hidden',
        },
        style,
      ])}>
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          transform: [{ translateX }],
        }}>
        <LinearGradient
          style={{ width: '100%', height: '100%' }}
          colors={['#1a1e2474', 'transparent']}
          start={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
};

export default SkeletonLoader;
