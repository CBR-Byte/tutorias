/** @format */

import {
  IonButton,
  IonLabel,
  IonRow,
  IonGrid,
  IonCol,
  IonModal,
} from "@ionic/react";
import "./UserForm.css";
import Bg from "../../components/Bg/Bg";
import Inputlogin from "../../components/Inputlogin/Inputlogin";
import GridHorarios from "../../components/GridHorarios/GridHorarios";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState} from "react";
import { Slot } from "./UserForm";
import { useAppDispatch, useAppSelector } from "../../components/redux/hooks";
import { useHistory } from "react-router";
import {  changeRegisterCompleted, updateUserInfo } from "../../components/redux/states/userSlice";
import { getSubjects } from "../../components/redux/states/subjectSlice";


const validationSchema = Yup.object({
  format_tutor: Yup.array().required("formato requerido"),
  cost_tutor: Yup.number().required("Presupuesto requerido"),
  method_tutor: Yup.array().required("Método requerido"),
  type_tutor: Yup.string().required("Tipo de tutor requerido"),
  type_group_tutor: Yup.array().required("Grupo requerido"),
  subjects_tutor: Yup.array().required("Materias requeridas"),
  avaliability: Yup.array().required("Disponibilidad Requerida"),
});

interface TutorFormData {
  format_tutor: string[] | string;
  cost_tutor: number | string;
  method_tutor: string[] | string;
  type_tutor: string | string;
  type_group_tutor: string[] | string;
  subjects_tutor: string[] | string;
  avaliability: Slot[];
}

const UserForm: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const state = useAppSelector((state) => state.user);
  const stateSubjects = useAppSelector((state) => state.subject);
  const [selectedSlots, setSelectedSlots] = useState<Slot[]>(state.user?.avaliability || []);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [subjects] = useState<string[]>(stateSubjects.subjects);
  const [showModal, setShowModal] = useState(false);
  const [clickedButton, setClickedButton] = useState(false);

  useEffect(() => {
    
    if (clickedButton) {
      setShowModal(true);
    }
  }, [clickedButton]);

  useEffect(() => {
    if (subjects.length === 0 ){
     subjectsFetch();
    }
  }, [stateSubjects.subjects]);
  
  const subjectsFetch = async () => {
    dispatch(getSubjects());
  }

  const handleButtonClick = () => {
    setClickedButton(true);
  };

    const closeModal = () => {
      setShowModal(false);
      setClickedButton(false);
    }

    const actualizarData = (values: TutorFormData) => { 
      dispatch(updateUserInfo(values));
    }

    const getInitialValues = (data: Partial<TutorFormData> = {}): TutorFormData => ({
      format_tutor: data.format_tutor || "",
      cost_tutor: data.cost_tutor || "",
      method_tutor: data.method_tutor || "",
      type_tutor: data.type_tutor || "",
      type_group_tutor: data.type_group_tutor || "",
      subjects_tutor: data.subjects_tutor || "",
      avaliability: data.avaliability || [],
    });

    const initialValues = getInitialValues(state.user);
  return (
    <Bg>
      <IonGrid>
        <IonRow className='reg'>
          <IonCol>
            <IonLabel>Formulario</IonLabel>
          </IonCol>
        </IonRow>
        <IonRow className='row'>
          <IonCol>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, {resetForm}) => {
                values.avaliability = selectedSlots;

                if(state.registerCompleted) {
                  actualizarData(values);
                  history.push("/userSettings");
                }else if(state.user?.is_student && !state.registerCompleted) {
                  actualizarData(values);
                  history.push("/userForm");
                }
                else {
                  actualizarData(values);
                  dispatch(changeRegisterCompleted())
                  history.push("/inicio");
                }
                  resetForm();
                }}
            >
              {(formikProps) => (
                <div>
                  <Form>
                    <div className='rol'>
                      <IonLabel className='category'>Formato </IonLabel>
                      <Field
                        className='options'
                        as='select'
                        name='format_tutor'
                        multiple={true}
                      >
                        <option className="values" value='Presencial'>Presencial</option>
                        <option className="values" value='Virtual'>Virtual</option>
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
                        Que tipo de tutor eres?{""}
                      </IonLabel>
                      <div className="options1" >
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
                    </div>
                    {formikProps.touched.type_tutor &&
                    formikProps.errors.type_tutor ? (
                      <div style={{ color: "red" }}>
                        {formikProps.errors.type_tutor}
                      </div>
                    ) : null}

                    <div className='rol'>
                      <IonLabel className='category'>Método</IonLabel>
                      <div
                          className='options long'
                          role="group"
                          aria-labelledby="checkbox-group"
                          style={{padding: "5px 12px"}}
                          >
                          <label>
                            <Field  type='checkbox' name='method_tutor' value='Aprendizaje Activo' />
                            Aprendizaje Activo
                          </label>
                          <label>
                            <Field type='checkbox' name='method_tutor' value='Aprendizaje reflexivo' />
                            Aprendizaje Reflexivo
                          </label>
                          <label>
                            <Field type='checkbox' name='method_tutor' value='Aprendizaje teórico' />
                            Aprendizaje Teórico
                          </label>
                          <label>
                            <Field type='checkbox' name='method_tutor' value='Aprendizaje práctico' />
                            Aprendizaje Práctico
                          </label>
                          <label>
                            <Field type='checkbox' name='method_tutor' value='Aprendizaje visual' />
                            Aprendizaje Visual
                          </label>
                          <label>
                            <Field type='checkbox' name='method_tutor' value='Aprendizaje auditivo' />
                            Aprendizaje Auditivo
                          </label>
                          <label>
                            <Field type='checkbox' name='method_tutor' value='Aprendizaje kinestésico' />
                            Aprendizaje kinestésico
                          </label>
                        </div>
                    </div>
                    {formikProps.touched.method_tutor &&
                    formikProps.errors.method_tutor ? (
                      <div style={{ color: "red" }}>
                        {formikProps.errors.method_tutor}
                      </div>
                    ) : null}
                    <div className='rol'>
                      <IonLabel className='category'>
                        Tipo de Grupo(s){" "}
                      </IonLabel>
                      <Field
                        className='options'
                        as='select'
                        name='type_group_tutor'
                        multiple={true}
                        style={{padding: "5px 12px"}}
                      >
                        <option className="values" value='Individual'>Individual</option>
                        <option className="values" value='Grupal'>Grupal</option>
                      </Field>
                    </div>
                    {formikProps.touched.type_group_tutor &&
                    formikProps.errors.type_group_tutor ? (
                      <div style={{ color: "red" }}>
                        {formikProps.errors.type_group_tutor}
                      </div>
                    ) : null}

                    <div className='rol'>
                      <IonLabel className='category'>Materias </IonLabel>
                      <div
                        className='options long'
                        style={{padding: "5px 12px"}}
                        role="group"
                        aria-labelledby="checkbox-group">

                        {subjects.map((subject,index) => (
                          <label key={index} className="values">
                            <Field type='checkbox' name='subjects_tutor' value={subject} />
                            {subject}
                          </label>
                        ))
                      } 
                      </div>
                    </div>
                    {formikProps.touched.subjects_tutor &&
                    formikProps.errors.subjects_tutor ? (
                      <div style={{ color: "red" }}>
                        {formikProps.errors.subjects_tutor}
                      </div>
                    ) : null}

                    <div className='btn'>
                    <IonButton onClick={handleButtonClick} >Disponibilidad</IonButton>
                        <IonModal ref={modal} isOpen={showModal} onDidDismiss={closeModal}>
                          <GridHorarios modal={modal} estado={selectedSlots} actualizar={setSelectedSlots}/>
                        </IonModal>
                    </div>
                    {selectedSlots.length === 0 ? (
                      <div style={{ color: "red" }}>
                        <h6>ingrese su horario de disponibilidad</h6>
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
