import { MessageSkeleton } from "components/skeletons";
import { useGetMessages, useListenMessages } from "hooks";
import useDeleteMessage from "hooks/useDeleteMessage";
import { useEffect, useRef } from "react";
import Message from "./Message";

const Messages = () => {
  const { messages, loading, getMessages } = useGetMessages();
  const { loading: loadingDelete, deleteMessage } = useDeleteMessage();

  //this hook will listening all incomming messages
  useListenMessages();
  const lastMessageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const handleDeleteMessage = async (messageId: string) => {
    await deleteMessage(messageId);
    await getMessages();
  };

  return (
    <div className="px-4 flex-1 overflow-auto">
      {(!loading || !loadingDelete) &&
        messages.length > 0 &&
        messages?.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} onDeleteMessage={handleDeleteMessage} />
          </div>
        ))}
      {(loading || loadingDelete) &&
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {(!loading || !loadingDelete) && messages.length === 0 && (
        <p className="text-center text-slate-600">
          Send a message to start a conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
