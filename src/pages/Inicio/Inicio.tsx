/** @format */

import { IonPage, IonTitle, IonInput, IonIcon, IonButton } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../components/redux/hooks";
import { getTutors } from "../../components/redux/states/tutorSlice";
import { useHistory } from "react-router";
import "../Register/Register.css";
import { useEffect, useState, useRef } from "react";
import "./Inicio.css";
import { search, filter } from "ionicons/icons/";
import Card from "../../components/Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "@ionic/react/css/ionic-swiper.css";
import Header from "../../components/Header/Header";
import {
  Pagination,
  Autoplay,
  EffectCards,
  HashNavigation,
  Navigation,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Footer from "../../components/Footer/Footer";
import { getConversation } from "../../components/redux/states/userSlice";

const Inicio: React.FC = () => {
  const dispatch = useAppDispatch();
  const stateUser = useAppSelector((state) => state.user);
  const history = useHistory();
  const [IsSearch, setIsSearch] = useState<boolean>(false);
  const inputRef = useRef<HTMLIonInputElement>(null);
  const [tutores, setTutores] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    if (!stateUser.registerCompleted && stateUser.user?.is_tutor) {
      history.push("/tutorForm");
    } else if (!stateUser.registerCompleted && stateUser.user?.is_student) {
      history.push("/userForm");
    }
  }, []);

  useEffect(() => {
    dispatch(getConversation()).then((res) => {
      const usersData = res.payload.map((user: any) => ({
        _id: user._id,
        name: user.name,
        image_url: user.image_url,
        read: user.read,
      }));
      setConversations(usersData);
    });
  }, []);

  const searchTutors = () => {
    const keyWords = inputRef.current?.value?.toString().split(" ");
    if (inputRef.current?.value !== '') {
      setIsSearch(true);
      dispatch(getTutors(keyWords)).then((res) => {
        setTutores(res.payload);
      });
    }
  };

  const handleInput = (event: React.KeyboardEvent<HTMLIonInputElement>) => {
    if (event.key === "Enter") {
      searchTutors();
    }
  };

  const califications = (calificaciones: any) => {
    if (calificaciones != null) {
      const suma = calificaciones.reduce((a: any, b: any) => a + b.calif, 0);
      const media = suma / calificaciones.length;
      return media;
    } else {
      return 0;
    }
  };

  return (
    <IonPage>
      <div className='cont'>
        <Header />
        <div className='contenedor'>
          <div className='buscador'>
            <IonIcon
              onClick={() => searchTutors()}
              className='searchIcon'
              icon={search}
            />
            <IonInput
              type='text'
              ref={inputRef}
              onKeyDown={handleInput}
              className='inputs2'
              placeholder='Buscar'
            />
          </div>
          <div className='recomendados'>
            <IonTitle className='textoRec'>RECOMENDADOS</IonTitle>
            <Swiper
              effect={"cards"}
              hashNavigation={{
                watchState: true,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              cardsEffect={{ slideShadows: false }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              modules={[
                EffectCards,
                Pagination,
                Autoplay,
                Navigation,
                HashNavigation,
              ]}
            >
              <SwiperSlide>
                <Card
                  onClick={() => console.log("hola")}
                  nombre='Juan Pablo Gómez'
                  modalidad='Virtual'
                  descripcion='python, java, c++, cálculo, geometría, física, química'
                  calificacion={4.5}
                  precio={10000}
                  numCalificacion={10}
                  imagen='https://www.w3schools.com/howto/img_avatar.png'
                />
              </SwiperSlide>
              <SwiperSlide>
                <Card
                  onClick={() => console.log("hola")}
                  nombre='Camila Suarez Gómez'
                  modalidad='presencial'
                  descripcion='python, java, c++, cálculo, geometría, física, química,inglés, español'
                  calificacion={5}
                  precio={30000}
                  numCalificacion={41}
                  imagen='https://www.w3schools.com/w3images/avatar4.png'
                />
              </SwiperSlide>
              <SwiperSlide>
                <Card
                  onClick={() => console.log("hola")}
                  nombre='Jaime Obando Gómez'
                  modalidad='presencial'
                  descripcion='python, java, c++, cálculo, geometría, física, química,inglés, español'
                  calificacion={5}
                  precio={30000}
                  numCalificacion={41}
                  imagen='https://www.w3schools.com/w3images/avatar5.png'
                />
              </SwiperSlide>
            </Swiper>
          </div>
          {IsSearch && (
            <div className='resultados'>
              <div className='resTitle'>
                <IonTitle className='textoRec'>RESULTADOS</IonTitle>
                <IonButton className='filter' fill='clear'>
                  <IonIcon icon={filter} className='iconFilter' />
                </IonButton>
              </div>
              <div className='res'>
                {tutores.map((tutor) => (
                  <Card
                    key={tutor.id}
                    onClick={() => history.push(`/profile/${tutor.id}`)}
                    nombre={tutor.name}
                    modalidad={tutor.format_tutor}
                    descripcion={tutor.subjects_tutor}
                    calificacion={califications(tutor.calification)}
                    precio={tutor.cost_tutor}
                    numCalificacion={
                      tutor.calification != null ? tutor.calification.length : 0
                    }
                    imagen={tutor.image_url}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <Footer
          active='inicio'
          notification={
            conversations.find((conversation) => !conversation.read)
              ? true
              : false
          }
        />
      </div>
    </IonPage>
  );
};

export default Inicio;
