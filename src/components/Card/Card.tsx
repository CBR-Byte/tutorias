/** @format */

import { IonIcon, IonText, IonTitle } from "@ionic/react";
import "./Card.css";
import React from "react";
import { star } from "ionicons/icons/";

const Card: React.FC = () => {
  return (
    <>
      <div className='card'>
        <div className='headerCard'>
          <img
            className='imagen'
            src='https://www.w3schools.com/howto/img_avatar.png'
            alt='imagen'
          />
          <IonText>
            <IonTitle className='nombre'>Nombre</IonTitle>
            <IonText className='cuerpo'>Ingeniero de Sistemas</IonText>
          </IonText>
        </div>
        <div className='bodyCard'>
          <IonText className='cuerpo'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
            ducimus laboriosam beatae eligendi corrupti reprehenderit dolor
            minus odio deleniti deserunt?
          </IonText>
        </div>
        <div className='footerCard'>
          <div className='calificacion'>
            <IonIcon className='star' icon={star} />
            <IonText className='textoFooter'>4.5 (10 calificaciones)</IonText>
          </div>
          <div className="price">
            <IonText className='textoFooter'>$50000</IonText>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
