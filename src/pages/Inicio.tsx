/** @format */

import {
  IonPage,
  IonTitle,
  IonMenuButton,
  IonInput,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../components/redux/hooks";
import { useHistory } from "react-router";
import { logOut } from "../components/redux/states/userSlice";
import "./Register.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Inicio.css";
import { search, home, person, mail } from "ionicons/icons/";
import Card from "../components/Card/Card";

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
      <div className="cont">
        <div className='headerInicio'>
          <IonMenuButton autoHide={false} className='bot'></IonMenuButton>
          <IonTitle className='inicio'>INICIO</IonTitle>
          <IonButton onClick={closeSesion}>Cerrar sesión</IonButton>
        </div>
        <div className='contenedor'>
          <div className='buscador'>
            <IonIcon className='searchIcon' icon={search} />  
            <IonInput className='inputs2' placeholder='Buscar'/>
          </div>
          <div className='recomendados'>
            <IonTitle className="textoRec">RECOMENDADOS</IonTitle>
            <Card />
          </div>
          <div className="resultados">
            <IonTitle className="textoRec">RESULTADOS</IonTitle>
            <Card />
          </div>
        </div>
        <div className="footerInicio">
        <IonIcon className='iconos' icon={person} /> 
        <IonIcon className='iconos' icon={home} /> 
        <IonIcon className='iconos' icon={mail} /> 
        </div>
      </div>
    </IonPage>
  );
};

export default Inicio;
