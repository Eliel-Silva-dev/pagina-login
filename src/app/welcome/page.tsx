'use client';

import Button from '@/shared/components/buttons/Button';
import style from './style.min.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IDetalheUsers } from '@/shared/services/api/userServices/UserServices';
import { UserServices } from '@/shared/services/api';

const Welcome = () => {
  const [user, setUser] = useState<IDetalheUsers>();
  const [totalUsers, setTotalUsers] = useState(0);
  const logout = () => {
    localStorage.removeItem('codUser');
  };
  useEffect(() => {
    const lsContent = window.localStorage.getItem('codUser') || '';

    if (!lsContent) {
      alert('Sua seção expirou favor realizar login novamente');
    } else {
      UserServices.getUserById(JSON.parse(lsContent)).then((response) => {
        if (response instanceof Error) {
          alert('Sua seção expirou favor realizar login novamente');
        } else {
          setUser(response);
        }
      });
    }

    UserServices.getAllUsers().then((response) => {
      if (response instanceof Error) {
        alert('Não foi possivel buscar os dados');
      } else {
        setTotalUsers(response.totalCount);
      }
    });
  }, []);

  return (
    <main className={style.main_welcome}>
      {user ? (
        <section>
          <h2>Bem vindo: {user.nome}</h2>
          <h3>Número de usários cadastrados:</h3>
          <div className={style.user_register}>{totalUsers}</div>
          <Button>
            <Link onClick={logout} href={'/'}>
              Sair
            </Link>
          </Button>
        </section>
      ) : (
        <h3>Carregando dados do usuário</h3>
      )}
    </main>
  );
};

export default Welcome;
