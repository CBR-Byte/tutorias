/** @format */

import { Redirect, Route } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { Props } from "./PublicRoute";
import Loading from "../Loading";

export const PrivateRoute: React.FC<Props> = ({component: Component, ...rest}) => {
  
  //const isAuth = useAppSelector((state) => state.user.isAuthenticated);
  //const isLoad = useAppSelector((state) => state.user.isLoading);
  const state = useAppSelector((state) => state.user);

  if(state.isLoading) {
    return <Loading />
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
