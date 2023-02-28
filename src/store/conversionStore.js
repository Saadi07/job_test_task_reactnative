import {action, makeAutoObservable, observable} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {makePersistable} from 'mobx-persist-store';

class ConversionStore {
  weight = '';
  heightFeet = '';
  heightInches = '';
  heightMeters = '';

  constructor() {
    makeAutoObservable(
      this,
      {
        setWeight: action,
        setHeightFeet: action,
        setHeightInches: action,
        setHeightMeters: action,
        weight: observable,
        heightFeet: observable,
        heightInches: observable,
        heightMeters: observable,
      },
      {autoBind: true},
    );
    makePersistable(this, {
      name: 'COnversionPersistStore',
      properties: ['weight', 'heightFeet', 'heightInches', 'heightMeters '],
      storage: AsyncStorage,
    });
  }
  setWeight(weight) {
    this.weight = weight;
    console.log(this.weight);
  }
  setHeightFeet(feet) {
    this.heightFeet = feet;
  }
  setHeightInches(inches) {
    this.heightInches = inches;
  }
  setHeightMeters(meters) {
    this.heightMeters = meters;
  }
}
export default new ConversionStore();
