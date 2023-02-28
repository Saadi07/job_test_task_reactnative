/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {observer} from 'mobx-react';
import store from './store/conversionStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

//const store = new ConversionStore();

const MobxScreen = () => {
  //const {Feet, Inches, Meters, wg} = store;
  const [weight, setWeight] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [heightMeters, setHeightMeters] = useState('');

  const [isImperial, setIsImperial] = useState(true);
  const onChangeWeight = e => {
    store.setWeight(e);
    setWeight(e);
  };
  const onChangeHeightFeet = e => {
    store.setHeightFeet(e);
    setHeightFeet(e);
  };
  const onChangeHeightInches = e => {
    store.setHeightInches(e);
    setHeightInches(e);
  };
  const onChangeHeightMeters = e => {
    store.setHeightMeters(e);
    setHeightMeters(e);
  };
  const unitConversion = () => {
    setIsImperial(() => !isImperial);
    console.log(store);
    if (isImperial) {
      setWeight(weight * 0.453559237);
      setHeightMeters(heightFeet * 0.3048 + heightInches * 0.0254);
    } else {
      setWeight(weight / 0.453559237);
      setHeightFeet(Math.floor(heightMeters / 0.3048));
      setHeightInches(
        Math.round((heightMeters - heightFeet * 0.3048) / 0.0254),
      );
    }
  };
  useEffect(() => {
    const getSavedState = async () => {
      const getData = await AsyncStorage.getItem('mobxState');
      const mobxState = JSON.parse(getData);
      //console.log(mobxState);
      if (mobxState !== null) {
        // console.log(mobxState);
        setWeight(mobxState.weight);
        setHeightFeet(mobxState.heightFeet);
        setHeightInches(mobxState.heightInches);
        setHeightMeters(mobxState.setHeightMeters);
      }
    };
    getSavedState();
  }, []);
  const saveToDisk = async () => {
    var obj = {
      weight: store.weight,
      heightFeet: store.heightFeet,
      heightInches: store.heightInches,
      heightMeters: store.heightMeters,
    };
    try {
      const stringifyObj = JSON.stringify(obj);
      await AsyncStorage.setItem('mobxState', stringifyObj);
    } catch (e) {
      console.log('Error', e);
    }
  };

  const resetState = async () => {
    setWeight('');
    setHeightFeet('');
    setHeightInches('');
    setHeightMeters('');
  };

  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <Text style={styles.tittle}>Unit Converter (With Mobx)</Text>
      <View style={{marginHorizontal: 30}}>
        {isImperial ? (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <TextInput
                style={[
                  styles.input,
                  {
                    width: 310,
                  },
                ]}
                //defaultValue={100}
                value={weight.toString()}
                onChangeText={onChangeWeight}
              />
              <Text style={styles.label}>Ibs</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginTop: 10,
              }}>
              <TextInput
                style={[
                  styles.input,
                  {
                    width: 140,
                  },
                ]}
                value={heightFeet.toString()}
                onChangeText={onChangeHeightFeet}
              />
              <Text style={styles.label}>ft</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    width: 140,
                  },
                ]}
                value={heightInches.toString()}
                onChangeText={onChangeHeightInches}
              />
              <Text style={styles.label}>in</Text>
            </View>
          </View>
        ) : (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <TextInput
                style={[
                  styles.input,
                  {
                    width: 310,
                  },
                ]}
                value={weight.toString()}
                onChangeText={onChangeWeight}
              />
              <Text style={styles.label}>kg</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginTop: 10,
              }}>
              <TextInput
                style={[
                  styles.input,
                  {
                    width: 310,
                  },
                ]}
                value={heightMeters.toString()}
                onChangeText={onChangeHeightMeters}
              />
              <Text style={styles.label}>m</Text>
            </View>
          </View>
        )}
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <TouchableOpacity
            onPress={unitConversion}
            disabled={!isImperial ? false : true}
            style={[
              styles.commandButton,
              {
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                backgroundColor: isImperial ? '#fff' : '#3c8',
              },
            ]}>
            <Text style={styles.ButtonTitle}>Imperial</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={unitConversion}
            disabled={!isImperial ? true : false}
            style={[
              styles.commandButton,
              {
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                backgroundColor: !isImperial ? '#fff' : '#3c8',
              },
            ]}>
            <Text style={styles.ButtonTitle}>Metric</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={saveToDisk}
          style={[
            styles.commandButton,
            {
              borderRadius: 40,
              alignSelf: 'center',
              padding: 10,
              backgroundColor: '#3c8',
            },
          ]}>
          <Text style={styles.ButtonTitle}>Save to disk</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetState}>
          <Text
            style={{
              color: '#29c',
              alignSelf: 'center',
              marginTop: 10,
              fontSize: 16,
            }}>
            Reset
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default observer(MobxScreen);

const styles = StyleSheet.create({
  tittle: {
    marginTop: 230,
    alignSelf: 'center',
    color: '#fff',
  },
  label: {
    color: '#fff',
    marginTop: 10,
    fontSize: 18,
    marginHorizontal: 10,
  },
  input: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    borderRadius: 30,
    padding: 10,
    fontSize: 16,
  },
  ButtonTitle: {
    fontSize: 17,
    color: 'black',
  },
  commandButton: {
    padding: 15,
    width: 170,
    backgroundColor: '#3c8',
    alignItems: 'center',
    marginTop: 20,
  },
});
