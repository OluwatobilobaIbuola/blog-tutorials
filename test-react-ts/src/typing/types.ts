export type User<T> = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: DeepPartial<T>;
};

export type DeepPartial<T> = {
  [P in keyof T]: DeepPartial<T[P]>;
};

type Me<T> = {
  [key: string]: T;
};

declare module NodeJS {
  interface Process {
    browser?: boolean;
  }
}

export type UserTest = {
  name: string;
  age: string;
  country: string;
  books: string[];
};
