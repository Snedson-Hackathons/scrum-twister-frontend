import axios from 'axios';
import { IGetAvatarsListResponse } from './API.types';

const API_URL = process.env.REACT_APP_API_URL;

export const API_URLS = {
  GET_GET_AVATAR_LIST: `${process.env.REACT_APP_API_URL}/Common/AvatarsList`,
};

export class API {
  static getAvatarsList() {
    return axios
      .get<IGetAvatarsListResponse>(API_URLS.GET_GET_AVATAR_LIST)
      .then((response) => response.data.avatars)
      .catch((err) => {
        console.log(err);
      });
  }
}
