import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import Deck from '../components/Deck';
import { DeckData, DeckDataType } from '../mockData/DeckData';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = (_props: HomeProps) => {
  const [liked, setLiked] = useState<DeckDataType[]>([]);
  const [passed, setPassed] = useState<DeckDataType[]>([]);

  const renderDeckCards = (deckCard: DeckDataType) => {
    return (
      <View style={{ backgroundColor: 'gray', borderWidth: 1 }}>
        <Image height={200} src={deckCard.uri} />
        <Text style={{ textAlign: 'center', paddingVertical: 10 }}>
          {deckCard.text}
        </Text>
        <Pressable>
          <Text
            style={{ borderWidth: 2, paddingVertical: 20, textAlign: 'center' }}
          >
            {'Click here'}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={{ marginHorizontal: 20, marginVertical: 30 }}>
      <View style={styles.tally}>
        <Text>{`Liked ${liked.length}`}</Text>
        <Text>{`Passed ${passed.length}`}</Text>
      </View>
      <Deck
        decks={DeckData}
        renderCard={renderDeckCards}
        onSwipeRight={deck => setLiked(prev => [...prev, deck])}
        onSwipeLeft={deck => setPassed(prev => [...prev, deck])}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tally: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
});

export default Home;
