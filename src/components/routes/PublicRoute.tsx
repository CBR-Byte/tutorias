/** @format */

import { ReactNode } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import Loading from "../Loading";


export interface Props extends RouteProps {
    component: React.ComponentType<any>;
  }

export const PublicRoute: React.FC<Props> = ({component: Component, ...rest }) => {
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
