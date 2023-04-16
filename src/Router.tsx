import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { OfflineSessionCreationPage } from './pages/OfflineSessionCreationPage/OfflineSessionCreationPage';
import { ActivityPage } from './pages/ActivityPage/ActivityPage';

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage></MainPage>}></Route>
      <Route
        path='/session'
        element={<OfflineSessionCreationPage></OfflineSessionCreationPage>}
      ></Route>
      <Route path='/activity' element={<ActivityPage></ActivityPage>}></Route>
    </Routes>
  );
};
