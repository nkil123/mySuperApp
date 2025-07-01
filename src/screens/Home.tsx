import { Button, Image, Pressable, Text, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
// import { Ball } from '../components/Ball';
import Deck from '../components/Deck';
import { DeckData, DeckDataType } from '../mockData/DeckData';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: HomeProps) => {
  const renderDeckCards = (deckCard: DeckDataType) => {
    return (
      <View
        style={{
          borderWidth: 2,
          justifyContent: 'center',
          //   alignItems: 'center',
        }}
      >
        <View
          style={{
            padding: 10,
            alignItems: 'center',
          }}
        >
          <Image src={deckCard.uri} height={300} width={'100%'} />
        </View>
        <View style={{ flex: 1, borderTopWidth: 2, paddingVertical: 10 }}>
          <Text style={{ textAlign: 'center' }}>{deckCard.text}</Text>
          <Pressable style={{ backgroundColor: 'green', paddingVertical: 10 }}>
            <Text style={{ textAlign: 'center', fontSize: 12, lineHeight: 12 }}>
              Tap here
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };
  return (
    <View>
      <Text>Home</Text>
      {/* <Ball /> */}
      <Deck decks={DeckData} renderCard={renderDeckCards} />
      <Button
        title="Go to profile"
        onPress={() => {
          navigation.navigate('Profile', { userId: '123' });
        }}
      />
    </View>
  );
};

export default Home;
