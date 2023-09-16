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
import { arrowBack, star, chatbubbleEllipses } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useHistory} from "react-router";
import { useParams } from "react-router";
import { useAppSelector } from "../../components/redux/hooks";

interface UserInfo {
  id: string;
  name: string;
  career: string;
  semester: number;
  availability: {
    day: number;
    hour: number;
  }[];
  format: string[];
  format_tutor: string[];
  is_tutor: boolean;
  is_student: boolean;
  cost_tutor: number;
  type_tutor: string;
  password: string;
  email: string;
  budget: number;
  method: string[];
  method_tutor: string[];
  type_group: string[];
  type_group_tutor: string[];
  tutor_opinions: null | any; // You can replace any with a proper type for tutor opinions
  subjects_tutor: string[];
  keywords: null | any; // You can replace any with a proper type for keywords
  calification: null | any; // You can replace any with a proper type for calification
  clicks: null | any; // You can replace any with a proper type for clicks
  image_url: string;
}

const Profile: React.FC = () => {
  const state = useAppSelector((state) => state.user);
  const tutors = useAppSelector((state) => state.tutor);
  const [dataProfile, setDataProfile] = useState<UserInfo>();
  const days = ["L", "M", "X", "J", "V", "S"];
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
  const {id} = useParams<{id:string}>();
  
  useEffect(() => {
    if(id === state.user?.id){
      setDataProfile(state.user);
    }
    else{
      const tutorParam = tutors.tutors?.find((tutor : any) => tutor.id === id);
      setDataProfile(tutorParam);
    }
    
  }, [])
  
  return (
    <IonPage>
      <div style={{ zIndex: "-1" }} className='circle1' />
      <div style={{ zIndex: "-1" }} className='circles2 top1' />
      <div style={{ zIndex: "-1" }} className='circles2 bottom1' />
      <div style={{ zIndex: "-1" }} className='circles3 top2' />
      <div style={{ zIndex: "-1" }} className='circles3 bottom2' />
      <div style={{ zIndex: "-1" }} className='circles3 bottom3' />
      <div style={{ overflow: "scroll" }}>
        <div style={{position: "fixed", zIndex:"1000", display: "flex", flexDirection: "row", width: "100%"}}>
          <IonButton
            style={{
              marginTop: "25px",
              marginLeft: "15px",
              marginBottom: "25px",
              width: "38%",
            }}
            shape='round'
            onClick={() => history.goBack()}
          >
            <IonIcon icon={arrowBack} />
            Regresar
          </IonButton>
          <IonButton
            onClick={() => history.push(`/chat/${dataProfile?.id}`)}
            fill="clear"
            color={"tetriary"}
            style={{
              marginTop: "25px",
              marginLeft: "40vw",
              marginBottom: "25px",
              width: "30%",
            }}
            shape='round'
          >
            <IonIcon style={{fontSize: "40px", right: "10px", position: "relative"}} icon={chatbubbleEllipses} />
          </IonButton>
        </div> 
        <div className='contPerfil'>
          <div className='topPerfil'>
            <img
              className='imgProfile'
              src={dataProfile?.image_url? dataProfile?.image_url : "https://profilephotos2.blob.core.windows.net/tutoriapp/image_default.png"}
              alt='Profile image'
            />
            <IonText className='nombrePerfil'>{dataProfile?.name}</IonText>
          </div>
          <div className='cardCont'>
            <div className='cardPerfil'>
              <div className='datosCard'>
                <div className='leftCard'>Precio por hora:</div>
                <div className='rightCard'>${dataProfile?.cost_tutor}</div>
              </div>
              <div className='datosCard'>
                <div className='leftCard'>Modalidad de las clases:</div>
                <div className='rightCard'>{dataProfile?.format_tutor.join(" y ")}</div>
              </div>
              <div className='datosCard'>
                <div className='leftCard'>Formato de clase:</div>
                <div className='rightCard'>{dataProfile?.type_group_tutor.join(", ")}</div>
              </div>
              <div className='datosCard'>
                <div className='leftCard'>Materias:</div>
                <div className='rightCard'>{dataProfile?.subjects_tutor.join(", ")}</div>
              </div>
              <div className='datosCard'>
                <div className='leftCard'>Tipo de tutor:</div>
                <div className='rightCard'>{dataProfile?.type_tutor}</div>
              </div>
              <div className='datosCard'>
                <div className='leftCard'>Métodos de enseñanza</div>
                <div className='rightCard'>{dataProfile?.method_tutor.join(", ")}</div>
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
                          dataProfile?.availability.some(
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
