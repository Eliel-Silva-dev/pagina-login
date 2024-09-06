'use client';

import * as yup from 'yup';
import { UserServices } from '@/shared/services/api';
import { ErrorMessage, Formik, Form, Field } from 'formik';

import style from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type ThandleLogin = {
  email: string;
  password: string;
};
const validationLogin: yup.Schema<ThandleLogin> = yup.object().shape({
  email: yup.string().email('Email inválido').required('O email é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function Home() {
  const router = useRouter();

  const handlelogin = (values: ThandleLogin) => {
    UserServices.getAllUsers().then((response) => {
      if (response instanceof Error) {
        alert('não foi possível consultar os dados');
      } else {
        const users = response.data;
        const userfind = users.find((user) => user.email == values.email);

        if (
          userfind?.email == values.email &&
          userfind?.password == values.password
        ) {
          localStorage.setItem('codUser', JSON.stringify(userfind.id));

          router.push('/welcome');
        } else {
          alert(
            'Usuário não encontrado, verifique email e senha e tente novamente',
          );
        }
      }
    });
  };

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
        <h2>
          Primeira vez acessando este site?{' '}
          <Link href={'/register'}>Cadastre-se</Link>
        </h2>

        <div className={style.access}>
          <h3>Credenciais de acesso:</h3>
          <p>
            Email: <a>teste01@gmail.com</a>
          </p>
          <p>Senha: <a>123456</a></p>
        </div>
      </section>
    </main>
  );
}
