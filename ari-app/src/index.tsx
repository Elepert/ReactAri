import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router';
import {
  Route,
  Switch,
} from 'react-router';
import store, { history } from './store';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// import Header from './components/Header';
// import LoginModal from './components/modals/LoginModal';
// import MainPage from './pages/MainPage';
// import NotificationBanner from "./components/NotificationBanner";
// import ResourcePage from './pages/ResourcePage';
import MainPage from "./InputPage"
import VideoPlayer from "./VideoPlayer"

// @ts-ignore
// const URL_PREFIX = window.FRONTEND_URL || '';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path={`/`}>
          <MainPage />
        </Route>
        <Route path={'/video'}>
          <VideoPlayer/>
        </Route>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);