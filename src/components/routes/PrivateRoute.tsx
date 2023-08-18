/** @format */

import { Redirect, Route } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { Props } from "./PublicRoute";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import { Network } from "@capacitor/network";

export const PrivateRoute: React.FC<Props> = ({component: Component, ...rest}) => {

  const [isConnected, setIsConnected] = useState(true);
  const state = useAppSelector((state) => state.user);
  
  useEffect(() => {
    Network.addListener('networkStatusChange', async () => {
      const status = await Network.getStatus();
      setIsConnected(status.connected);
    });
    
    return () => {
      Network.removeAllListeners();
    };
  }, []);
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
        
        state.isAuthenticated ? (
          <Component {...props}/>
        ) : (
              <Redirect
                to="/login"
                
              />
        )
      }
    />
  );
};
