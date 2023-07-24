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
  IonRouterLink,
} from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../components/redux/hooks";
import { useHistory } from "react-router";
import { logOut } from "../components/redux/states/userSlice";
import "./Register.css";
import { useEffect } from "react";

const Inicio: React.FC = () => {
  const dispatch = useAppDispatch();
  const stateUser = useAppSelector((state) => state.user);
  const history = useHistory();

  const closeSesion = () => {
    dispatch(logOut());
  }

  useEffect(() => {
    if (!stateUser.isAuthenticated) {
      history.push('/');
    }
  }, [stateUser.isAuthenticated])
  return (
    <IonPage>
      <IonContent>
        <IonTitle class="ion-text-center">Bienvenido {stateUser.user?.name}</IonTitle>   
          <IonButton onClick={closeSesion} shape='round'>Cerrar sesión</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Inicio;
