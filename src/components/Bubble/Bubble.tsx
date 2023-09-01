import { IonText } from "@ionic/react";
import "./Bubble.css";
import React from "react";

interface Data {
    img: string;
    name: string;
    onClick: () => void;
}
const Bubble: React.FC<Data> = ( {img, name, onClick}) => {

    return (
        <div className="bubbleCont" onClick={onClick}>
            <img className="bubbleImg" src={img}/>
            <IonText className="bubbleText">
                {name}
            </IonText>
        </div>
    );
}

export default Bubble;