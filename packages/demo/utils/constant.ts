export const TEST_CHANNEL = 'TEST_CHANNEL';

export const enum WINDOW_NAME {
  APP = 'App',
  BRAMBLE = 'Bramble',
  BRIAR = 'Briar'
}

export const enum CHANNEL {
  RENDERER_SEND_TO_SELF = '0',
  RENDERER_SEND_TO_MAIN = '1',
  RENDERER_SEND_ONE_TO_ONE = '2',
  RENDERER_SEND_ONE_TO_SEVERAL = '3',
  RENDERER_SEND_ONE_TO_ALL = '4',
  RENDERER_INVOKE_TO_SELF = '5',
  RENDERER_INVOKE_TO_MAIN = '6',
  RENDERER_INVOKE_ONE_TO_ONE = '7',
  RENDERER_INVOKE_ONE_TO_SEVERAL = '8',
  RENDERER_INVOKE_ONE_TO_ALL = '9'
}

export const enum TestChannelType {
  CREATE_WINDOW,
  TEST_HANDLE
}
