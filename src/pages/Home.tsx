import { IonButton, IonGrid, IonInput, IonPage, IonRow, IonTitle, IonRouterLink, InputChangeEventDetail} from '@ionic/react';
import './Home.css';
import axios from 'axios';
import { useState } from 'react';
import { login } from '../components/redux/states/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Home: React.FC = () => {

  const dispatch = useDispatch();
  const state = useSelector((state:any) => state.user);
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setNombre(value);
    } else if (name === 'password') {
      setContraseña(value);
    }
  };


  const enviarDatos = () => {
    // Realizar la solicitud Axios con los datos recogidos
    axios.post('http://127.0.0.1:8000/users/login', { email: nombre, password: contraseña })
      .then(response => {
        dispatch(login(response.data));
        console.log(response.data);
        state.login ? console.log('Login exitoso') : console.log('Login fallido');
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  return (
    <IonPage>
      <IonGrid className='grid'>
        <IonRow> 
          <IonTitle className='title'> Tutoriaap</IonTitle>
        </IonRow>
        <IonRow>
         <IonInput name='name' onIonChange={handleInputChange} shape='round' fill='outline' input-Mode='md' className='form' type='email' placeholder='Correo'></IonInput>
        </IonRow>
        <IonRow>
          <IonInput name='password' onIonChange={handleInputChange} shape='round' fill='outline' className='form' type='password' placeholder='Contraseña'></IonInput>
        </IonRow>
        <IonRow class='ion-justify-content-center'>
          <IonButton className='forget' fill='clear' color={'secondary'}> ¿HAS OLVIDADO LA CONTRASEÑA? </IonButton>
        </IonRow>
        <IonRow class='ion-justify-content-center'>
        <IonRouterLink routerLink="/inicio" routerDirection="forward">
          <IonButton onClick={enviarDatos} shape='round'  className='btn'>
            Iniciar sesión
          </IonButton>
          </IonRouterLink>
        </IonRow>
        <IonRow  class='ion-justify-content-center'>
          <IonRouterLink routerLink="/register" routerDirection="forward">
            <IonButton shape='round'>
              Registrarse
            </IonButton>
          </IonRouterLink>
          <h1 className='circulo'/>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
};

export default Home;
