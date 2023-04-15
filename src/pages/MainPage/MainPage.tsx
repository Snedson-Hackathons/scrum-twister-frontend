import './MainPage.scss';
import { observer } from 'mobx-react-lite';
import {
  Card,
  Typography,
  Button,
  Input,
  TextField,
  IconButton,
} from '@mui/material';
import mainLogo from '../../assets/images/logos/main-page-logo.svg';
import snedsonLogo from '../../assets/images/logos/snedson-centered.png';
import crossIcon from '../../assets/images/icons/cross.svg';
import sberLogo from '../../assets/images/logos/sber-logo.svg';
import sendIcon from '../../assets/images/icons/send.svg';
import { Link } from 'react-router-dom';

export const MainPage = observer(() => {
  return (
    <div className='main-page'>
      <div className='main-page__content'>
        <div className='main-page__part'>
          <div className='main-page__hello'>
            <div className='logos'>
              <img src={snedsonLogo} className='logos__logo' />
              <img src={crossIcon} alt='' />
              <img src={sberLogo} alt='' className='logos__logo' />
            </div>
            <img src={mainLogo} alt='' className='hello' />
          </div>
        </div>
        <div className='main-page__part'>
          <div className='cards'>
            <div className='card'>
              <div className='card__content'>
                <div className='card__texts'>
                  <h3 className='card__title'>Scrum - мастер?</h3>
                  <p className='card__offer'>Начните новую сессию!</p>
                </div>
                <div className='card__actions'>
                  <Link to='/session'>
                    <Button variant='contained'>Начать</Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card__content'>
                <div className='card__texts'>
                  <h3 className='card__title'>Участник команды?</h3>
                  <p className='card__offer'>Присоединиться к сессии!</p>
                </div>
                <div
                  className='card__actions'
                  style={{ alignItems: 'flex-end' }}
                >
                  <TextField
                    variant='outlined'
                    label='Код сессии'
                    sx={{ width: '100%' }}
                  ></TextField>
                  <Button variant='contained' sx={{ height: '100%' }}>
                    <img src={sendIcon} alt='' />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
