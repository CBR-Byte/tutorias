/** @format */

import { ReactNode } from "react";
import { Redirect } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useAppDispatch } from "../redux/hooks";



export const PublicRoute = ({ children }: { children: ReactNode }) => {
    const isAuth = useAppSelector((state) => state.user.isAuthenticated);

    if(isAuth){
        //console.log(prueba);
        
        return <Redirect to='/inicio' />;
    }
    
    //dispatch(verifyToken(data.token))
    return children;

};
