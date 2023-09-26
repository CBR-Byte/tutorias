
import { io } from "socket.io-client";
import { storage } from "./components/redux/states/userSlice";
import { useAppSelector } from "./components/redux/hooks";

const path = import.meta.env.VITE_PATH_BACKEND;
export const newSocket = io(path, {
    path: "/sockets",
    transports: ["websocket"],
    upgrade: false
  });

newSocket.connect();

//const userId = useAppSelector((state) => state.user.user.id);
export const join = async (id: string) => {
  let allMessages2 = await storage.get('historial');
  allMessages2 = JSON.parse(allMessages2?.historial);
  
  for (let message of allMessages2) {
    newSocket.emit("join_room", { idUser: id, idReceiver: message.id });
  }
}


  