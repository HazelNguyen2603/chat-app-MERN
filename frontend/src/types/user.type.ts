import { IBase } from "./base.type";

export interface ILogin {
  username: string;
  password: string;
}

export interface IUser extends ILogin, IBase {
  fullName: string;
  confirmPassword: string;
  gender: string;
  profilePic?: string;
}
