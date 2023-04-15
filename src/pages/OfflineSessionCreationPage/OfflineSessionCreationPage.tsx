import { observer } from 'mobx-react-lite';
import './OfflineSessionCreationPage.scss';
import { ParticipantListItem } from '../../components/ParticipantListItem/ParticipantListItem';
import { Button } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { IParticipantModel } from '../../types/Participants.types';
import { API } from '../../api/API';
import { IAvatar, IParticipantDTO } from '../../api/API.types';
import { v4 } from 'uuid';

export const OfflineSessionCreationPage = observer(() => {
  const [participantsList, setParticipantsList] = useState<IParticipantModel[]>(
    []
  );
  const [avatarsList, setAvatarsList] = useState<IAvatar[]>([]);

  const createParticicpant = useCallback(() => {
    setParticipantsList((prev) => [
      ...prev,
      {
        id: v4(),
        name: '',
        avatarId: avatarsList[0].id,
      },
    ]);
  }, [avatarsList]);

  const deleteParticipant = useCallback(
    (id: string) => {
      return () => {
        setParticipantsList((prev) =>
          prev.filter((participant) => id !== participant.id)
        );
      };
    },
    [avatarsList]
  );

  const startNewSession = useCallback(() => {
    API.startNewSession({
      participants: participantsList as IParticipantDTO[],
      isOnline: false,
    });
  }, [participantsList]);

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
        {!participantsList.length && (
          <p className='offline-session-creation-page__offer'>
            Добавьте участников
          </p>
        )}
        {!!participantsList.length && (
          <div className='offline-session-creation-page__participant-list'>
            {participantsList.map((participant, index) => {
              return (
                <ParticipantListItem
                  id={participant.id}
                  number={index + 1}
                  avatarsList={avatarsList}
                  onChanges={(participant) => {
                    setParticipantsList((prevState) =>
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
          <Button onClick={startNewSession}>Стартуем!</Button>
        </div>
      </div>
    </div>
  );
});
