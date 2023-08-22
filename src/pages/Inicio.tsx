/** @format */

import { IonPage, IonTitle, IonInput, IonIcon, IonButton } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../components/redux/hooks";
import { useHistory } from "react-router";
import { logOut } from "../components/redux/states/userSlice";
import "./Register.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Inicio.css";
import { search, home, person, mail, power, filter } from "ionicons/icons/";
import Card from "../components/Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "@ionic/react/css/ionic-swiper.css";
import {
  Pagination,
  Autoplay,
  EffectCoverflow,
  HashNavigation,
  Navigation,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
      <div className='cont'>
        <div className='headerInicio'>
          <IonTitle className='inicio'>INICIO</IonTitle>
          <IonButton fill='clear' className='bot' onClick={closeSesion}>
            <IonIcon icon={power} />
          </IonButton>
        </div>
        <div className='contenedor'>
          <div className='buscador'>
            <IonIcon className='searchIcon' icon={search} />
            <IonInput className='inputs2' placeholder='Buscar' />
          </div>
          <div className='recomendados'>
            <IonTitle className='textoRec'>RECOMENDADOS</IonTitle>
            <Swiper
              effect={"coverflow"}
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
              coverflowEffect={{
                rotate: 20,
                stretch: 0,
                depth: 50,
                modifier: 1,
                slideShadows: true,
              }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              modules={[
                EffectCoverflow,
                Pagination,
                Autoplay,
                Navigation,
                HashNavigation,
              ]}
            >
              <SwiperSlide>
                <Card
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
          <div className='resultados'>
            <div className='resTitle'>
              <IonTitle className='textoRec'>RESULTADOS</IonTitle>
              <IonButton className='filter' fill='clear'>
                <IonIcon icon={filter} className='iconFilter' />
              </IonButton>
            </div>
            <div className='res'>
              <Card
                nombre='Jaime Obando Gómez'
                modalidad='presencial'
                descripcion='python, java, c++, cálculo, geometría, física, química,inglés, español'
                calificacion={5}
                precio={30000}
                numCalificacion={41}
                imagen='https://www.w3schools.com/w3images/avatar6.png'
              />
              <Card
                nombre='Jaime Obando Gómez'
                modalidad='presencial'
                descripcion='python, java, c++, cálculo, geometría, física, química,inglés, español'
                calificacion={5}
                precio={30000}
                numCalificacion={41}
                imagen='https://www.w3schools.com/w3images/avatar1.png'
              />
              <Card
                nombre='Jaime Obando Gómez'
                modalidad='presencial'
                descripcion='python, java, c++, cálculo, geometría, física, química,inglés, español'
                calificacion={5}
                precio={30000}
                numCalificacion={41}
                imagen='https://www.w3schools.com/w3images/avatar3.png'
              />
            </div>
          </div>
        </div>
        <div className='footerInicio'>
          <IonButton className='iconosB' fill="clear">
            <IonIcon className='iconos' icon={person} />
          </IonButton>
          <IonButton className='iconosB' fill="clear">
            <IonIcon className='iconos active' icon={home} />
          </IonButton>
          <IonButton className='iconosB' fill="clear">
            <IonIcon className="iconos" icon={mail} />
          </IonButton>
        </div>
      </div>
    </IonPage>
  );
};

export default Inicio;
