/** @format */

import {
  IonButton,
  IonAlert,
  IonGrid,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonRouterLink,
  IonContent,
  IonCol,
  IonImg,
} from "@ionic/react";
import "./Home.css";
import { useEffect, useState } from "react";
import { loginCredentials } from "../components/redux/states/userSlice";
import { onLogin, changeError } from "../components/redux/states/userSlice";
import { useAppDispatch, useAppSelector } from "../components/redux/hooks";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email Required"),
  password: Yup.string()
    .min(4, "Must be 4 characters or more")
    .required("No password provided."),
});

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const stateUser = useAppSelector((state) => state.user);
  const history = useHistory();
  const [modal, setModal] = useState(false);


  const enviarDatos = (data: loginCredentials) => {
    // Realizar async action con redux para iniciar sesión
    dispatch(onLogin(data));
  };
  const handleCloseAlert = () => {
    dispatch(changeError());
  };

  useEffect(() => {
    if (stateUser.isAuthenticated) {
      history.push("/inicio");
    }
    setModal(stateUser.error);
  }, [stateUser.error, stateUser.isAuthenticated]);

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
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, {resetForm}) => {
                  enviarDatos(values);
                  resetForm();
                }}
              >
                {(formikProps) => (
                  <div>
                    <form onSubmit={formikProps.handleSubmit}>
                      <IonInput
                        type='email'
                        name='email'
                        input-Mode='md'
                        fill='outline'
                        placeholder='Ingrese su email'
                        value={formikProps.values.email}
                        onIonChange={formikProps.handleChange}
                        onIonBlur={formikProps.handleBlur}
                        shape='round'
                      />
                      {formikProps.touched.email && formikProps.errors.email ? (
                        <div style={{ color: "red" }}>
                          {formikProps.errors.email}
                        </div>
                      ) : null}
                      <IonInput
                        type='password'
                        name='password'
                        input-Mode='md'
                        fill='outline'
                        shape='round'
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
                        color={"secondary"}
                      >
                        {" "}
                        ¿HAS OLVIDADO LA CONTRASEÑA?{" "}
                      </IonButton>
                      <IonButton
                        className="log"
                        shape='round'
                        slot='start'
                        type='submit'
                      >
                        Iniciar sesión
                      </IonButton>
                      <IonRouterLink routerLink='/register'>
                        <IonButton 
                          shape='round'>
                          Registrarse
                        </IonButton>
                      </IonRouterLink>
                    </form>
                  </div>
                )}
              </Formik>
            </IonCol>
          </IonRow>
          <IonRow>
          </IonRow>
        </IonGrid>
        <IonImg className='logo' src='assets/images/logo.png'/>
        <IonAlert
          isOpen={modal}
          onDidDismiss={handleCloseAlert}
          header={"Error"}
          message={"Email o contraseña incorrectos"}
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
