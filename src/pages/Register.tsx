import {IonPage, IonCheckbox, IonButton, IonInput, IonLabel, IonRow, IonIcon, IonContent, IonItem,} from '@ionic/react';
import {arrowBack} from 'ionicons/icons/';
import './Register.css';

const Register: React.FC = () => {
  return (
    <form className="ion-padding">
    <IonItem lines='none'>   
        <IonButton shape='round'>
        <IonIcon icon={arrowBack} />
        Regresar
        </IonButton>
   
    </IonItem>
    <IonItem  lines='none'>
        <IonInput shape='round' fill='outline' input-Mode='md' className='form' type='email' placeholder='Correo'></IonInput>
    </IonItem>
    <IonItem  lines='none'>
      <IonLabel position="floating">Password</IonLabel>
      <IonInput type="password" />
    </IonItem>
    <IonItem lines="none">
      <IonLabel>Remember me</IonLabel>
      <IonCheckbox defaultChecked={true} slot="start" />
    </IonItem>
    <IonButton className="ion-margin-top" type="submit" expand="block">
      Login
    </IonButton>
  </form>
  );
};

export default Register;