/** @format */

import {
  IonButton,
  IonLabel,
  IonRow,
  IonIcon,
  IonRouterLink,
  IonGrid,
  IonCol,
  IonAlert,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons/";
import "./Register.css";
import Bg from "../components/Bg/Bg";
import Inputlogin from "../components/Inputlogin/Inputlogin";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../components/redux/hooks";
import { changeErrorRegister, onSignUp, verify } from "../components/redux/states/userSlice";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { storage } from "../components/redux/store";

const validationSchema = Yup.object({
  name: Yup.string().required("Nombre Requerido"),
  email: Yup.string()
    .email("Correo electronico inválido")
    .required("Email Requerido"),
  password: Yup.string()
    .min(4, "Must be 4 characters or more")
    .required("No password provided."),
  passwordConfirmation: Yup.string().test(
    "La contraseña coincide",
    "La contraseña debe coincidir",
    function (value) {
      return this.parent.password === value;
    }
  ),
  is_tutor: Yup.string().required("Rol Requerido"),
});

const Register: React.FC = () => {
  const dispatch= useAppDispatch();
  const stateUser = useAppSelector((state) => state.user);
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const handleCloseAlert = () => {
    dispatch(changeErrorRegister());
  };
  const verifyToken = async () => {
    const token = await storage.get('data')
    if(token !== null){
      dispatch(verify(token));
    }
    return;
  }
  verifyToken();
  useEffect(() => {
    setModal(stateUser.errorRegister);
  }, [stateUser.errorRegister]);
  return (
    <Bg >
      <IonAlert
          isOpen={modal}
          onDidDismiss={handleCloseAlert}
          header={"Error"}
          message={stateUser.errorMessage}
          buttons={["OK"]}
        />
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonRouterLink routerLink='/login'>
              <IonButton shape='round'>
                <IonIcon icon={arrowBack} />
                Regresar
              </IonButton>
            </IonRouterLink>
          </IonCol>
        </IonRow>
        <IonRow className='reg'>
          <IonCol>
            <IonLabel>Registro</IonLabel>
          </IonCol>
        </IonRow>
        <IonRow className='row'>
          <IonCol>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                passwordConfirmation: "",
                is_tutor: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, {resetForm}) => {
                dispatch(onSignUp(values));
                resetForm();
              }}
            >
              {(formikProps) => (
                <div>
                  <Form>
                    <Inputlogin
                      label='Usuario'
                      type='text'
                      name='name'
                      placeholder='Nombre y Apellido'
                      value={formikProps.values.name}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                    />
                    {formikProps.touched.name && formikProps.errors.name ? (
                      <div style={{ color: "red" }}>
                        {formikProps.errors.name}
                      </div>
                    ) : null}

                    <Inputlogin
                      label='Correo'
                      type='email'
                      name='email'
                      placeholder='Correo Electrónico'
                      value={formikProps.values.email}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                    />
                    {formikProps.touched.email && formikProps.errors.email ? (
                      <div style={{ color: "red" }}>
                        {formikProps.errors.email}
                      </div>
                    ) : null}

                    <Inputlogin
                      label='Contraseña'
                      type='password'
                      name='password'
                      placeholder='Contraseña'
                      value={formikProps.values.password}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                    />
                    {formikProps.touched.password &&
                    formikProps.errors.password ? (
                      <div style={{ color: "red" }}>
                        {formikProps.errors.password}
                      </div>
                    ) : null}

                    <Inputlogin
                      label='Confirmar Contraseña'
                      type='password'
                      name='passwordConfirmation'
                      placeholder='contraseña'
                      value={formikProps.values.passwordConfirmation}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                    />
                    {formikProps.touched.passwordConfirmation &&
                    formikProps.errors.passwordConfirmation ? (
                      <div style={{ color: "red" }}>
                        {formikProps.errors.passwordConfirmation}
                      </div>
                    ) : null}
                    <div className='rol'>
                      <IonLabel className='category'>
                        Vas a ser tutor?:{""}
                      </IonLabel>
                      <label>
                        <Field type='radio' name='is_tutor' value='true' style={{marginLeft: "5px"}} />
                        Sí
                      </label>
                      <label>
                        <Field type='radio' name='is_tutor' value='false' style={{marginLeft: "5px"}}/>
                        No
                      </label>
                    </div>
                    {formikProps.touched.is_tutor && formikProps.errors.is_tutor ? (
                      <div style={{ color: "red" }}>
                        {formikProps.errors.is_tutor}
                      </div>
                    ) : null}
                    
                    <div className='btn'>
                      <IonButton type='submit'>Registrarse</IonButton>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Bg>
  );
};

export default Register;
