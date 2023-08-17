/** @format */
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import { Network } from "@capacitor/network";

export interface Props extends RouteProps {
    component: React.ComponentType<any>;
  }

export const PublicRoute: React.FC<Props> = ({component: Component, ...rest }) => {

  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const listener = Network.addListener('networkStatusChange', async () => {
      const status = await Network.getStatus();
      setIsConnected(status.connected);
    });
    
    return () => {
      listener.remove ();
    };
  }, []); 

  const state = useAppSelector((state) => state.user);

  if(!isConnected) {
    return <Loading message="No hay conexión a internet" /> 
  }
  if(state.isLoading) {
    return <Loading message="Cargando..." />
  }

    return (
        <Route
            {...rest}
          render={props =>
            !state.isAuthenticated ? (
          <Component {...props} />
            ) : (
              <Redirect
                to="/inicio"
              />
            )
          }
        />
      );

};
