/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {observer} from 'mobx-react';
import UserStore from './store/userStore';
import BottomTabScreen from './BottomTabScreen';
import {NavigationContainer} from '@react-navigation/native';
//import {signIn, signUp, signOut} from './auth';

const store = new UserStore();
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    //signIn(email, password);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      store.setUser(userCredential.user.toJSON());
      console.log('user', store.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async () => {
    //signUp(email, password);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      store.setUser(userCredential.user.toJSON());
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    //signOut();
    try {
      await auth().signOut();
      store.clearUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {store.user.email !== undefined ? (
        <>
          <NavigationContainer>
            <BottomTabScreen />
          </NavigationContainer>
        </>
      ) : (
        <View style={{marginHorizontal: 40, marginTop: 180}}>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Email"
            placeholderTextColor={'grey'}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Your Password"
            placeholderTextColor={'grey'}
            value={password}
            onChangeText={setPassword}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              onPress={handleSignIn}
              style={styles.commandButton}>
              <Text style={styles.ButtonTitle}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSignUp}
              style={styles.commandButton}>
              <Text style={styles.ButtonTitle}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default observer(LoginScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  input: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    borderRadius: 30,
    padding: 10,
    fontSize: 16,
    width: 310,
    marginTop: 20,
  },
  ButtonTitle: {
    fontSize: 17,
    color: '#fff',
  },
  commandButton: {
    padding: 15,
    borderRadius: 40,
    width: 130,
    backgroundColor: '#3c8',
    alignItems: 'center',
    marginTop: 20,
  },
});
