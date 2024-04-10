import { IBase } from "./base.type";

export interface IConversation extends IBase {
  participants: string[];
  messages: string[];
}
