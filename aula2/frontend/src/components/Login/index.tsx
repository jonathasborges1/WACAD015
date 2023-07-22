import "./style.css";
import { Button } from 'react-bootstrap';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { doLogin } from "../../redux/feature/api.login.slice";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";

interface Props {
   children?: React.ReactNode;
}

const Login: React.FC<Props> = ({ children, ...props }) => {
   const dispatch = useDispatch<AppDispatch>(); //essa linha
   const navigate = useNavigate();

   const stateLogin = useSelector((state: RootState) => state.login);
   
   const [email, SetEmail] = useState();
   const [password, SetPassword] = useState("");

   function TryLogin() {
      dispatch(
        doLogin({
          email: email,
          senha: password,
        })
      );
    }

    useEffect(() => {
      if (stateLogin.isSucess) {
        navigate("/home");
      }
    }, [stateLogin.isSucess]);

   return (
      <form style={{ width: "300px" }} className="container">
      <div>
        <h6>Loja Virtual</h6>
      </div>

      <input placeholder="Digite seu email" />
      <input placeholder="Digite sua senha" />

      <Button onClick={() => TryLogin()}>Login</Button>
    </form>
   )
}

export default Login;