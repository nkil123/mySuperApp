import {
  Animated,
  Button,
  Image,
  PanResponder,
  Pressable,
  Text,
  View,
} from 'react-native';
import React, { useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
// import { Ball } from '../components/Ball';
import Deck from '../components/Deck';
import { DeckData, DeckDataType } from '../mockData/DeckData';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: HomeProps) => {
  const renderDeckCards = (deckCard: DeckDataType) => {
    return (
      <View>
        <Image height={200} width={'100%'} src={deckCard.uri} />
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
      <Text>Home</Text>
      {/* <Ball /> */}
      <Deck decks={DeckData} renderCard={renderDeckCards} />
      {/* <Button
        title="Go to profile"
        onPress={() => {
          navigation.navigate('Profile', { userId: '123' });
        }}
      /> */}
    </View>
  );
};

export default Home;
