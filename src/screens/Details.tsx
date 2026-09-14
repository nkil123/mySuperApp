import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const Details = ({ route }: DetailsProps) => {
  const card = route.params?.card;

  // Profile navigates here without a card, so the empty case is reachable.
  if (!card) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>{'No card selected'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image height={260} src={card.uri} style={styles.image} />
      <Text style={styles.title}>{card.text}</Text>
      <Text style={styles.meta}>{`Card id: ${card.id}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    borderWidth: 1,
  },
  title: {
    fontSize: 22,
    paddingTop: 16,
  },
  meta: {
    paddingTop: 6,
    opacity: 0.6,
  },
  empty: {
    fontSize: 16,
    paddingTop: 40,
    textAlign: 'center',
  },
});

export default Details;
