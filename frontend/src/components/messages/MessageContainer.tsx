import useConversation from "zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NoChatSelected from "./NoChatSelected";
import { useEffect } from "react";

const MessageContainer = () => {
  const { seletedConversation, setSeletedConversation } = useConversation();

  useEffect(() => {
    //cleanup function unmounts
    return () => setSeletedConversation(null);
  }, [setSeletedConversation]);
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!seletedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">
              {seletedConversation?.fullName ?? ""}
            </span>
          </div>
          {/* Message */}
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
