export type SignUpInfo = {
  ho?: String | undefined;
  ten?: String | undefined;
  birthDay?: Date | undefined;
  email?: String | undefined;
  password?: String | undefined;
};

export type TUser = {
  id: string;
  username: string;
  avatar: string;
  active: string;
  coins: string;
};
