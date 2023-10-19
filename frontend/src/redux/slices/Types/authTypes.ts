type userData = {
  user: user;
  accessToken: string;
};

type initialStateType = {
  loading: boolean;
  msgError: string | undefined;
  userAuth: userData | null;
};

export const initialState: initialStateType = {
  loading: false,
  msgError: undefined,
  userAuth: null,
};

export type loginData = {
  username: string;
  password: string;
};

type user = {
  id: number;
  name: string;
  role: string;
};

export type dataUser = {
  user: user;
  accessToken: string;
};
