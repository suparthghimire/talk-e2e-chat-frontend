import { useContext } from "react";
import { createContext } from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};
export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState();
  useEffect(() => {
    const socket = io.connect("http://localhost:3000");
    setSocket(socket);
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
