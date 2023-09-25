/** @format */

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Chat.css";
import React, { useEffect, useState, useRef } from "react";
import { IonButton, IonIcon, IonPage, IonText, IonTitle } from "@ionic/react";
import { io } from "socket.io-client";
import { send, caretDown } from "ionicons/icons/";
import { useHistory, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../components/redux/hooks";
import {
  getConversation,
  getListUsers,
} from "../../components/redux/states/userSlice";
import Bubble from "../../components/Bubble/Bubble";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Loading from "../../components/Loading";
import { Keyboard } from "@capacitor/keyboard";

interface Message {
  message: string;
  sender: string;
  receiver: string;
  date: string;
  time: string;
}

interface ConversationsProfiles {
  _id: string;
  name: string;
  image_url: string;
  read: boolean;
}
const path = import.meta.env.VITE_PATH_BACKEND;

  if (path) {
    var newSocket = io(path, {
      path: "/sockets",
      transports: ["websocket"],
      upgrade: false
    });
  }

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  var { id } = useParams<{ id: string }>();
  const [inputMessage, setInputMessage] = useState<string>("");
  const dispatch = useAppDispatch();
  const [idReceiver, setIdReceiver] = useState<string>(id);
  const [idBuuble, setIdBuuble] = useState<string>("");
  const userId = useAppSelector((state) => state.user.user?.id);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nameConversation, setNameConversation] = useState<string>("");
  const scroll = useRef<HTMLDivElement>(null);
  const [isTutor, setIsTutor] = useState<boolean>(false);
  const messageRef = useRef<HTMLInputElement>(null);
  const [notification, setNotification] = useState<boolean>(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [conversations, setConversations] = useState<ConversationsProfiles[]>(
    []
  );

  const history = useHistory();

  const handleBubbleClick = async (idHandler: string) => {
    setIdBuuble(idHandler);
    setNotification(false);
  };
  const fetchData = async () => {
    setIdBuuble(id);
    const disp = (await dispatch(getListUsers(id))).payload;
    setNameConversation(disp.name);
    setIsTutor(disp.is_tutor);
    newSocket.emit("join_room", { idUser: userId, idReceiver: idReceiver });
  };

  useEffect(() => {
    dispatch(getConversation()).then((res) => {
      const usersData = res.payload.map((user: any) => ({
        _id: user._id,
        name: user.name,
        image_url: user.image_url,
        read: user.read,
      }));
      usersData.find((conversation: any) => !conversation.read)
        ? setNotification(true)
        : setNotification(false);
      setConversations(usersData);
    });
    if (id) {
      newSocket.connect();
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    // Configurar la conexión al servidor WebSocket
    newSocket.on("messages", (data: any) => {
      setMessages(data.messages);
    });
    
    newSocket.on("chat", (data: any) => {
      const messages = data.messages;
      // if(message === messages[messages.length - 1]){
      //   console.log("mismo mensaje")
      // }else setMessages((prevMessages) => [...prevMessages, message]);
      setMessages(messages);
    });

    newSocket.on("disconnect", () => {
      newSocket.close();
    });

    newSocket.on("join_room", (data: any) => {
      newSocket.emit("messages", { idUser: userId, idReceiver: idReceiver });
    });

    return () => {
      newSocket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    if (scroll.current) {
      scrollToBottom();
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
        sender: userId,
        receiver: destinatario,
        date: dateFormatted,
        time: timeFormatted,
      };
      newSocket.emit("chat", message);
      setInputMessage("");
    }
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
    const chatDiv = document.getElementById("chatDiv");
    if (chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  };

  setTimeout(() => {
    setIsLoading(false);
  }, 500);

  const [firsTime, setFirsTime] = useState<Boolean>(true);
  const firstTimeFunction = () => {
    if (id && conversations.length === 0) {
      setFirsTime(false);
    } else if (id || conversations.length > 0) {
      setFirsTime(false);
    }
  };

  useEffect(() => {
    firstTimeFunction();
  });

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", info => {
      const enviar = document.getElementById("enviar");
      const chat = document.getElementById("chatDiv");
      if (enviar) {
        const height = info.keyboardHeight;
        enviar.style.bottom = `calc(10px + ${height}px)`;
        if (chat) {
          const newHeight = height - 10;
          chat.style.height = `calc(100% - ${newHeight}px)`;
          scrollToBottom( );
        }
      }
    });
    Keyboard.addListener("keyboardWillHide", () => {
      const enviar = document.getElementById("enviar");
      const chat = document.getElementById("chatDiv");
      if (enviar) {
        enviar.style.bottom = "9vh";
        if (chat) {
          chat.style.height = "100%";
        }
      }
    });
  }, []);

  return (
    <IonPage>
      {isLoading ? (
        <Loading message='Cargando chats...' />
      ) : (
        <>
          <Header />
          {firsTime ? (
            <IonTitle style={{ textAlign: "center" }}>
              No tienes conversaciones
            </IonTitle>
          ) : (
            <div className='contChat'>
              <div className='slides'>
                <Swiper
                  grabCursor={true}
                  centeredSlides={false}
                  slidesPerView={"auto"}
                  spaceBetween={1}
                  initialSlide={0}
                  width={conversations.length * 69}
                >
                  <SwiperSlide>
                    {conversations.map((conversation) => (
                      <div style={{ height: "100%" }} key={conversation._id}>
                        <Bubble
                          name={conversation.name}
                          img={conversation.image_url}
                          read={conversation.read}
                          onClick={() => {
                            handleBubbleClick(conversation._id);
                            setIdReceiver(conversation._id);
                            setNameConversation(conversation.name);
                            history.push(`/chat/${conversation._id}`);
                          }}
                        />
                      </div>
                    ))}
                  </SwiperSlide>
                </Swiper>
              </div>
              {idBuuble && (
                <>
                  <div className='chat'>
                    <div className='topChat'>
                      <IonText
                        onClick={() => {
                          isTutor ? history.push(`/profile/${id}`) : null;
                        }}
                      >
                        {nameConversation}
                      </IonText>
                    </div>
                    <div
                      id='chatDiv'
                      style={{ marginTop: "5vh" }}
                      className='chat'
                    >
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
                            <IonText className='textoChat'>
                              {message.message}
                            </IonText>
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
                  <div id="enviar" className='enviar'>
                    <input
                      ref={messageRef}
                      className='inputEnviar'
                      type='text'
                      placeholder='Mensaje'
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (messageRef.current?.value !== "") {
                            sendMessage(id);
                          }
                        }
                      }}
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
          )}
          <Footer active='chat' notification={notification} />
        </>
      )}
    </IonPage>
  );
};

export default Chat;
