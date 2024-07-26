'use client';

import * as yup from "yup";
import Axios from "axios";
import { ErrorMessage, Formik, Form, Field } from "formik";

import style from './style.min.module.css';

const Cadastro = () => {
  return(
    <main className={style.main_cadastro}>
      <h2>Pagina de cadastro</h2>
    </main>
  );
};

export default Cadastro;