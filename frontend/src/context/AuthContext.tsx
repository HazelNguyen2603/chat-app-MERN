import { createContext, ReactNode, useContext, useState } from "react";
import { IUser } from "types";

export const AuthContext = createContext<{
  authUser: IUser | null;
  setAuthUser: (user: IUser | null) => void;
}>({
  authUser: null,
  setAuthUser: () => {}, // Initial value for setAuthUser
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

interface IAuthContextProvider {
  children: ReactNode;
}
export const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  const [authUser, setAuthUser] = useState<IUser | null>(() => {
    const storedUser = localStorage.getItem("chat-user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
