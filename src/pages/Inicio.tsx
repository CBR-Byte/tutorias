/** @format */

import {
  IonPage,
  IonCheckbox,
  IonButton,
  IonInput,
  IonLabel,
  IonRow,
  IonIcon,
  IonContent,
  IonItem,
  IonTitle,
} from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../components/redux/hooks";
import { useHistory } from "react-router";
import { logOut } from "../components/redux/states/userSlice";
import "./Register.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Inicio: React.FC = () => {
  const dispatch = useAppDispatch();
  const stateUser = useAppSelector((state) => state.user);
  const history = useHistory();

  const closeSesion = () => {
    dispatch(logOut());
  }

  useEffect(() => {
    
    if(!stateUser.registerCompleted && stateUser.user?.is_tutor){
      history.push("/tutorForm");
    }else if(!stateUser.registerCompleted && stateUser.user?.is_student){
      history.push("/userForm");
    }

  }, [])
  
  return (
    <IonPage>
      <IonContent>
        <IonTitle class="ion-text-center">Bienvenido {stateUser.user?.name}</IonTitle>   
          <Link to="/login">
            <IonButton color="danger" onClick={closeSesion} shape='round'>Cerrar sesión</IonButton>
          </Link>
          <Link to="/userForm">
            <IonButton  shape='round'>Form</IonButton>
          </Link>
          <Link to="/tutorForm">
          <IonButton  shape='round'>Tutor Form</IonButton>
          </Link>
      </IonContent>
    </IonPage>
  );
};

export default Inicio;
