export type createUserResponse = {};

type initialStateType = {
  loading: boolean;
  msgError: string;
  msgSuccess: string;
};

export type createUserRequest = {
  name: string;
  email: string;
  password: string;
};

export const initialState: initialStateType = {
  loading: false,
  msgError: "",
  msgSuccess: "",
};
