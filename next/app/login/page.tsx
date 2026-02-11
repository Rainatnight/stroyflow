"use client";

import { AuthForm } from "@/features/AuthForm/AuthForm";
import cls from "./login.module.scss";

const LoginPage = () => {
  return (
    <div className={cls.wrap}>
      <AuthForm />
    </div>
  );
};

export default LoginPage;
