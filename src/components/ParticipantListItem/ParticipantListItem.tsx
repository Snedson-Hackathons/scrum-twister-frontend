import { observer } from 'mobx-react-lite';
import { Button, IconButton, TextField, Avatar } from '@mui/material';
import './ParticipantListItem.scss';
import trashIcon from '../../assets/images/icons/trash.svg';
import DeleteIcon from '@mui/icons-material/Delete';
import { IParticipantModel } from '../../types/Participants.types';
import { useCallback, useEffect, useState } from 'react';
import { IAvatar } from '../../api/API.types';

export const ParticipantListItem = ({
  id,
  number,
  avatarsList,
  onChanges,
  onDelete,
}: IParticipantListItemProps) => {
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState<number>(0);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    onChanges({
      id: id,
      name: name,
      avatarId: avatarsList[selectedAvatarIndex]?.id,
    });
  }, [avatarsList, selectedAvatarIndex, name]);
  return (
    <div className='participant-list-item'>
      <div className=' participant-list-item__content'>
        <div className='participant-list-item__user-settings'>
          <div className='participant-list-item__inner-wrapper'>
            <div className='participant-list-item__user-data'>
              <img
                src={avatarsList[selectedAvatarIndex]?.imageUrl}
                alt=''
                className='participant-list-item__selected-avatar'
              />
              <div className='participant-list-item__names'>
                <TextField
                  label={`Участник ${number}`}
                  variant='standard'
                  onChange={(event) => {
                    setName(event.currentTarget.value);
                  }}
                ></TextField>
                {avatarsList.length && (
                  <p className='participant-list-item__avatar-description'>
                    {avatarsList[selectedAvatarIndex]?.description}
                  </p>
                )}
              </div>
            </div>
            <IconButton onClick={onDelete(id)}>
              <DeleteIcon></DeleteIcon>
            </IconButton>
          </div>

          <div className='participant-list-item__avatar-selection'>
            {avatarsList.map((avatar, index) => (
              <IconButton
                key={avatar.id}
                onClick={() => setSelectedAvatarIndex(index)}
                className='participant-list-item__icon-button'
              >
                <Avatar
                  src={avatar.imageUrl}
                  className='participant-list-item__avatar'
                ></Avatar>
              </IconButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export interface IParticipantListItemProps {
  id: string;
  number: number | string;
  avatarsList: IAvatar[];
  onChanges: (participant: IParticipantModel) => void;
  onDelete: (id: string) => () => void;
}
