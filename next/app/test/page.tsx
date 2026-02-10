"use client";
import cls from "./test.module.scss";
import { api } from "@/entities/api";

const TestPage = () => {
  const sendReq = async () => {
    try {
      const response = await api.get("/users");
      console.log("Users:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cls.wrap} onClick={sendReq}>
      test
    </div>
  );
};

export default TestPage;
