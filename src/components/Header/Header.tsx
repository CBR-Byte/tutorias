import { IonButton, IonIcon, IonTitle } from "@ionic/react"
import { useAppDispatch } from "../redux/hooks";
import { logOut } from "../redux/states/userSlice";
import { logOut as out} from "ionicons/icons/";
import "../../pages/Inicio/Inicio.css";

const Header:React.FC = () => {
const dispatch = useAppDispatch();

    const closeSesion = () => {
        dispatch(logOut());
      };
    return (
        <>
            <div className='headerInicio'>
            <IonTitle className='inicio'>TutoriApp</IonTitle>
            <IonButton fill="outline" className='bot' onClick={closeSesion}>
                <IonIcon icon={out} />
            </IonButton>
            </div>
        </>
    )
}

export default Header;