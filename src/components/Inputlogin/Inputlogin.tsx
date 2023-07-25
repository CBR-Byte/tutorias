import {IonContent, IonInput, IonLabel,} from '@ionic/react';
import './Inputlogin.css';

interface InputloginProps {
    label: string;
}

const Inputlogin: React.FC<InputloginProps> = ({ label }) => {
  return (
    <>
        <IonLabel> {label} </IonLabel>
        <IonInput
          className='inp'
          placeholder= {"ingrese su " + label} />
    </>
    
  );
};

export default Inputlogin;