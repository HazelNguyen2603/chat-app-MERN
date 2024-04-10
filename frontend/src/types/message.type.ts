import { IBase } from "./base.type";

export interface IMessage extends IBase {
  senderId: string;
  receiverId: string;
  message: string;
}
