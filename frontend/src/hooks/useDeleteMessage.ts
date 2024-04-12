import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteMessage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteMessage = async (messageId: string) => {
    try {
      const res = await fetch(`api/messages/${messageId}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      return data;
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteMessage };
};

export default useDeleteMessage;
