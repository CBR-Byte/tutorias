import React, { RefObject, useEffect } from 'react';
import './GridHorarios.css'; // Asegúrate de tener el archivo de estilos GridHorarios.css con el CSS proporcionado en el ejemplo anterior.
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonRow, IonText, IonTitle } from '@ionic/react';
import {Slot} from '../../pages/UserForm';

interface slotProps {
    estado: Slot[];
    actualizar: (slots: Slot[]) => void;
    modal: RefObject<HTMLIonModalElement>;
}

const GridHorarios: React.FC<slotProps> = ({estado,actualizar,modal}) => {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const hours = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];


  const toggleSelection = (dayIndex: number, hourIndex: number) => {
    const slotIndex = estado.findIndex(slot => slot.day === dayIndex && slot.hour === hourIndex);
    if (slotIndex === -1) {
      actualizar([...estado, { day: dayIndex, hour: hourIndex }]);
    } else {
      actualizar(estado.filter(slot => !(slot.day === dayIndex && slot.hour === hourIndex)));
    }
  };

  return (
    <> 
        <IonHeader className='header'>
            <IonTitle className='titulo'>Horarios</IonTitle>
        </IonHeader>
        <IonContent scrollY={false} className='header'>
            <IonText>
                Seleccione su horario de disponibilidad
            </IonText>
            <IonGrid className='horario'>
                <IonRow className='grid-container'>
                    {days.map((day, dayIndex) => (
                            <IonRow key={dayIndex}>
                                <IonCol className="dias">{day}</IonCol>
                                {hours.map((hour, hourIndex) => (
                                    <IonCol 
                                        key={hourIndex}  
                                        className={`grid-item ${estado.some(slot => slot.day === dayIndex && slot.hour === hourIndex) ? 'selected' : ''}`}
                                        onClick={() => toggleSelection(dayIndex, hourIndex)}>
                                        {hour}
                                    </IonCol>
                                ))}
                            </IonRow>
                    ))}
                </IonRow>
            </IonGrid>
            <div className='cuadrado'>
                <IonButton shape='round' className='btn' onClick={() => modal.current?.dismiss()}>Confirmar</IonButton>
            </div>
        </IonContent>
    </>
  );
};

export default GridHorarios;
