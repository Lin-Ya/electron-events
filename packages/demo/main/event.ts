import { join } from 'path';
import { BrowserWindow } from 'electron';
import { useEvents, useWindowPool } from '@core/index';
import {
  CHANNEL,
  CREATE_WINDOW,
  getDebug,
  SAY_HI,
  TEST_CHANNEL
} from '../utils';
import { windowPool } from '@core/base';

export const preload = join(__dirname, './preload.js');
const setTitle = (title: string) => `document.title = ${title}`;

export interface WindowInfo {
  name: string;
  rendererSendId: string;
  url: string;
  status: 'normal' | 'lock';
}

export type TestChannel = 'own' | 'someone' | 'several' | 'all';

export interface TestChannelInfo {
  type: TestChannel;
}

const debug = getDebug('Main');
const events = useEvents();

events.on('App', CREATE_WINDOW, (windowInfo: WindowInfo) => {
  const windowPool = useWindowPool();
  const { name, url } = windowInfo;
  const win = new BrowserWindow({
    title: name,
    webPreferences: {
      preload
    }
  });

  win.loadURL(url);
  win.webContents.openDevTools();
  windowPool.add(name, win);
});

events.on(SAY_HI, () => {
  debug('self', 'Received a message from yourself on channel sayHi.');
});

events.on('App', CHANNEL.RENDERER_SEND_TO_MAIN, () => {
  const win = windowPool.get('App');

  win?.webContents.executeJavaScript(setTitle(CHANNEL.RENDERER_SEND_TO_MAIN));
  debug(
    'App',
    `Received a message from app on channel ${CHANNEL.RENDERER_SEND_TO_MAIN}.`
  );
});

events.on(['App', 'Bramble'], SAY_HI, () => {
  debug(
    ['App', 'Bramble'].join('|'),
    'Received information on channel sayHi in the specified window list.'
  );
});

events.on('*', SAY_HI, () => {
  debug('*', 'Received a mass message on channel sayHi.');
});

events.on('*', TEST_CHANNEL, (params: TestChannelInfo) => {
  const { type } = params;

  switch (type) {
    case 'own':
      events.emit(SAY_HI);
      break;
    case 'someone':
      events.emitTo('App', SAY_HI);
      break;
    case 'several':
      events.emitTo(['App', 'Bramble'], SAY_HI);
      break;
    case 'all':
      events.emitTo('*', SAY_HI);
      break;
    default:
      debug('*', 'No matching operation.');
  }
});
