import {IonPage, IonContent,} from '@ionic/react';
import './Bg.css';

interface BgProps {
    children: React.ReactNode;
}

const Bg: React.FC<BgProps> = ({ children }) => {
  return (
        <div className='main'>
        
          <div className="circle1"/>
          <div className="circles2 top1"/>
          <div className="circles2 bottom1"/>
          <div className='circles3 top2'/>
          <div className='circles3 bottom2'/>
          <div className='circles3 bottom3'/>
          
          {children}
          
        </div>
  );
};

export default Bg;