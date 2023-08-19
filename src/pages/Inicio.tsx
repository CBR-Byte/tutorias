/** @format */

import {
  IonPage,
  IonTitle,
  IonMenuButton,
  IonInput,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../components/redux/hooks";
import { useHistory } from "react-router";
import { logOut } from "../components/redux/states/userSlice";
import "./Register.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Inicio.css";
import { search, home, person, mail } from "ionicons/icons/";
import Card from "../components/Card/Card";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import 'swiper/css/autoplay';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';

const Inicio: React.FC = () => {
  const dispatch = useAppDispatch();
  const stateUser = useAppSelector((state) => state.user);
  const history = useHistory();

  const closeSesion = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    if (!stateUser.registerCompleted && stateUser.user?.is_tutor) {
      history.push("/tutorForm");
    } else if (!stateUser.registerCompleted && stateUser.user?.is_student) {
      history.push("/userForm");
    }
  }, []);

  return (
    <IonPage>
      <div className="cont">
        <div className='headerInicio'>
          <IonMenuButton autoHide={false} className='bot'></IonMenuButton>
          <IonTitle className='inicio'>INICIO</IonTitle>
          <IonButton onClick={closeSesion}>Cerrar sesión</IonButton>
        </div>
        <div className='contenedor'>
          <div className='buscador'>
            <IonIcon className='searchIcon' icon={search} />  
            <IonInput className='inputs2' placeholder='Buscar'/>
          </div>
          <div className='recomendados'>
            <IonTitle className="textoRec">RECOMENDADOS</IonTitle>
            <Swiper navigation={true} pagination={true} autoplay={true} slidesPerView={1} loop={true}>
              <SwiperSlide>
                <Card
                  nombre="Juan Pablo Gómez"
                  modalidad="Virtual"
                  descripcion="python, java, c++, cálculo, geometría, física, química"
                  calificacion={4.5}
                  precio={10000}
                  numCalificacion={10}
                  imagen="https://www.w3schools.com/howto/img_avatar.png"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Card
                  nombre="Camila Suarez Gómez"
                  modalidad="presencial"
                  descripcion="python, java, c++, cálculo, geometría, física, química,inglés, español"
                  calificacion={5}
                  precio={30000}
                  numCalificacion={41}
                  imagen="https://www.w3schools.com/w3images/avatar4.png"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Card
                  nombre="Jaime Obando Gómez"
                  modalidad="presencial"
                  descripcion="python, java, c++, cálculo, geometría, física, química,inglés, español"
                  calificacion={5}
                  precio={30000}
                  numCalificacion={41}
                  imagen="https://www.w3schools.com/w3images/avatar3.png"
                />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="resultados">
            <IonTitle className="textoRec">RESULTADOS</IonTitle>
            <Card
                  nombre="Jaime Obando Gómez"
                  modalidad="presencial"
                  descripcion="python, java, c++, cálculo, geometría, física, química,inglés, español"
                  calificacion={5}
                  precio={30000}
                  numCalificacion={41}
                  imagen="https://www.w3schools.com/w3images/avatar3.png"
                />
          </div>
        </div>
        <div className="footerInicio">
        <IonIcon className='iconos' icon={person} /> 
        <IonIcon className='iconos' icon={home} /> 
        <IonIcon className='iconos' icon={mail} /> 
        </div>
      </div>
    </IonPage>
  );
};

export default Inicio;
