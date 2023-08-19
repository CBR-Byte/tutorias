/** @format */

import {
  IonButton,
  IonAlert,
  IonGrid,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonContent,
  IonCol,
  IonImg,
  IonModal,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import "./Login.css";
import { useEffect, useRef, useState } from "react";
import { loginCredentials } from "../components/redux/states/userSlice";
import {
  onLogin,
  changeErrorLogin,
  verify,
} from "../components/redux/states/userSlice";
import { useAppDispatch, useAppSelector } from "../components/redux/hooks";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { storage } from "../components/redux/states/userSlice";
import "../components/Bg/Bg.css";
import axios from "axios";
import { arrowBack } from "ionicons/icons";
import Loading from "../components/Loading";
import { Network } from '@capacitor/network';

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email Required"),
  password: Yup.string()
    .min(4, "Must be 4 characters or more")
    .required("No password provided."),
});

const PassRecovery: React.FC = () => {
  const forget = useRef<HTMLIonModalElement>(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: true,
    emailError: false,
    message: "",
    verifyEmail: "",
    inputValues: ["", "", "", "", "", ""],
    password: "",
    newPassword: "",
    code: false,
  });

  const fetchToken = async () => {
    if (passwordVerify()) {
      const token = state.inputValues.join("");
      const data = { token: token, password: state.password };
      await axios
        .post(`https://tutoriapp-7f467dd740dd.herokuapp.com/change_password/`, data)
        .then((res) => {
          setState({
            ...state,
            message: res.data.message,
            emailError: !state.emailError,
            email: !state.email,
            code: !state.code,
            verifyEmail: "",
          });
        })
        .catch((err) => {
          setState({
            ...state,
            message: err.response.data.detail,
            emailError: !state.emailError,
          });
        });
    }
  };

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(config => {
      setLoading(true);
      return config;
    });
    
    const responseInterceptor = axios.interceptors.response.use(
      response => {
        setLoading(false);
        return response;
      },
      error => {
        setLoading(false);
        throw error;
      }
    );

    return () => {
      // Limpia los interceptores al desmontar el componente
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [state]);


  const fetchEmail = async (email: string) => {
    await axios
      .post(`https://tutoriapp-7f467dd740dd.herokuapp.com/password_reset/${email}`)
      .then((res) => {
        setState({
          ...state,
          message: res.data.message,
          email: !state.email,
          code: !state.code,
          emailError: !state.emailError,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          message: err.response.data.detail,
          emailError: !state.emailError,
          verifyEmail: "",
        });
      });
  };
  const handleInputs = (e: any) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleInputChange = (index: number, value: string) => {
    const values = [...state.inputValues];
    values[index] = value;
    setState({ ...state, inputValues: values });
  };

  const passwordVerify = () => {
    if (state.password === state.newPassword) {
      return true;
    }
    setState({
      ...state,
      emailError: !state.emailError,
      message: "Las contraseñas no coinciden",
    });
    return false;
  };

  const handleCloseAlertEmail = () => {
    if (state.message === "Contraseña cambiada satisfactoriamente")
      forget.current?.dismiss();
    setState({ ...state, emailError: !state.emailError });
  };

  return (
    <>
      <IonModal ref={forget} trigger='open-modal' className='page'>
        {loading&& (
          <Loading message="Cargando..." />
        )
        }
        <IonContent className='grid' scrollY={false}>
          <div className='circle1' />
          <div className='circles2 top' />
          <div className='circles2 bottom' />
          <div className='circles3 top2' />
          <div className='circles3 bottom2' />
          <div className='circles3 bottom3' />
          <IonAlert
            isOpen={state.emailError}
            onDidDismiss={handleCloseAlertEmail}
            header={"Atención"}
            message={state.message}
            buttons={["OK"]}
            animated={true}
          />
          {state.email && (
            <IonRow>
              <IonCol>
                <IonButton
                  style={{ marginRight: "80%" }}
                  onClick={() => forget.current?.dismiss()}
                  shape='round'
                >
                  <IonIcon icon={arrowBack} />
                  Regresar
                </IonButton>
              </IonCol>
            </IonRow>
          )}
          <IonRow>
            <IonCol>
              <IonTitle
                style={{ marginTop: state.email ? "30vh" : "5vh" }}
                className='title'
              >
                Recuperar contraseña
              </IonTitle>
              {state.email && (
                <div style={{ marginTop: "5vh" }}>
                  <p>
                    Ingrese el email con el que se registro a nuestra plataforma
                    para recibir un código de recuperación
                  </p>
                </div>
              )}
              {state.code && (
                <div style={{ marginTop: "5vh" }}>
                  <p>
                    Ingresa el código que te enviamos a tú correo electrónico
                  </p>
                </div>
              )}
            </IonCol>
          </IonRow>
          {state.email && (
            <div>
              <IonRow className='row'>
                <IonCol>
                  <IonInput
                    type='email'
                    name='verifyEmail'
                    className="inputs"
                    placeholder='Ingrese su email'
                    shape='round'
                    value={state.verifyEmail}
                    onIonInput={(e) => handleInputs(e)}
                  />
                </IonCol>
              </IonRow>
              <IonRow className='row'>
                <IonCol>
                  <IonButton
                    className='button'
                    shape='round'
                    onClick={() => fetchEmail(state.verifyEmail)}
                  >
                    Enviar
                  </IonButton>
                </IonCol>
              </IonRow>
            </div>
          )}
          {state.code && (
            <>
              <IonRow className='row'>
                {state.inputValues.map((value, index) => (
                  <IonCol className='box' key={index}>
                    <IonInput
                      type='text'
                      onIonInput={(e) =>
                        handleInputChange(index, e.detail.value || "")
                      }
                      value={value}
                      input-Mode='md'
                      maxlength={1}
                    />
                  </IonCol>
                ))}
              </IonRow>
              <IonRow className='row'>
                <IonCol>
                  <IonLabel>Nueva contraseña</IonLabel>
                </IonCol>
              </IonRow>
              <IonRow className='row'>
                <IonInput
                  type='password'                 
                  name='password'
                  value={state.password}
                  onIonInput={(e) => handleInputs(e)}
                  placeholder='Ingresa tu nueva contraseña'
                  className="inputs"
                />
              </IonRow>
              <IonRow className='row'>
                <IonCol>
                  <IonLabel>Confirma tu contraseña</IonLabel>
                </IonCol>
              </IonRow>
              <IonRow className='row'>
                <IonInput
                  type='password'
                  input-Mode='md'
                  name='newPassword'
                  value={state.newPassword}
                  onIonInput={(e) => handleInputs(e)}
                  placeholder='Confirma tu contraseña'
                  className="inputs"
                />
              </IonRow>
              <IonRow className='row'>
                <IonCol>
                  <IonButton
                    onClick={() => fetchToken()}
                    className='button'
                    shape='round'
                  >
                    Confirmar
                  </IonButton>
                </IonCol>
              </IonRow>
            </>
          )}
        </IonContent>
      </IonModal>
    </>
  );
};

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const stateUser = useAppSelector((state) => state.user);
  const alert = useRef<any>(null)
  const enviarDatos = (data: loginCredentials) => {
    // Realizar async action con redux para iniciar sesión
    dispatch(onLogin(data));
  };

  const handleCloseAlert = () => {
    dispatch(changeErrorLogin());
    alert.current?.dismiss()
  };

  const verifyToken = async () => {
    const token = await storage.get("data");
    if (token !== null) {
      dispatch(verify(token));
    }
    return;
  };

  useEffect(() => {
    if (!stateUser.isAuthenticated) {
      verifyToken();
    }
  }, []);

  useEffect(() => {
    if(stateUser.errorLogin){
      setTimeout(() => {
        alert.current?.present();
      }, 200);
    }
  }, [stateUser.errorLogin]);

  return (
    <IonPage className='page'>
      <IonContent className='content' scrollY={false}>
        <div className="top">
          <div className='circles' />
          <div className='circle' />
          <IonImg className='logo' src='https://i.ibb.co/DWHVDfC/logo.png' alt="TutoriAPP"/>
        </div>
        <IonAlert
          ref={alert}
          onDidDismiss={handleCloseAlert}
          header={"Info"}
          message={stateUser.errorMessage}
          buttons={["OK"]}
        />
        <IonGrid className='grid'>
          <IonRow>
            <IonCol>
              <IonTitle className='title'>Tutoriaap</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow className='row'>
            <IonCol>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                  enviarDatos(values);
                  resetForm({
                    values: { email: values.email, password: "" },
                  });
                }}
              >
                {(formikProps) => (
                  <div>
                    <Form className='form' onSubmit={formikProps.handleSubmit}>
                      <IonInput
                        type='email'
                        name='email'
                        className="inputs"
                        placeholder='Ingrese su email'
                        value={formikProps.values.email}
                        onIonChange={formikProps.handleChange}
                        onIonBlur={formikProps.handleBlur}
                      />
                      {formikProps.touched.email && formikProps.errors.email ? (
                        <div style={{ color: "red" }}>
                          {formikProps.errors.email}
                        </div>
                      ) : null}
                      <IonInput
                        type='password'
                        name='password'
                        className="inputs"
                        placeholder='Ingrese su contraseña'
                        value={formikProps.values.password}
                        onIonChange={formikProps.handleChange}
                        onIonBlur={formikProps.handleBlur}
                        style={{ marginTop: "15px" }}
                      />
                      {formikProps.touched.password &&
                      formikProps.errors.password ? (
                        <div style={{ color: "red" }}>
                          {formikProps.errors.password}
                        </div>
                      ) : null}
                      <IonButton
                        className='forget'
                        fill='clear'
                        id='open-modal'
                      >
                        {" "}
                        ¿HAS OLVIDADO LA CONTRASEÑA?{" "}
                      </IonButton>
                      <IonButton
                        className='log'
                        shape='round'
                        slot='start'
                        type='submit'
                      >
                        Iniciar sesión
                      </IonButton>
                    </Form>
                  </div>
                )}
              </Formik>
              <Link to ='/register'>
                <IonButton shape='round' ion-mode="md">Registrarse</IonButton>
              </Link>
            </IonCol>
          </IonRow>
          <PassRecovery />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
