import { useContext } from "react";
import { createContext } from "react";
import { useEffect, useState } from "react";

const UserContext = createContext();
const UserUpdateContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};
export const useUpdateUser = () => {
  return useContext(UserUpdateContext);
};

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}
