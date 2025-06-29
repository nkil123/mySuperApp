import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import StackNavigatior from './src/navigation/StackNavigator';
import { StatusBar } from 'react-native';

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <StackNavigatior />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
