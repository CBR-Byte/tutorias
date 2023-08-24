/** @format */

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { IonApp, setupIonicReact } from "@ionic/react";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Inicio from "./pages/Inicio/Inicio";
import UserForm from "./pages/Forms/UserForm";
import TutorForm from "./pages/Forms/TutorForm";
import Profile from './pages/Profile/Profile';
import InfoForm from './pages/Forms/InfoForm';
import Chat from './pages/Chat/Chat';
import { PublicRoute } from "./components/routes/PublicRoute";
import { PrivateRoute } from "./components/routes/PrivateRoute";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <Router>
      <Switch>
      <PublicRoute exact path='/login' component={Login} />
        <Route exact path='/'>
          <Redirect to='/login' />
        </Route>
        <PrivateRoute exact path='/profile' component={Profile}/>
        <PublicRoute exact path='/register' component={Register}/>
        <PrivateRoute exact path='/inicio' component={Inicio}/>
        <PrivateRoute exact path='/userForm' component={UserForm}/>
        <PrivateRoute exact path='/chat' component={Chat}/>
        <PrivateRoute exact path='/tutorForm' component={TutorForm}/>
        <PrivateRoute exact path='/infoForm' component={InfoForm}/>
      </Switch>
    </Router>
  </IonApp>
);

export default App;
