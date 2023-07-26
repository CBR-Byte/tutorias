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
  import "./UserForm.css";
  import Bg from "../components/Bg/Bg";
  import Inputlogin from "../components/Inputlogin/Inputlogin";
  import GridHorarios from "../components/GridHorarios/GridHorarios";
  import { Field, Form, Formik } from "formik";
  import * as Yup from "yup";
  
  const validationSchema = Yup.object({
    carrera: Yup.string().required("Carrera requerida"),
    semestre: Yup.number().required("Semestre requerido"),
    formato: Yup.array().required("formato Requerido"),
    presupuesto: Yup.number().required("Presupuesto Requerido"),
    metodo: Yup.array().required("Método Requerido"),
    grupo: Yup.array().required("Grupo Requerido"),
    //disponibilidad: Yup.string().required("Disponibilidad Requerida"),
  });
  
  const UserForm: React.FC = () => {
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
              <IonLabel >Formulario</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow className='row'>
            <IonCol>
              <Formik
                initialValues={{
                  carrera: "",
                  semestre: 0,
                  formato: [],
                  presupuesto: 0,
                  metodo: [],
                  grupo:[]
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
                        label='Carrera'
                        type='text'
                        name='carrera'
                        placeholder='Carrera'
                        value={formikProps.values.carrera}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                      />
                      {formikProps.touched.carrera && formikProps.errors.carrera ? (
                        <div style={{ color: "red" }}>
                          {formikProps.errors.carrera}
                        </div>
                      ) : null}
  
                      <Inputlogin
                        label='Semestre'
                        type='semestre'
                        name='semestre'
                        placeholder='Semestre'
                        value={formikProps.values.semestre.toString()}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                      />
                      {formikProps.touched.semestre && formikProps.errors.semestre ? (
                        <div style={{ color: "red" }}>
                          {formikProps.errors.semestre}
                        </div>
                      ) : null}
                      <Inputlogin
                        label='Presupuesto'
                        type='presupuesto'
                        name='presupuesto'
                        placeholder='Presupuesto'
                        value={formikProps.values.presupuesto.toString()}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                      />
                      {formikProps.touched.presupuesto && formikProps.errors.presupuesto ? (
                        <div style={{ color: "red" }}>
                          {formikProps.errors.presupuesto}
                        </div>
                      ) : null}
                      <div className="rol">
                        <IonLabel className="category">Formato: </IonLabel>
                        <Field
                          className="options"
                          as='select'
                          name='formato'
                          multiple={true}
                        >
                        <option value="Virtual">Presencial</option>
                        <option value="Presencial">Virtual</option>
                        </Field>
                      </div>
                      {formikProps.touched.formato && formikProps.errors.formato ? (
                        <div style={{ color: "red" }}>
                          {formikProps.errors.formato}
                        </div>
                      ) : null}
                      <div className="rol">
                        <IonLabel className="category">Grupo: </IonLabel>
                        <Field
                          className="options"
                          as='select'
                          name='grupo'
                          multiple={true}
                        >
                        <option value="Individual">Individual</option>
                        <option value="Grupal">Grupal</option>
                        </Field>
                      </div>
                      {formikProps.touched.grupo && formikProps.errors.grupo ? (
                        <div style={{ color: "red" }}>
                          {formikProps.errors.grupo}
                        </div>
                      ) : null}
                      <div className="rol">
                        <IonLabel className="category">Método: </IonLabel>
                        <Field
                          className="options"
                          as='select'
                          name='metodo'
                          multiple={true}
                        >
                        <option value="Activo">Aprendizaje activo</option>
                        <option value="Reflexivo">Aprendizaje reflexivo</option>
                        <option value="Teórico">Aprendizaje teórico</option>
                        <option value="Pragmático">Aprendizaje pragmático</option>
                        <option value="Visual">Aprendizaje visual</option>
                        <option value="Auditivo">Aprendizaje auditivo</option>
                        <option value="Kinestésico">Aprendizaje kinestésico</option>
                        </Field>
                      </div>
                      {formikProps.touched.metodo && formikProps.errors.metodo ? (
                        <div style={{ color: "red" }}>
                          {formikProps.errors.metodo}
                        </div>
                      ) : null}
                      <div className="btn">
                        <IonRouterLink routerLink="/horario">
                            <IonButton type='submit'>Continuar</IonButton>
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
  
  export default UserForm;