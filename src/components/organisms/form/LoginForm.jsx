import React from "react";
import * as Yup from "yup";
import CreateForm from "../../molecules/form/CreateForm";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate()
  const config = {
    fields: {
      email: {
        label: "Email",
        initialValue: "",
        validation: Yup.string()
          .required("El email es requerido"),
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
        navigate("/")
        // if (data.data.token) {
        //   localStorage.setItem('user', JSON.stringify(data.data.user));
        //   localStorage.setItem('token', data.data.token);
        //   navigate("/")
        // }
      } catch (error) {
        const {
          status,
          data: { data: msg },
        } = error.response;
        switch (status) {
          case 401:
            enqueueSnackbar('Datos incorrectos', {
              variant: 'error',
            });
            break;
          case 409:
            enqueueSnackbar('Usuario posee una sesion activa', {
              variant: 'error',
            });
            break;
          case 500:
            enqueueSnackbar('Error interno', {
              variant: 'error',
            });
            break;
          default:
            enqueueSnackbar(msg, {
              variant: 'error',
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
