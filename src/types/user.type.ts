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

export type TUserInfo = {
  id: string;
  username: string;
  created: Date;
  description: string;
  avatar: string;
  cover_image: string;
  link: string;
  address: string;
  city: string;
  country: string;
  listing: string;
  is_friend: string;
  online: string;
  coins: string;

}

export type TFriend = {
  id: string;
  username: string;
  avatar: string;
  same_friends: string;
  created: Date;
}

export type TUserFriend = {
  friends: Array<TFriend>;
  total: String;
}

export type TBlockUser = {
  id: string;
  username: string;
  avatar: string;
}
