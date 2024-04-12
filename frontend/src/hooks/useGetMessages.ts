import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "zustand/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { messages, setMessages, seletedConversation } = useConversation();

  const getMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`api/messages/${seletedConversation?._id}`);

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (seletedConversation?._id) getMessages();
  }, [seletedConversation?._id, setMessages]);

  return { messages, loading, getMessages };
};

export default useGetMessages;
