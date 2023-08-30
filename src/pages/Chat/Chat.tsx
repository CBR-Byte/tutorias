import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Chat.css";
import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import { io } from 'socket.io-client';
import { useHistory } from "react-router";

//import { Message } from './Message';

const socket = io('http://localhost:8000', {
  path: '/sockets',
});

const Chat: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  const history = useHistory();
  
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(socket.connected);
    });

    socket.on('disconnect', () => {
      setIsConnected(socket.connected);
    });

    socket.on('chat', (data) => {
      setMessages((prevMessages) => [...prevMessages, { ...data, type: 'chat' }]);
    });

    return () => {
      socket.close()
    };
  }, []);

  //{"sender": "usuario1", "receiver": "usuario2", "message": message}
  const sendMessage = () => {
    if (message && message.trim().length > 0) {
      console.log(message);
      
      socket.emit('chat',message);
      setMessage('');
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonButton onClick={() => history.goBack()} >Regresar</IonButton>
        <IonList>
          {messages.map((msg, index) => (
            <IonItem key={index}>
              <IonLabel>
                <h2>{msg.type === 'chat' ? `${msg.sid}: ${msg.message}` : null}</h2>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonInput
          type="text"
          id="message"
          value={message}
          onIonChange={(e) => setMessage(e.detail.value!)}
        />
        <IonButton onClick={sendMessage}>Send</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Chat;