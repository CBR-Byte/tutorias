/** @format */

import {
  IonButton,
  IonLabel,
  IonRow,
  IonIcon,
  IonRouterLink,
  IonGrid,
  IonCol,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons/";
import "./UserForm.css";
import Bg from "../components/Bg/Bg";
import Inputlogin from "../components/Inputlogin/Inputlogin";
import GridHorarios from "../components/GridHorarios/GridHorarios";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  format_tutor: Yup.array().required("formato Requerido"),
  cost_tutor: Yup.number().required("Presupuesto Requerido"),
  method_tutor: Yup.array().required("Método Requerido"),
  tye_group_tutor: Yup.array().required("Grupo Requerido"),
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
        <IonRow className='reg'>
          <IonCol>
            <IonLabel>Formulario</IonLabel>
          </IonCol>
        </IonRow>
        <IonRow className='row'>
          <IonCol>
            <Formik
              initialValues={{
                format_tutor: [] ,
                cost_tutor: "",
                type_tutor: "",
                method_tutor: [],
                type_group_tutor: [],
                //avaliability: [],
                subjects_tutor: [],
              }}
              //validationSchema={validationSchema}
              onSubmit={(values) => {
                alert(JSON.stringify(values));
                console.log(values);
              }}
            >
              {(formikProps) => (
                <div>
                  <Form>
                    <div className='rol'>
                      <IonLabel className='category'>Formato: </IonLabel>
                      <Field
                        className='options'
                        as='select'
                        name='format_tutor'
                        multiple={true}
                      >
                        <option value='Virtual'>Presencial</option>
                        <option value='Presencial'>Virtual</option>
                      </Field>
                    </div>
                    {formikProps.touched.format_tutor &&
                    formikProps.errors.format_tutor ? (
                      <div style={{ color: "red" }}>
                        {formikProps.errors.format_tutor}
                      </div>
                    ) : null}

                    <Inputlogin
                      label='Costo como tutor por hora'
                      type='number'
                      name='cost_tutor'
                      placeholder='cobro'
                      value={formikProps.values.cost_tutor}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                    />
                    {formikProps.touched.cost_tutor &&
                    formikProps.errors.cost_tutor ? (
                      <div style={{ color: "red" }}>
                        {formikProps.errors.cost_tutor}
                      </div>
                    ) : null}

                    <div className='rol'>
                      <IonLabel className='category'>
                        Que tipo de tutor eres?:{""}
                      </IonLabel>
                      <label>
                        <Field
                          type='radio'
                          name='type_tutor'
                          value='Estudiante'
                          style={{ marginLeft: "5px" }}
                        />
                        Estudiante
                      </label>
                      <label>
                        <Field
                          type='radio'
                          name='type_tutor'
                          value='Profesor'
                          style={{ marginLeft: "5px" }}
                        />
                        Profesor
                      </label>
                    </div>
                    {formikProps.touched.type_tutor &&
                    formikProps.errors.type_tutor ? (
                      <div style={{ color: "red" }}>
                        {formikProps.errors.type_tutor}
                      </div>
                    ) : null}


                    <div className='rol'>
                      <IonLabel className='category'>Método: </IonLabel>
                      <Field
                        className='options'
                        as='select'
                        name='method_tutor'
                        multiple={true}
                      >
                        <option value='Activo'>Aprendizaje activo</option>
                        <option value='Reflexivo'>Aprendizaje reflexivo</option>
                        <option value='Teórico'>Aprendizaje teórico</option>
                        <option value='Pragmático'>
                          Aprendizaje pragmático
                        </option>
                        <option value='Visual'>Aprendizaje visual</option>
                        <option value='Auditivo'>Aprendizaje auditivo</option>
                        <option value='Kinestésico'>
                          Aprendizaje kinestésico
                        </option>
                      </Field>
                    </div>
                    {formikProps.touched.method_tutor && formikProps.errors.method_tutor ? (
                        <div style={{ color: "red" }}>
                        {formikProps.errors.method_tutor}
                      </div>
                    ) : null}
                    <div className='rol'>
                        <IonLabel className='category'>Tipo de Grupo(s): </IonLabel>
                        <Field
                        className='options'
                        as='select'
                        name='type_group_tutor'
                        multiple={true}
                        >
                        <option value='Individual'>Individual</option>
                        <option value='Grupal'>Grupal</option>
                        </Field>
                    </div>
                    {formikProps.touched.type_group_tutor && formikProps.errors.type_group_tutor ? (
                        <div style={{ color: "red" }}>
                        {formikProps.errors.type_group_tutor}
                        </div>
                    ) : null}

                    //Falta horario de disponibilidad
                    <div className='rol'>
                        <IonLabel className='category'>Materias: </IonLabel>
                        <Field
                        className='options'
                        as='select'
                        name='subjects_tutor'
                        multiple={true}
                        >
                        <option value='Matemáticas'>Matemáticas</option>
                        <option value='Física'>Física</option>
                        <option value='Química'>Química</option>
                        <option value='Biología'>Biología</option>
                        <option value='Lenguaje'>Lenguaje</option>
                        <option value='Inglés'>Inglés</option>
                        <option value='Español'>Español</option>
                        <option value='Filosofía'>Filosofía</option>
                        <option value='Sociales'>Sociales</option>
                        <option value='Artes'>Artes</option>
                        <option value='Deportes'>Deportes</option>
                        <option value='Programación'>Programación</option>
                        <option value='Música'>Música</option>
                        <option value='Dibujo'>Dibujo</option>
                        <option value='Danza'>Danza</option>
                        <option value='Teatro'>Teatro</option>
                        <option value='Historia'>Historia</option>
                        <option value='Geografía'>Geografía</option>
                        <option value='Economía'>Economía</option>
                        <option value='Religión'>Religión</option>
                        <option value='Ética'>Ética</option>
                        <option value='Informática'>Informática</option>
                        <option value='Otra'>Otra</option>
                        </Field>
                        
                    </div>
                    {formikProps.touched.subjects_tutor && formikProps.errors.subjects_tutor ? (
                        <div style={{ color: "red" }}>
                        {formikProps.errors.subjects_tutor}
                        </div>
                    ) : null}
                    <div className='btn'>
                        <IonButton type='submit'>Terminar</IonButton>                
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
