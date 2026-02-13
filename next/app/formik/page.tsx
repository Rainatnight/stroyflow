"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./formik.module.scss";

const SignupForm = () => {
  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Неверный email").required("Обязательное поле"),
    password: Yup.string()
      .min(6, "Минимум 6 символов")
      .required("Обязательное поле"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Отправка формы:", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label>Email</label>
          <Field name="email" type="email" className={styles.input} />

          <ErrorMessage name="email" component="div" className={styles.error} />
        </div>

        <div>
          <label>Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" />
        </div>

        <button type="submit">Sign Up</button>
      </Form>
    </Formik>
  );
};
export default SignupForm;
