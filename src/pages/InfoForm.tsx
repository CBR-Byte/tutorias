/** @format */
import React, { useRef } from "react";
import "./InfoForm.css";
import {
  IonButton,
  IonIcon,
  IonLabel,
  IonModal,
  IonPage,
  IonTitle,
} from "@ionic/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Inputlogin from "../components/Inputlogin/Inputlogin";
import Bg from "../components/Bg/Bg";
import { useAppSelector } from "../components/redux/hooks";
import { arrowBack } from "ionicons/icons";

const validationSchema = Yup.object({
  name: Yup.string().required("Nombre Requerido"),
  email: Yup.string()
    .email("Correo electronico inválido")
    .required("Email Requerido"),
  is_tutor: Yup.string().required("Rol Requerido"),
});

const validationSchema2 = Yup.object({
  actualPassword: Yup.string().required("Contraseña actual requerida"),
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
});

const InfoForm: React.FC = () => {
  const forget = useRef<HTMLIonModalElement>(null);
  const stateUser = useAppSelector((state) => state.user);
  const handleChange = () => {};

  return (
    <Bg>
      <IonModal initialBreakpoint={0.6} ref={forget} trigger='open-modal'>
        <Formik
          initialValues={{
            password: "",
            passwordConfirmation: "",
            actualPassword: "",
          }}
          validationSchema={validationSchema2}
          onSubmit={(values, { resetForm }) => {
            resetForm();
          }}
        >
          {(formikProps) => (
            <div className='contModal'>
              <Form>
                <IonTitle className='titleModal'>Cambiar contraseña</IonTitle>
                <Inputlogin
                  label='Contraseña actual'
                  type='password'
                  name='actualPassword'
                  placeholder='Contraseña actual'
                  value={formikProps.values.actualPassword}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                />
                {formikProps.touched.actualPassword &&
                formikProps.errors.actualPassword ? (
                  <div style={{ color: "#df504a" }}>
                    {formikProps.errors.actualPassword}
                  </div>
                ) : null}
                <Inputlogin
                  label='Contraseña'
                  type='password'
                  name='password'
                  placeholder='Nueva contraseña'
                  value={formikProps.values.password}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                />
                {formikProps.touched.password && formikProps.errors.password ? (
                  <div style={{ color: "#df504a" }}>
                    {formikProps.errors.password}
                  </div>
                ) : null}
                <Inputlogin
                  label='Confirmar contraseña'
                  type='password'
                  name='passwordConfirmation'
                  placeholder='Nueva contraseña'
                  value={formikProps.values.passwordConfirmation}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                />
                {formikProps.touched.passwordConfirmation &&
                formikProps.errors.passwordConfirmation ? (
                  <div style={{ color: "#df504a" }}>
                    {formikProps.errors.passwordConfirmation}
                  </div>
                ) : null}
                <div className='btnInfo'>
                  <IonButton
                    onClick={() => forget.current?.dismiss()}
                    shape='round'
                    type='submit'
                    style={{ marginTop: "5vh" }}
                  >
                    Cambiar
                  </IonButton>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </IonModal>
      <div className='contInfo'>
        <h1 className='titleInfo'>Información</h1>
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
                  <div style={{ color: "#df504a" }}>
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
                  <div style={{ color: "#df504a" }}>
                    {formikProps.errors.email}
                  </div>
                ) : null}

                {!stateUser.user?.is_tutor && stateUser.user?.is_student ? (
                  <div className='rol divTutor'>
                    <IonLabel className='selectTutor'>
                      ¿Quieres ser tutor ahora?:{""}
                    </IonLabel>
                    <label className='selectTutor'>
                      <Field
                        type='radio'
                        name='is_tutor'
                        value='true'
                        style={{ marginLeft: "5px" }}
                      />
                      Sí
                    </label>
                    <label className='selectTutor'>
                      <Field
                        type='radio'
                        name='is_tutor'
                        value='false'
                        style={{ marginLeft: "5px" }}
                      />
                      No
                    </label>
                  </div>
                ) : stateUser.user?.is_tutor && !stateUser.user?.is_student ? (
                  <div className='rol'>
                    <IonLabel className='category'>
                      ¿Vas a buscar tutorias?:{""}
                    </IonLabel>
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
                ) : null}
                {formikProps.touched.is_tutor && formikProps.errors.is_tutor ? (
                  <div style={{ color: "#df504a" }}>
                    {formikProps.errors.is_tutor}
                  </div>
                ) : null}
                {formikProps.touched.is_student &&
                formikProps.errors.is_student ? (
                  <div style={{ color: "#df504a" }}>
                    {formikProps.errors.is_student}
                  </div>
                ) : null}
                {formikProps.isValid ? (
                  <div className='btnInfo'>
                    <IonButton shape='round' type='submit'>
                      Guardar
                    </IonButton>
                  </div>
                ) : (
                  <div className='btnInfo'>
                    <IonButton shape='round' disabled={true}>
                      Guardar
                    </IonButton>
                  </div>
                )}
              </Form>
            </div>
          )}
        </Formik>
        <div className='btnInfo'>
          <IonButton
            id='open-modal'
            onClick={() => handleChange()}
            shape='round'
          >
            Cambiar contraseña
          </IonButton>
        </div>
        <div className='btnInfo'>
          <IonButton shape='round' href='/inicio'>
            Volver
          </IonButton>
        </div>
      </div>
    </Bg>
  );
};

export default InfoForm;
