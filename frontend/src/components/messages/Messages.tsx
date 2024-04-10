import React, { RefObject, useEffect, useRef } from "react";
import Message from "./Message";
import { useGetMessages } from "hooks";
import { MessageSkeleton } from "components/skeletons";

const Messages = () => {
  const { messages, loading } = useGetMessages();

  const lastMessageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages?.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center text-slate-600">
          Send a message to start a conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
