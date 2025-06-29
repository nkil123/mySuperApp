import { Button, Text, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { Ball } from '../components/Ball';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: HomeProps) => {
  return (
    <View>
      <Text>Home</Text>
      <Ball />
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
