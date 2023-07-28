import { StyleSheet, Text, View,SafeAreaView,Platform,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './index'
import FlashMessage from "react-native-flash-message";


export default function App() {
  return (
    <SafeAreaView  style={styles.container}>
      <FlashMessage titleStyle={{fontSize:18}} style={{paddingTop:30}} position='top'/>
       <NavigationContainer >
    <AuthStack/>
     </NavigationContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
