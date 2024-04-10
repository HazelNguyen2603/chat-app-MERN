import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "zustand/useConversation";

const useSendMessage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { seletedConversation, messages, setMessages } = useConversation();

  const sendMessage = async (message: string) => {
    try {
      const res = await fetch(
        `api/messages/send/${seletedConversation?._id ?? ""}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
