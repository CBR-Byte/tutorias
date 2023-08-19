/** @format */

import { IonIcon, IonText, IonTitle } from "@ionic/react";
import "./Card.css";
import React from "react";
import { star } from "ionicons/icons/";

interface ContainerProps {
  nombre: string;
  modalidad: string;
  descripcion: string;
  calificacion: number;
  precio: number;
  numCalificacion: number;
  imagen: string;
}

const Card: React.FC<ContainerProps> = ({nombre,modalidad,descripcion,calificacion,precio, numCalificacion,imagen}) => {
  return (
      <div className='card'>
        <div className='headerCard'>
          <img
            className='imagen'
            src={imagen}
            alt='imagen'
          />
          <IonText>
            <IonTitle className='nombre'>{nombre}</IonTitle>
            <IonText className='cuerpo'>{modalidad}</IonText>
          </IonText>
        </div>
        <div className='bodyCard'>
          <IonText className='cuerpo'>
            {descripcion}
          </IonText>
        </div>
        <div className='footerCard'>
          <div className='calificacion'>
            <IonIcon className='star' icon={star} />
            <IonText className='textoFooter'>{calificacion} ({numCalificacion} calificaciones)</IonText>
          </div>
          <div className="price">
            <IonText className='textoFooter'>${precio}</IonText>
          </div>
        </div>
      </div>
  );
};

export default Card;
