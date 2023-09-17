/** @format */

import {
  IonButton,
  IonLabel,
  IonRow,
  IonIcon,
  IonGrid,
  IonCol,
  IonAlert,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons/";
import "./Register.css";
import Bg from "../../components/Bg/Bg";
import Inputlogin from "../../components/Inputlogin/Inputlogin";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../components/redux/hooks";
import {
  changeErrorRegister,
  onSignUp,
  verify,
} from "../../components/redux/states/userSlice";
import { useEffect, useRef } from "react";
import { storage } from "../../components/redux/states/userSlice";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Nombre Requerido"),
  email: Yup.string().email("Email inválido").required("Email Requerido"),
  password: Yup.string()
    .min(4, "La contraseña debe tener al menos 4 caracteres")
    .required("Contraseña requerida"),
  passwordConfirmation: Yup.string().test(
    "",
    "La contraseña debe coincidir",
    function (value) {
      return this.parent.password === value;
    }
  ),
  is_tutor: Yup.string().required("Rol Requerido"),
});

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const stateUser = useAppSelector((state) => state.user);
  const alert = useRef<any>(null);

  const handleCloseAlert = () => {
    dispatch(changeErrorRegister());
    alert.current && alert.current.dismiss();
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
    if (stateUser.errorRegister) {
      setTimeout(() => {
        alert.current?.present();
      }, 200);
    }
  }, [stateUser.errorRegister]);

  return (
    <Bg>
      <IonAlert
        ref={alert}
        onDidDismiss={handleCloseAlert}
        header={"Error"}
        message={stateUser.errorMessage}
        buttons={[
          {
            text: "OK",
            cssClass: "alert-button-cancel",
          },
        ]}
      />
      <IonGrid>
        <IonRow>
          <IonCol>
            <Link to='/login'>
              <IonButton shape='round'>
                <IonIcon icon={arrowBack} />
                Regresar
              </IonButton>
            </Link>
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
                is_student: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
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
                      <div className='options1'>
                        <label>
                          <Field
                            type='radio'
                            name='is_tutor'
                            value='true'
                            style={{ marginLeft: "5px" }}
                          />
                          Sí
                        </label>
                        <label>
                          <Field
                            type='radio'
                            name='is_tutor'
                            value='false'
                            style={{ marginLeft: "5px" }}
                          />
                          No
                        </label>
                      </div>
                    </div>
                    {formikProps.touched.is_tutor &&
                    formikProps.errors.is_tutor ? (
                      <div style={{ color: "red" }}>
                        {formikProps.errors.is_tutor}
                      </div>
                    ) : null}

                    {formikProps.values.is_tutor === "false" ||
                    formikProps.values.is_tutor === "" ? null : (
                      <div className='rol'>
                        <IonLabel className='category'>
                          Vas a buscar tutorias?:{""}
                        </IonLabel>
                        <div className='options1'>
                          <label>
                            <Field
                              type='radio'
                              name='is_student'
                              value='true'
                              style={{ marginLeft: "5px" }}
                            />
                            Sí
                          </label>
                          <label>
                            <Field
                              type='radio'
                              name='is_student'
                              value='false'
                              style={{ marginLeft: "5px" }}
                            />
                            No
                          </label>
                        </div>
                      </div>
                    )}
                    {formikProps.touched.is_student &&
                    formikProps.errors.is_student ? (
                      <div style={{ color: "red" }}>
                        {formikProps.errors.is_student}
                      </div>
                    ) : null}
                    {formikProps.isValid ? (
                      <div className='btn'>
                        <IonButton type='submit'>Registrarse</IonButton>
                      </div>
                    ) : (
                      <div className='btn'>
                        <IonButton disabled={true}>Registrarse</IonButton>
                      </div>
                    )}
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
