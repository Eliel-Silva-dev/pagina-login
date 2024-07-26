'use client';

import * as yup from 'yup';
import Axios from 'axios';
import { ErrorMessage, Formik, Form, Field } from 'formik';

import style from './style.min.module.css';

type ThandleRegister = {
  email: string;
  password: string;
  confirmation?: string;
};

const Register = () => {
  const handleRegister = (values: ThandleRegister) => {
    Axios.post('', {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response);
    });
    //http://localhost:3001/register
  };

  const validationsRegister = yup.object().shape({
    email: yup
      .string()
      .email('Email inválido')
      .required('O email é obrigatório'),

    password: yup
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .required('A senha é obrigatória'),
    confirmation: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'As senhas são diferentes')
      .required('A confirmação da senha é obrigatória'),
  });

  return (
    <main id={style.main_register}>
      <section className={style.container}>
        <h1>Cadastro</h1>
        <Formik
          initialValues={{} as ThandleRegister}
          onSubmit={handleRegister}
          validationSchema={validationsRegister}
        >
          <Form className={style.register_form}>
            <div className={style.register_form_group}>
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

            <div className={style.form_group}>
              <Field
                name="confirmation"
                className={style.form_field}
                placeholder="Repetir Senha"
              />

              <ErrorMessage
                component="span"
                name="confirmation"
                className={style.form_error}
              />
            </div>
            <button className={style.button} type="submit">
              Cadastrar
            </button>
          </Form>
        </Formik>
      </section>
    </main>
  );
};

export default Register;
