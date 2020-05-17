// import { RouterState } from 'connected-react-router';
// import * as moment from 'moment';
// import {ActionType} from 'typesafe-actions';

// import * as resourcesActions from './actions/resources';
// import * as userActions from './actions/user';

// export type ResourcesActionTypes = ActionType<typeof resourcesActions>;
// export type UserActionTypes = ActionType<typeof userActions>;
import { RouterState } from 'connected-react-router';

/** ---------- Enums ---------- **/

export interface IRootState {
    router: RouterState;
}

export enum FileOrFolderTypes {
  FOLDER = 'folder',
  FILE = 'file',
}