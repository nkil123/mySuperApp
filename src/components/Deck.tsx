import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { DeckDataType } from '../mockData/DeckData';

export type DeckProps = {
  decks: DeckDataType[];
  renderCard: (props: DeckDataType, index: number) => React.JSX.Element;
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const SCREEN_THRESHOLD = 0.25 * SCREEN_WIDTH;

const Deck = ({ decks, renderCard }: DeckProps) => {
  const [index, setIndex] = useState(0);
  const { current: pan } = useRef(new Animated.ValueXY());
  const { current: panResponder } = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: (
        event: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ) => {
        if (gestureState.dx > SCREEN_THRESHOLD) {
          forceSwipe('right');
        } else if (gestureState.dx < -SCREEN_THRESHOLD) {
          forceSwipe('left');
        } else {
          resetPosition();
        }
      },
    }),
  );

  const forceSwipe = (position: 'left' | 'right') => {
    console.log('forceSwipe', index);
    const x = position === 'left' ? -SCREEN_WIDTH : SCREEN_WIDTH;
    Animated.timing(pan, {
      toValue: { x, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(({ finished }) => finished && onSwipeComplete(position));
  };

  const onSwipeComplete = (position: 'left' | 'right') => {
    console.log(index, 'onSwipeComplete');
    setIndex(prev => prev + 1);
    pan.setValue({ x: 0, y: 0 });
  };
  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const getCardAnimationStyle = () => {
    const rotate = pan.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });
    return {
      ...pan.getLayout(),
      transform: [{ rotate: rotate }],
    };
  };

  const renderDecks = () => {
    return decks.map((item: DeckDataType, i: number) => {
      console.log(i, index);
      if (i < index) {
        return null;
      }
      if (i === index) {
        return (
          <Animated.View
            style={[getCardAnimationStyle(), styles.cardStyles]}
            {...panResponder.panHandlers}
            key={i}
          >
            {renderCard(item, i)}
          </Animated.View>
        );
      }
      return <View style={styles.cardStyles}>{renderCard(item, i)}</View>;
    }).reverse();
  };
  return <View >{renderDecks()}</View>;
};

const styles = StyleSheet.create({
  cardStyles:{
    position:'absolute',
    width:"100%"
  }
})

export default Deck;
