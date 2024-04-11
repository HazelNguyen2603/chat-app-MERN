import { useSocketContext } from "context";
import React, { useEffect } from "react";
import { IMessage } from "types";
import useConversation from "zustand/useConversation";
import notiSound from "assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage: IMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notiSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};

export default useListenMessages;
