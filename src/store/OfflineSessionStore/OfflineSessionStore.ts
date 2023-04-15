import { makeAutoObservable } from 'mobx';

class OfflineSessionStore {
  public avatarList: string[] = [];
  constructor() {
    makeAutoObservable(this);
  }
}

export default new OfflineSessionStore();
