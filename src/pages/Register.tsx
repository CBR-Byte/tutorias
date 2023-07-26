/** @format */

import {
  IonCheckbox,
  IonButton,
  IonInput,
  IonLabel,
  IonRow,
  IonIcon,
  IonItem,
  IonRouterLink,
  IonGrid,
  IonCol,
  IonContent,
  IonSelect,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons/";
import "./Register.css";
import Bg from "../components/Bg/Bg";
import Inputlogin from "../components/Inputlogin/Inputlogin";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  user: Yup.string().required("Nombre Requerido"),
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
  rol: Yup.array().required("Rol Requerido"),
});

const Register: React.FC = () => {
  return (
    <Bg>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonRouterLink routerLink='/home'>
              <IonButton shape='round'>
                <IonIcon icon={arrowBack} />
                Regresar
              </IonButton>
            </IonRouterLink>
          </IonCol>
        </IonRow>
        <IonRow className="reg">
          <IonCol>
            <IonLabel >Registro</IonLabel>
          </IonCol>
        </IonRow>
        <IonRow className='row'>
          <IonCol>
            <Formik
              initialValues={{
                user: "",
                email: "",
                password: "",
                passwordConfirmation: "",
                rol: [],
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                alert(JSON.stringify(values));
                console.log(values)
              }}
            >
              {(formikProps) => (
                <div>
                  <Form>
                    <Inputlogin
                      label='Usuario'
                      type='text'
                      name='user'
                      placeholder='Nombre y Apellido'
                      value={formikProps.values.user}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                    />
                    {formikProps.touched.user && formikProps.errors.user ? (
                      <div style={{ color: "red" }}>
                        {formikProps.errors.user}
                      </div>
                    ) : null}

                    <Inputlogin
                      label='Correo'
                      type='email'
                      name='email'
                      placeholder='Correo Electronico'
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
                    <div className="rol">
                      <IonLabel className="category">Category: </IonLabel>
                      <Field
                        className="options"
                        as='select'
                        name='rol'
                        multiple={true}
                      >
                      <option value="Estudiante">Estudiante</option>
                      <option value="Tutor">Tutor</option>
                      </Field>
                    </div>
                    {formikProps.touched.rol && formikProps.errors.rol ? (
                      <div style={{ color: "red" }}>
                        {formikProps.errors.rol}
                      </div>
                    ) : null}
                    <div className="btn">
                      <IonRouterLink routerLink="/userForm">
                        <IonButton type='submit'>Registrarse</IonButton>
                      </IonRouterLink>
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
