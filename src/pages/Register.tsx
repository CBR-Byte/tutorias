import {IonCheckbox, IonButton, IonInput, IonLabel, IonRow, IonIcon, IonItem, IonRouterLink, IonGrid, IonCol, IonContent,} from '@ionic/react';
import {arrowBack} from 'ionicons/icons/';
import './Register.css';
import Bg from '../components/Bg/Bg';

const Register: React.FC = () => {
  return (
    <Bg>
      <IonGrid >
        <IonRow className='form'>
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
            <IonInput
              input-Mode='md'
              fill='outline'
              shape='round'
              placeholder='nombre'>
            </IonInput>
          </IonCol>
        </IonRow>
        <IonRow className='row'>
          <IonCol>
            <IonInput
              input-Mode='md'
              fill='outline'
              shape='round'
              placeholder='nombre'>
            </IonInput>
          </IonCol>
        </IonRow>
        <IonRow className='row'>
          <IonCol>
            <IonInput
              input-Mode='md'
              fill='outline'
              shape='round'
              placeholder='nombre'>
            </IonInput>
          </IonCol>
        </IonRow>
        <IonRow className='row'>
          <IonCol>
            <IonInput
              input-Mode='md'
              fill='outline'
              shape='round'
              placeholder='nombre'>
            </IonInput>
          </IonCol>
        </IonRow>
        <IonRow className='row'>
          <IonCol>
            <IonInput
              input-Mode='md'
              fill='outline'
              shape='round'
              placeholder='nombre'>
            </IonInput>
          </IonCol>
        </IonRow>
        <IonRow className='row'>
          <IonCol>
            <IonInput
              input-Mode='md'
              fill='outline'
              shape='round'
              placeholder='nombre'>
            </IonInput>
          </IonCol>
        </IonRow>
        <IonRow className='row'>
          <IonCol>
            <IonInput
              input-Mode='md'
              fill='outline'
              shape='round'
              placeholder='nombre'>
            </IonInput>
          </IonCol>
        </IonRow>
        <IonRow className='row'>
          <IonCol>
            <IonInput
              input-Mode='md'
              fill='outline'
              shape='round'
              placeholder='nombre'>
            </IonInput>
          </IonCol>
        </IonRow>
        <IonRow className='row'>
          <IonCol>
            <IonInput
              input-Mode='md'
              fill='outline'
              shape='round'
              placeholder='nombre'>
            </IonInput>
          </IonCol>
        </IonRow>
        <IonRow className='row'>
          <IonCol>
            <IonInput
              input-Mode='md'
              fill='outline'
              shape='round'
              placeholder='nombre'>
            </IonInput>
          </IonCol>
        </IonRow>
        <IonRow className='row'>
          <IonCol>
            <IonInput
              input-Mode='md'
              fill='outline'
              shape='round'
              placeholder='nombre'>
            </IonInput>
          </IonCol>
        </IonRow>
        <IonRow className='row'>
          <IonCol>
            <IonInput
              input-Mode='md'
              fill='outline'
              shape='round'
              placeholder='nombre'>
            </IonInput>
          </IonCol>
        </IonRow>
        <IonRow className='row'>
          <IonCol>
            <IonInput
              input-Mode='md'
              fill='outline'
              shape='round'
              placeholder='nombre'>
            </IonInput>
          </IonCol>
        </IonRow>
      </IonGrid>
  </Bg>
  );
};

export default Register;