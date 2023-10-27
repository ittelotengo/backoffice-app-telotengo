import React from "react";
import * as Yup from "yup";
import CreateForm from "../../molecules/form/CreateForm";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LoginForm() {
  const navigate = useNavigate();
  const auth = getAuth();
  const config = {
    fields: {
      email: {
        label: "Email",
        initialValue: "",
        validation: Yup.string().required("El email es requerido"),
        // .email("Email inválido"),
        type: "text",
      },
      password: {
        label: "Contraseña",
        initialValue: "",
        validation: Yup.string().required("La contraseña es requerida"),
        type: "password",
      },
    },
    onSubmit: async (values, { setSubmitting }) => {
      const { email, password } = values;
      try {
        // navigate("/banners/list")
        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        const user = userCredential.user;
        localStorage.setItem('email', user?.email);
        localStorage.setItem('uid', user?.uid);
        localStorage.setItem('accessToken', user?.accessToken);
        enqueueSnackbar("Bienvenido!", {
          variant: "success",
        });
        navigate("/banners/list")
      } catch (error) {
        const errorCode = error.code;
        const msg = error.message;
        switch (errorCode) {
          case "auth/invalid-login-credentials":
            enqueueSnackbar("Datos incorrectos", {
              variant: "error",
            });
            break;
          default:
            enqueueSnackbar("Ha ocurrido un error", {
              variant: "error",
            });
            break;
        }
      }
      setSubmitting(false);
    },
    submitButtonText: "Ingresar", // Opcional
  };
  return <CreateForm config={config} />;
}

export default LoginForm;
