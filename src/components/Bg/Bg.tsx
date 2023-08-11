import {IonPage, IonContent,} from '@ionic/react';
import './Bg.css';

interface BgProps {
    children: React.ReactNode;
}

const Bg: React.FC<BgProps> = ({ children }) => {
  return (
    <IonPage >
        <IonContent scrollY={false}>
        
          <div className="circle1"/>
          <div className="circles2 top"/>
          <div className="circles2 bottom"/>
          <div className='circles3 top2'/>
          <div className='circles3 bottom2'/>
          <div className='circles3 bottom3'/>
          
          {children}
          
        </IonContent>
  </IonPage>
  );
};

export default Bg;