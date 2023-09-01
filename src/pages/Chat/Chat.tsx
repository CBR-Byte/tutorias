/** @format */

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Chat.css";
import React, { useEffect, useState, useRef } from "react";
import { IonButton, IonIcon, IonPage, IonText } from "@ionic/react";
import ReconnectingWebSocket from "reconnecting-websocket";
import { send, caretDown } from "ionicons/icons/";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../components/redux/hooks";
import {
  getMessages,
  getConversation,
  getListUsers,
} from "../../components/redux/states/userSlice";
import Bubble from "../../components/Bubble/Bubble";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Message {
  message: string;
  sender: string;
  receiver: string;
  date: string;
  time: string;
}

interface ConversationsProfiles {
  id: string;
  name: string;
  img: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user?.id);
  const [idReceiver, setIdReceiver] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);
  let { id } = useParams<{ id: string }>();
  const [idBubble, setIdBuuble] = useState<string>(id);
  const [nameConversation, setNameConversation] = useState<string>("");
  const scroll = useRef<HTMLDivElement>(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [conversations, setConversations] = useState<ConversationsProfiles[]>(
    []
  );
  useEffect(() => {
    // Configurar la conexión al servidor WebSocket
    const newSocket = new ReconnectingWebSocket("ws://localhost:8000/ws/chat");
    setSocket(newSocket);

    // Limpiar la conexión cuando el componente se desmonta
    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    dispatch(getConversation()).then((res) => 
     { const usersData = res.payload.map((user: any) => ({
        id: user.id,
        name: user.name,
        img: user.image_url,
      }));
      setConversations(usersData);
    }
    );

    if (id) {
      const userParamFetch = dispatch(getListUsers(id));
      userParamFetch.then((res) =>
        setNameConversation(res.payload.users[0].name)
      );
      let messagesFetch = dispatch(getMessages(id));
      messagesFetch.then((res) => setMessages(res.payload));
      return () => {
        socket.close();
      };
    }
  }, []);

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest", 
      });
    }
  }, [messages]);

  const sendMessage = (destinatario: string) => {
    if (inputMessage.trim().length > 0) {
      const date = new Date();

      const dateFormatted = date.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }); // Format: dd/mm/yyyy

      const timeFormatted = date.toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }); // Format: hh:mm
      const message: Message = {
        message: inputMessage,
        sender: userId, // Replace with actual sender
        receiver: destinatario, // Replace with actual receiver
        date: dateFormatted,
        time: timeFormatted,
      };
      socket.send(JSON.stringify(message));
      setMessages((prevMessages) => [...prevMessages, message]);
      setInputMessage("");
    }
  };

  const handleBubbleClick = (idHandler: string, nameHandler: string) => {
    setIdReceiver(idHandler);
    let messagesFetchHandler = dispatch(getMessages(idHandler));
    messagesFetchHandler.then((res) => setMessages(res.payload));
    setIdBuuble(idHandler);
    setNameConversation(nameHandler);
    return () => {
      socket.close();
    };
  };

  const handleScroll = () => {
    const chatDiv = document.getElementById("chatDiv");
    if (chatDiv) {
      const isAtBottom =
        chatDiv.scrollHeight - chatDiv.clientHeight <= chatDiv.scrollTop + 1;
      setIsButtonVisible(!isAtBottom);
    }
  };

  useEffect(() => {
    const chatDiv = document.getElementById("chatDiv");
    if (chatDiv) {
      chatDiv.addEventListener("scroll", handleScroll);
      return () => {
        chatDiv.removeEventListener("scroll", handleScroll);
      };
    }
  }, [messages]);

  const scrollToBottom = () => {
    const chatDiv = document.getElementById("chatDiv"); // Cambia "chatDiv" al id de tu div de chat
    if (chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  };
  return (
    <IonPage>
      <Header />
      <div className='contChat'>
        <div className='slides'>
          <Swiper
            grabCursor={true}
            centeredSlides={false}
            slidesPerView={"auto"}
            spaceBetween={10}
            initialSlide={0}
            width={conversations.length * 69}
          >
            <SwiperSlide style={{ width: "17%" }}>
              {conversations.map((conversation) => (
                <Bubble
                  name={conversation.name}
                  img={conversation.img}
                  key={conversation.id}
                  onClick={() =>
                    handleBubbleClick(conversation.id, conversation.name)
                  }
                />
              ))}
            </SwiperSlide>
          </Swiper>
        </div>
        {idBubble && (
          <>
            <div className='chat'>
              <div className='topChat'>
                <IonText>{nameConversation}</IonText>
              </div>
              <div id='chatDiv' style={{ marginTop: "5vh" }} className='chat'>
                {messages.map((message, index) => (
                  <div
                    ref={scroll}
                    className={
                      userId == message.sender
                        ? "mensajesChat user"
                        : "mensajesChat client"
                    }
                    key={index}
                  >
                    <div>
                      <IonText className='textoChat'>{message.message}</IonText>
                    </div>
                    <div
                      className={
                        userId == message.sender
                          ? "fechaChatUser"
                          : "fechaChatClient"
                      }
                    >
                      <IonText>
                        {message.date}
                        {" " + message.time}
                      </IonText>
                    </div>
                  </div>
                ))}
              </div>
              {isButtonVisible && (
                <div className='bajarChat'>
                  <IonButton onClick={scrollToBottom}>
                    <IonIcon icon={caretDown} className='iconBajar' />
                  </IonButton>
                </div>
              )}
            </div>
            <div className='enviar'>
              <input
                className='inputEnviar'
                type='text'
                placeholder='Type your message'
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <IonButton
                className='btnEnviar'
                fill='clear'
                onClick={() => sendMessage(idReceiver)}
              >
                <IonIcon icon={send} className='iconEnviar' />
              </IonButton>
            </div>
          </>
        )}
      </div>
      <Footer active='chat' />
    </IonPage>
  );
};

export default Chat;
