/** @format */

import { IonAlert, IonButton, IonInput, IonPage, IonTitle } from "@ionic/react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useHistory } from "react-router";
import { useAppSelector } from "../../components/redux/hooks";
import "./UserSettings.css";
import { useEffect, useState } from "react";
import { deleteAccount, getConversation } from "../../components/redux/states/userSlice";
import { useAppDispatch } from "../../components/redux/hooks";
import { Camera, CameraResultType } from "@capacitor/camera";
import { uploadImage } from "../../components/redux/states/userSlice";
import { newSocket } from "../../socket";
import { updateMessages } from "../../services";

const UserSettings: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const stateUser = useAppSelector((state) => state.user);
  const [showAlert, setShowAlert] = useState(false);
  const [conversations, setConversations] = useState<any[]>([]);
  const [notification, setNotification] = useState(false)

  const getPath = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      saveToGallery: true,
    });

    dispatch(uploadImage(image));
  };

  const handleDelete = (option: boolean) => {
    if (option) {
      dispatch(deleteAccount());
      setShowAlert(false);
    } else {
      setShowAlert(false);
    }
  };

  useEffect(() => {
    dispatch(getConversation()).then((res) => {
      const usersData = res.payload.map((user: any) => ({
        _id: user._id,
        name: user.name,
        image_url: user.image_url,
        read: user.read,
      }));
      setConversations(usersData);
    });

    newSocket.on("chat", (data: any) => {
      setNotification(true);
      const newMessage = data.message;
      updateMessages(newMessage);
    });
  }, []);

  return (
    <IonPage>
      <div className='contProfile'>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
              cssClass: "alert-button-cancel",
              handler: () => {
                handleDelete(false);
              },
            },
            {
              text: "Confirmar",
              role: "confirm",
              cssClass: "alert-button-cancel",
              handler: () => {
                handleDelete(true);
              },
            },
          ]}
          header={"Eliminar cuenta"}
          message={"¿Está seguro que desea eliminar su cuenta?"}
        />
        <Header />
        <div style={{ zIndex: "-1" }} className='circle1' />
        <div style={{ zIndex: "-1" }} className='circles2 top1' />
        <div style={{ zIndex: "-1" }} className='circles2 bottom1' />
        <div style={{ zIndex: "-1" }} className='circles3 top2' />
        <div style={{ zIndex: "-1" }} className='circles3 bottom2' />
        <div style={{ zIndex: "-1" }} className='circles3 bottom3' />
        <div className='contenedor'>
          <h1 className='titleProfile'>Configuraciones</h1>
          <div className='topProfile'>
            <img
              className='imgProfile'
              src={
                stateUser.user?.image_url
                  ? stateUser.user?.image_url
                  : "https://profilephotos2.blob.core.windows.net/tutoriapp/image_default.png"
              }
              alt='Profile image'
            />
            <IonButton
              onClick={() => getPath()}
              className='btnProfile'
              shape='round'
            >
              Editar imagen
            </IonButton>
          </div>
          <div className='btnsProfile'>
            {stateUser.user?.is_tutor ? (
              <>
                <IonButton
                  onClick={() => history.push(`profile/${stateUser.user?.id}`)}
                  className='btnProfile'
                  shape='round'
                >
                  Previsualizar perfil
                </IonButton>
                <IonButton
                  onClick={() => history.push("/tutorForm")}
                  className='btnProfile'
                  shape='round'
                >
                  Editar datos de tutor
                </IonButton>
              </>
            ) : null}
            {stateUser.user?.is_student ? (
              <IonButton
                onClick={() => history.push("/userForm")}
                className='btnProfile'
                shape='round'
              >
                Editar formulario de usuario
              </IonButton>
            ) : null}
            <IonButton
              onClick={() => history.push("/infoForm")}
              className='btnProfile'
              shape='round'
            >
              Editar información personal
            </IonButton>
            <IonButton
              onClick={() => setShowAlert(true)}
              className='btnProfile'
              shape='round'
              color='danger'
            >
              Eliminar cuenta
            </IonButton>
          </div>
        </div>
        <Footer
          active='profile'
          notification={
            notification || conversations.find((conversation) => !conversation.read)
              ? true
              : false
          }
        />
      </div>
    </IonPage>
  );
};

export default UserSettings;
