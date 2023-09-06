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
import { join } from "path";

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
  var { id } = useParams<{ id: string }>();
  const [inputMessage, setInputMessage] = useState<string>("");
  const dispatch = useAppDispatch();
  const [idReceiver, setIdReceiver] = useState<string>(id);
  const [idBuuble, setIdBuuble] = useState<string>("");
  const userId = useAppSelector((state) => state.user.user?.id);
  const [room, setRoom] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  const handleBubbleClick = async (idHandler: string) => {
    console.log("click");
    console.log(idReceiver);
    setIdReceiver(idHandler);
    // setIdBuuble(idHandler);
    // setNameConversation(nameHandler);
    // const sorted = [userId, idHandler].sort();
    // setRoom(sorted);
    // console.log("buble");
    // newSocket.emit("join_room", { idUser: userId, idReceiver: idHandler});
    // newSocket.emit("messages", { idUser: userId, idReceiver: idHandler });
  };

  useEffect(() => {
    dispatch(getConversation()).then((res) => {
      const usersData = res.payload.map((user: any) => ({
        id: user.id,
        name: user.name,
        image_url: user.image_url,
      }));
      setConversations(usersData);
      console.log(usersData);
    });

    const fetchData = async () => {
      if (id) {
        setIdBuuble(id);
        const disp = (await dispatch(getListUsers(id))).payload;
        setNameConversation(disp);
        // setIdReceiver(id);
        const sorted = [userId, id].sort();
        setRoom(sorted);
        console.log("encontré id")
        console.log(sorted);
        newSocket.emit("join_room", { idUser: userId, idReceiver: idReceiver});
        // newSocket.emit("messages", { idUser: userId, idReceiver: id});
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    // Configurar la conexión al servidor WebSocket

    newSocket.on("chat", (data: any) => {
      console.log(data);

      const message = data.message;
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // newSocket.on("get_conversations", (data: any) => {
    //   console.log(data);

    //   const chats = data.conversations;
    //   setConversations(chats);
    // });

    newSocket.on("disconnect", () => {
      newSocket.close();
    });

    // newSocket.on("connect", () => {
    //   if (id) {
    //     newSocket.emit("messages", { idUser: userId, idReceiver: id });
    //   }
    // });

    newSocket.on("join_room", (data: any) => {
      console.log("entré a un room");
      console.log(data.room);
      // setMessages([]);
      console.log(userId+" "+ idReceiver);
      newSocket.emit("messages", { idUser: userId, idReceiver: idReceiver});
    });

    newSocket.on("messages", (data: any) => {
      console.log("entre a mensajes");
      console.log(data);
      setMessages(data.messages);
    });
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
      newSocket.emit("chat", message, room);
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
    const chatDiv = document.getElementById("chatDiv"); // Cambia "chatDiv" al id de tu div de chat
    if (chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  };

  setTimeout(() => {
    setIsLoading(false);
  }, 500);
  
  return (
    <IonPage>
      {isLoading ? (
        <Loading message='Cargando conversaciones...' />
      ) : (
        <>
          <Header />
          { conversations.length == 0 ? (
            <IonTitle style={{textAlign: "center"}} >No tienes conversaciones</IonTitle>
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
                      <Bubble
                        name={conversation.name}
                        img={conversation.image_url}
                        key={conversation.id}
                        onClick={() => {
                          handleBubbleClick(conversation.id);
                          setIdReceiver(conversation.id);
                          setNameConversation(conversation.name);
                          history.push(`/chat/${conversation.id}`);
                        }}
                      />
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
                          history.push(`/profile/${idReceiver}`);
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
          ) }
          <Footer active='chat' />
        </>
      )}
    </IonPage>
  );
};

export default Chat;
