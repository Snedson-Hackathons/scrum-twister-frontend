export type IGetAvatarsListResponseDTO = {
  avatars: IAvatar[];
};

export interface IAvatar {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface IStartNewSessionRequestDTO {
  participants: IParticipantDTO[];
  isOnline: boolean;
}

export interface IStartNewSessionResponseDTO {
  sessionId: string;
  inviteCode: string;
}

export interface IParticipantDTO {
  name: string;
  avatarId: number;
}
