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
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../components/redux/hooks";
import { useHistory } from "react-router";
import { updateUserInfo } from "../../components/redux/states/userSlice";
import { changeRegisterCompleted} from "../../components/redux/states/userSlice";
  
  const validationSchema = Yup.object({
    career: Yup.string().required("Carrera requerida"),
    semester: Yup.number().required("Semestre requerido"),
    format: Yup.array().required("formato Requerido"),
    budget: Yup.number().required("Presupuesto Requerido"),
    method: Yup.array().required("Método Requerido"),
    type_group: Yup.array().required("Grupo Requerido"),
  });

  export interface Slot {
    day: number;
    hour: number;
  }

  interface formData {
    career: string;
    semester: number | string;
    format: string[] | string;
    budget: number | string;
    method: string[] | string;
    type_group: string[] | string;
    avaliability: Slot[];
  }
  
  const UserForm: React.FC = () => {
    const history = useHistory();
    const state = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const modal = useRef<HTMLIonModalElement>(null);
    const [selectedSlots, setSelectedSlots] = useState<Slot[]>(state.user?.avaliability || []);
    const [showModal, setShowModal] = useState(false);
    const [clickedButton, setClickedButton] = useState(false);

    const carreras : string[] = ["Ingeniería de Sistemas","Ingeniería de Alimentos","Administración de Empresas","Contaduría Pública","Trabajo Social","Tecnología en Desarrollo de Software","Construcción","Nutrición y Dietética","Tecnología en Electrónica"]

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
  const getInitialValues = (data: Partial<formData> = {}): formData => ({
    career:data.career || "",
    semester:data.semester || "",
    format: data.format || "",
    budget: data.budget || "",
    method: data.method || "",
    type_group:data.type_group || "",
    avaliability: data.avaliability || selectedSlots
  })

  const actualizarData = (values: formData) => {
    dispatch(updateUserInfo(values));
  }
  const initialValues = getInitialValues(state.user);
    return (
      <Bg>
        <IonGrid>
          <IonRow className="reg">
            <IonCol>
              <IonLabel >Formulario</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow className='row'>
            <IonCol>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, {resetForm, }) => {
                  values.avaliability = selectedSlots;
                  actualizarData(values);
                  dispatch(changeRegisterCompleted())
                  resetForm();
                  history.push("/inicio");
                }}
              >
                {(formikProps) => (
                    <Form>
                      <label>
                        Carrera
                      </label>
                      <Field
                        as="select"
                        name='career'
                        placeholder='Carrera'
                        className="options"
                        style={{height: "3vh"}}
                      >
                        {carreras.map((carrera) => (
                          <option className="values" key={carrera} value={carrera}>
                            {carrera}
                          </option>
                        ))}
                        </Field>
                      {formikProps.touched.career && formikProps.errors.career ? (
                        <div style={{ color: "red" }}>
                          {formikProps.errors.career}
                        </div>
                      ) : null}
                      <Inputlogin
                        label='Semestre'
                        type='number'
                        name='semester'
                        placeholder='Semestre'
                        value={formikProps.values.semester}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                      />
                      {formikProps.touched.semester && formikProps.errors.semester ? (
                        <div style={{ color: "red" }}>
                          {formikProps.errors.semester}
                        </div>
                      ) : null}
                      <Inputlogin
                        label='Presupuesto'
                        type='number'
                        name='budget'
                        placeholder='Presupuesto'
                        value={formikProps.values.budget}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                      />
                      {formikProps.touched.budget && formikProps.errors.budget ? (
                        <div style={{ color: "red" }}>
                          {formikProps.errors.budget}
                        </div>
                      ) : null}
                      <div className="rol">
                        <IonLabel className="category">Formato: </IonLabel>
                        <Field
                          className="options"
                          as='select'
                          name='format'
                          multiple={true}
                        >
                        <option className="values" value="Virtual">Presencial</option>
                        <option className="values" value="Presencial">Virtual</option>
                        </Field>
                      </div>
                      {formikProps.touched.format && formikProps.errors.format ? (
                        <div style={{ color: "red" }}>
                          {formikProps.errors.format}
                        </div>
                      ) : null}
                      <div className="rol">
                        <IonLabel className="category">Grupo: </IonLabel>
                        <Field
                          className="options"
                          as='select'
                          name='type_group'
                          multiple={true}
                        >
                        <option className="values" value="Individual">Individual</option>
                        <option value="Grupal">Grupal</option>
                        </Field>
                      </div>
                      {formikProps.touched.type_group && formikProps.errors.type_group ? (
                        <div style={{ color: "red" }}>
                          {formikProps.errors.type_group}
                        </div>
                      ) : null}
                      <div className="rol">
                        <IonLabel className="category">Método: </IonLabel>
                        <div
                          className='options long values'
                          role="group"
                          aria-labelledby="checkbox-group"
                          >
                          <label className="values">
                            <Field type='checkbox' name='method' value='Aprendizaje Activo' />
                            Aprendizaje Activo
                          </label>
                          <label className="values">
                            <Field type='checkbox' name='method' value='Aprendizaje reflexivo' />
                            Aprendizaje Reflexivo
                          </label>
                          <label className="values">
                            <Field type='checkbox' name='method' value='Aprendizaje teórico' />
                            Aprendizaje Teórico
                          </label>
                          <label className="values">
                            <Field type='checkbox' name='method' value='Aprendizaje práctico' />
                            Aprendizaje Práctico
                          </label>
                          <label className="values">
                            <Field type='checkbox' name='method' value='Aprendizaje visual' />
                            Aprendizaje Visual
                          </label>
                          <label className="values">
                            <Field type='checkbox' name='method' value='Aprendizaje auditivo' />
                            Aprendizaje Auditivo
                          </label>
                          <label className="values">
                            <Field type='checkbox' name='method' value='Aprendizaje kinestésico' />
                            Aprendizaje kinestésico
                          </label>
                        </div>
                      </div>
                      {formikProps.touched.method && formikProps.errors.method ? (
                        <div style={{ color: "red" }}>
                          {formikProps.errors.method}
                        </div>
                      ) : null}
                      {!state.user?.is_tutor && (
                        <div className="btn">
                       <IonButton onClick={handleButtonClick} >Disponibilidad</IonButton>
                        <IonModal ref={modal} isOpen={showModal} onDidDismiss={closeModal}>
                          <GridHorarios modal={modal} estado={selectedSlots} actualizar={setSelectedSlots}/>
                        </IonModal>
                      </div>
                      )}
                      {(selectedSlots.length === 0 && !state.user?.is_tutor)? (
                      <div style={{ color: "red" }}>
                        <h6>ingrese su horario de disponibilidad</h6>
                      </div>
                    ) : null}
                      <div className="btn">
                          <IonButton shape='round' type='submit'>Enviar</IonButton>
                      </div>
                    </Form>
                )}
              </Formik>
            </IonCol>
          </IonRow>
        </IonGrid>
      </Bg>
    );
  };
  
  export default UserForm;
