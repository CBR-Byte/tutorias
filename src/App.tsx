/** @format */

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Inicio from "./pages/Inicio";
import UserForm from "./pages/UserForm";
import TutorForm from "./pages/TutorForm";
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
        <PublicRoute exact path='/register' component={Register}/>
        <PrivateRoute exact path='/inicio' component={Inicio}/>
        <PrivateRoute exact path='/userForm' component={UserForm}/>
        <PrivateRoute exact path='/tutorForm' component={TutorForm}/>
      </Switch>
    </Router>
  </IonApp>
);

export default App;
