import { observer } from 'mobx-react-lite';
import './OfflineSessionCreationPage.scss';
import { ParticipantListItem } from '../../components/ParticipantListItem/ParticipantListItem';

export const OfflineSessionCreationPage = observer(() => {
  return (
    <div className='offline-session-creation-page'>
      <div className='offline-session-creation-page__content'>
        <h1 className='offline-session-creation-page__heading'>
          Добавьте участников в сессию
        </h1>
        <div className='offline-session-creation-page__participant-list'>
          <ParticipantListItem></ParticipantListItem>
        </div>
        <div className='offline-session-creation-page__actions'></div>
      </div>
    </div>
  );
});
