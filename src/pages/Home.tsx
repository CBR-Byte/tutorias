import { IonButton, IonImg ,IonAlert ,IonGrid, IonInput, IonPage, IonRow, IonTitle, IonRouterLink, InputChangeEventDetail, IonContent, IonCol, IonText} from '@ionic/react';
import './Home.css';
import axios from 'axios';
import { useState } from 'react';
import { login } from '../components/redux/states/userSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


const Home: React.FC = () => {

  const dispatch = useDispatch();
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const history = useHistory();
  const [modal, setModal] = useState(false);

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
        history.push('/inicio');
        console.log(response.data);
        response.data.status = 'success' ? console.log('Login exitoso') : console.log('Login fallido');
      })
      .catch(error => {
        setModal(true);
        console.log(error.response.data);
      });
  };

  const handleCloseAlert = () => {
    setModal(false);
  };

  return (
    <IonPage className='page'>
      <IonContent className='content' scrollY={false} >
        <div className="circles"/>
        <div className='circle'/>
        <IonGrid className='grid'>
          <IonRow>
            <IonCol>
              <IonTitle className="title">Tutoriaap</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow className='row'>
            <IonCol>
              <IonInput input-Mode='md' fill='outline' shape='round' name="name" type="email" placeholder="Correo" onIonChange={handleInputChange}></IonInput>
            </IonCol>
          </IonRow>
          <IonRow className='row'>
            <IonCol>
              <IonInput input-Mode='md' fill='outline' shape='round' name="password" type="password" placeholder="Contraseña" onIonChange={handleInputChange}></IonInput>
            </IonCol>
          </IonRow>
          <IonRow className='row'>
            <IonCol className='button'>
              <IonButton className='forget' fill='clear' color={'secondary'}> ¿HAS OLVIDADO LA CONTRASEÑA? </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className='row log'>
            <IonCol className='button'>
              <IonButton onClick={enviarDatos} shape='round'>
                Iniciar sesión
              </IonButton>
            </IonCol>
            <IonCol className='button'>
              <IonRouterLink routerLink="/register">
                <IonButton shape='round'>
                  Registrarse
                </IonButton>
              </IonRouterLink>
            </IonCol>
          </IonRow>
          <IonRow>
          </IonRow>
        </IonGrid>
        <IonImg className='logo' src='assets/images/logo.png'/>
        <IonAlert isOpen={modal} 
        onDidDismiss={handleCloseAlert} 
        header={'Error'} 
        message={'Email o contraseña incorrectos'} 
        buttons={['OK']} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
