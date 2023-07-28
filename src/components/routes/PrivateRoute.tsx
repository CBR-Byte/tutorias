/** @format */

import { ReactNode } from "react";
import { Redirect } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const isAuth = useAppSelector((state) => state.user.isAuthenticated);
  if (isAuth) {
    return children;
  }
  return <Redirect to="/" />;
};
