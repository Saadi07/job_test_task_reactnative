import AsyncStorage from '@react-native-async-storage/async-storage';
import {action, makeAutoObservable, observable} from 'mobx';
import {makePersistable} from 'mobx-persist-store';

class UserStore {
  user = '';
  constructor() {
    makeAutoObservable(
      this,
      {
        setUser: action,
        clearUser: action,
        user: observable,
      },
      {autoBind: true},
    );
    makePersistable(this, {
      name: 'UserPersistStore',
      properties: ['user'],
      storage: AsyncStorage,
    });
  }
  setUser(userObj) {
    console.log(this.user);
    this.user = userObj;
    console.log(this.user);
  }
  clearUser() {
    this.user = '';
  }
}
export default UserStore;
