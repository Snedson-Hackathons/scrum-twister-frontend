import axios from 'axios';
import {
  IGetAvatarsListResponseDTO,
  IStartNewSessionRequestDTO,
  IStartNewSessionResponseDTO,
} from './API.types';

// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = 'https://scrumtwister.snedson.com/api';

export const API_URLS = {
  GET_GET_AVATAR_LIST: `${API_URL}/Common/AvatarsList`,
  POST_START_NEW_SESSION: `${API_URL}/ScrumMaster/StartNewSesion`,
  GET_GET_NEXT_ACTIVITY: `${API_URL}/ScrumMaster/GetNextActivity`,
};

export class API {
  static getAvatarsList() {
    return axios
      .get<IGetAvatarsListResponseDTO>(API_URLS.GET_GET_AVATAR_LIST)
      .then((response) => response.data.avatars)
      .catch((err) => {
        console.log(err);
      });
  }

  static startNewSession(data: IStartNewSessionRequestDTO) {
    return axios
      .post<IStartNewSessionResponseDTO>(API_URLS.POST_START_NEW_SESSION, data)
      .then((response) => response.data);
  }

  static getNextActivity(sessionId: string) {
    return axios
      .get<any>(`${API_URLS.GET_GET_NEXT_ACTIVITY}?sessionId=${sessionId}`)
      .then((data) => data);
  }
}
