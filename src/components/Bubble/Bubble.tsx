/** @format */

import { IonIcon, IonText } from "@ionic/react";
import { mail } from "ionicons/icons/";
import "./Bubble.css";
import React from "react";

interface Data {
  img: string;
  name: string;
  read: boolean;
  onClick: () => void;
}
const Bubble: React.FC<Data> = ({ img, name, onClick, read }) => {
  return (
    <div className='bubbleCont' onClick={onClick}>
      <div className='topBubble'>
        {!read && (
          <div className='bubbleDot'>
            <IonIcon icon={mail} />
          </div>
        )}
        <img className='bubbleImg' src={img} />
      </div>
      <div className='bottomBubble'>
        <IonText className='bubbleText'>{name}</IonText>
      </div>
    </div>
  );
};

export default Bubble;
