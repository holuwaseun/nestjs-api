export type T_DBConfig = {
  HOST: string;
  NAME: string;
  PASSWORD: string;
  PORT: number;
  USERNAME: string;
};

export type T_ServerConfig = {
  APP_URL: string;
  ENV: string;
  HOST: string;
  PORT: number;
  URL: string;
};

export type T_Error = {
  code: string;
  message: string;
  status?: string;
  statusCode: any;
};

export type T_Session = {
  userId: string;
};
