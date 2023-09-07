/** @format */

import { IonButton, IonIcon } from "@ionic/react";
import { home, person, mail } from "ionicons/icons/";
import { useHistory } from "react-router";
import "../../pages/Inicio/Inicio.css";

export interface FooterProps {
  active: string;
  notification?: boolean;
}
const Footer: React.FC<FooterProps> = ({ active, notification }) => {
  const history = useHistory();
  return (
    <>
      <div className='footerInicio'>
        <IonButton
          onClick={() => history.push("/UserSettings")}
          className='iconosB'
          fill='clear'
        >
          <IonIcon
            className={active === "profile" ? "iconos active" : "iconos"}
            icon={person}
          />
        </IonButton>
        <IonButton
          onClick={() => history.push("/inicio")}
          className='iconosB'
          fill='clear'
        >
          <IonIcon
            className={active === "inicio" ? "iconos active" : "iconos"}
            icon={home}
          />
        </IonButton>
        <IonButton
          onClick={() => history.push("/chat")}
          className='iconosB'
          fill='clear'
        >
          {notification ? <div className='notification'>!</div> : null}
          <IonIcon
            className={active === "chat" ? "iconos active" : "iconos"}
            icon={mail}
          />
        </IonButton>
      </div>
    </>
  );
};

export default Footer;
