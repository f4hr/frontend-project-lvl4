// @ts-check

import { actions as appActions } from './appSlice.js';
import { actions as channelActions } from './channelsSlice.js';
import { actions as messageActions } from './messagesSlice.js';
import { actions as modalActions } from './modalsSlice.js';

const actions = {
  ...appActions,
  ...channelActions,
  ...messageActions,
  ...modalActions,
}

export default actions;
