import { IonInput, IonLabel,} from '@ionic/react';
import React from 'react';
import './Inputlogin.css';

interface InputloginProps {
    label?: string;
    type?: any;
    name: string;
    placeholder: string;
    value: string | number;
    onChange: any;
    onBlur: any;
}

const Inputlogin: React.FC<InputloginProps>= ({ value, label, name, type, placeholder, onChange, onBlur }) => {
  return (
    <div className='contInput'>
        <IonLabel className='label'> {label} </IonLabel>
        <IonInput
          className='inp'
          value={value}
          type={type}
          onIonChange={onChange}
          name={name}
          onIonBlur={onBlur}
          placeholder= {" Ingrese su " + placeholder.toLowerCase()} />
    </div>
    
  );
};

export default Inputlogin;