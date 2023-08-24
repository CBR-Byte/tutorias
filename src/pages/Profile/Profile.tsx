import { IonButton, IonPage } from "@ionic/react"
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Profile.css";
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
    return (
        <IonPage>
            <div className="cont">
                <Header/>
                <div className="contenedor">
                    <img src="https://www.w3schools.com/w3images/avatar1.png" alt="Profile image" />
                    <IonButton>Editar imagen</IonButton>
                    <Link to="">
                        <IonButton>Previsualizar perfil</IonButton>
                    </Link>
                    <Link to="/tutorForm">
                        <IonButton>Editar formulario de tutor</IonButton>
                    </Link>
                    <Link to="/userForm">
                    <IonButton>Editar formulario de usuario</IonButton>
                    </Link>
                    <Link to="/infoForm">
                    <IonButton>Editar información personal</IonButton>
                    </Link>
                    <IonButton color="danger">Eliminar cuenta</IonButton>
                </div>
                <Footer active="profile" />
            </div>
            
        </IonPage>
    )
}

export default Profile;