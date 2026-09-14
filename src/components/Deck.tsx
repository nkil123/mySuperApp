import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { DeckDataType } from '../mockData/DeckData';

export type DeckProps = {
  decks: DeckDataType[];
  renderCard: (props: DeckDataType, index: number) => React.JSX.Element;
  onSwipeLeft?: (deck: DeckDataType) => void;
  onSwipeRight?: (deck: DeckDataType) => void;
  onCardPress?: (deck: DeckDataType) => void;
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const SCREEN_THRESHOLD = 0.25 * SCREEN_WIDTH;

// Movement under this reads as a tap, not a drag. PanResponder claims the
// gesture on the first move, so without this a slightly imprecise tap is
// swallowed and the card just springs back.
const TAP_SLOP = 5;

const Deck = ({
  decks,
  renderCard,
  onSwipeLeft,
  onSwipeRight,
  onCardPress,
}: DeckProps) => {
  const [index, setIndex] = useState(0);
  // panResponder is built once, so its callbacks close over the first render.
  // They read indexRef instead of index, which would always be stale.
  const indexRef = useRef(0);
  const { current: pan } = useRef(new Animated.ValueXY());
  const { current: panResponder } = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: (
        event: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ) => {
        if (
          Math.abs(gestureState.dx) < TAP_SLOP &&
          Math.abs(gestureState.dy) < TAP_SLOP
        ) {
          resetPosition();
          const tapped = decks[indexRef.current];
          if (tapped) {
            onCardPress?.(tapped);
          }
        } else if (gestureState.dx > SCREEN_THRESHOLD) {
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
    const x = position === 'left' ? -SCREEN_WIDTH : SCREEN_WIDTH;
    Animated.timing(pan, {
      toValue: { x, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(({ finished }) => finished && onSwipeComplete(position));
  };

  const onSwipeComplete = (position: 'left' | 'right') => {
    const swiped = decks[indexRef.current];
    indexRef.current += 1;
    setIndex(indexRef.current);
    pan.setValue({ x: 0, y: 0 });
    if (swiped) {
      position === 'right' ? onSwipeRight?.(swiped) : onSwipeLeft?.(swiped);
    }
  };

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const restart = () => {
    indexRef.current = 0;
    setIndex(0);
    pan.setValue({ x: 0, y: 0 });
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
    return decks
      .map((item: DeckDataType, i: number) => {
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
        return (
          <Animated.View style={styles.cardStyles} key={i}>
            {renderCard(item, i)}
          </Animated.View>
        );
      })
      .reverse();
  };

  if (index >= decks.length) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>{'No more cards'}</Text>
        <Pressable onPress={restart} style={styles.restartButton}>
          <Text style={styles.restartText}>{'Start over'}</Text>
        </Pressable>
      </View>
    );
  }

  return <View>{renderDecks()}</View>;
};

const styles = StyleSheet.create({
  cardStyles: {
    position: 'absolute',
    width: '100%',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    paddingBottom: 20,
  },
  restartButton: {
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  restartText: {
    textAlign: 'center',
  },
});

export default Deck;
