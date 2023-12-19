import React, { createContext, ReactNode, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

type Props = { children: ReactNode };

type Context = {
  currentUser: string | undefined;
  changeUser: React.Dispatch<React.SetStateAction<string | undefined>>;
  isAdmin: boolean | undefined;
};

const initialContext: Context = {
  currentUser: "user",
  changeUser: () => {},
  isAdmin: false,
};
export const UserContext = createContext(initialContext);

export default function AuthContext({ children }: Props) {
  const [role, setUserRole] = useLocalStorage<string>("userRole", "user");
  const [currentUser, setCurrentUser] = useState<string | undefined>();

  useEffect(() => {
    setCurrentUser(role);
  }, [role]);
  const contextStateData = {
    currentUser: currentUser,
    changeUser: setUserRole,
    isAdmin: currentUser === "admin" ? true : false,
  };

  return (
    <UserContext.Provider value={contextStateData}>
      {currentUser && children}
    </UserContext.Provider>
  );
}
