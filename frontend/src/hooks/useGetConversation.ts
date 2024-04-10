import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IUser } from "types";

const useGetConversation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [conversations, setConversations] = useState<IUser[]>([]);

  useEffect(() => {
    const getConversationList = async () => {
      setLoading(true);
      try {
        const res = await fetch("api/users", {
          method: "GET",
          headers: { "Content-type": "application/json" },
        });

        const data = await res.json();
        if (data?.error) throw new Error(data.error);

        setConversations(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversationList();
  }, []);

  return { conversations, loading };
};

export default useGetConversation;
