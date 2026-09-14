import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { DeckData, DeckDataType } from '../mockData/DeckData';

type BrowseProps = NativeStackScreenProps<RootStackParamList, 'Browse'>;

// Card labels look like "Card #3", so a natural query of "card 3" would miss
// on a plain substring match. Drop everything but letters and digits from
// both sides before comparing.
const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

const Browse = ({ navigation }: BrowseProps) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const needle = normalize(query);
    if (!needle) {
      return DeckData;
    }
    return DeckData.filter(card => normalize(card.text).includes(needle));
  }, [query]);

  const renderTile = ({ item }: { item: DeckDataType }) => (
    <Pressable
      style={styles.tile}
      onPress={() => navigation.navigate('Details', { card: item })}
    >
      <Image height={110} src={item.uri} style={styles.thumb} />
      <Text style={styles.tileText}>{item.text}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search cards"
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
      />
      <Text style={styles.count}>
        {`${results.length} of ${DeckData.length} cards`}
      </Text>
      <FlatList
        data={results}
        renderItem={renderTile}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          <Text style={styles.empty}>{`No cards match "${query}"`}</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  search: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  count: {
    opacity: 0.6,
    paddingVertical: 10,
  },
  row: {
    gap: 12,
  },
  tile: {
    flex: 1,
    borderWidth: 1,
    marginBottom: 12,
  },
  thumb: {
    width: '100%',
  },
  tileText: {
    paddingVertical: 8,
    textAlign: 'center',
  },
  empty: {
    paddingTop: 30,
    textAlign: 'center',
  },
});

export default Browse;
