import { observer } from 'mobx-react-lite';
import './ActivityPage.scss';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { IAvatar, IParticipantDTO } from '../../api/API.types';
import { API } from '../../api/API';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';

export const ActivityPage = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentParticipant, setCurrentParticipant] =
    useState<IParticipantDTO>();
  const [avatarList, setAvatarList] = useState<IAvatar[]>([]);

  const navigate = useNavigate();

  const getAvatarById = useCallback(
    (id: number) => {
      return avatarList.find((avatar) => avatar.id === id);
    },
    [avatarList]
  );
  const currentAvatar = useMemo(() => {
    return avatarList.find(
      (avatar) => avatar.id === currentParticipant?.avatarId
    );
  }, [avatarList, currentParticipant]);

  const [currentActivity, setCurrentActivity] = useState<any>();

  const goToTheNextActivity = useCallback(() => {
    API.getNextActivity(searchParams.get('sessionId')!).then((data) => {
      if (data.data.isFinished) {
        navigate('/');
      }
      setCurrentActivity({
        ...data.data,
        activityBlob: JSON.parse(data.data.activityBlob),
      });
      setCurrentParticipant(data.data.participant);
    });
  }, []);

  useEffect(() => {
    API.getAvatarsList().then((data) => {
      data && setAvatarList(data);
    });
  }, []);
  useEffect(() => {
    API.getNextActivity(searchParams.get('sessionId')!).then((data) => {
      if (data.data.isFinished) {
        navigate('/');
      }
      setCurrentActivity({
        ...data.data,
        activityBlob: JSON.parse(data.data.activityBlob),
      });
      setCurrentParticipant(data.data.participant);
    });
  }, []);
  useEffect(() => {
    console.log(currentActivity);
  }, [currentActivity]);
  return (
    <div className='activity-page'>
      <div className='activity-page__content'>
        <div className='activity-page__left-part'>
          <div className='activity-page__current-participant'>
            <p className='text'>Сейчас отвечает:</p>
            <img
              src={currentAvatar?.imageUrl}
              alt=''
              className='activity-page__curr-part-image'
            />
            <div className='activity-page__names'>
              <h2 className='activity-page__curr-part-name'>
                {currentParticipant?.name}
              </h2>
              <p className='activity-page__avatar-description'>
                {currentAvatar?.description}
              </p>
            </div>
            <Button onClick={goToTheNextActivity}>Следующий вопрос</Button>
          </div>
        </div>
        <div className='activity-page__right-part'>
          <div className='activity-page__titles'>
            <h1 className='activity-page__activity-title'>
              {currentActivity?.title}
            </h1>
            <p className='activity-page__subtitle'>
              {currentActivity?.description}
            </p>
          </div>
          {currentActivity?.activityType === 0 && (
            <div className='activity-page__cards'>
              {Array.isArray(currentActivity?.activityBlob) &&
                currentActivity &&
                currentActivity.activityBlob?.map((a: any, index: number) => {
                  return (
                    <div className='activity-page__card' key={index}>
                      <img
                        src={a.cardImageUrl}
                        alt=''
                        className='activity-page__card-image'
                      />
                      <p className='activity-page__card-title'>{a.cardTitle}</p>
                    </div>
                  );
                })}
            </div>
          )}
          {currentActivity?.activityType === 1 && (
            <div className='activity-page__activity-content'>
              <p className='activity-page__activity-text'>
                {currentActivity?.activityBlob.text}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
