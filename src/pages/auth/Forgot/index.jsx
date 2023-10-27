import React from "react";
import AuthCard from "../../../components/templates/auth/AuthCard";
import ForgotForm from "../../../components/organisms/form/ForgotForm";

const Forgot = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center login-auth">
      <AuthCard
        title="Cambiar contraseña"
        subtitle="Ingresa tu correo electrónico para cambiar tu contraseña"
      >
        <ForgotForm />
      </AuthCard>
    </div>
  );
};

export default Forgot;
