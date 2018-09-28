import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Lightbox from './BaseLightbox';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ErrorLightbox = ({ data, children }) => (
  <Lightbox verticalPercent={0.5} horizontalPercent={0.9}>
    <Text style={{fontSize: 16, textAlign: 'center', fontWeight: "bold", paddingBottom: 10, paddingHorizontal: 10}}>{data}</Text>
  </Lightbox>
);

export default ErrorLightbox;