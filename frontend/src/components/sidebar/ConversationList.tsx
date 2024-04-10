import React, { useEffect, useRef } from "react";
import ConversationItem from "./ConversationItem";
import { useGetConversation } from "hooks";
import { getRandomEmoji } from "utils";
import useConversation from "zustand/useConversation";

const ConversationList = () => {
  const { loading, conversations } = useGetConversation();
  const conversationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      conversationRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [conversations]);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : conversations?.length ? (
        conversations?.map((conversation, idx) => (
          <div key={conversation._id} ref={conversationRef}>
            <ConversationItem
              conversation={conversation}
              emoji={getRandomEmoji()}
              lastIdx={idx === conversations.length - 1}
            />
          </div>
        ))
      ) : null}
    </div>
  );
};

export default ConversationList;
