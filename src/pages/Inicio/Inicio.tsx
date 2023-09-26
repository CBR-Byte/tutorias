/** @format */

import {
  IonPage,
  IonTitle,
  IonInput,
  IonIcon,
  IonButton,
  IonText,
  IonRange,
  IonRadio,
  IonRadioGroup,
  IonItem,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../components/redux/hooks";
import {
  getTutors,
  getAllTutors,
} from "../../components/redux/states/tutorSlice";
import { useHistory } from "react-router";
import "../Register/Register.css";
import { useEffect, useState, useRef, useMemo } from "react";
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
interface filterOptions {
  cost_tutor?: number | { lower: number; upper: number };
  type_tutor: string;
  method_tutor: string[];
  type_group_tutor: string[];
  format_tutor: string[];
}
import {
  getConversation,
  setKeywordsorClicks
} from "../../components/redux/states/userSlice";
import {
  getHistorial
} from "../../components/redux/states/chatSlice";
import { join, newSocket } from "../../socket";
import { updateMessages } from "../../services";


const Inicio: React.FC = () => {
  const dispatch = useAppDispatch();
  const stateUser = useAppSelector((state) => state.user);
  const history = useHistory();
  const [IsSearch, setIsSearch] = useState<boolean>(false);
  const inputRef = useRef<HTMLIonInputElement>(null);
  const [tutores, setTutores] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [hasResults, setHasResults] = useState<boolean>(false);
  const [notification, setNotification] = useState(false)

  //actualizar mensajes ucando usuario recibe un mensaje

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [initialPrice, setInitialPrice] = useState<number[]>([]);
  const [filtros, setFiltros] = useState<filterOptions>({
    type_tutor: "",
    method_tutor: [],
    type_group_tutor: [],
    format_tutor: [],
  });

  useEffect(() => {
    if (!stateUser.registerCompleted && stateUser.user?.is_tutor) {
      history.push("/tutorForm");
    } else if (!stateUser.registerCompleted && stateUser.user?.is_student) {
      history.push("/userForm");
    }
    // if(historial === null){
    //   dispatch(getHistorial(stateUser.user?.id));
    // }else dispatch(updateHistorial(historial));
    dispatch(getHistorial(stateUser.user?.id)).then((res) => {
      join(stateUser?.user?.id);
    });

    newSocket.on("chat", (data: any) => {
      setNotification(true);
      const newMessage = data.message;
      updateMessages(newMessage);
    });
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

  useMemo(() => {
    dispatch(getAllTutors([]));
  }, [tutores]);

  const searchTutors = () => {
    const keyWords = inputRef.current?.value?.toString().split(" ");
    const keywordsState = stateUser.user?.keywords;
    dispatch(setKeywordsorClicks({ keywords: keywordsState.concat(keyWords) }));
    if (inputRef.current?.value !== "") {
      setIsSearch(true);
      dispatch(getTutors(keyWords)).then((res) => {
        if (res.payload.length === 0) {
          setHasResults(false);
        } else {
          const tutorsData = res.payload.map((user: any) => ({
            id: user.id,
            name: user.name,
            availability: user.availability,
            format_tutor: user.format_tutor,
            cost_tutor: user.cost_tutor,
            type_tutor: user.type_tutor,
            method_tutor: user.method_tutor,
            type_group_tutor: user.type_group_tutor,
            tutor_opinions: user.tutor_opinions,
            subjects_tutor: user.subjects_tutor,
            image_url: user.image_url,
          }));
          const upper = Math.max.apply(
            Math,
            tutorsData.map((tutor: any) => tutor.cost_tutor)
          );
          const lower = Math.min.apply(
            Math,
            tutorsData.map((tutor: any) => tutor.cost_tutor)
          );
          setInitialPrice([lower, upper]);
          setFiltros({
            cost_tutor: { lower: lower, upper: upper },
            type_tutor: "",
            method_tutor: [],
            type_group_tutor: [],
            format_tutor: [],
          });
          JSON.stringify(tutores.sort((a, b) => (a.id < b.id ? -1 : 1))) ===
          JSON.stringify(
            tutorsData.sort((a: any, b: any) => (a.id < b.id ? -1 : 1))
          )
            ? null
            : setTutores(tutorsData);
          setHasResults(true);
        }
      });
    }
  };

  const toggleFilter = () => {
    setIsFilter((prevState) => !prevState);
  };

  const filterTutors = () => {
    const filtrado = tutores
      .filter((tutor) =>
        filtros.cost_tutor === undefined
          ? true
          : typeof filtros.cost_tutor === "object" &&
            !Number.isNaN(filtros.cost_tutor.lower)
          ? tutor.cost_tutor >= filtros.cost_tutor.lower &&
            tutor.cost_tutor <= filtros.cost_tutor.upper
          : true
      )
      .filter((tutor) =>
        filtros.type_tutor === ""
          ? true
          : tutor.type_tutor === filtros.type_tutor
      )
      .filter((tutor) =>
        filtros.method_tutor.length === 0
          ? true
          : tutor.method_tutor.some((method: string) =>
              filtros.method_tutor.includes(method)
            )
      )
      .filter((tutor) =>
        filtros.type_group_tutor.length === 0
          ? true
          : tutor.type_group_tutor.some((type: string) =>
              filtros.type_group_tutor.includes(type)
            )
      )
      .filter((tutor) =>
        filtros.format_tutor.length === 0
          ? true
          : tutor.format_tutor.some((format: string) =>
              filtros.format_tutor.includes(format)
            )
      );
    return filtrado;
  };

  const newTutors = isFilter ? filterTutors() : tutores;

  const handleInput = (event: React.KeyboardEvent<HTMLIonInputElement>) => {
    if (event.key === "Enter") {
      searchTutors();
    }
  };

  const califications = (calificaciones: any) => {
    if (calificaciones != null) {
      const suma = calificaciones.reduce(
        (a: any, b: any) => a + b.calification_tutor,
        0
      );
      const media = suma / calificaciones.length;
      return media;
    } else {
      return 0;
    }
  };

  const showFilters = () => {
    const filters = document.getElementById("filters");
    if (filters?.style.display === "none") {
      filters.style.display = "flex";
    } else {
      filters && (filters.style.display = "none");
    }
  };

  const handleCard = (idHandle: string) => {
    const clicksState = stateUser.user?.clicks;
    clicksState
      ? dispatch(setKeywordsorClicks({ clicks: clicksState.concat(idHandle) }))
      : dispatch(setKeywordsorClicks({ clicks: [idHandle] }));

    history.push(`/profile/${idHandle}`);
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
              pagination={{
                clickable: true,
              }}
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
          {IsSearch && !hasResults && (
            <div className='resultados'>
              <IonText>No se encontraron resultados</IonText>
            </div>
          )}
          {IsSearch && hasResults && (
            <div className='resultados'>
              <div className='resTitle'>
                <IonTitle className='textoRes'>RESULTADOS</IonTitle>
                <div className='filter'>
                  <IonIcon
                    onClick={() => showFilters()}
                    icon={filter}
                    className='iconFilter'
                  />
                </div>
              </div>
              <div
                style={{ display: "none" }}
                id='filters'
                className='filterContent'
              >
                <div className='divFilter'>
                  <div>
                    <h3 className='labelFilter'>Precio</h3>
                  </div>
                  <div>
                    <IonRange
                      dualKnobs={true}
                      pin={true}
                      step={1000}
                      min={initialPrice[0]}
                      max={initialPrice[1]}
                      disabled={
                        initialPrice[0] === initialPrice[1] ? true : false
                      }
                      onIonChange={(e) =>
                        setFiltros({ ...filtros, cost_tutor: e.detail.value })
                      }
                    >
                      <h3 className='labelFilter' slot='start'>
                        <IonText slot='start'>${initialPrice[0]}</IonText>
                      </h3>
                      <h3 className='labelFilter' slot='end'>
                        <IonText slot='end'>${initialPrice[1]}</IonText>
                      </h3>
                    </IonRange>
                  </div>
                </div>
                <div className='divFilter'>
                  <h3 className='labelFilter'>Modalidad</h3>
                  <IonRadioGroup
                    onIonChange={(e) =>
                      e.detail.value === undefined
                        ? setFiltros({ ...filtros, format_tutor: [] })
                        : setFiltros({
                            ...filtros,
                            format_tutor: [e.detail.value],
                          })
                    }
                    allowEmptySelection={true}
                  >
                    <IonRadio
                      style={{ marginRight: "15px" }}
                      value='Presencial'
                    >
                      Presencial
                    </IonRadio>
                    <IonRadio value='Virtual'>Virtual</IonRadio>
                  </IonRadioGroup>
                </div>
                <div className='divFilter'>
                  <h3 className='labelFilter'>Formato</h3>
                  <IonRadioGroup
                    onIonChange={(e) =>
                      e.detail.value === undefined
                        ? setFiltros({ ...filtros, type_group_tutor: [] })
                        : setFiltros({
                            ...filtros,
                            type_group_tutor: [e.detail.value],
                          })
                    }
                    allowEmptySelection={false}
                  >
                    <IonRadio
                      style={{ marginRight: "15px" }}
                      value='Individual'
                    >
                      Individual
                    </IonRadio>
                    <IonRadio value='Grupal'>Grupal</IonRadio>
                  </IonRadioGroup>
                </div>
                <div style={{ marginBottom: "-20px" }} className='divFilter'>
                  <h3 className='labelFilter'>Tipo de tutor</h3>
                  <IonRadioGroup
                    onIonChange={(e) =>
                      e.detail.value === undefined
                        ? setFiltros({ ...filtros, type_tutor: "" })
                        : setFiltros({
                            ...filtros,
                            type_tutor: e.detail.value,
                          })
                    }
                    allowEmptySelection={true}
                  >
                    <IonRadio
                      style={{ marginRight: "15px" }}
                      value='Estudiante'
                    >
                      Estudiante
                    </IonRadio>
                    <IonRadio value='Profesor'>Profesor</IonRadio>
                  </IonRadioGroup>
                </div>
                <div style={{ alignItems: "center" }} className='divFilter'>
                  <IonItem>
                    <IonSelect
                      className='selectFilter'
                      aria-label='method_tutor'
                      placeholder='Método de enseñanza'
                      multiple={true}
                      onIonChange={(e) =>
                        setFiltros({ ...filtros, method_tutor: e.detail.value })
                      }
                    >
                      <IonSelectOption value='Aprendizaje Activo'>
                        Activo
                      </IonSelectOption>
                      <IonSelectOption value='Aprendizaje reflexivo'>
                        Reflexivo
                      </IonSelectOption>
                      <IonSelectOption value='Aprendizaje teórico'>
                        Teórico
                      </IonSelectOption>
                      <IonSelectOption value='Aprendizaje práctico'>
                        Práctico
                      </IonSelectOption>
                      <IonSelectOption value='Aprendizaje visual'>
                        Visual
                      </IonSelectOption>
                      <IonSelectOption value='Aprendizaje auditivo'>
                        Auditivo
                      </IonSelectOption>
                      <IonSelectOption value='Aprendizaje kinestésico'>
                        Kinestésico
                      </IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </div>
                <div className='divFilter'>
                  <IonButton shape='round' onClick={toggleFilter}>
                    {isFilter ? "Quitar filtros" : "Aplicar filtros"}
                  </IonButton>
                </div>
              </div>
              <div className='res'>
                {newTutors.length > 0 ? (
                  newTutors.map((tutor) => (
                    <Card
                      key={tutor.id}
                      onClick={() => handleCard(tutor.id)}
                      nombre={tutor.name}
                      modalidad={tutor.format_tutor}
                      descripcion={tutor.subjects_tutor}
                      precio={tutor.cost_tutor}
                      calificacion={califications(tutor.tutor_opinions)}
                      numCalificacion={
                        tutor.tutor_opinions != null
                          ? tutor.tutor_opinions.length
                          : 0
                      }
                      imagen={tutor.image_url}
                    />
                  ))
                ) : (
                  <IonText>No se encontraron resultados</IonText>
                )}
              </div>
            </div>
          )}
        </div>
        <Footer
          active='inicio'
          notification={
            notification ||
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
