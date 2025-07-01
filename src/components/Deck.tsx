import { View } from 'react-native';
import React from 'react';
import { DeckDataType } from '../mockData/DeckData';

export type DeckProps = {
  decks: DeckDataType[];
  renderCard: (props: DeckDataType) => React.JSX.Element;
};

const Deck = ({ decks, renderCard }: DeckProps) => {
  return (
    <View style={{ margin: 10 }}>
      {decks.map((item: DeckDataType) => {
        return renderCard(item);
      })}
    </View>
  );
};

export default Deck;
