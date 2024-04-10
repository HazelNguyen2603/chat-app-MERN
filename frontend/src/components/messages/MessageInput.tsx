import { useSendMessage } from "hooks";
import { FormEvent, useState } from "react";
import { BsSend } from "react-icons/bs";
import useConversation from "zustand/useConversation";

const MessageInput = () => {
  const [messageInput, setMessageInput] = useState<string>("");
  const { sendMessage, loading } = useSendMessage();
  const { messages, setMessages } = useConversation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageInput) return;
    await sendMessage(messageInput);
    setMessageInput("");
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
