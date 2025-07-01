import { Animated, PanResponder, View } from 'react-native';
import React, { useRef } from 'react';
import { DeckDataType } from '../mockData/DeckData';

export type DeckProps = {
  decks: DeckDataType[];
  renderCard: (props: DeckDataType, index: number) => React.JSX.Element;
};

const Deck = ({ decks, renderCard }: DeckProps) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;

  const renderDecks = () => {
    return decks.map((item: DeckDataType, index: number) => {
      if (index === 0) {
        return (
          <Animated.View style={pan.getLayout()} {...panResponder.panHandlers}>
            {renderCard(item, index)}
          </Animated.View>
        );
      }
    });
  };
  return <View>{renderDecks()}</View>;
};

export default Deck;
