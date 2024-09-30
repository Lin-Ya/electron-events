import type { EventKey } from '@core/index';

type TT = (name:string,age:object)=> string

export const RENDERER_SEND_TO_SELF: EventKey<Parameters<TT>> = '0';

export const RENDERER_SEND_TO_MAIN: EventKey<string, number> = '1';

export const RENDERER_SEND_ONE_TO_ONE: EventKey = '2';

export const RENDERER_SEND_ONE_TO_SEVERAL: EventKey = '3';

export const RENDERER_SEND_ONE_TO_ALL: EventKey = '4';

export const RENDERER_INVOKE_TO_SELF: EventKey = '5';

export const RENDERER_INVOKE_TO_MAIN: EventKey<number, null> = '6';

export const RENDERER_INVOKE_ONE_TO_ONE: EventKey = '7';

export const RENDERER_INVOKE_ONE_TO_SEVERAL: EventKey = '8';

export const RENDERER_INVOKE_ONE_TO_ALL: EventKey = '9';
