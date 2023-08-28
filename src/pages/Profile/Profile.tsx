/** @format */

import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { arrowBack, star } from "ionicons/icons";
import React from "react";
import "./Profile.css";
import { useHistory } from "react-router";
import { useAppSelector } from "../../components/redux/hooks";
import { Slot } from "../Forms/UserForm";

const Profile: React.FC = () => {
  const state = useAppSelector((state) => state.user);
  const estado: Slot[] = state.user?.avaliability || [];
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const hours = [
    "8am",
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm",
  ];
  const history = useHistory();

  return (
    <IonPage>
      <div style={{ zIndex: "-1" }} className='circle1' />
      <div style={{ zIndex: "-1" }} className='circles2 top' />
      <div style={{ zIndex: "-1" }} className='circles2 bottom' />
      <div style={{ zIndex: "-1" }} className='circles3 top2' />
      <div style={{ zIndex: "-1" }} className='circles3 bottom2' />
      <div style={{ zIndex: "-1" }} className='circles3 bottom3' />
      <div style={{ overflow: "scroll" }}>
        <IonButton
          style={{
            marginTop: "25px",
            marginLeft: "15px",
            marginBottom: "25px",
          }}
          shape='round'
          onClick={() => history.push("/userSettings")}
        >
          <IonIcon icon={arrowBack} />
          Regresar
        </IonButton>
        <div className='contPerfil'>
          <div className='topPerfil'>
            <img
              className='imgProfile'
              src='https://profilephotos2.blob.core.windows.net/tutoriapp/1@1.com..png'
              alt='Profile image'
            />
            <IonText className='nombrePerfil'>Nombre de usuario</IonText>
          </div>
          <div className='cardCont'>
            <div className='cardPerfil'>
              <div className='datosCard'>
                <div className='leftCard'>Precio por hora:</div>
                <div className='rightCard'>$30000</div>
              </div>
              <div className='datosCard'>
                <div className='leftCard'>Modalidad de las clases:</div>
                <div className='rightCard'>Webcam</div>
              </div>
              <div className='datosCard'>
                <div className='leftCard'>Formato de clase:</div>
                <div className='rightCard'>Individual y grupal</div>
              </div>
              <div className='datosCard'>
                <div className='leftCard'>Materias:</div>
                <div className='rightCard'>Matemáticas, Física, Química</div>
              </div>
              <div className='datosCard'>
                <div className='leftCard'>Tipo de tutor:</div>
                <div className='rightCard'>Estudiante de pregrado</div>
              </div>
              <div className='datosCard'>
                <div className='leftCard'>Métodos de enseñanza</div>
                <div className='rightCard'>Clases teóricas y prácticas</div>
              </div>
            </div>
          </div>
          <div className='disponibilidad'>
            <IonText className='nombrePerfil'>Disponibilidad</IonText>
            <IonGrid
              className='horario'
              style={{margin:'0'}}
            >
              <IonRow className='grid-container' style={{padding:'0'}}>
                {days.map((day, dayIndex) => (
                  <IonRow key={dayIndex}>
                    <IonCol style={{ color: "#D2D9E7" }} className='dias'>
                      {day}
                    </IonCol>
                    {hours.map((hour, hourIndex) => (
                      <IonCol
                        key={hourIndex}
                        className={`grid-item ${
                          estado.some(
                            (slot) =>
                              slot.day === dayIndex && slot.hour === hourIndex
                          )
                            ? "selected"
                            : ""
                        }`}
                      >
                        {hour}
                      </IonCol>
                    ))}
                  </IonRow>
                ))}
              </IonRow>
            </IonGrid>
          </div>
          <div className='opiniones'>
            <IonText className='nombrePerfil'>Opiniones</IonText>
            <div
              className='cardPerfil'
              style={{ alignItems: "center", gap: "15px" }}
            >
              <div className='contOpiniones'>
                <div className='leftOpinion'>
                  <div className="perfilOpinion">
                    <img
                      style={{ width: "100%", height: "100%" }}
                      className='imgProfile'
                      src='https://www.w3schools.com/w3images/avatar1.png'
                    />
                    <IonText>
                      Juaana
                    </IonText>
                  </div>
                    <IonIcon className='starPerfil' icon={star} />
                    <h1 className="calificacionPerfil">5</h1>
                </div>
                <div className='rightOpinion'>
                  <IonText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam veritatis praesentium explicabo magnam blanditiis molestiae eveniet dicta minus recusandae voluptatibus impedit ex, at tempora officiis doloremque! Assumenda, deleniti reiciendis. Delectus.</IonText>
                </div>
              </div>
              <div className='contOpiniones'>
                <div className='leftOpinion'>
                  <div className="perfilOpinion">
                    <img
                      style={{ width: "100%", height: "100%" }}
                      className='imgProfile'
                      src='https://www.w3schools.com/w3images/avatar1.png'
                    />
                    <IonText>
                      Juaana
                    </IonText>
                  </div>
                    <IonIcon className='starPerfil' icon={star} />
                    <h1 className="calificacionPerfil">5</h1>
                </div>
                <div className='rightOpinion'>
                  <IonText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam veritatis praesentium explicabo magnam blanditiis molestiae eveniet dicta minus recusandae voluptatibus impedit ex, at tempora officiis doloremque! Assumenda, deleniti reiciendis. Delectus.</IonText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IonPage>
  );
};

export default Profile;
