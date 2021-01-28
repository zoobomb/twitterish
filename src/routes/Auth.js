import React, { useState } from "react";
import AuthForm from "components/AuthForm";
import AuthSocial from "components/AuthSocial";

const Auth = () => {
  return (
    <div>
      <AuthForm />
      <AuthSocial />
    </div>
  );
};
export default Auth;
