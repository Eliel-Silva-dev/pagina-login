import { Environment } from '@/shared/environment';
import { Api } from '../axios-config';

export interface IListagemUsers {
  id: string;
  nome: string;
  email: string;
  password: string;
}
export interface IDetalheUsers {
  id: string;
  nome: string;
  email: string;
  password: string;
}

type TUsersComTotalCount = {
  data: IListagemUsers[];
  totalCount: number;
};

export const getAllUsers = async (
  page = 1,
  filter = '',
  id = '',
): Promise<TUsersComTotalCount | Error> => {
  try {
    const urlRelative = `/users?_page=${page}&_limit=${Environment.LIMITE_BUSCA_API}&email_like=${filter}&id_like=${id}`;

    const { data, headers } = await Api.get(urlRelative);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers['x-total-count'] || `${Environment.LIMITE_BUSCA_API}`,
        ),
      };
    }

    return new Error('Erro ao listar os registros');
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao listar os registros',
    );
  }
};

export const getUserById = async (
  id: string,
): Promise<IDetalheUsers | Error> => {
  try {
    const { data } = await Api.get<IDetalheUsers>(`/users/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro');
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao consultar o registro',
    );
  }
};

export const createUser = async (
  dados: Omit<IDetalheUsers, 'id'>,
): Promise<string | Error> => {
  try {
    const { data } = await Api.post<IDetalheUsers>('/users', dados);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar o registro');
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao criar o registro',
    );
  }
};

export const updateUserById = async (
  id: string,
  dados: IDetalheUsers,
): Promise<void | Error> => {
  try {
    await Api.put(`/users?${id}`, dados);
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao atualizar o registro',
    );
  }
};

export const deleteUserById = async (id: string): Promise<void | Error> => {
  try {
    await Api.delete(`/users?${id}`);
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao apagar o registro',
    );
  }
};
