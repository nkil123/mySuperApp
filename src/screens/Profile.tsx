import { Button, Text, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type ProfileProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const Profile = ({ route, navigation }: ProfileProps) => {
  return (
    <View>
      <Text>Profile</Text>
      <Text>{route?.params?.userId}</Text>
      <Button
        title="Go to details page"
        onPress={() => {
          navigation.navigate('Details');
        }}
      />
    </View>
  );
};

export default Profile;
