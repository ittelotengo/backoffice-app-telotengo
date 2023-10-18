import React from "react";
import LoginForm from "../../../components/organisms/form/LoginForm";
import AuthCard from "../../../components/templates/auth/AuthCard";

const Login = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center login-auth">
      <AuthCard title="">
        <LoginForm />
      </AuthCard>
    </div>
  );
};

export default Login;
