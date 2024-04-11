import { useAuthContext } from "context";
import React from "react";
import { IMessage } from "types";
import { extractTime } from "utils";
import useConversation from "zustand/useConversation";

interface IMessageProps {
  message: IMessage;
}

const Message = ({ message }: IMessageProps) => {
  const { authUser } = useAuthContext();
  const { seletedConversation } = useConversation();
  const fromMe = authUser?._id === message?.senderId;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : seletedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-green-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white pb-2 ${bubbleBgColor} ${shakeClass}`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {extractTime(message?.createdAt ?? "")}
      </div>
    </div>
  );
};

export default Message;
