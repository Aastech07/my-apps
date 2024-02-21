import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, FlatList } from 'react-native';

const SkeletonLoader = () => {
  const [loadingAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(loadingAnimation, {
          toValue: 0.7,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start();
  };

  const interpolatedOpacity = loadingAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1]
  });

  const renderItem = () => (
    <Animated.View style={[styles.skeletonRow, { opacity: interpolatedOpacity }]} />
  );

  return (
    <View style={styles.container}>
        <Animated.View style={[styles.skeletonRow1, { opacity: interpolatedOpacity }]} />
      <FlatList
        data={Array.from({ length: 7 })} // Adjust the length according to your needs
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={{ flex: 1 }}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  skeletonRow: {
    height: 50,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  skeletonRow1: {
    height: 200,
    marginBottom: 10,
    backgroundColor: '#f0f0f0'
  }
});

export default SkeletonLoader;
