import { IonPage } from "@ionic/react"
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Chat.css";

const Chat: React.FC = () => {
    return (
        <IonPage>
            <div className="cont">
                <Header/>
                <div className="contenedor">

                </div>
                <Footer active="chat" />
            </div>
        </IonPage>
    )
}

export default Chat;