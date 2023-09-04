/** @format */

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Chat.css";
import React, { useEffect, useState, useRef } from "react";
import { IonButton, IonIcon, IonPage, IonText } from "@ionic/react";
import { io } from "socket.io-client";
import { send, caretDown } from "ionicons/icons/";
import { useHistory, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../components/redux/hooks";
import {
  getConversation
} from "../../components/redux/states/userSlice";
import Bubble from "../../components/Bubble/Bubble";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Loading from "../../components/Loading";

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
  image_url: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user?.id);
  let { id } = useParams<{ id: string }>();
  const [nameConversation, setNameConversation] = useState<string>("");
  const scroll = useRef<HTMLDivElement>(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [conversations, setConversations] = useState<ConversationsProfiles[]>(
    []
  );

  const newSocket = io("http://localhost:8000", {
    path: "/sockets",
  });
  const history = useHistory();

  useEffect(() => {
    // Configurar la conexión al servidor WebSocket
    
    newSocket.on("chat", (data: any) => {
      console.log(data);
      
      const message = data.message;
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    
    newSocket.on("get_conversations", (data: any) => {
      console.log(data);
      
      const chats = data.conversations;
      setConversations(chats);
    });
    
    newSocket.on("disconnect", () => {
      newSocket.close();
    });

    newSocket.on("connect", () => {
      console.log(userId);
      
      //newSocket.emit("get_conversations", { idUser: userId });
      if (id) {
        newSocket.emit("messages", { idUser: userId, idReceiver: id });
      }
    });

    newSocket.on("messages", (data: any) => {
      //console.log(data);
      setMessages(data.messages);
    });
  }, []);

  useEffect(() => {
    dispatch(getConversation()).then((res) =>
     { const usersData = res.payload.map((user: any) => ({
        id: user.id,
        name: user.name,
        image_url: user.image_url,
      }));
      setConversations(usersData);
    }
    );

    // if (id) {
    //   const userParamFetch = dispatch(getListUsers(id));
    //   userParamFetch.then((res) =>
    //     setNameConversation(res.payload.users[0].name)
    //   );

    // }
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

      newSocket.emit("chat", message);
      setInputMessage("");
    }
  };

  const handleBubbleClick = (idHandler: string, nameHandler: string) => {
    setNameConversation(nameHandler);
    newSocket.emit("messages", { idUser: userId, idReceiver: idHandler });
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
                  img={conversation.image_url}
                  key={conversation.id}
                  onClick={() => {
                    handleBubbleClick(conversation.id, conversation.name);
                    history.push("/chat/" + conversation.id);
                  }}
                />
              ))}
            </SwiperSlide>
          </Swiper>
        </div>
        {
          conversations.length === 0 && (
            <Loading message="Cargando tus chats..."/>
          )
        }
        {id && (
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
                onClick={() => sendMessage(id)}
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
