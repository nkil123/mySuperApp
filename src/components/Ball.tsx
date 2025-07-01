import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export const Ball: React.FC = () => {
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  useEffect(() => {
    Animated.spring(position, {
      toValue: { x: 200, y: 200 },
      //   duration: 1000,
      useNativeDriver: false, // set to true if you're animating transform properties
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //the animation will not cause re-render of entire component instead Animated view handles itself the layout
  return (
    <Animated.View style={position.getLayout()}>
      <View style={styles.ball} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  ball: {
    backgroundColor: 'black',
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});
