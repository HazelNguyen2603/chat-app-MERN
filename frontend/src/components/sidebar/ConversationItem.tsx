import React from "react";
import { IUser } from "types";
import useConversation from "zustand/useConversation";

interface IConversationItem {
  conversation: IUser;
  emoji: string;
  lastIdx: boolean;
}
const ConversationItem = ({
  conversation,
  emoji,
  lastIdx,
}: IConversationItem) => {
  const { seletedConversation, setSeletedConversation } = useConversation();
  const isSelected = conversation?._id === seletedConversation?._id;
  return (
    <>
      <>
        <div
          className={`flex gap-2 items-center hover:bg-green-500 rounded p-2 py-1 cursor-pointer ${
            isSelected ? "bg-green-500" : ""
          }`}
          onClick={() => setSeletedConversation(conversation)}
        >
          <div className="avatar online">
            <div className="w-12 rounded-full">
              <img src={conversation?.profilePic} alt="user avatar" />
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <div className="flex gap-3 justify-between">
              <p className="font-bold text-gray-200">
                {conversation?.fullName ?? ""}
              </p>
              <span className="text-xl">{emoji}</span>
            </div>
          </div>
        </div>

        {!lastIdx && <div className="divider my-0 py-0 h-1" />}
      </>
    </>
  );
};

export default ConversationItem;
