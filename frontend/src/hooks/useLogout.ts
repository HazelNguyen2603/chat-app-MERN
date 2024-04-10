import { useAuthContext } from "context";
import { useState } from "react";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    try {
      const res = await fetch(`api/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
