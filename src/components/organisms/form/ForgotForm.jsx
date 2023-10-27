import React from "react";
import * as Yup from 'yup';
import CreateForm from "../../molecules/form/CreateForm";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function ForgotForm() {
  const navigate = useNavigate()
  const config = {
    fields: {
      email: {
        label: "Email",
        initialValue: "",
        validation: Yup.string().required("El email es requerido") ,
        type: 'text',
      },
    },
    onSubmit: async (values, { setSubmitting }) => {
      const { email } = values;
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/password_recovery`,
          {
            username: email,
          }
        );
        console.log(data)
        const {
          message,
          data: DataResponse,
        } = data;
        enqueueSnackbar(DataResponse.message, {
          variant: message,
        });
        navigate("/auth/login")
      } catch (error) {
        console.log(error)
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
    submitButtonText: "Enviar", // Opcional
  };
  return <CreateForm config={config}/>
}

export default ForgotForm;
