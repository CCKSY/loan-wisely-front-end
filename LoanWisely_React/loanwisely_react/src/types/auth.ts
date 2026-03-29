export type UserLoginRequest = {
  username: string;
  password: string;
};

export type UserLoginResponse = {
  userId: number;
  username: string;
  accessToken: string;
  expiresInSeconds: number;
};

export type UserRegisterRequest = {
  username: string;
  password: string;
};

export type UserRegisterResponse = {
  userId: number;
  username: string;
};
