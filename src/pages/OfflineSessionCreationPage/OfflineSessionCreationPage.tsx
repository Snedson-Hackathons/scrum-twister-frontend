import { observer } from 'mobx-react-lite';
import './OfflineSessionCreationPage.scss';
import { ParticipantListItem } from '../../components/ParticipantListItem/ParticipantListItem';
import { Button } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { IParticipantModel } from '../../types/Participants.types';
import { API } from '../../api/API';
import { IAvatar } from '../../api/API.types';
import { v4 } from 'uuid';

export const OfflineSessionCreationPage = observer(() => {
  const [participantList, setParticipantList] = useState<IParticipantModel[]>(
    []
  );
  const [avatarsList, setAvatarsList] = useState<IAvatar[]>([]);

  const createParticicpant = useCallback(() => {
    setParticipantList((prev) => [
      ...prev,
      {
        id: v4(),
        name: '',
        avatar: avatarsList[0].imageUrl,
      },
    ]);
  }, [avatarsList]);

  const deleteParticipant = useCallback(
    (id: string) => {
      return () => {
        setParticipantList((prev) =>
          prev.filter((participant) => id !== participant.id)
        );
      };
    },
    [avatarsList]
  );

  useEffect(() => {
    API.getAvatarsList().then((data) => {
      data && setAvatarsList(data);
    });
  }, []);
  return (
    <div className='offline-session-creation-page'>
      <div className='offline-session-creation-page__content'>
        <h1 className='offline-session-creation-page__heading'>
          Добавьте участников в сессию
        </h1>
        {!participantList.length && (
          <p className='offline-session-creation-page__offer'>
            Добавьте участников
          </p>
        )}
        {!!participantList.length && (
          <div className='offline-session-creation-page__participant-list'>
            {participantList.map((participant, index) => {
              return (
                <ParticipantListItem
                  id={participant.id}
                  number={index + 1}
                  avatarsList={avatarsList}
                  onChanges={(participant) => {
                    setParticipantList((prevState) =>
                      prevState.map((p) => {
                        if (p.id === participant.id) {
                          return participant;
                        }
                        return p;
                      })
                    );
                  }}
                  key={participant.id}
                  onDelete={deleteParticipant}
                ></ParticipantListItem>
              );
            })}
          </div>
        )}
        <div className='offline-session-creation-page__actions'>
          <Button onClick={createParticicpant}>Добавить участника</Button>
          <Button>Стартуем!</Button>
        </div>
      </div>
    </div>
  );
});
