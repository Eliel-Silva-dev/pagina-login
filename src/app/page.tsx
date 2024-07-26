'use client';

import * as yup from 'yup';
import Axios from 'axios';
import { ErrorMessage, Formik, Form, Field } from 'formik';

import style from './page.module.css';

type ThandleLogin = {
  email: string;
  password: string;
};
export default function Home() {
  const handlelogin = (values: ThandleLogin) => {
    Axios.post('', {
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response.data);
      alert(response.data.msg);
    });
    //http://localhost:3001/login
  };

  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email('Email inválido')
      .required('O email é obrigatório'),
    password: yup
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .required('A senha é obrigatória'),
  });

  return (
    <main id={style.main_home}>
      <section className={style.container}>
        <h1>Login</h1>
        <Formik
          initialValues={{} as ThandleLogin}
          onSubmit={handlelogin}
          validationSchema={validationLogin}
        >
          <Form className={style.login_form}>
            <div className={style.login_form_group}>
              <Field
                name="email"
                className={style.form_field}
                placeholder="Email"
              />
              <ErrorMessage
                component="span"
                name="email"
                className={style.form_error}
              />
            </div>
            <div className={style.form_group}>
              <Field
                name="password"
                type="password"
                className={style.form_field}
                placeholder="Senha"
              />
              <ErrorMessage
                component="span"
                name="password"
                className={style.form_error}
              />
            </div>

            <button className={style.button} type="submit">
              Login
            </button>
          </Form>
        </Formik>
      </section>
    </main>
  );
}
