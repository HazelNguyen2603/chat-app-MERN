import { useAuthContext } from "context";
import { IMessage } from "types";
import { extractTime } from "utils";
import useConversation from "zustand/useConversation";
import ContextMenu from "./ContextMessageMenu";

interface IMessageProps {
  message: IMessage;
  onDeleteMessage: (messageId: string) => Promise<void>;
}

const Message = ({ message, onDeleteMessage }: IMessageProps) => {
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
    <>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={profilePic} />
          </div>
        </div>
        <div
          tabIndex={0}
          className={`${
            fromMe && "dropdown"
          } chat-bubble text-white pb-2 relative ${bubbleBgColor} ${shakeClass}`}
        >
          {message.message}
          {fromMe && (
            <ContextMenu callback={() => onDeleteMessage(message._id ?? "")} />
          )}
        </div>

        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          {extractTime(message?.createdAt ?? "")}
        </div>
      </div>
    </>
  );
};

export default Message;
