import { storage } from './components/redux/states/userSlice';

export const updateMessages = async(newMessage:any) => {
    let messages = await storage.get("historial");
    messages = JSON.parse(messages?.historial);
    const verificationId = messages.find(
      (message: any) => message.id === newMessage.sender
    );
    
    if (!verificationId) {
      await storage.set("historial", {
        historial: JSON.stringify([
          ...messages,
          { id: newMessage.sender, message: [newMessage] },
        ]),
      });
    } else {
      for (let message of messages) {
        if (message.id === newMessage.sender) {
          message.messages.push(newMessage);
          break;
        }
      }
      await storage.set("historial", {historial: JSON.stringify(messages)});
      
    }
}

export const path = import.meta.env.VITE_PATH_BACKEND;
