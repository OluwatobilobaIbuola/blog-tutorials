import { AxiosError, AxiosResponse } from "axios";

type ValuesUnion<T> = T[keyof T];

type KeysUnion<T> = keyof T;

type OverrideProp<T, Override> = Omit<T, keyof Override> & Override;

type ArrayIndexElement<T> = T extends Array<infer Item> ? Item : never;

type ExtractData<T> = T extends DataResponse<infer U> ? U : never;

type DataResponse<T> = {
  status: false;
  message: string;
  data: T;
  body: { message: string };
};

type ApiError<T> = AxiosError<DataResponse<T>> | AxiosResponse<DataResponse<T>>;

export type Unwrap<T> = T extends Promise<infer U>
  ? U
  : T extends (...arguments_: any) => Promise<infer U>
  ? U
  : T extends (...arguments_: any) => infer U
  ? U
  : T;

type User = {
  id: string;
  email: string;
  token: string;
};
interface ServerUser extends DataResponse<User> {}

export type {
  DataResponse,
  ExtractData,
  ArrayIndexElement,
  OverrideProp,
  ValuesUnion,
  KeysUnion,
  ApiError,
  ServerUser,
  User,
};
