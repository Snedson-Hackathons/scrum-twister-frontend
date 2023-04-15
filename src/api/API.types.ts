export type IGetAvatarsListResponse = {
  avatars: IAvatar[];
};

export interface IAvatar {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}
