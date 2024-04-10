import { useAuthContext } from "context";
import { useState } from "react";
import toast from "react-hot-toast";
import { ILogin } from "types";

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useAuthContext();
  const login = async ({ username, password }: ILogin) => {
    const success = handleInputError({
      username,
      password,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch(`api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      localStorage.setItem("chat-user", data);
      setAuthUser(data);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
};

export default useLogin;

function handleInputError({ username, password }: ILogin) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  return true;
}
