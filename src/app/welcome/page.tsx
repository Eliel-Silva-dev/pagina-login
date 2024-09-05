'use client';

import Button from '@/shared/components/buttons/Button';
import style from './style.min.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IDetalheUsers } from '@/shared/services/api/userServices/UserServices';
import { UserServices } from '@/shared/services/api';

const Welcome = () => {
  const [userActive, setUserActive] = useState<IDetalheUsers>();
  const logout = () => {
    localStorage.removeItem('codUser');
  };
  useEffect(() => {
    const lsContent = window.localStorage.getItem('codUser') || '0';

    UserServices.getUserById(JSON.parse(lsContent)).then((response) => {
      console.log(response);

      if (response instanceof Error) {
        alert(
          'Sua seção expirou favor retornar para tela inicial e realizar login novamente',
        );
      }
    });

    console.log();
  }, []);

  return (
    <main className={style.main_welcome}>
      <section>
        <h2>Bem vindo usuário: teste</h2>
        <h3>Número de usários cadastrados:</h3>
        <div className={style.user_register}>04</div>
        <Button>
          <Link onClick={logout} href={'/'}>
            Sair
          </Link>
        </Button>
      </section>
    </main>
  );
};

export default Welcome;
