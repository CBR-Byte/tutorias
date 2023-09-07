import { IonText } from "@ionic/react";
import "./Bubble.css";
import React from "react";

interface Data {
    img: string;
    name: string;
    read: boolean;
    onClick: () => void;
}
const Bubble: React.FC<Data> = ( {img, name, onClick, read}) => {

    return (
        <div className="bubbleCont" onClick={onClick}>
            <div className="topBubble">
                <img className="bubbleImg" src={img}/>
            </div>
            <div className="bottomBubble">
                <IonText style={{color: !read ? "red": null}} className="bubbleText">
                    {name}
                </IonText>
            </div>
        </div>
    );
}

export default Bubble;