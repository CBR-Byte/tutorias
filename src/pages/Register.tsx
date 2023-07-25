import {IonCheckbox, IonButton, IonInput, IonLabel, IonRow, IonIcon, IonItem, IonRouterLink, IonGrid, IonCol, IonContent,} from '@ionic/react';
import {arrowBack} from 'ionicons/icons/';
import './Register.css';
import Bg from '../components/Bg/Bg';
import Inputlogin from '../components/Inputlogin/Inputlogin';
const Register: React.FC = () => {
  return (
    <Bg>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonRouterLink routerLink='/home'>
                <IonButton shape='round'>
                  <IonIcon icon={arrowBack} />
                      Regresar
                </IonButton> 
              </IonRouterLink> 
          </IonCol>
        </IonRow>
        <IonRow className='row'>
          <IonCol>
            <Inputlogin label='Nombre' />
          </IonCol>
        </IonRow>
      </IonGrid>
  </Bg>
  );
};

export default Register;