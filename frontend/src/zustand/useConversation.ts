import { IMessage, IUser } from "types";
import { create } from "zustand";

export interface IUseConversation {
  seletedConversation: IUser | null;
  setSeletedConversation: (seletedConversation: IUser | null) => void;
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
}

const useConversation = create<IUseConversation>()((set) => ({
  seletedConversation: null,
  setSeletedConversation: (seletedConversation: IUser | null) =>
    set({ seletedConversation }),
  messages: [],
  setMessages: (messages: IMessage[]) => set({ messages }),
}));

export default useConversation;
