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
import Bg from "../components/Bg/Bg";
import Inputlogin from "../components/Inputlogin/Inputlogin";
import GridHorarios from "../components/GridHorarios/GridHorarios";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { Slot } from "./UserForm";
import { useAppDispatch, useAppSelector } from "../components/redux/hooks";
import { useHistory } from "react-router";
import { changeRegisterCompleted, updateUserInfo } from "../components/redux/states/userSlice";


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
  const [selectedSlots, setSelectedSlots] = useState<Slot[]>(state.user?.avaliability || []);
  const dispatch = useAppDispatch();
  const history = useHistory();
  
  const [showModal, setShowModal] = useState(false);
    const [clickedButton, setClickedButton] = useState(false);
    useEffect(() => {
      if (clickedButton) {
        setShowModal(true);
      }
    }, [clickedButton]);

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

                if(state.user?.is_student) {
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
                      <IonLabel className='category'>Formato: </IonLabel>
                      <Field
                        className='options'
                        as='select'
                        name='format_tutor'
                        multiple={true}
                      >
                        <option value='Presencial'>Presencial</option>
                        <option value='Virtual'>Virtual</option>
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
                    {formikProps.touched.method_tutor &&
                    formikProps.errors.method_tutor ? (
                      <div style={{ color: "red" }}>
                        {formikProps.errors.method_tutor}
                      </div>
                    ) : null}
                    <div className='rol'>
                      <IonLabel className='category'>
                        Tipo de Grupo(s):{" "}
                      </IonLabel>
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
                    {formikProps.touched.type_group_tutor &&
                    formikProps.errors.type_group_tutor ? (
                      <div style={{ color: "red" }}>
                        {formikProps.errors.type_group_tutor}
                      </div>
                    ) : null}

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
