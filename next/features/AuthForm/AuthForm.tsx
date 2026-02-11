"use client";

import { Form, Input, Button, Typography } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./AuthForm.module.scss";
import { useState } from "react";

const { Title, Text } = Typography;

type AuthMode = "login" | "register";

export const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [form] = Form.useForm();

  const isLogin = mode === "login";

  const onFinish = (values: any) => {
    if (isLogin) {
      console.log("LOGIN DATA:", values);
    } else {
      console.log("REGISTER DATA:", values);
    }
  };

  const toggleMode = () => {
    form.resetFields();
    setMode(isLogin ? "register" : "login");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Title level={3} className={styles.title}>
          {isLogin ? "Вход в аккаунт" : "Регистрация"}
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          className={styles.form}
        >
          {!isLogin && (
            <Form.Item
              name="name"
              label="Имя"
              rules={[{ required: true, message: "Введите имя" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Ваше имя"
                size="large"
              />
            </Form.Item>
          )}

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Введите email" },
              { type: "email", message: "Некорректный email" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="example@mail.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Пароль"
            rules={[{ required: true, message: "Введите пароль" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Введите пароль"
              size="large"
            />
          </Form.Item>

          {!isLogin && (
            <Form.Item
              name="confirmPassword"
              label="Подтвердите пароль"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Подтвердите пароль" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Пароли не совпадают"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Повторите пароль"
                size="large"
              />
            </Form.Item>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className={styles.submitBtn}
            >
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>
          </Form.Item>
        </Form>

        <Text className={styles.switchText}>
          {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
          <span className={styles.switchLink} onClick={toggleMode}>
            {isLogin ? "Зарегистрироваться" : "Войти"}
          </span>
        </Text>
      </div>
    </div>
  );
};
