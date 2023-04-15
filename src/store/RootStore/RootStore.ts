import { makeAutoObservable } from 'mobx';

class RootStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default new RootStore();
