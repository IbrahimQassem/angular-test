export class MS_CHAT {
  constructor() { }
  MS_ID: number = 0;
  FUSER_ID: number = null;
  TUSER_ID: number = null;
  MS_TYPE: number = null;
  MS_TEXT: string = null;
  MS_DATE: Date = null;
  MS_STATE: boolean = false;
}

 

export class USER_TABLE {
  constructor() { }
  USER_ID: number = 0;
  USER_ARNAME?: string = null;
  USER_ENNAME?: string = null;
  USER_UNIQNAME?: string = null;
  USER_ISONLINE?: boolean = null;
  USER_ISENABLE?: boolean = null;
  USER_EMAIL?: string = null;
  USER_IMG?: string = null;
  USER_TITLE?: string = null;
  USER_LASTSEEN?: Date = null;
}


export enum MSG_TYPE {
  MESSAGE,
  IMAGE,
  AUDIO,
  VIDEO,
  DOCUMENT
}


// export class CHAT_FILES {
//   constructor() { }
//   CF_ID: number = 0;
//   MS_ID: number = null;
//   FUSER_ID: number = null;
//   TUSER_ID: number = null;
//   CF_NAME: string = null;
//   CF_PATH: string = null;
//   CF_FILETYPE: number = null;
//   CF_VIEWED: boolean = false;
//   CF_STOP: boolean = false;
//   CF_CREATED: Date = new Date();
//   CF_UPDATED: Date = null;
// }
