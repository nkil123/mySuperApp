import {
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import Deck from '../components/Deck';
import InfoModal from '../components/InfoModal';
import { DeckData, DeckDataType } from '../mockData/DeckData';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: HomeProps) => {
  const [liked, setLiked] = useState<DeckDataType[]>([]);
  const [passed, setPassed] = useState<DeckDataType[]>([]);
  const [summaryVisible, setSummaryVisible] = useState(false);

  const remaining = DeckData.length - liked.length - passed.length;

  // ToastAndroid is Android-only; Alert keeps iOS from silently doing nothing.
  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
  };

  const closeSummary = () => {
    setSummaryVisible(false);
    showToast('Back to your deck');
  };

  const openDetails = (card: DeckDataType) => {
    navigation.navigate('Details', { card });
  };

  const renderDeckCards = (deckCard: DeckDataType) => {
    return (
      <View style={{ backgroundColor: 'gray', borderWidth: 1 }}>
        <Image height={200} src={deckCard.uri} />
        <Text style={{ textAlign: 'center', paddingVertical: 10 }}>
          {deckCard.text}
        </Text>
        <Pressable onPress={() => openDetails(deckCard)}>
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
      <Pressable
        style={styles.summaryButton}
        onPress={() => setSummaryVisible(true)}
      >
        <Text style={styles.summaryButtonText}>{'Deck summary'}</Text>
      </Pressable>
      <InfoModal
        visible={summaryVisible}
        title="Deck summary"
        message={`You have liked ${liked.length} and passed ${passed.length}. ${remaining} card${remaining === 1 ? '' : 's'} left in the deck.`}
        confirmLabel="Back to deck"
        onConfirm={closeSummary}
        onDismiss={() => setSummaryVisible(false)}
      />
      <Deck
        decks={DeckData}
        renderCard={renderDeckCards}
        onSwipeRight={deck => setLiked(prev => [...prev, deck])}
        onSwipeLeft={deck => setPassed(prev => [...prev, deck])}
        onCardPress={openDetails}
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
  summaryButton: {
    borderWidth: 1,
    marginBottom: 12,
    paddingVertical: 12,
  },
  summaryButtonText: {
    textAlign: 'center',
  },
});

export default Home;
