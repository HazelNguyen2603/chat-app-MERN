import { useAuthContext } from "context";
import { useState } from "react";
import toast from "react-hot-toast";
import { IUser } from "types";

const useSignup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullName,
    username,
    confirmPassword,
    gender,
    password,
  }: IUser) => {
    const success = handleInputError({
      username,
      fullName,
      confirmPassword,
      gender,
      password,
    });

    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch(`api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          confirmPassword,
          gender,
          password,
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignup;

function handleInputError({
  fullName,
  username,
  confirmPassword,
  password,
  gender,
}: IUser) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password nust be at least 6 character");
    return false;
  }
  return true;
}
