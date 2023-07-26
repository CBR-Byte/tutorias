import React, { useState } from 'react';
import './GridHorarios.css'; // Asegúrate de tener el archivo de estilos GridHorarios.css con el CSS proporcionado en el ejemplo anterior.
import { IonButton, IonCol, IonGrid, IonIcon, IonLabel, IonRouterLink, IonRow, IonTitle } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';

interface Slot {
  day: number;
  hour: number;
}

const GridHorarios: React.FC = () => {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const hours = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm'];

  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);

  const toggleSelection = (dayIndex: number, hourIndex: number) => {
    const slotIndex = selectedSlots.findIndex(slot => slot.day === dayIndex && slot.hour === hourIndex);

    if (slotIndex === -1) {
      setSelectedSlots([...selectedSlots, { day: dayIndex, hour: hourIndex }]);
    } else {
      setSelectedSlots(selectedSlots.filter(slot => !(slot.day === dayIndex && slot.hour === hourIndex)));
    }
  };

  return (
    <>
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
            <IonTitle className='titulo'>
                <IonLabel>Horarios</IonLabel>
            </IonTitle>
            <div className='gird-contaianer'>
                <div className='grid-item header'>
                    {hours.map((hour, hourIndex) => (
                        <div key={hourIndex} className='grid-item header'>
                            {hour}
                        </div>))}
                </div>
            </div>
        </IonGrid>
    </>
  );
};

export default GridHorarios;
