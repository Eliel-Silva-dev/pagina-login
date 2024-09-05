import { Environment } from '@/shared/environment';
import { Api } from '../axios-config';

export interface IListagemUsers {
  email: string;
  password: string;
}
export interface IDetalheUsers {
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
