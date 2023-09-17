/** @format */
import React, { useEffect, useState } from "react";
import "./InfoForm.css";
import {
  IonAlert,
  IonButton,
  IonLabel,
  IonModal,
  IonTitle,
} from "@ionic/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Inputlogin from "../../components/Inputlogin/Inputlogin";
import Bg from "../../components/Bg/Bg";
import { useAppDispatch, useAppSelector } from "../../components/redux/hooks";
import {
  changeAlertUpdateFalse,
  changeAlertUpdateTrue,
  changeErrorRegister,
  changePassword,
  updateUserInfo,
} from "../../components/redux/states/userSlice";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Nombre Requerido"),
  email: Yup.string()
    .email("Correo electronico inválido")
    .required("Email Requerido"),
});

const validationSchema2 = Yup.object({
  actualPassword: Yup.string().required("Contraseña actual requerida"),
  newPassword: Yup.string()
    .min(4, "El número de caracteres debe ser mayor o igual a 4")
    .required("Debes ingresar tu contraseña nueva."),
  passwordConfirmation: Yup.string().test(
    "",
    "La contraseña debe coincidir",
    function (value) {
      return this.parent.newPassword === value;
    }
  ),
});

const InfoForm: React.FC = () => {
  const stateUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [alert, setAlert] = useState<boolean>(false);

  interface Values {
    name: string;
    email: string;
    is_tutor: boolean | string;
    is_student: boolean | string;
  }

  const change_password = (values: any) => {
    delete values.passwordConfirmation;
    dispatch(changePassword(values));
  };

  const handleCloseAlert = () => {
    dispatch(changeAlertUpdateFalse()); //puede ser el error de que salga el alert
    setAlert(false);
  };

  useEffect(() => {
    setAlert(false);
    if(stateUser.alertUpdate){
      setTimeout(() => {
        setAlert(stateUser.alertUpdate);
      }, 200);
    }
  }, [stateUser.alertUpdate]);

  const updateInfo = (values: any) => {
    if (stateUser.user?.is_tutor && stateUser.user?.is_student) {
      delete values.is_tutor;
      delete values.is_student;
      dispatch(updateUserInfo(values));
    } else if (stateUser.user?.is_tutor && !stateUser.user?.is_student) {
      delete values.is_tutor;
      if (values.is_student === "true") {
        values.is_student = true;
      } else {
        values.is_student = false;
      }
      dispatch(updateUserInfo(values));
    } else {
      delete values.is_student;
      if (values.is_tutor === "true") {
        values.is_tutor = true;
      } else {
        values.is_tutor = false;
      }
      dispatch(updateUserInfo(values));
    }
  };

  return (
    <Bg>
      <IonAlert
        isOpen={alert}
        onDidDismiss={handleCloseAlert}
        header={"Info"}
        message={stateUser.errorMessage}
        buttons={[
          {
            text: "OK",
            cssClass: "alert-button-cancel",
          },
        ]}
      />
      <IonModal initialBreakpoint={0.6} trigger='open-modal'>
        <Bg>
          <Formik
            initialValues={{
              newPassword: "",
              passwordConfirmation: "",
              actualPassword: "",
            }}
            validationSchema={validationSchema2}
            onSubmit={(values, { resetForm }) => {
              change_password(values);
              resetForm();
            }}
          >
            {(formikProps) => (
              <div className='contModal'>
                <Form className='formInfo'>
                  <IonTitle className='titleModal'>Cambiar contraseña</IonTitle>
                  <Inputlogin
                    tipo='reset'
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
                    tipo='reset'
                    label='Nueva contraseña'
                    type='password'
                    name='newPassword'
                    placeholder='Nueva contraseña'
                    value={formikProps.values.newPassword}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                  />
                  {formikProps.touched.newPassword &&
                  formikProps.errors.newPassword ? (
                    <div style={{ color: "#df504a" }}>
                      {formikProps.errors.newPassword}
                    </div>
                  ) : null}
                  <Inputlogin
                    tipo='reset'
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
                    <IonButton shape='round' type='submit'>
                      Cambiar
                    </IonButton>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </Bg>
      </IonModal>
      <div className='contInfo'>
        <h1 className='titleInfo'>Información</h1>
        <Formik
          initialValues={
            {
              name: stateUser.user?.name,
              email: stateUser.user?.email,
              is_tutor: "",
              is_student: "",
            } as Values
          }
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            updateInfo(values);
            dispatch(changeAlertUpdateTrue());
            resetForm();
          }}
        >
          {(formikProps) => (
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
                <div className='rol'>
                  <IonLabel className='category'>
                    ¿Quieres ser tutor ahora?{""}
                  </IonLabel>
                  <div className="options1">
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
              ) : stateUser.user?.is_tutor && !stateUser.user?.is_student ? (
                <div className='rol'>
                  <IonLabel className='category'>
                    ¿Vas a buscar tutorias?:{""}
                  </IonLabel>
                  <div className="options1">
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
          )}
        </Formik>
        <div className='btnInfo'>
          <IonButton id='open-modal' shape='round'>
            Cambiar contraseña
          </IonButton>
        </div>
        <div className='btnInfo'>
          <Link to={"/userSettings"}>
            <IonButton shape='round'>Volver</IonButton>
          </Link>
        </div>
      </div>
    </Bg>
  );
};

export default InfoForm;
