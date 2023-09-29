/** @format */

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Chat.css";
import React, { useEffect, useState, useRef } from "react";
import { IonButton, IonIcon, IonPage, IonText, IonTitle } from "@ionic/react";

import { send, caretDown } from "ionicons/icons/";
import { useHistory, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../components/redux/hooks";
import Bubble from "../../components/Bubble/Bubble";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { storage } from "../../components/redux/states/userSlice";
import Loading from "../../components/Loading";
import { newSocket } from "../../socket";
import { Keyboard } from "@capacitor/keyboard";
import { getConversation, getListUsers } from "../../components/redux/states/chatSlice";

interface Message {
  message: string;
  sender: string;
  receiver: string;
  date: string;
  time: string;
  read: boolean;
}

interface ConversationsProfiles {
  _id: string;
  name: string;
  image_url: string;
  read: boolean;
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
    setIdReceiver(id);
  }, []);

  const loadChat = async () => {
    let allMessages2 = await storage.get("historial");
    allMessages2 = await JSON.parse(allMessages2.historial);
    for (let message of allMessages2) {
      if (message.id === id) {
        setMessages(message.messages);
        break;
      }
    }
  };

  useEffect(() => {
    if (id) {
      loadChat();
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  //atualiza los mensajes en localstorage cuando el usuario recibe un mensaje
  const updateMessages = async (newMessage: any) => {
    let allMessages2 = await storage.get("historial");
    allMessages2 = JSON.parse(allMessages2?.historial);
    const verificationId = allMessages2.find(
      (message: any) => message.id === newMessage.sender
    );
    if (!verificationId) {
      await storage.set("historial", {
        historial: JSON.stringify([
          ...allMessages2,
          { id: newMessage.receiver, message: [newMessage] },
        ]),
      });
    }
    if (verificationId) {
      for (let message of allMessages2) {
        if (message.id === newMessage.sender) {
          message.messages.push(newMessage);
          break;
        }
      }
      await storage.set("historial", {
        historial: JSON.stringify(allMessages2),
      });
      const newMessages = allMessages2.find(
        (message: any) => message.id === idReceiver
      );
      if (newMessages) {
        setMessages(newMessages.messages);
      }
    }

  };

  useEffect(() => {
    // listener del socket
    newSocket.on("messReaded", (data: any) => {
      //setMessages(data.messages);
      console.log("emit message");
    });

    newSocket.off("chat").on("chat", (data: any) => {
      console.log("emit chat");
      
      const message = data.message;
      updateMessages(message);
    });

    newSocket.on("disconnect", () => {
      //newSocket.close();
    });

    // return () => {
    //   newSocket.disconnect();
    // };
  }, [id]);

  useEffect(() => {
    if (scroll.current) {
      scrollToBottom();
    }
  }, [messages]);

  //actualizar mensajes cuando el usuario manda el mensaje
  const updateChat = async (newMessage: Message) => {

    setMessages((prev) => [...prev, newMessage]);

    let allMessages2 = await storage.get("historial");
    allMessages2 = JSON.parse(allMessages2?.historial);

    const verifyId = allMessages2.find(
      (message: any) => message.id === newMessage.receiver
    );

    if (!verifyId) {
      await storage.set("historial", {
        historial: JSON.stringify([
          ...allMessages2,
          { id: newMessage.receiver, message: [newMessage] },
        ]),
      });
    } else {
      for (let message of allMessages2) {
        if (message.id === newMessage.receiver) {
          message.messages.push(newMessage);
          break;
        }
      }
      await storage.set("historial", {
        historial: JSON.stringify(allMessages2),
      });
    }
  };

  //enviar mensaje al otro usuario
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
        read: false,
      };
      newSocket.emit("chat", message);
      setInputMessage("");
      updateChat(message);
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
  }, 1000);

  const [firsTime, setFirsTime] = useState<Boolean>(true);
  const firstTimeFunction = () => {
    if (id && conversations.length === 0) {
      setFirsTime(false);
    } else if (id || conversations.length > 0) {
      setFirsTime(false);
    }
  };
  const updateBubble = async (idChat: string, name: string) => {
    newSocket.emit("messReaded", {idUser: userId, idReceiver: idChat})
    handleBubbleClick(idChat);
    setIdReceiver(idChat);
    setNameConversation(name);
    history.push(`/chat/${idChat}`);
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
                            updateBubble(conversation._id, conversation.name);
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
